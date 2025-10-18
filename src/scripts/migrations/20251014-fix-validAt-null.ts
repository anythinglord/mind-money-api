// scripts/data-migration-20251014-fix-validAt.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixNullValidAt() {
  console.log('Starting data migration to fix null "validAt" fields...');

  try {
    // 1. Find all documents where 'validAt' is missing or explicitly null.
    // MongoDB uses { isSet: false } to find missing fields.
    const result = await prisma.item.updateMany({
      where: {
        AND: [
          { validAt: undefined },
          { recurrence: undefined }
        ]
      },
      data: {
        // Set the value to a non-null default.
        // For DateTime, use a JavaScript Date object (e.g., now or a specific date)
        validAt: new Date(), 
        recurrence: 'One time'
      }
    });

    console.log(`✅ Successfully updated ${result.count} documents.`);
    console.log('Migration complete.');

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

fixNullValidAt();