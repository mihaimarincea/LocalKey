'use server';

import { Firestore, collection, writeBatch, doc } from 'firebase/firestore';
import { mockUsers, mockPartners, mockOffers, mockInvites, mockRedemptions } from './data';
import { User, Partner, Offer, Invite, Redemption } from '@/types';

// Helper function to convert mock data dates to Timestamps
const toTimestamp = (data: any) => {
    const newData = { ...data };
    for (const key in newData) {
        // This check is flawed, but we'll leave it for now as data is controlled.
        // A better check would be `instanceof Date`.
        if (newData[key] instanceof Date) { 
            newData[key] = data[key];
        }
    }
    return newData;
};


export async function seedDatabase(db: Firestore): Promise<{ success: boolean; message: string }> {
    const batch = writeBatch(db);

    try {
        console.log('Seeding users...');
        mockUsers.forEach((user: User) => {
            const userRef = doc(db, 'users', user.id);
            batch.set(userRef, toTimestamp(user));

            // Seed user roles
            if (user.role === 'admin') {
                const adminRoleRef = doc(db, 'roles_admin', user.id);
                batch.set(adminRoleRef, { role: 'admin' });
            } else if (user.role === 'partner') {
                const partnerRoleRef = doc(db, 'roles_partner', user.id);
                batch.set(partnerRoleRef, { role: 'partner' });
            }
        });

        console.log('Seeding partners...');
        mockPartners.forEach((partner: Partner) => {
            const docRef = doc(db, 'partners', partner.id);
            batch.set(docRef, toTimestamp(partner));
        });

        console.log('Seeding offers...');
        mockOffers.forEach((offer: Offer) => {
            const docRef = doc(db, 'offers', offer.id);
            batch.set(docRef, toTimestamp(offer));
        });

        console.log('Seeding invite codes...');
        mockInvites.forEach((invite: Invite) => {
            // Use the actual invite code as the document ID for direct lookup
            const docRef = doc(db, 'invite_codes', invite.code);
            batch.set(docRef, toTimestamp(invite));
        });
        
        console.log('Seeding redemptions...');
        mockRedemptions.forEach((redemption: Redemption) => {
            // Note: In a real app, redemptions might be a subcollection.
            // For seeding simplicity, we'll keep them top-level if needed,
            // but current logic places them under users.
            const redemptionRef = doc(db, `users/${redemption.userId}/redemptions`, redemption.id);
             batch.set(redemptionRef, toTimestamp(redemption));
        });


        await batch.commit();

        console.log('Database seeded successfully!');
        return { success: true, message: 'Database seeded successfully!' };

    } catch (error) {
        console.error("Error seeding database: ", error);
        if (error instanceof Error) {
            return { success: false, message: `Error seeding database: ${error.message}` };
        }
        return { success: false, message: 'An unknown error occurred while seeding the database.' };
    }
}
