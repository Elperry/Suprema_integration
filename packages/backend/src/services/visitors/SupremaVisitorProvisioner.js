/**
 * SupremaVisitorProvisioner
 *
 * Puts one visitor's QR code on every terminal this gate PC is connected to:
 * QR reading switched on (once per terminal), a user whose ID is the QR code,
 * valid 06:00-23:59:59 school time on the visit day only, holding one card of
 * type CARD_TYPE_QR whose data is the QR text.
 *
 * Any failure answers false, so TempAccessPuller leaves the visit pending and
 * the next cycle retries it on every terminal (enrolment overwrites).
 */
import { cairoDayRange } from '../tna/tnaRules.js';

const CARD_TYPE_QR = 0x06;
const VISIT_OPENS_AT_HOUR = 6;

export class SupremaVisitorProvisioner {
    constructor({ userService, biometricService, connectionService, logger }) {
        this.users = userService;
        this.cards = biometricService;
        this.connection = connectionService;
        this.logger = logger;
        this.qrEnabled = new Set();
    }

    async provision({ qrcode, name, visitDay }) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(String(visitDay || '')) || !qrcode) return false;
        const deviceIds = [...this.connection.connectedDevices.keys()];
        if (deviceIds.length === 0) return false;

        const { start, end } = cairoDayRange(visitDay);
        const startTime = Math.floor(start.getTime() / 1000) + VISIT_OPENS_AT_HOUR * 3600;
        const endTime = Math.floor(end.getTime() / 1000);
        const user = { id: String(qrcode), name: String(name || 'Visitor'), settings: { startTime, endTime } };
        const card = { userId: String(qrcode), cardData: Buffer.from(String(qrcode), 'ascii').toString('hex'), cardType: CARD_TYPE_QR };

        try {
            for (const deviceId of deviceIds) {
                await this._enableQr(deviceId);
                await this.users.enrollUsers(deviceId, [user]);
                await this.users.setUserCards(deviceId, [card], { skipDuplicateCheck: true });
            }
            this.logger.info(`Visitor ${qrcode} provisioned on ${deviceIds.length} terminal(s) for ${visitDay}`);
            return true;
        } catch (error) {
            this.logger.warn(`Visitor ${qrcode} not provisioned (will retry): ${error.message}`);
            return false;
        }
    }

    async _enableQr(deviceId) {
        if (this.qrEnabled.has(deviceId)) return;
        await this.cards.setQRConfig(deviceId, { useQRCode: true });
        this.qrEnabled.add(deviceId);
    }
}
