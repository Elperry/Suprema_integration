import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
    try {
        // Test card assignments
        const count = await prisma.cardAssignment.count();
        console.log('Card assignments count:', count);
        
        // List all card assignments
        const assignments = await prisma.cardAssignment.findMany();
        console.log('Card assignments:', JSON.stringify(assignments, null, 2));

        // Test creating a new one
        const newAssignment = await prisma.cardAssignment.create({
            data: {
                employeeId: 'TEST123',
                employeeName: 'Test Employee',
                cardData: 'TESTCARD' + Date.now(),
                cardType: 'CSN',
                cardFormat: 0,
                status: 'active'
            }
        });
        console.log('Created test assignment:', newAssignment.id);

        // Delete the test
        await prisma.cardAssignment.delete({ where: { id: newAssignment.id } });
        console.log('Deleted test assignment');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

test();
