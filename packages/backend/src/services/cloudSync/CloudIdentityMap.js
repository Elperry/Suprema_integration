/**
 * CloudIdentityMap
 *
 * Translates this gate PC's local ids into the shared cloud schema's ids,
 * through the natural keys the pushers matched on:
 *
 *   local user   -> employee_id   -> cloud user
 *   local device -> serialNumber  -> cloud device
 *   local card   -> card_data     -> cloud card (only if it belongs to the same person)
 *
 * The user ID enrolled on a terminal is the local user.id, so a device user
 * id translates exactly like a local user id. Every lookup answers null when
 * there is no safe cloud match; callers then leave the row pending.
 */
export class CloudIdentityMap {
    /**
     * @param {object} o
     * @param {object[]} o.localUsers    { id, employee_id }
     * @param {object[]} o.localDevices  { id, serialNumber }
     * @param {object[]} o.localCards    { id, user_id, card_data }
     * @param {{cloudRowForKey(key:string): object|null}} o.users / o.devices / o.cards  the pushers
     */
    constructor({ localUsers, localDevices, localCards, users, devices, cards }) {
        this.usersById = new Map(localUsers.map(u => [Number(u.id), u]));
        this.devicesById = new Map(localDevices.map(d => [Number(d.id), d]));
        this.cardsById = new Map(localCards.map(c => [Number(c.id), c]));
        this.users = users;
        this.devices = devices;
        this.cards = cards;
    }

    cloudUserId(localUserId) {
        const user = this.usersById.get(Number(localUserId));
        if (!user || user.employee_id === null || user.employee_id === undefined) return null;
        const row = this.users.cloudRowForKey(`emp:${user.employee_id}`);
        return row ? row.id : null;
    }

    isLocalUser(deviceUserId) {
        const asNumber = Number(String(deviceUserId).trim());
        return Number.isInteger(asNumber) && this.usersById.has(asNumber);
    }

    cloudUserIdForDeviceUser(deviceUserId) {
        return this.cloudUserId(Number(String(deviceUserId).trim()));
    }

    cloudDeviceId(localDeviceId) {
        const device = this.devicesById.get(Number(localDeviceId));
        if (!device || !device.serialNumber) return null;
        const row = this.devices.cloudRowForKey(`sn:${device.serialNumber}`);
        return row ? row.id : null;
    }

    cloudCardId(localCardId) {
        const card = this.cardsById.get(Number(localCardId));
        if (!card || !card.card_data) return null;
        const row = this.cards.cloudRowForKey(`card:${card.card_data}`);
        if (!row) return null;
        const owner = this.cloudUserId(card.user_id);
        return owner !== null && String(owner) === String(row.user_id) ? row.id : null;
    }
}
