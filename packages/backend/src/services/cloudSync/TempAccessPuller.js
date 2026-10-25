/**
 * TempAccessPuller
 *
 * Visitors are registered in the cloud `tempaccess` table by the school's PHP
 * systems (Cloud hikv/index.php). Every gate PC pulls the visits from today
 * on and provisions each visitor's QR code on ITS OWN devices.
 *
 * The cloud `done` flag cannot say "provisioned" for two PCs at once, so it
 * does not gate the pull. Each PC remembers what it provisioned in its local
 * `tempaccess` table, keyed by the cloud row id (the local table is only a
 * cache of cloud rows). After a successful provisioning the cloud row is
 * marked done = 1 for the PHP side's benefit. Nothing else is written to the
 * cloud, and a failure leaves both sides untouched so the next run retries.
 */
export class TempAccessPuller {
    /**
     * @param {object}   o
     * @param {object}   o.cloud        CloudStore
     * @param {object}   o.local        { provisionedIds(ids), recordProvisioned(row) }
     * @param {object}   o.provisioner  { provision({cloudId, qrcode, name, visitDay}) -> Promise<boolean> } | null
     * @param {Function} o.today        () -> 'YYYY-MM-DD' in school time
     */
    constructor({ cloud, local, provisioner, logger, today }) {
        this.cloud = cloud;
        this.local = local;
        this.provisioner = provisioner;
        this.logger = logger;
        this.today = today;
        this._warnedNoProvisioner = false;
    }

    async run() {
        const stats = { provisioned: 0, failed: 0, alreadyDone: 0 };
        if (!this.provisioner) {
            if (!this._warnedNoProvisioner) {
                this.logger.warn('[CloudSync:tempaccess] no visitor provisioner configured; visitor QR codes are not pulled');
                this._warnedNoProvisioner = true;
            }
            return stats;
        }

        const day = this.today();
        const rows = await this.cloud.findFrom('tempaccess', 'date', day,
            ['id', 'person_name', 'date', 'qrcode', 'email', 'done']);
        if (rows.length === 0) return stats;

        const done = new Set(await this.local.provisionedIds(rows.map(row => row.id)));
        for (const row of rows) {
            if (done.has(row.id)) {
                stats.alreadyDone++;
                continue;
            }
            const visitor = {
                cloudId: row.id,
                qrcode: qrText(row.qrcode),
                name: String(row.person_name ?? ''),
                visitDay: String(row.date ?? '').slice(0, 10),
            };
            let ok = false;
            try {
                ok = await this.provisioner.provision(visitor);
            } catch (error) {
                this.logger.error(`[CloudSync:tempaccess] provisioning ${visitor.qrcode} failed: ${error.message}`);
            }
            if (!ok) {
                stats.failed++;
                continue;
            }
            await this.local.recordProvisioned({ ...row, qrcode: Number(row.qrcode) });
            await this.cloud.updateById('tempaccess', row.id, { done: 1 });
            stats.provisioned++;
        }
        this.logger.info(
            `[CloudSync:tempaccess] provisioned=${stats.provisioned}, failed=${stats.failed}, alreadyDone=${stats.alreadyDone}`
        );
        return stats;
    }
}

/** The QR text: tempaccess.qrcode is a DOUBLE column; never let 400111 become "400111.0" or 4.00111e5. */
function qrText(value) {
    const n = Number(value);
    return Number.isFinite(n) ? BigInt(Math.trunc(n)).toString() : String(value ?? '');
}
