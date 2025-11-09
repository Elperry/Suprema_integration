/**
 * Device Model
 * Database model for managing Suprema device configurations
 */

import { DataTypes } from 'sequelize';

module.exports = (sequelize) => {
    const Device = sequelize.define('Device', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 100]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ip: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                isIP: true
            }
        },
        port: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 65535
            }
        },
        useSSL: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        deviceType: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        serialNumber: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true
        },
        firmwareVersion: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        location: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isConnected: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        lastConnected: {
            type: DataTypes.DATE,
            allowNull: true
        },
        connectionRetries: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        maxRetries: {
            type: DataTypes.INTEGER,
            defaultValue: 3
        },
        timeout: {
            type: DataTypes.INTEGER,
            defaultValue: 30000 // 30 seconds
        },
        capabilities: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: {}
        },
        settings: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: {}
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'error', 'maintenance'),
            defaultValue: 'active'
        },
        lastError: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        errorCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName: 'devices',
        timestamps: true,
        indexes: [
            {
                fields: ['ip', 'port'],
                unique: true
            },
            {
                fields: ['serialNumber'],
                unique: true
            },
            {
                fields: ['isActive']
            },
            {
                fields: ['status']
            }
        ]
    });

    // Instance methods
    Device.prototype.getConnectionConfig = function() {
        return {
            ip: this.ip,
            port: this.port,
            useSSL: this.useSSL,
            timeout: this.timeout
        };
    };

    Device.prototype.updateConnectionStatus = async function(isConnected, error = null) {
        this.isConnected = isConnected;
        this.lastConnected = isConnected ? new Date() : this.lastConnected;
        
        if (error) {
            this.lastError = error.message || error;
            this.errorCount += 1;
            this.status = 'error';
        } else if (isConnected) {
            this.lastError = null;
            this.errorCount = 0;
            this.status = 'active';
            this.connectionRetries = 0;
        }

        await this.save();
    };

    Device.prototype.incrementRetries = async function() {
        this.connectionRetries += 1;
        
        if (this.connectionRetries >= this.maxRetries) {
            this.status = 'error';
        }
        
        await this.save();
        return this.connectionRetries;
    };

    Device.prototype.resetRetries = async function() {
        this.connectionRetries = 0;
        await this.save();
    };

    // Class methods
    Device.getActiveDevices = async function() {
        return await Device.findAll({
            where: {
                isActive: true,
                status: ['active', 'maintenance']
            },
            order: [['name', 'ASC']]
        });
    };

    Device.getConnectedDevices = async function() {
        return await Device.findAll({
            where: {
                isConnected: true,
                isActive: true
            },
            order: [['name', 'ASC']]
        });
    };

    Device.findByConnection = async function(ip, port) {
        return await Device.findOne({
            where: {
                ip: ip,
                port: port
            }
        });
    };

    Device.findBySerialNumber = async function(serialNumber) {
        return await Device.findOne({
            where: {
                serialNumber: serialNumber
            }
        });
    };

    return Device;
};