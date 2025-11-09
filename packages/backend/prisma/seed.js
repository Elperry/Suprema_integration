const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Create default access levels
    let defaultAccessLevel = await prisma.accessLevel.findFirst({
        where: { name: 'Default' }
    });
    
    if (!defaultAccessLevel) {
        defaultAccessLevel = await prisma.accessLevel.create({
            data: {
                name: 'Default',
                description: 'Default access level for all users',
                doorIds: []
            }
        });
        console.log('✅ Created default access level');
    } else {
        console.log('ℹ️  Default access level already exists');
    }

    let adminAccessLevel = await prisma.accessLevel.findFirst({
        where: { name: 'Admin' }
    });
    
    if (!adminAccessLevel) {
        adminAccessLevel = await prisma.accessLevel.create({
            data: {
                name: 'Admin',
                description: 'Full access for administrators',
                doorIds: []
            }
        });
        console.log('✅ Created admin access level');
    } else {
        console.log('ℹ️  Admin access level already exists');
    }

    // Create default schedule
    let defaultSchedule = await prisma.schedule.findFirst({
        where: { name: 'Default Schedule' }
    });
    
    if (!defaultSchedule) {
        defaultSchedule = await prisma.schedule.create({
            data: {
                name: 'Default Schedule',
                description: 'Default 24/7 schedule',
                timezone: 'UTC',
                schedule: {
                    monday: { enabled: true, startTime: '00:00', endTime: '23:59' },
                    tuesday: { enabled: true, startTime: '00:00', endTime: '23:59' },
                    wednesday: { enabled: true, startTime: '00:00', endTime: '23:59' },
                    thursday: { enabled: true, startTime: '00:00', endTime: '23:59' },
                    friday: { enabled: true, startTime: '00:00', endTime: '23:59' },
                    saturday: { enabled: true, startTime: '00:00', endTime: '23:59' },
                    sunday: { enabled: true, startTime: '00:00', endTime: '23:59' }
                }
            }
        });
        console.log('✅ Created default schedule');
    } else {
        console.log('ℹ️  Default schedule already exists');
    }

    // Log seed completion
    await prisma.systemLog.create({
        data: {
            level: 'info',
            message: 'Database seeding completed successfully',
            source: 'seed',
            metadata: {
                accessLevels: [defaultAccessLevel.id, adminAccessLevel.id],
                schedules: [defaultSchedule.id]
            }
        }
    });

    console.log('🎉 Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });