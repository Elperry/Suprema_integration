const fs = require('fs');
const path = require('path');

const FALLBACK_EVENTS = [
  { eventCode: 4096, subCode: 0, desc: 'Verify Success' },
  { eventCode: 4097, subCode: 0, desc: 'Verify Fail - Not Registered' },
  { eventCode: 4608, subCode: 0, desc: 'Verify Success (Card)' },
  { eventCode: 4609, subCode: 0, desc: 'Verify Fail (Card) - Not Registered' },
  { eventCode: 4864, subCode: 0, desc: 'Verify Success (Fingerprint)' },
  { eventCode: 4865, subCode: 0, desc: 'Verify Fail (Fingerprint) - Not Registered' },
  { eventCode: 5120, subCode: 0, desc: 'Verify Success (Face)' },
  { eventCode: 5121, subCode: 0, desc: 'Verify Fail (Face) - Not Registered' },
  { eventCode: 8192, subCode: 0, desc: 'Door Opened' },
  { eventCode: 8193, subCode: 0, desc: 'Door Closed' },
  { eventCode: 8194, subCode: 0, desc: 'Door Locked' },
  { eventCode: 8195, subCode: 0, desc: 'Door Unlocked' },
  { eventCode: 8200, subCode: 0, desc: 'Door Released' },
  { eventCode: 16384, subCode: 0, desc: 'Device Started' },
  { eventCode: 16385, subCode: 0, desc: 'Device Stopped' },
  { eventCode: 16643, subCode: 0, desc: 'Device Time Synced' },
  { eventCode: 18176, subCode: 0, desc: 'Network Connected' },
  { eventCode: 18177, subCode: 0, desc: 'Network Disconnected' },
  { eventCode: 20480, subCode: 0, desc: 'User Enrolled' },
  { eventCode: 20481, subCode: 0, desc: 'User Deleted' },
  { eventCode: 20482, subCode: 0, desc: 'User Updated' },
  { eventCode: 20992, subCode: 0, desc: 'Credential Added' },
  { eventCode: 20993, subCode: 0, desc: 'Credential Deleted' },
  { eventCode: 24576, subCode: 0, desc: 'Time Attendance - Check In' },
  { eventCode: 24577, subCode: 0, desc: 'Time Attendance - Check Out' },
  { eventCode: 24578, subCode: 0, desc: 'Time Attendance - Break Start' },
  { eventCode: 24579, subCode: 0, desc: 'Time Attendance - Break End' },
  { eventCode: 24832, subCode: 0, desc: 'TNA Key 1' },
  { eventCode: 24833, subCode: 0, desc: 'TNA Key 2' },
  { eventCode: 24834, subCode: 0, desc: 'TNA Key 3' },
  { eventCode: 24835, subCode: 0, desc: 'TNA Key 4' },
];

function classifyEventCode(eventCode) {
  const numeric = Number(eventCode) || 0;
  if (numeric >= 0x1000 && numeric < 0x2000) return 'authentication';
  if (numeric >= 0x2000 && numeric < 0x3000) return 'door';
  if (numeric >= 0x3000 && numeric < 0x4000) return 'zone';
  if (numeric >= 0x4000 && numeric < 0x5000) return 'system';
  if (numeric >= 0x5000 && numeric < 0x6000) return 'user';
  if (numeric >= 0x6000 && numeric < 0x7000) return 'attendance';
  return 'other';
}

function getEventSeverity(eventCode) {
  const numeric = Number(eventCode) || 0;
  if ([4097, 4353, 4609, 4865, 5121].includes(numeric)) return 'warning';
  if (numeric >= 0x3000 && numeric < 0x4000) return 'error';
  return 'info';
}

function getDefaultTNAKeyForEvent(eventCode) {
  switch (Number(eventCode) || 0) {
    case 24576:
    case 24832:
      return 1;
    case 24577:
    case 24833:
      return 2;
    case 24578:
    case 24834:
      return 3;
    case 24579:
    case 24835:
      return 4;
    default:
      return 0;
  }
}

function readBackendEventMap() {
  const eventCodePath = path.resolve(__dirname, '../backend/data/event_code.json');
  if (!fs.existsSync(eventCodePath)) {
    return FALLBACK_EVENTS;
  }

  try {
    const raw = JSON.parse(fs.readFileSync(eventCodePath, 'utf8'));
    return Array.isArray(raw.entries) ? raw.entries : FALLBACK_EVENTS;
  } catch (_) {
    return FALLBACK_EVENTS;
  }
}

function normalizeEntry(entry) {
  const eventCode = Number(entry.eventCode ?? entry.event_code ?? 0);
  const subCode = Number(entry.subCode ?? entry.sub_code ?? 0);
  return {
    eventCode,
    subCode,
    desc: entry.desc || `Event 0x${eventCode.toString(16).toUpperCase()}`,
    weight: Math.max(0, Number(entry.weight ?? 1)),
    eventType: classifyEventCode(eventCode),
    severity: getEventSeverity(eventCode),
  };
}

function createEventCatalog(config = {}) {
  const merged = new Map();

  for (const entry of readBackendEventMap()) {
    const normalized = normalizeEntry(entry);
    merged.set(`${normalized.eventCode}:${normalized.subCode}`, normalized);
  }

  for (const entry of config.events?.types || []) {
    const normalized = normalizeEntry(entry);
    merged.set(`${normalized.eventCode}:${normalized.subCode}`, normalized);
  }

  const entries = Array.from(merged.values())
    .sort((left, right) => left.eventCode - right.eventCode || left.subCode - right.subCode);

  return {
    entries,
    describe(eventCode, subCode = 0) {
      const exact = merged.get(`${Number(eventCode)}:${Number(subCode)}`);
      if (exact) return exact.desc;

      const base = merged.get(`${Number(eventCode)}:0`);
      if (base) return base.desc;

      return `Event 0x${Number(eventCode).toString(16).toUpperCase()}`;
    },
    get(eventCode, subCode = 0) {
      return merged.get(`${Number(eventCode)}:${Number(subCode)}`)
        || merged.get(`${Number(eventCode)}:0`)
        || null;
    },
    classify(eventCode) {
      return classifyEventCode(eventCode);
    },
    severity(eventCode) {
      return getEventSeverity(eventCode);
    },
    getAutoEventTypes() {
      const configured = (config.events?.types || []).map(normalizeEntry).filter((entry) => entry.weight > 0);
      if (configured.length > 0) {
        return configured;
      }

      return entries.filter((entry) => entry.weight > 0);
    },
  };
}

module.exports = {
  createEventCatalog,
  classifyEventCode,
  getEventSeverity,
  getDefaultTNAKeyForEvent,
};
