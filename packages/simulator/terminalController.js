const readline = require('readline');

class SimulatorTerminalController {
  constructor(state, options = {}) {
    this.state = state;
    this.options = options;
    this.panel = 'devices';
    this.selectedDeviceIndex = 0;
    this.selectedUserIndex = 0;
    this.selectedDoorIndex = 0;
    this.selectedEventIndex = 0;
    this.showHelp = true;
    this.promptActive = false;
    this.started = false;
    this.boundKeypress = this.handleKeypress.bind(this);
    this.boundRender = this.render.bind(this);
  }

  start() {
    if (this.started || !process.stdin.isTTY || !process.stdout.isTTY) {
      return false;
    }

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('keypress', this.boundKeypress);
    this.state.on('changed', this.boundRender);
    this.started = true;
    this.render();
    return true;
  }

  stop() {
    if (!this.started) {
      return;
    }

    process.stdin.off('keypress', this.boundKeypress);
    this.state.off('changed', this.boundRender);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }
    this.started = false;
  }

  getDevices() {
    return this.state.getDeviceList();
  }

  getSelectedDevice() {
    const devices = this.getDevices();
    if (devices.length === 0) {
      return null;
    }

    this.selectedDeviceIndex = Math.max(0, Math.min(this.selectedDeviceIndex, devices.length - 1));
    return devices[this.selectedDeviceIndex];
  }

  getSelectedDeviceID() {
    return this.getSelectedDevice()?.deviceID || null;
  }

  getDoorsForSelectedDevice() {
    const deviceID = this.getSelectedDeviceID();
    if (!deviceID) {
      return [];
    }

    return this.state.getDoorStatus(deviceID);
  }

  getSelectedDoor() {
    const doors = this.getDoorsForSelectedDevice();
    if (doors.length === 0) {
      this.selectedDoorIndex = 0;
      return null;
    }

    this.selectedDoorIndex = Math.max(0, Math.min(this.selectedDoorIndex, doors.length - 1));
    return doors[this.selectedDoorIndex];
  }

  getUsersForSelectedDevice() {
    const deviceID = this.getSelectedDeviceID();
    if (!deviceID) {
      return [];
    }

    return this.state.getUsers(deviceID);
  }

  getSelectedUser() {
    const users = this.getUsersForSelectedDevice();
    if (users.length === 0) {
      this.selectedUserIndex = 0;
      return null;
    }

    this.selectedUserIndex = Math.max(0, Math.min(this.selectedUserIndex, users.length - 1));
    return users[this.selectedUserIndex];
  }

  getEventTypes() {
    return this.state.listEventTypes();
  }

  clearScreen() {
    process.stdout.write('\x1b[2J\x1b[H');
  }

  render() {
    if (!this.started || this.promptActive) {
      return;
    }

    const devices = this.getDevices();
    const selectedDevice = this.getSelectedDevice();
    const selectedUser = this.getSelectedUser();
    const selectedDoor = this.getSelectedDoor();
    const eventTypes = this.getEventTypes();
    const selectedEvent = eventTypes[Math.max(0, Math.min(this.selectedEventIndex, Math.max(eventTypes.length - 1, 0)))] || null;
    const autoEventsEnabled = this.options.getAutoEventsEnabled ? this.options.getAutoEventsEnabled() : null;

    const lines = [];
    lines.push('Suprema Simulator');
    lines.push(`Panel: ${this.panel} | Devices: ${devices.length} | Auto events: ${autoEventsEnabled === null ? 'n/a' : autoEventsEnabled ? 'on' : 'off'}`);
    lines.push('');
    lines.push('Devices');
    for (let index = 0; index < devices.length; index += 1) {
      const device = devices[index];
      const marker = index === this.selectedDeviceIndex ? '>' : ' ';
      const monitor = this.state.monitoring.get(device.deviceID) ? 'mon' : 'off';
      const users = this.state.getUserList(device.deviceID).length;
      lines.push(`${marker} ${device.deviceID} ${device.name || device.model || device.ip} [${device.status}] users=${users} ${monitor}`);
    }

    lines.push('');
    lines.push(`Selected device: ${selectedDevice ? `${selectedDevice.deviceID} ${selectedDevice.name || selectedDevice.ip}` : 'none'}`);

    if (this.panel === 'users') {
      const users = this.getUsersForSelectedDevice();
      lines.push('Users');
      for (let index = 0; index < users.length; index += 1) {
        const user = users[index];
        const marker = index === this.selectedUserIndex ? '>' : ' ';
        lines.push(`${marker} ${user.hdr.ID} ${user.name || '-'} cards=${user.cards.length} fingers=${user.fingers.length} faces=${user.faces.length}`);
      }
    } else if (this.panel === 'events') {
      lines.push(`Event types${selectedUser ? ` | user=${selectedUser.hdr.ID}` : ''}`);
      const start = Math.max(0, this.selectedEventIndex - 5);
      const end = Math.min(eventTypes.length, start + 10);
      for (let index = start; index < end; index += 1) {
        const eventType = eventTypes[index];
        const marker = index === this.selectedEventIndex ? '>' : ' ';
        lines.push(`${marker} 0x${eventType.eventCode.toString(16).toUpperCase()} ${eventType.desc}`);
      }
    } else if (this.panel === 'doors') {
      const doorStatuses = selectedDevice ? this.getDoorsForSelectedDevice() : [];
      lines.push('Doors');
      for (let index = 0; index < doorStatuses.length; index += 1) {
        const status = doorStatuses[index];
        const marker = index === this.selectedDoorIndex ? '>' : ' ';
        lines.push(`${marker} door ${status.doorID} unlocked=${status.isUnlocked} open=${status.isOpen} alarm=${status.alarmFlags}`);
      }
      lines.push(`Selected door: ${selectedDoor ? selectedDoor.doorID : 'none'}`);
    } else {
      const recent = this.state.activityLog.slice(-10);
      lines.push('Activity');
      for (const entry of recent) {
        lines.push(`- ${entry.timestamp.slice(11, 19)} ${entry.message}`);
      }
    }

    if (this.showHelp) {
      lines.push('');
      lines.push('Keys');
      lines.push('tab panel | up/down move | enter toggle device / emit event');
      lines.push('a add user | x delete user | c set/clear card | f add finger | v add face');
      lines.push('m toggle monitoring | o unlock | l lock | r release | s queue scan card');
      lines.push('e emit selected event | g toggle auto events | t sync device time | h help | q quit');
    }

    this.clearScreen();
    process.stdout.write(`${lines.join('\n')}\n`);
  }

  moveSelection(delta) {
    if (this.panel === 'events') {
      const maxIndex = Math.max(0, this.getEventTypes().length - 1);
      this.selectedEventIndex = Math.max(0, Math.min(this.selectedEventIndex + delta, maxIndex));
      return;
    }

    if (this.panel === 'users') {
      const maxIndex = Math.max(0, this.getUsersForSelectedDevice().length - 1);
      this.selectedUserIndex = Math.max(0, Math.min(this.selectedUserIndex + delta, maxIndex));
      return;
    }

    if (this.panel === 'doors') {
      const maxIndex = Math.max(0, this.getDoorsForSelectedDevice().length - 1);
      this.selectedDoorIndex = Math.max(0, Math.min(this.selectedDoorIndex + delta, maxIndex));
      return;
    }

    const maxIndex = Math.max(0, this.getDevices().length - 1);
    this.selectedDeviceIndex = Math.max(0, Math.min(this.selectedDeviceIndex + delta, maxIndex));
    this.selectedUserIndex = 0;
    this.selectedDoorIndex = 0;
  }

  async prompt(label, defaultValue = '') {
    this.promptActive = true;
    this.render();

    process.stdin.off('keypress', this.boundKeypress);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const question = defaultValue ? `${label} [${defaultValue}]: ` : `${label}: `;
    const answer = await new Promise((resolve) => rl.question(question, resolve));
    rl.close();

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    process.stdin.on('keypress', this.boundKeypress);
    this.promptActive = false;
    this.render();

    return answer.trim() || defaultValue;
  }

  async addUser() {
    const deviceID = this.getSelectedDeviceID();
    if (!deviceID) {
      return;
    }

    const userID = await this.prompt('User ID', `${Date.now().toString().slice(-5)}`);
    const name = await this.prompt('Name', `User ${userID}`);
    const cardHex = await this.prompt('Card hex (optional)', '');
    const cards = this.buildCardsFromHex(cardHex);
    stateSafe(() => this.state.enrollUsers(deviceID, [{ hdr: { ID: userID }, name, cards }]));
  }

  deleteSelectedUser() {
    const deviceID = this.getSelectedDeviceID();
    const user = this.getSelectedUser();
    if (!deviceID || !user) {
      return;
    }

    stateSafe(() => this.state.deleteUsers(deviceID, [user.hdr.ID]));
  }

  async setCardForSelectedUser() {
    const deviceID = this.getSelectedDeviceID();
    const user = this.getSelectedUser();
    if (!deviceID || !user) {
      return;
    }

    const cardHex = await this.prompt('Card hex (blank clears)', '');
    const cards = this.buildCardsFromHex(cardHex);

    stateSafe(() => this.state.setUserCards(deviceID, [{ userID: user.hdr.ID, cards }]));
  }

  addFingerToSelectedUser() {
    const deviceID = this.getSelectedDeviceID();
    const user = this.getSelectedUser();
    if (!deviceID || !user) {
      return;
    }

    stateSafe(() => this.state.setUserFingers(deviceID, [{
      userID: user.hdr.ID,
      fingers: [{ index: user.fingers.length, flag: 0, templates: [this.state._createFakeTemplate(384)] }],
    }]));
  }

  addFaceToSelectedUser() {
    const deviceID = this.getSelectedDeviceID();
    const user = this.getSelectedUser();
    if (!deviceID || !user) {
      return;
    }

    stateSafe(() => this.state.setUserFaces(deviceID, [{
      userID: user.hdr.ID,
      faces: [{ index: user.faces.length, flag: 0, templates: [this.state._createFakeTemplate(552)], imageData: Buffer.alloc(0) }],
    }]));
  }

  emitSelectedEvent() {
    const deviceID = this.getSelectedDeviceID();
    const selectedUser = this.getSelectedUser();
    const eventType = this.getEventTypes()[this.selectedEventIndex];
    if (!deviceID || !eventType) {
      return;
    }

    stateSafe(() => this.state.emitEventByDefinition(deviceID, eventType, selectedUser?.hdr.ID || ''));
  }

  toggleSelectedDeviceConnection() {
    const deviceID = this.getSelectedDeviceID();
    if (!deviceID) {
      return;
    }

    stateSafe(() => {
      if (this.state.isConnected(deviceID)) {
        this.state.disconnectDevice(deviceID);
      } else {
        this.state.connectDevice(deviceID);
      }
    });
  }

  toggleMonitoring() {
    const deviceID = this.getSelectedDeviceID();
    if (!deviceID) {
      return;
    }

    stateSafe(() => this.state.setMonitoring(deviceID, !this.state.monitoring.get(deviceID)));
  }

  queueScanCard() {
    const deviceID = this.getSelectedDeviceID();
    if (!deviceID) {
      return;
    }

    this.prompt('Card hex for next scan', '04DEADBEEF010203').then((cardHex) => {
      stateSafe(() => this.state.queueScanCard(deviceID, cardHex));
    });
  }

  buildCardsFromHex(cardHex) {
    const normalized = String(cardHex || '').replace(/[^0-9A-Fa-f]/g, '');
    if (!normalized) {
      return [];
    }

    if (normalized.length % 2 !== 0) {
      return [];
    }

    const data = Buffer.from(normalized, 'hex');
    if (data.length === 0) {
      return [];
    }

    return [{
      type: 1,
      size: data.length,
      data,
    }];
  }

  getSelectedDoorID() {
    return this.getSelectedDoor()?.doorID || null;
  }

  applyDoorAction(action) {
    const deviceID = this.getSelectedDeviceID();
    const doorID = this.getSelectedDoorID();
    if (!deviceID || !doorID) {
      return;
    }

    stateSafe(() => action(deviceID, [doorID]));
  }

  handleKeypress(_, key = {}) {
    if (key.ctrl && key.name === 'c') {
      this.options.onExit?.();
      return;
    }

    switch (key.name) {
      case 'q':
        this.options.onExit?.();
        return;
      case 'tab':
        this.panel = this.panel === 'devices'
          ? 'users'
          : this.panel === 'users'
            ? 'events'
            : this.panel === 'events'
              ? 'doors'
              : 'devices';
        break;
      case 'up':
        this.moveSelection(-1);
        break;
      case 'down':
        this.moveSelection(1);
        break;
      case 'return':
        if (this.panel === 'events') {
          this.emitSelectedEvent();
        } else {
          this.toggleSelectedDeviceConnection();
        }
        break;
      case 'a':
        this.addUser();
        return;
      case 'x':
        this.deleteSelectedUser();
        break;
      case 'c':
        this.setCardForSelectedUser();
        return;
      case 'f':
        this.addFingerToSelectedUser();
        break;
      case 'v':
        this.addFaceToSelectedUser();
        break;
      case 'e':
        this.emitSelectedEvent();
        break;
      case 'm':
        this.toggleMonitoring();
        break;
      case 'o':
        this.applyDoorAction((deviceID, doorIDs) => this.state.unlockDoors(deviceID, doorIDs));
        break;
      case 'l':
        this.applyDoorAction((deviceID, doorIDs) => this.state.lockDoors(deviceID, doorIDs));
        break;
      case 'r':
        this.applyDoorAction((deviceID, doorIDs) => this.state.releaseDoors(deviceID, doorIDs));
        break;
      case 's':
        this.queueScanCard();
        return;
      case 'g':
        this.options.toggleAutoEvents?.();
        break;
      case 't':
        stateSafe(() => this.state.setDeviceTime(this.getSelectedDeviceID(), Math.floor(Date.now() / 1000)));
        break;
      case 'h':
        this.showHelp = !this.showHelp;
        break;
      default:
        break;
    }

    this.render();
  }
}

function stateSafe(action) {
  try {
    action();
  } catch (error) {
    // Ignore UI-triggered errors and allow the next render to continue.
  }
}

module.exports = SimulatorTerminalController;
