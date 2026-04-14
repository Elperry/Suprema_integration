const { EventEmitter } = require('events');

const {
  createEventCatalog,
  classifyEventCode,
  getDefaultTNAKeyForEvent,
} = require('./eventCatalog');

class DeviceState extends EventEmitter {
  constructor(config = {}) {
    super();

    this.config = config;
    this.eventCatalog = createEventCatalog(config);

    this.devices = new Map();
    this.connectionStatus = new Map();
    this.users = new Map();
    this.eventLogs = new Map();
    this.imageLogs = new Map();
    this.doors = new Map();
    this.blacklists = new Map();
    this.monitoring = new Map();
    this.authConfigs = new Map();
    this.accessGroups = new Map();
    this.accessLevels = new Map();
    this.floorLevels = new Map();
    this.schedules = new Map();
    this.holidayGroups = new Map();
    this.faceAuthGroups = new Map();
    this.cardConfigs = new Map();
    this.card1XConfigs = new Map();
    this.qrConfigs = new Map();
    this.customConfigs = new Map();
    this.facilityCodeConfigs = new Map();
    this.tnaConfigs = new Map();
    this.timeValues = new Map();
    this.timeConfigs = new Map();
    this.dstConfigs = new Map();
    this.imageFilters = new Map();
    this.acceptFilter = {
      allowAll: true,
      deviceIDs: [],
      IPAddrs: [],
      subnetMasks: [],
    };

    this.statusSubscribers = new Set();
    this.eventSubscribers = new Set();
    this.cardScanQueue = new Map();
    this.cardScanIndex = new Map();
    this.activityLog = [];
    this.nextEventID = 1;

    this._initFromConfig();
  }

  _initFromConfig() {
    const now = this._unixTime();

    for (const rawDevice of this.config.devices || []) {
      const device = {
        ...rawDevice,
        deviceID: Number(rawDevice.deviceID),
      };
      const deviceID = device.deviceID;

      this.devices.set(deviceID, device);
      this.connectionStatus.set(deviceID, 'disconnected');
      this.monitoring.set(deviceID, false);
      this.users.set(deviceID, new Map());
      this.eventLogs.set(deviceID, []);
      this.imageLogs.set(deviceID, []);
      this.doors.set(deviceID, new Map());
      this.blacklists.set(deviceID, new Map());
      this.authConfigs.set(deviceID, this._createAuthConfig());
      this.accessGroups.set(deviceID, new Map());
      this.accessLevels.set(deviceID, new Map());
      this.floorLevels.set(deviceID, new Map());
      this.schedules.set(deviceID, new Map());
      this.holidayGroups.set(deviceID, new Map());
      this.faceAuthGroups.set(deviceID, new Map());
      this.cardConfigs.set(deviceID, this._createCardConfig());
      this.card1XConfigs.set(deviceID, {});
      this.qrConfigs.set(deviceID, this._createQRConfig());
      this.customConfigs.set(deviceID, {});
      this.facilityCodeConfigs.set(deviceID, { facilityCodes: [] });
      this.tnaConfigs.set(deviceID, this._createTNAConfig());
      this.timeValues.set(deviceID, now);
      this.timeConfigs.set(deviceID, this._createTimeConfig());
      this.dstConfigs.set(deviceID, { schedules: [] });
      this.imageFilters.set(deviceID, []);

      for (const user of rawDevice.users || []) {
        this._upsertUserRecord(deviceID, {
          userID: user.userID,
          name: user.name,
          cards: (user.cards || []).map((cardHex) => this._normalizeCard(cardHex)),
          fingers: this._createFakeFingers(user.numOfFinger || 0),
          faces: this._createFakeFaces(user.numOfFace || 0),
          accessGroupIDs: user.accessGroupIDs || [],
          jobCodes: user.jobCodes || [],
          setting: user.setting || {},
          pin: Buffer.alloc(0),
          photo: Buffer.alloc(0),
        });
      }

      for (const door of rawDevice.doors || []) {
        this._upsertDoorRecord(deviceID, door);
      }

      for (const group of rawDevice.accessGroups || []) {
        this.accessGroups.get(deviceID).set(Number(group.ID), this._clonePlainObject(group));
      }

      for (const level of rawDevice.accessLevels || []) {
        this.accessLevels.get(deviceID).set(Number(level.ID), this._clonePlainObject(level));
      }

      for (const schedule of rawDevice.schedules || []) {
        this.schedules.get(deviceID).set(Number(schedule.ID), this._clonePlainObject(schedule));
      }
    }
  }

  _unixTime() {
    return Math.floor(Date.now() / 1000);
  }

  _normalizeDeviceID(deviceID) {
    return Number(deviceID);
  }

  _ensureDevice(deviceID) {
    const normalized = this._normalizeDeviceID(deviceID);
    const device = this.devices.get(normalized);
    if (!device) {
      const error = new Error(`Device ${deviceID} not found`);
      error.code = 5;
      throw error;
    }

    return { deviceID: normalized, device };
  }

  _emitChange(type, payload = {}) {
    this.emit('changed', { type, ...payload });
  }

  logActivity(message, meta = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      message,
      meta,
    };

    this.activityLog.push(entry);
    while (this.activityLog.length > 40) {
      this.activityLog.shift();
    }

    this.emit('activity', entry);
    this._emitChange('activity', { entry });
    return entry;
  }

  _clonePlainObject(value) {
    if (Buffer.isBuffer(value)) {
      return Buffer.from(value);
    }

    if (Array.isArray(value)) {
      return value.map((item) => this._clonePlainObject(item));
    }

    if (value && typeof value === 'object') {
      const cloned = {};
      for (const [key, nested] of Object.entries(value)) {
        cloned[key] = this._clonePlainObject(nested);
      }
      return cloned;
    }

    return value;
  }

  _normalizeBytes(value) {
    if (Buffer.isBuffer(value)) {
      return Buffer.from(value);
    }

    if (value instanceof Uint8Array) {
      return Buffer.from(value);
    }

    if (Array.isArray(value)) {
      return Buffer.from(value);
    }

    if (typeof value === 'string') {
      const compact = value.replace(/[^0-9A-Fa-f]/g, '');
      if (compact.length >= 2 && compact.length % 2 === 0) {
        return Buffer.from(compact, 'hex');
      }

      return Buffer.from(value, 'base64');
    }

    return Buffer.alloc(0);
  }

  _normalizeCard(card) {
    if (!card) {
      return { type: 1, size: 0, data: Buffer.alloc(0) };
    }

    if (typeof card === 'string' || Buffer.isBuffer(card) || card instanceof Uint8Array || Array.isArray(card)) {
      const data = this._normalizeBytes(card);
      return {
        type: 1,
        size: data.length,
        data,
      };
    }

    const data = this._normalizeBytes(card.data || card.cardID || card.cardData || []);
    return {
      type: Number(card.type ?? 1),
      size: Number(card.size ?? data.length),
      data,
    };
  }

  _cloneCard(card) {
    const normalized = this._normalizeCard(card);
    return {
      type: normalized.type,
      size: normalized.size,
      data: Buffer.from(normalized.data),
    };
  }

  _cloneFinger(finger) {
    return {
      index: Number(finger.index ?? 0),
      flag: Number(finger.flag ?? 0),
      templates: (finger.templates || []).map((template) => this._normalizeBytes(template)),
    };
  }

  _cloneFace(face) {
    return {
      index: Number(face.index ?? 0),
      flag: Number(face.flag ?? 0),
      templates: (face.templates || []).map((template) => this._normalizeBytes(template)),
      imageData: this._normalizeBytes(face.imageData || []),
      irTemplates: (face.irTemplates || []).map((template) => this._normalizeBytes(template)),
      irImageData: this._normalizeBytes(face.irImageData || []),
    };
  }

  _normalizeUserInfo(userInfo = {}) {
    const hdr = userInfo.hdr || {};
    const userID = String(userInfo.userID || hdr.ID || hdr.id || '');

    return {
      userID,
      name: userInfo.name || '',
      cards: (userInfo.cards || []).map((card) => this._normalizeCard(card)),
      fingers: (userInfo.fingers || []).map((finger) => this._cloneFinger(finger)),
      faces: (userInfo.faces || []).map((face) => this._cloneFace(face)),
      accessGroupIDs: [...(userInfo.accessGroupIDs || [])].map((id) => Number(id)),
      jobCodes: (userInfo.jobCodes || []).map((jobCode) => this._clonePlainObject(jobCode)),
      setting: this._clonePlainObject(userInfo.setting || {}),
      pin: this._normalizeBytes(userInfo.PIN || userInfo.pin || []),
      photo: this._normalizeBytes(userInfo.photo || []),
    };
  }

  _toUserRecord(userInfo = {}) {
    const normalized = this._normalizeUserInfo(userInfo);
    return {
      userID: normalized.userID,
      name: normalized.name,
      cards: normalized.cards.map((card) => this._cloneCard(card)),
      fingers: normalized.fingers.map((finger) => this._cloneFinger(finger)),
      faces: normalized.faces.map((face) => this._cloneFace(face)),
      accessGroupIDs: [...normalized.accessGroupIDs],
      jobCodes: normalized.jobCodes.map((jobCode) => this._clonePlainObject(jobCode)),
      setting: this._clonePlainObject(normalized.setting),
      pin: Buffer.from(normalized.pin),
      photo: Buffer.from(normalized.photo),
    };
  }

  _toUserInfo(record) {
    return {
      hdr: {
        ID: String(record.userID),
        numOfCard: record.cards.length,
        numOfFinger: record.fingers.length,
        numOfFace: record.faces.length,
        authGroupID: 0,
      },
      name: record.name || '',
      cards: record.cards.map((card) => this._cloneCard(card)),
      fingers: record.fingers.map((finger) => this._cloneFinger(finger)),
      faces: record.faces.map((face) => this._cloneFace(face)),
      accessGroupIDs: [...record.accessGroupIDs],
      jobCodes: record.jobCodes.map((jobCode) => this._clonePlainObject(jobCode)),
      setting: this._clonePlainObject(record.setting || {}),
      PIN: Buffer.from(record.pin || Buffer.alloc(0)),
      photo: Buffer.from(record.photo || Buffer.alloc(0)),
    };
  }

  _upsertUserRecord(deviceID, userInfo) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const users = this.users.get(normalizedDeviceID);
    const record = this._toUserRecord(userInfo);
    users.set(record.userID, record);
    return this._toUserInfo(record);
  }

  _createFakeTemplate(size) {
    const buffer = Buffer.alloc(size);
    for (let index = 0; index < size; index += 1) {
      buffer[index] = Math.floor(Math.random() * 256);
    }
    return buffer;
  }

  _createFakeFingers(count) {
    return Array.from({ length: count }, (_, index) => ({
      index,
      flag: 0,
      templates: [this._createFakeTemplate(384)],
    }));
  }

  _createFakeFaces(count) {
    return Array.from({ length: count }, (_, index) => ({
      index,
      flag: 0,
      templates: [this._createFakeTemplate(552)],
      imageData: Buffer.alloc(0),
      irTemplates: [],
      irImageData: Buffer.alloc(0),
    }));
  }

  _createAuthConfig() {
    return {
      authSchedules: [],
      useGlobalAPB: false,
      globalAPBFailAction: 0,
      useGroupMatching: false,
      usePrivateAuth: !!this.config.auth?.usePrivateAuth,
      faceDetectionLevel: 0,
      useServerMatching: false,
      useFullAccess: false,
      matchTimeout: Number(this.config.auth?.matchTimeout ?? 10),
      authTimeout: Number(this.config.auth?.authTimeout ?? 15),
      operators: [],
    };
  }

  _createCardConfig() {
    return {
      byteOrder: 0,
      useWiegandFormat: false,
      dataType: 0,
      useSecondaryKey: false,
      mifareConfig: {
        primaryKey: Buffer.alloc(6, 0xFF),
        secondaryKey: Buffer.alloc(6, 0xFF),
        startBlockIndex: 4,
      },
      iClassConfig: {},
      DESFireConfig: {},
      SEOSConfig: {},
      formatID: 0,
      cipher: false,
      smartCardByteOrder: 0,
      mifareEncryption: 0,
    };
  }

  _createQRConfig() {
    return {
      useQRCode: true,
      scanTimeout: 4,
      bypassData: false,
      treatAsCSN: true,
    };
  }

  _createTNAConfig() {
    return {
      mode: 1,
      key: 1,
      isRequired: false,
      schedules: [],
      labels: ['Clock In', 'Clock Out', 'Break Start', 'Break End'],
    };
  }

  _createTimeConfig() {
    return {
      timeZone: 0,
      syncWithServer: true,
    };
  }

  _upsertDoorRecord(deviceID, doorInfo = {}) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const doorMap = this.doors.get(normalizedDeviceID);
    const existing = doorMap.get(Number(doorInfo.doorID)) || {};
    const record = {
      doorID: Number(doorInfo.doorID),
      name: doorInfo.name || existing.name || `Door ${doorInfo.doorID}`,
      entryDeviceID: Number(doorInfo.entryDeviceID ?? normalizedDeviceID),
      exitDeviceID: Number(doorInfo.exitDeviceID ?? 0),
      relay: this._clonePlainObject(doorInfo.relay || existing.relay || { deviceID: normalizedDeviceID, port: 0 }),
      sensor: this._clonePlainObject(doorInfo.sensor || existing.sensor || { deviceID: normalizedDeviceID, port: 0, type: 0 }),
      button: this._clonePlainObject(doorInfo.button || existing.button || { deviceID: normalizedDeviceID, port: 1, type: 0 }),
      autoLockTimeout: Number(doorInfo.autoLockTimeout ?? existing.autoLockTimeout ?? 3),
      heldOpenTimeout: Number(doorInfo.heldOpenTimeout ?? existing.heldOpenTimeout ?? 10),
      instantLock: !!(doorInfo.instantLock ?? existing.instantLock ?? false),
      unlockFlags: Number(doorInfo.unlockFlags ?? existing.unlockFlags ?? 0),
      lockFlags: Number(doorInfo.lockFlags ?? existing.lockFlags ?? 1),
      unconditionalLock: !!(doorInfo.unconditionalLock ?? existing.unconditionalLock ?? false),
      forcedOpenActions: this._clonePlainObject(doorInfo.forcedOpenActions || existing.forcedOpenActions || []),
      heldOpenActions: this._clonePlainObject(doorInfo.heldOpenActions || existing.heldOpenActions || []),
      dualAuthScheduleID: Number(doorInfo.dualAuthScheduleID ?? existing.dualAuthScheduleID ?? 0),
      dualAuthDevice: Number(doorInfo.dualAuthDevice ?? existing.dualAuthDevice ?? 0),
      dualAuthType: Number(doorInfo.dualAuthType ?? existing.dualAuthType ?? 0),
      dualAuthTimeout: Number(doorInfo.dualAuthTimeout ?? existing.dualAuthTimeout ?? 15),
      dualAuthGroupIDs: [...(doorInfo.dualAuthGroupIDs || existing.dualAuthGroupIDs || [])],
      apbZone: this._clonePlainObject(doorInfo.apbZone || existing.apbZone || {}),
      status: existing.status || 'locked',
      alarmFlags: Number(existing.alarmFlags ?? 0),
      lastOpenTime: Number(existing.lastOpenTime ?? this._unixTime()),
    };

    doorMap.set(record.doorID, record);
    return this.getDoorList(normalizedDeviceID).find((door) => door.doorID === record.doorID);
  }

  getDevice(deviceID) {
    const { device } = this._ensureDevice(deviceID);
    return this._clonePlainObject(device);
  }

  getDeviceList() {
    return Array.from(this.devices.values()).map((device) => ({
      ...this._clonePlainObject(device),
      status: this.connectionStatus.get(device.deviceID) || 'disconnected',
    }));
  }

  findDeviceByIP(ip) {
    for (const device of this.devices.values()) {
      if (device.ip === ip) {
        return this._clonePlainObject(device);
      }
    }

    return null;
  }

  connectDevice(deviceID) {
    const { deviceID: normalizedDeviceID, device } = this._ensureDevice(deviceID);
    this.connectionStatus.set(normalizedDeviceID, 'connected');
    this._notifyStatusChange(normalizedDeviceID, 1);
    this.logActivity(`[Connect] Device ${normalizedDeviceID} connected`, { device: device.name || device.ip });
    this.emitEventByCode(normalizedDeviceID, 18176, 0, '', { silent: true });
    this._emitChange('device-connected', { deviceID: normalizedDeviceID });
    return normalizedDeviceID;
  }

  connectByIP(ip, port, useSSL) {
    const device = Array.from(this.devices.values()).find((candidate) =>
      candidate.ip === ip && Number(candidate.port) === Number(port));

    if (!device) {
      return null;
    }

    const status = useSSL ? 2 : 1;
    this.connectionStatus.set(device.deviceID, 'connected');
    this._notifyStatusChange(device.deviceID, status);
    this.logActivity(`[Connect] ${ip}:${port} attached to device ${device.deviceID}`, { useSSL: !!useSSL });
    this.emitEventByCode(device.deviceID, 18176, 0, '', { silent: true });
    this._emitChange('device-connected', { deviceID: device.deviceID });
    return device.deviceID;
  }

  disconnectDevice(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.connectionStatus.set(normalizedDeviceID, 'disconnected');
    this._notifyStatusChange(normalizedDeviceID, 0);
    this.logActivity(`[Connect] Device ${normalizedDeviceID} disconnected`);
    this.emitEventByCode(normalizedDeviceID, 18177, 0, '', { silent: true });
    this._emitChange('device-disconnected', { deviceID: normalizedDeviceID });
  }

  disconnectAll() {
    for (const deviceID of this.devices.keys()) {
      this.connectionStatus.set(deviceID, 'disconnected');
      this._notifyStatusChange(deviceID, 0);
    }

    this.logActivity('[Connect] All devices disconnected');
    this._emitChange('all-disconnected');
  }

  isConnected(deviceID) {
    return this.connectionStatus.get(this._normalizeDeviceID(deviceID)) === 'connected';
  }

  setAcceptFilter(filter = {}) {
    this.acceptFilter = {
      allowAll: filter.allowAll !== false,
      deviceIDs: [...(filter.deviceIDs || [])].map((id) => Number(id)),
      IPAddrs: [...(filter.IPAddrs || [])],
      subnetMasks: [...(filter.subnetMasks || [])],
    };

    this.logActivity('[Connect] Accept filter updated', this.acceptFilter);
    this._emitChange('accept-filter');
  }

  getAcceptFilter() {
    return this._clonePlainObject(this.acceptFilter);
  }

  addStatusSubscriber(call) {
    this.statusSubscribers.add(call);

    const remove = () => {
      this.statusSubscribers.delete(call);
    };

    call.on('cancelled', remove);
    call.on('error', remove);
    call.on('close', remove);
  }

  _notifyStatusChange(deviceID, status) {
    const timestamp = this._unixTime();
    for (const subscriber of this.statusSubscribers) {
      try {
        subscriber.write({ deviceID, status, timestamp });
      } catch (_) {
        this.statusSubscribers.delete(subscriber);
      }
    }
  }

  addEventSubscriber(call) {
    const subscriber = {
      call,
      deviceIDs: [...(call.request?.deviceIDs || [])].map((id) => Number(id)),
      eventCodes: [...(call.request?.eventCodes || [])].map((code) => Number(code)),
    };

    this.eventSubscribers.add(subscriber);

    const remove = () => {
      this.eventSubscribers.delete(subscriber);
    };

    call.on('cancelled', remove);
    call.on('error', remove);
    call.on('close', remove);
  }

  _eventMatchesSubscriber(eventLog, subscriber) {
    if (subscriber.deviceIDs.length > 0 && !subscriber.deviceIDs.includes(Number(eventLog.deviceID))) {
      return false;
    }

    if (subscriber.eventCodes.length > 0 && !subscriber.eventCodes.includes(Number(eventLog.eventCode))) {
      return false;
    }

    return true;
  }

  _pushRealtimeEvent(eventLog) {
    for (const subscriber of this.eventSubscribers) {
      if (!this._eventMatchesSubscriber(eventLog, subscriber)) {
        continue;
      }

      try {
        subscriber.call.write(this._clonePlainObject(eventLog));
      } catch (_) {
        this.eventSubscribers.delete(subscriber);
      }
    }
  }

  listEventTypes() {
    return this.eventCatalog.entries.map((entry) => ({ ...entry }));
  }

  getEventDescription(eventCode, subCode = 0) {
    return this.eventCatalog.describe(eventCode, subCode);
  }

  getRandomEventDefinition() {
    const pool = [];
    for (const entry of this.eventCatalog.getAutoEventTypes()) {
      const weight = Math.max(1, Number(entry.weight || 1));
      for (let index = 0; index < weight; index += 1) {
        pool.push(entry);
      }
    }

    if (pool.length === 0) {
      return null;
    }

    return pool[Math.floor(Math.random() * pool.length)];
  }

  _createImageLog(eventLog) {
    return {
      ID: eventLog.ID,
      timestamp: eventLog.timestamp,
      deviceID: eventLog.deviceID,
      userID: eventLog.userID,
      eventCode: eventLog.eventCode,
      subCode: eventLog.subCode,
      JPGImage: this._createFakeTemplate(128),
    };
  }

  emitEventByDefinition(deviceID, eventDefinition, userID = '', options = {}) {
    if (!eventDefinition) {
      return null;
    }

    return this.emitEventByCode(
      deviceID,
      eventDefinition.eventCode,
      eventDefinition.subCode,
      userID,
      options
    );
  }

  emitEventByCode(deviceID, eventCode, subCode = 0, userID = '', options = {}) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const eventLog = {
      ID: this.nextEventID++,
      timestamp: this._unixTime(),
      deviceID: normalizedDeviceID,
      userID: userID ? String(userID) : '',
      entityID: Number(options.entityID || 0),
      eventCode: Number(eventCode),
      subCode: Number(subCode || 0),
      TNAKey: Number(options.TNAKey ?? getDefaultTNAKeyForEvent(eventCode)),
      hasImage: !!options.hasImage,
      changedOnDevice: !!options.changedOnDevice,
      temperature: Number(options.temperature || 0),
      cardData: options.cardData ? this._normalizeBytes(options.cardData) : undefined,
      inputInfo: options.inputInfo ? this._clonePlainObject(options.inputInfo) : undefined,
      alarmZoneInfo: options.alarmZoneInfo ? this._clonePlainObject(options.alarmZoneInfo) : undefined,
      interlockZoneInfo: options.interlockZoneInfo ? this._clonePlainObject(options.interlockZoneInfo) : undefined,
    };

    this.eventLogs.get(normalizedDeviceID).push(eventLog);
    if (eventLog.hasImage) {
      this.imageLogs.get(normalizedDeviceID).push(this._createImageLog(eventLog));
    }

    if (this.monitoring.get(normalizedDeviceID)) {
      this._pushRealtimeEvent(eventLog);
    }

    if (!options.silent) {
      this.logActivity(
        `[Event] ${this.getEventDescription(eventCode, subCode)} on device ${normalizedDeviceID}${userID ? ` for user ${userID}` : ''}`,
        {
          eventCode: Number(eventCode),
          subCode: Number(subCode || 0),
          eventType: classifyEventCode(eventCode),
        }
      );
    }

    this._emitChange('event', { deviceID: normalizedDeviceID, event: eventLog });
    return this._clonePlainObject(eventLog);
  }

  getEventLog(deviceID, startEventID = 0, maxNumOfLog = 1000) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return this.eventLogs
      .get(normalizedDeviceID)
      .filter((eventLog) => Number(eventLog.ID) >= Number(startEventID || 0))
      .slice(0, Number(maxNumOfLog || 1000))
      .map((eventLog) => this._clonePlainObject(eventLog));
  }

  getEventLogWithFilters(deviceID, startEventID = 0, maxNumOfLog = 1000, filters = []) {
    const events = this.getEventLog(deviceID, startEventID, maxNumOfLog * 4);
    if (!filters || filters.length === 0) {
      return events.slice(0, Number(maxNumOfLog || 1000));
    }

    const filtered = events.filter((eventLog) => filters.some((filter) => this._eventMatchesFilter(eventLog, filter)));
    return filtered.slice(0, Number(maxNumOfLog || 1000));
  }

  _eventMatchesFilter(eventLog, filter = {}) {
    if (filter.userID && String(filter.userID) !== String(eventLog.userID)) {
      return false;
    }

    if (filter.startTime && Number(eventLog.timestamp) < Number(filter.startTime)) {
      return false;
    }

    if (filter.endTime && Number(eventLog.timestamp) > Number(filter.endTime)) {
      return false;
    }

    if (filter.eventCode && Number(filter.eventCode) !== Number(eventLog.eventCode)) {
      return false;
    }

    if (filter.TNAKey !== undefined && Number(filter.TNAKey) !== Number(eventLog.TNAKey)) {
      return false;
    }

    return true;
  }

  getImageLog(deviceID, startEventID = 0, maxNumOfLog = 100) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return this.imageLogs
      .get(normalizedDeviceID)
      .filter((imageLog) => Number(imageLog.ID) >= Number(startEventID || 0))
      .slice(0, Number(maxNumOfLog || 100))
      .map((imageLog) => this._clonePlainObject(imageLog));
  }

  clearEventLog(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.eventLogs.set(normalizedDeviceID, []);
    this.imageLogs.set(normalizedDeviceID, []);
    this.logActivity(`[Event] Cleared logs on device ${normalizedDeviceID}`);
    this._emitChange('event-log-cleared', { deviceID: normalizedDeviceID });
  }

  setMonitoring(deviceID, enabled) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.monitoring.set(normalizedDeviceID, !!enabled);
    this.logActivity(`[Event] Monitoring ${enabled ? 'enabled' : 'disabled'} on device ${normalizedDeviceID}`);
    this._emitChange('monitoring', { deviceID: normalizedDeviceID, enabled: !!enabled });
  }

  getUserList(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return Array.from(this.users.get(normalizedDeviceID).values()).map((user) => ({
      ID: String(user.userID),
      numOfCard: user.cards.length,
      numOfFinger: user.fingers.length,
      numOfFace: user.faces.length,
      authGroupID: 0,
      updateMask: 0,
      userFlag: 0,
    }));
  }

  getUsers(deviceID, userIDs = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const users = this.users.get(normalizedDeviceID);
    const requested = (userIDs && userIDs.length > 0) ? userIDs.map(String) : Array.from(users.keys());
    return requested
      .map((userID) => users.get(String(userID)))
      .filter(Boolean)
      .map((record) => this._toUserInfo(record));
  }

  enrollUsers(deviceID, userInfos = [], overwrite = true) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const users = this.users.get(normalizedDeviceID);
    const results = [];

    for (const userInfo of userInfos) {
      const normalized = this._toUserRecord(userInfo);
      if (!normalized.userID) {
        continue;
      }

      if (!overwrite && users.has(normalized.userID)) {
        continue;
      }

      users.set(normalized.userID, normalized);
      results.push(this._toUserInfo(normalized));
      this.emitEventByCode(normalizedDeviceID, 20480, 0, normalized.userID, { silent: true });
      if (normalized.cards.length > 0) {
        this.emitEventByCode(normalizedDeviceID, 20992, 0, normalized.userID, { silent: true });
      }
      this.logActivity(`[User] Enrolled user ${normalized.userID} on device ${normalizedDeviceID}`);
    }

    this._emitChange('users-enrolled', { deviceID: normalizedDeviceID, count: results.length });
    return results;
  }

  updateUsers(deviceID, userInfos = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const users = this.users.get(normalizedDeviceID);
    const updated = [];

    for (const userInfo of userInfos) {
      const normalized = this._normalizeUserInfo(userInfo);
      const existing = users.get(normalized.userID);
      if (!existing) {
        continue;
      }

      if (normalized.name) existing.name = normalized.name;
      if (userInfo.cards) existing.cards = normalized.cards.map((card) => this._cloneCard(card));
      if (userInfo.fingers) existing.fingers = normalized.fingers.map((finger) => this._cloneFinger(finger));
      if (userInfo.faces) existing.faces = normalized.faces.map((face) => this._cloneFace(face));
      if (userInfo.accessGroupIDs) existing.accessGroupIDs = [...normalized.accessGroupIDs];
      if (userInfo.jobCodes) existing.jobCodes = normalized.jobCodes.map((jobCode) => this._clonePlainObject(jobCode));
      if (userInfo.setting) existing.setting = this._clonePlainObject(normalized.setting);
      if (userInfo.PIN || userInfo.pin) existing.pin = Buffer.from(normalized.pin);
      if (userInfo.photo) existing.photo = Buffer.from(normalized.photo);

      updated.push(this._toUserInfo(existing));
      this.emitEventByCode(normalizedDeviceID, 20482, 0, normalized.userID, { silent: true });
      this.logActivity(`[User] Updated user ${normalized.userID} on device ${normalizedDeviceID}`);
    }

    this._emitChange('users-updated', { deviceID: normalizedDeviceID, count: updated.length });
    return updated;
  }

  deleteUsers(deviceID, userIDs = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const users = this.users.get(normalizedDeviceID);
    let deletedCount = 0;

    for (const userID of userIDs.map(String)) {
      if (users.delete(userID)) {
        deletedCount += 1;
        this.emitEventByCode(normalizedDeviceID, 20481, 0, userID, { silent: true });
        this.logActivity(`[User] Deleted user ${userID} from device ${normalizedDeviceID}`);
      }
    }

    this._emitChange('users-deleted', { deviceID: normalizedDeviceID, count: deletedCount });
    return deletedCount;
  }

  deleteAllUsers(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const users = this.users.get(normalizedDeviceID);
    const count = users.size;
    users.clear();
    this.logActivity(`[User] Deleted all users from device ${normalizedDeviceID}`, { count });
    this._emitChange('users-cleared', { deviceID: normalizedDeviceID, count });
    return count;
  }

  getUserCards(deviceID, userIDs = []) {
    return this.getUsers(deviceID, userIDs).map((user) => ({
      userID: user.hdr.ID,
      cards: user.cards.map((card) => this._cloneCard(card)),
    }));
  }

  setUserCards(deviceID, userCards = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const users = this.users.get(normalizedDeviceID);
    let updatedCount = 0;

    for (const userCard of userCards) {
      const userID = String(userCard.userID || userCard.userid || '');
      if (!userID) {
        continue;
      }

      if (!users.has(userID)) {
        users.set(userID, this._toUserRecord({ userID, name: '', cards: [] }));
      }

      const user = users.get(userID);
      user.cards = (userCard.cards || []).map((card) => this._normalizeCard(card));
      updatedCount += 1;

      this.emitEventByCode(
        normalizedDeviceID,
        user.cards.length > 0 ? 20992 : 20993,
        0,
        userID,
        { silent: true }
      );

      this.logActivity(
        `[Card] Set ${user.cards.length} card(s) for user ${userID} on device ${normalizedDeviceID}`
      );
    }

    this._emitChange('cards-updated', { deviceID: normalizedDeviceID, count: updatedCount });
    return updatedCount;
  }

  getUserFingers(deviceID, userIDs = []) {
    return this.getUsers(deviceID, userIDs).map((user) => ({
      userID: user.hdr.ID,
      fingers: user.fingers.map((finger) => this._cloneFinger(finger)),
    }));
  }

  setUserFingers(deviceID, userFingers = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const users = this.users.get(normalizedDeviceID);
    let updatedCount = 0;

    for (const userFinger of userFingers) {
      const userID = String(userFinger.userID || userFinger.userid || '');
      if (!userID || !users.has(userID)) {
        continue;
      }

      users.get(userID).fingers = (userFinger.fingers || []).map((finger) => this._cloneFinger(finger));
      updatedCount += 1;
      this.logActivity(`[Finger] Set ${users.get(userID).fingers.length} finger(s) for user ${userID} on device ${normalizedDeviceID}`);
    }

    this._emitChange('fingers-updated', { deviceID: normalizedDeviceID, count: updatedCount });
    return updatedCount;
  }

  getUserFaces(deviceID, userIDs = []) {
    return this.getUsers(deviceID, userIDs).map((user) => ({
      userID: user.hdr.ID,
      faces: user.faces.map((face) => this._cloneFace(face)),
    }));
  }

  setUserFaces(deviceID, userFaces = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const users = this.users.get(normalizedDeviceID);
    let updatedCount = 0;

    for (const userFace of userFaces) {
      const userID = String(userFace.userID || userFace.userid || '');
      if (!userID || !users.has(userID)) {
        continue;
      }

      users.get(userID).faces = (userFace.faces || []).map((face) => this._cloneFace(face));
      updatedCount += 1;
      this.logActivity(`[Face] Set ${users.get(userID).faces.length} face(s) for user ${userID} on device ${normalizedDeviceID}`);
    }

    this._emitChange('faces-updated', { deviceID: normalizedDeviceID, count: updatedCount });
    return updatedCount;
  }

  getUserAccessGroups(deviceID, userIDs = []) {
    return this.getUsers(deviceID, userIDs).map((user) => ({
      userID: user.hdr.ID,
      accessGroupIDs: [...(user.accessGroupIDs || [])],
    }));
  }

  setUserAccessGroups(deviceID, userAccessGroups = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const users = this.users.get(normalizedDeviceID);

    for (const group of userAccessGroups) {
      const userID = String(group.userID || group.userid || '');
      if (!userID || !users.has(userID)) {
        continue;
      }

      users.get(userID).accessGroupIDs = [...(group.accessGroupIDs || [])].map((id) => Number(id));
      this.logActivity(`[Access] Updated access groups for user ${userID} on device ${normalizedDeviceID}`);
    }

    this._emitChange('user-access-groups', { deviceID: normalizedDeviceID });
  }

  getUserJobCodes(deviceID, userIDs = []) {
    return this.getUsers(deviceID, userIDs).map((user) => ({
      userID: user.hdr.ID,
      jobCodes: user.jobCodes.map((jobCode) => this._clonePlainObject(jobCode)),
    }));
  }

  setUserJobCodes(deviceID, userJobCodes = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const users = this.users.get(normalizedDeviceID);

    for (const jobCodeEntry of userJobCodes) {
      const userID = String(jobCodeEntry.userID || jobCodeEntry.userid || '');
      if (!userID || !users.has(userID)) {
        continue;
      }

      users.get(userID).jobCodes = (jobCodeEntry.jobCodes || []).map((jobCode) => this._clonePlainObject(jobCode));
      this.logActivity(`[User] Updated job codes for user ${userID} on device ${normalizedDeviceID}`);
    }

    this._emitChange('job-codes', { deviceID: normalizedDeviceID });
  }

  getUserStatistics(deviceID) {
    const users = this.getUsers(deviceID);
    return {
      numOfUsers: users.length,
      numOfCards: users.reduce((sum, user) => sum + user.cards.length, 0),
      numOfFingerprints: users.reduce((sum, user) => sum + user.fingers.length, 0),
      numOfFaces: users.reduce((sum, user) => sum + user.faces.length, 0),
      numOfNames: users.filter((user) => !!user.name).length,
      numOfImages: users.filter((user) => user.photo && user.photo.length > 0).length,
      numOfPhrases: 0,
    };
  }

  getNextScanCard(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const queued = this.cardScanQueue.get(normalizedDeviceID);
    if (queued && queued.length > 0) {
      const nextCard = queued.shift();
      if (queued.length === 0) {
        this.cardScanQueue.delete(normalizedDeviceID);
      }
      return this._cloneCard(nextCard);
    }

    const mockCards = this.config.cards?.mockCards || [];
    if (mockCards.length === 0) {
      return this._normalizeCard(Buffer.from('0000000000000000', 'hex'));
    }

    const index = (this.cardScanIndex.get(normalizedDeviceID) || 0) % mockCards.length;
    this.cardScanIndex.set(normalizedDeviceID, index + 1);
    return this._normalizeCard(mockCards[index]);
  }

  queueScanCard(deviceID, cardData) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const queue = this.cardScanQueue.get(normalizedDeviceID) || [];
    queue.push(this._normalizeCard(cardData));
    this.cardScanQueue.set(normalizedDeviceID, queue);
    this.logActivity(`[Card] Queued scan card for device ${normalizedDeviceID}`);
    this._emitChange('scan-card-queued', { deviceID: normalizedDeviceID, queued: queue.length });
  }

  getBlacklist(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return Array.from(this.blacklists.get(normalizedDeviceID).values()).map((item) => ({
      cardID: this._normalizeBytes(item.cardID),
      issueCount: Number(item.issueCount || 0),
    }));
  }

  addBlacklist(deviceID, cardInfos = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const blacklist = this.blacklists.get(normalizedDeviceID);

    for (const cardInfo of cardInfos) {
      const cardID = this._normalizeBytes(cardInfo.cardID || cardInfo.cardId || []);
      const key = cardID.toString('hex').toUpperCase();
      blacklist.set(key, {
        cardID,
        issueCount: Number(cardInfo.issueCount || 0),
      });
    }

    this.logActivity(`[Card] Added ${cardInfos.length} blacklist item(s) on device ${normalizedDeviceID}`);
    this._emitChange('blacklist-updated', { deviceID: normalizedDeviceID });
  }

  deleteBlacklist(deviceID, cardInfos = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const blacklist = this.blacklists.get(normalizedDeviceID);

    for (const cardInfo of cardInfos) {
      const cardID = this._normalizeBytes(cardInfo.cardID || cardInfo.cardId || []);
      blacklist.delete(cardID.toString('hex').toUpperCase());
    }

    this.logActivity(`[Card] Removed ${cardInfos.length} blacklist item(s) on device ${normalizedDeviceID}`);
    this._emitChange('blacklist-updated', { deviceID: normalizedDeviceID });
  }

  clearBlacklist(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.blacklists.get(normalizedDeviceID).clear();
    this.logActivity(`[Card] Cleared blacklist on device ${normalizedDeviceID}`);
    this._emitChange('blacklist-cleared', { deviceID: normalizedDeviceID });
  }

  getCardConfig(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return this._clonePlainObject(this.cardConfigs.get(normalizedDeviceID));
  }

  setCardConfig(deviceID, config) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.cardConfigs.set(normalizedDeviceID, {
      ...this._createCardConfig(),
      ...this._clonePlainObject(config || {}),
    });
    this.logActivity(`[Card] Updated card config on device ${normalizedDeviceID}`);
    this._emitChange('card-config', { deviceID: normalizedDeviceID });
  }

  getQRConfig(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return this._clonePlainObject(this.qrConfigs.get(normalizedDeviceID));
  }

  setQRConfig(deviceID, config) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.qrConfigs.set(normalizedDeviceID, {
      ...this._createQRConfig(),
      ...this._clonePlainObject(config || {}),
    });
    this.logActivity(`[Card] Updated QR config on device ${normalizedDeviceID}`);
    this._emitChange('qr-config', { deviceID: normalizedDeviceID });
  }

  getCard1XConfig(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return this._clonePlainObject(this.card1XConfigs.get(normalizedDeviceID));
  }

  setCard1XConfig(deviceID, config) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.card1XConfigs.set(normalizedDeviceID, this._clonePlainObject(config || {}));
    this._emitChange('card-1x-config', { deviceID: normalizedDeviceID });
  }

  getCustomConfig(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return this._clonePlainObject(this.customConfigs.get(normalizedDeviceID));
  }

  setCustomConfig(deviceID, config) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.customConfigs.set(normalizedDeviceID, this._clonePlainObject(config || {}));
    this._emitChange('custom-config', { deviceID: normalizedDeviceID });
  }

  getFacilityCodeConfig(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return this._clonePlainObject(this.facilityCodeConfigs.get(normalizedDeviceID));
  }

  setFacilityCodeConfig(deviceID, config) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.facilityCodeConfigs.set(normalizedDeviceID, this._clonePlainObject(config || { facilityCodes: [] }));
    this._emitChange('facility-code-config', { deviceID: normalizedDeviceID });
  }

  getDoorList(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return Array.from(this.doors.get(normalizedDeviceID).values()).map((door) => ({
      doorID: Number(door.doorID),
      name: door.name,
      entryDeviceID: Number(door.entryDeviceID),
      exitDeviceID: Number(door.exitDeviceID),
      relay: this._clonePlainObject(door.relay),
      sensor: this._clonePlainObject(door.sensor),
      button: this._clonePlainObject(door.button),
      autoLockTimeout: Number(door.autoLockTimeout),
      heldOpenTimeout: Number(door.heldOpenTimeout),
      instantLock: !!door.instantLock,
      unlockFlags: Number(door.unlockFlags),
      lockFlags: Number(door.lockFlags),
      unconditionalLock: !!door.unconditionalLock,
      forcedOpenActions: this._clonePlainObject(door.forcedOpenActions || []),
      heldOpenActions: this._clonePlainObject(door.heldOpenActions || []),
      dualAuthScheduleID: Number(door.dualAuthScheduleID || 0),
      dualAuthDevice: Number(door.dualAuthDevice || 0),
      dualAuthType: Number(door.dualAuthType || 0),
      dualAuthTimeout: Number(door.dualAuthTimeout || 15),
      dualAuthGroupIDs: [...(door.dualAuthGroupIDs || [])],
      apbZone: this._clonePlainObject(door.apbZone || {}),
    }));
  }

  getDoorStatus(deviceID, doorIDs = null) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const requested = doorIDs && doorIDs.length > 0
      ? new Set(doorIDs.map((doorID) => Number(doorID)))
      : null;

    return Array.from(this.doors.get(normalizedDeviceID).values())
      .filter((door) => !requested || requested.has(Number(door.doorID)))
      .map((door) => ({
        doorID: Number(door.doorID),
        isOpen: door.status === 'unlocked',
        isUnlocked: door.status === 'unlocked' || door.status === 'released',
        heldOpen: !!(door.alarmFlags & 0x02),
        unlockFlags: door.status === 'unlocked' ? 4 : 0,
        lockFlags: door.status === 'locked' ? 1 : 0,
        alarmFlags: Number(door.alarmFlags || 0),
        lastOpenTime: Number(door.lastOpenTime || this._unixTime()),
      }));
  }

  addDoors(deviceID, doors = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const added = doors.map((door) => this._upsertDoorRecord(normalizedDeviceID, door));
    this.logActivity(`[Door] Added ${added.length} door(s) on device ${normalizedDeviceID}`);
    this._emitChange('doors-added', { deviceID: normalizedDeviceID, count: added.length });
    return added;
  }

  deleteDoors(deviceID, doorIDs = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const doorMap = this.doors.get(normalizedDeviceID);
    let deletedCount = 0;

    for (const doorID of doorIDs.map((value) => Number(value))) {
      if (doorMap.delete(doorID)) {
        deletedCount += 1;
      }
    }

    this.logActivity(`[Door] Deleted ${deletedCount} door(s) on device ${normalizedDeviceID}`);
    this._emitChange('doors-deleted', { deviceID: normalizedDeviceID, count: deletedCount });
    return deletedCount;
  }

  deleteAllDoors(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const count = this.doors.get(normalizedDeviceID).size;
    this.doors.get(normalizedDeviceID).clear();
    this.logActivity(`[Door] Deleted all doors on device ${normalizedDeviceID}`);
    this._emitChange('doors-cleared', { deviceID: normalizedDeviceID, count });
    return count;
  }

  _setDoorState(deviceID, doorIDs, status, eventCode, extra = {}) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const doorMap = this.doors.get(normalizedDeviceID);

    for (const doorID of doorIDs.map((value) => Number(value))) {
      const door = doorMap.get(doorID);
      if (!door) {
        continue;
      }

      door.status = status;
      if (status === 'unlocked') {
        door.lastOpenTime = this._unixTime();
      }
      if (extra.alarmFlags !== undefined) {
        door.alarmFlags = Number(extra.alarmFlags);
      }

      this.emitEventByCode(normalizedDeviceID, eventCode, 0, '', {
        entityID: doorID,
        silent: true,
      });
    }

    this._emitChange('door-status', { deviceID: normalizedDeviceID, status });
  }

  lockDoors(deviceID, doorIDs = []) {
    this._setDoorState(deviceID, doorIDs, 'locked', 8194);
    this.logActivity(`[Door] Locked door(s) ${doorIDs.join(', ')} on device ${deviceID}`);
  }

  unlockDoors(deviceID, doorIDs = []) {
    this._setDoorState(deviceID, doorIDs, 'unlocked', 8195);
    this.logActivity(`[Door] Unlocked door(s) ${doorIDs.join(', ')} on device ${deviceID}`);
  }

  releaseDoors(deviceID, doorIDs = []) {
    this._setDoorState(deviceID, doorIDs, 'released', 8200);
    this.logActivity(`[Door] Released door(s) ${doorIDs.join(', ')} on device ${deviceID}`);
  }

  setDoorAlarm(deviceID, doorIDs = [], alarmFlag = 0) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const doorMap = this.doors.get(normalizedDeviceID);

    for (const doorID of doorIDs.map((value) => Number(value))) {
      const door = doorMap.get(doorID);
      if (!door) {
        continue;
      }
      door.alarmFlags = Number(alarmFlag);
    }

    this.logActivity(`[Door] Set alarm flag ${alarmFlag} on door(s) ${doorIDs.join(', ')} for device ${normalizedDeviceID}`);
    this._emitChange('door-alarm', { deviceID: normalizedDeviceID });
  }

  getAccessGroups(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return Array.from(this.accessGroups.get(normalizedDeviceID).values()).map((group) => this._clonePlainObject(group));
  }

  addAccessGroups(deviceID, groups = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const groupMap = this.accessGroups.get(normalizedDeviceID);
    for (const group of groups) {
      groupMap.set(Number(group.ID), this._clonePlainObject(group));
    }
    this.logActivity(`[Access] Added ${groups.length} access group(s) on device ${normalizedDeviceID}`);
    this._emitChange('access-groups', { deviceID: normalizedDeviceID });
  }

  deleteAccessGroups(deviceID, groupIDs = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const groupMap = this.accessGroups.get(normalizedDeviceID);
    for (const groupID of groupIDs.map((value) => Number(value))) {
      groupMap.delete(groupID);
    }
    this.logActivity(`[Access] Deleted ${groupIDs.length} access group(s) on device ${normalizedDeviceID}`);
    this._emitChange('access-groups', { deviceID: normalizedDeviceID });
  }

  clearAccessGroups(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.accessGroups.get(normalizedDeviceID).clear();
    this._emitChange('access-groups', { deviceID: normalizedDeviceID });
  }

  getAccessLevels(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return Array.from(this.accessLevels.get(normalizedDeviceID).values()).map((level) => this._clonePlainObject(level));
  }

  addAccessLevels(deviceID, levels = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const levelMap = this.accessLevels.get(normalizedDeviceID);
    for (const level of levels) {
      levelMap.set(Number(level.ID), this._clonePlainObject(level));
    }
    this.logActivity(`[Access] Added ${levels.length} access level(s) on device ${normalizedDeviceID}`);
    this._emitChange('access-levels', { deviceID: normalizedDeviceID });
  }

  deleteAccessLevels(deviceID, levelIDs = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const levelMap = this.accessLevels.get(normalizedDeviceID);
    for (const levelID of levelIDs.map((value) => Number(value))) {
      levelMap.delete(levelID);
    }
    this.logActivity(`[Access] Deleted ${levelIDs.length} access level(s) on device ${normalizedDeviceID}`);
    this._emitChange('access-levels', { deviceID: normalizedDeviceID });
  }

  clearAccessLevels(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.accessLevels.get(normalizedDeviceID).clear();
    this._emitChange('access-levels', { deviceID: normalizedDeviceID });
  }

  getFloorLevels(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return Array.from(this.floorLevels.get(normalizedDeviceID).values()).map((level) => this._clonePlainObject(level));
  }

  addFloorLevels(deviceID, levels = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const levelMap = this.floorLevels.get(normalizedDeviceID);
    for (const level of levels) {
      levelMap.set(Number(level.ID), this._clonePlainObject(level));
    }
    this._emitChange('floor-levels', { deviceID: normalizedDeviceID });
  }

  deleteFloorLevels(deviceID, levelIDs = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const levelMap = this.floorLevels.get(normalizedDeviceID);
    for (const levelID of levelIDs.map((value) => Number(value))) {
      levelMap.delete(levelID);
    }
    this._emitChange('floor-levels', { deviceID: normalizedDeviceID });
  }

  clearFloorLevels(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.floorLevels.get(normalizedDeviceID).clear();
    this._emitChange('floor-levels', { deviceID: normalizedDeviceID });
  }

  getSchedules(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return Array.from(this.schedules.get(normalizedDeviceID).values()).map((schedule) => this._clonePlainObject(schedule));
  }

  addSchedules(deviceID, schedules = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const scheduleMap = this.schedules.get(normalizedDeviceID);
    for (const schedule of schedules) {
      scheduleMap.set(Number(schedule.ID), this._clonePlainObject(schedule));
    }
    this.logActivity(`[Schedule] Added ${schedules.length} schedule(s) on device ${normalizedDeviceID}`);
    this._emitChange('schedules', { deviceID: normalizedDeviceID });
  }

  deleteSchedules(deviceID, scheduleIDs = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const scheduleMap = this.schedules.get(normalizedDeviceID);
    for (const scheduleID of scheduleIDs.map((value) => Number(value))) {
      scheduleMap.delete(scheduleID);
    }
    this.logActivity(`[Schedule] Deleted ${scheduleIDs.length} schedule(s) on device ${normalizedDeviceID}`);
    this._emitChange('schedules', { deviceID: normalizedDeviceID });
  }

  clearSchedules(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.schedules.get(normalizedDeviceID).clear();
    this._emitChange('schedules', { deviceID: normalizedDeviceID });
  }

  getHolidayGroups(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return Array.from(this.holidayGroups.get(normalizedDeviceID).values()).map((group) => this._clonePlainObject(group));
  }

  addHolidayGroups(deviceID, groups = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const holidayMap = this.holidayGroups.get(normalizedDeviceID);
    for (const group of groups) {
      holidayMap.set(Number(group.ID), this._clonePlainObject(group));
    }
    this._emitChange('holiday-groups', { deviceID: normalizedDeviceID });
  }

  deleteHolidayGroups(deviceID, groupIDs = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const holidayMap = this.holidayGroups.get(normalizedDeviceID);
    for (const groupID of groupIDs.map((value) => Number(value))) {
      holidayMap.delete(groupID);
    }
    this._emitChange('holiday-groups', { deviceID: normalizedDeviceID });
  }

  clearHolidayGroups(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.holidayGroups.get(normalizedDeviceID).clear();
    this._emitChange('holiday-groups', { deviceID: normalizedDeviceID });
  }

  getFaceAuthGroups(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return Array.from(this.faceAuthGroups.get(normalizedDeviceID).values()).map((group) => this._clonePlainObject(group));
  }

  addFaceAuthGroups(deviceID, groups = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const groupMap = this.faceAuthGroups.get(normalizedDeviceID);
    for (const group of groups) {
      groupMap.set(Number(group.ID), this._clonePlainObject(group));
    }
    this._emitChange('face-auth-groups', { deviceID: normalizedDeviceID });
  }

  deleteFaceAuthGroups(deviceID, groupIDs = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const groupMap = this.faceAuthGroups.get(normalizedDeviceID);
    for (const groupID of groupIDs.map((value) => Number(value))) {
      groupMap.delete(groupID);
    }
    this._emitChange('face-auth-groups', { deviceID: normalizedDeviceID });
  }

  clearFaceAuthGroups(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.faceAuthGroups.get(normalizedDeviceID).clear();
    this._emitChange('face-auth-groups', { deviceID: normalizedDeviceID });
  }

  getAuthConfig(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return this._clonePlainObject(this.authConfigs.get(normalizedDeviceID));
  }

  setAuthConfig(deviceID, config) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.authConfigs.set(normalizedDeviceID, {
      ...this._createAuthConfig(),
      ...this._clonePlainObject(config || {}),
    });
    this.logActivity(`[Auth] Updated auth config on device ${normalizedDeviceID}`);
    this._emitChange('auth-config', { deviceID: normalizedDeviceID });
  }

  getTNAConfig(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return this._clonePlainObject(this.tnaConfigs.get(normalizedDeviceID));
  }

  setTNAConfig(deviceID, config) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.tnaConfigs.set(normalizedDeviceID, {
      ...this._createTNAConfig(),
      ...this._clonePlainObject(config || {}),
    });
    this._emitChange('tna-config', { deviceID: normalizedDeviceID });
  }

  getTNALogs(deviceID, startEventID = 0, maxNumOfLog = 1000, filter = null) {
    const logs = this.getEventLog(deviceID, startEventID, maxNumOfLog * 4)
      .filter((eventLog) => classifyEventCode(eventLog.eventCode) === 'attendance')
      .map((eventLog) => ({
        ID: eventLog.ID,
        timestamp: eventLog.timestamp,
        deviceID: eventLog.deviceID,
        userID: eventLog.userID,
        eventCode: eventLog.eventCode,
        subCode: eventLog.subCode,
        TNAKey: eventLog.TNAKey || getDefaultTNAKeyForEvent(eventLog.eventCode),
      }));

    if (!filter) {
      return logs.slice(0, Number(maxNumOfLog || 1000));
    }

    return logs
      .filter((log) => {
        if (filter.startTime && Number(log.timestamp) < Number(filter.startTime)) return false;
        if (filter.endTime && Number(log.timestamp) > Number(filter.endTime)) return false;
        if (filter.userIDs && filter.userIDs.length > 0 && !filter.userIDs.includes(log.userID)) return false;
        if (filter.TNAKeys && filter.TNAKeys.length > 0 && !filter.TNAKeys.includes(log.TNAKey)) return false;
        return true;
      })
      .slice(0, Number(maxNumOfLog || 1000));
  }

  getJobCodeLogs(deviceID, startEventID = 0, maxNumOfLog = 1000) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const users = this.users.get(normalizedDeviceID);

    return this.getEventLog(normalizedDeviceID, startEventID, maxNumOfLog * 4)
      .filter((eventLog) => classifyEventCode(eventLog.eventCode) === 'attendance')
      .slice(0, Number(maxNumOfLog || 1000))
      .map((eventLog) => ({
        ID: eventLog.ID,
        timestamp: eventLog.timestamp,
        deviceID: eventLog.deviceID,
        userID: eventLog.userID,
        eventCode: eventLog.eventCode,
        subCode: eventLog.subCode,
        jobCode: Number(users.get(eventLog.userID)?.jobCodes?.[0]?.code || 0),
      }));
  }

  getDeviceTime(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return Number(this.timeValues.get(normalizedDeviceID) || this._unixTime());
  }

  setDeviceTime(deviceID, gmtTime) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    const timeValue = Number(gmtTime || this._unixTime());
    this.timeValues.set(normalizedDeviceID, timeValue);
    this.emitEventByCode(normalizedDeviceID, 16643, 0, '', { silent: true });
    this.logActivity(`[Time] Set device ${normalizedDeviceID} time to ${timeValue}`);
    this._emitChange('time', { deviceID: normalizedDeviceID });
    return timeValue;
  }

  getTimeConfig(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return this._clonePlainObject(this.timeConfigs.get(normalizedDeviceID));
  }

  setTimeConfig(deviceID, config) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.timeConfigs.set(normalizedDeviceID, {
      ...this._createTimeConfig(),
      ...this._clonePlainObject(config || {}),
    });
    this.logActivity(`[Time] Updated time config on device ${normalizedDeviceID}`);
    this._emitChange('time-config', { deviceID: normalizedDeviceID });
  }

  getDSTConfig(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return this._clonePlainObject(this.dstConfigs.get(normalizedDeviceID) || { schedules: [] });
  }

  setDSTConfig(deviceID, config) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.dstConfigs.set(normalizedDeviceID, this._clonePlainObject(config || { schedules: [] }));
    this._emitChange('dst-config', { deviceID: normalizedDeviceID });
  }

  setImageFilters(deviceID, filters = []) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    this.imageFilters.set(normalizedDeviceID, filters.map((filter) => this._clonePlainObject(filter)));
    this._emitChange('image-filters', { deviceID: normalizedDeviceID });
  }

  getImageFilters(deviceID) {
    const { deviceID: normalizedDeviceID } = this._ensureDevice(deviceID);
    return this._clonePlainObject(this.imageFilters.get(normalizedDeviceID) || []);
  }
}

module.exports = DeviceState;
