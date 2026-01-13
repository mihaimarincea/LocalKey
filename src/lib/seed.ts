'use server';

import { Firestore, collection, writeBatch, doc } from 'firebase/firestore';
import { mockUsers, mockPartners, mockOffers, mockInvites, mockRedemptions } from './data';
import { User, Partner, Offer, Invite, Redemption } from '@/types';

// Helper function to convert mock data dates to Timestamps
const toTimestamp = (data: any) => {
    const newData = { ...data };
    for (const key in newData) {
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

            // Seed user subcollections
             mockInvites.filter(i => i.invitedBy === user.id).forEach((invite: Invite) => {
                const inviteRef = doc(db, `users/${user.id}/invite_codes`, invite.code);
                batch.set(inviteRef, toTimestamp(invite));
            });

            mockRedemptions.filter(r => r.userId === user.id).forEach((redemption: Redemption) => {
                const redemptionRef = doc(db, `users/${user.id}/redemptions`, redemption.id);
                batch.set(redemptionRef, toTimestamp(redemption));
            });
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
