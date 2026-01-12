import type { Offer, User, Partner, Invite, Redemption } from '@/types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || 'https://placehold.co/600x400';

// Note: This data is now for seeding/testing purposes.
// The app fetches live data from Firestore.

export const mockOffers: Offer[] = [
  {
    id: 'offer-001',
    title: 'Croissant gratuit la o cafea',
    description: 'Cumpără orice cafea medie sau mare și primești un croissant proaspăt copt gratuit.',
    partnerId: 'partner-001',
    partnerName: 'The Daily Grind',
    partnerLogoUrl: findImage('partner-logo-1'),
    imageUrl: findImage('offer-1'),
    category: 'Cafenea',
    expiresAt: new Date(new Date().setDate(new Date().getDate() + 30)),
    isPaused: false,
    location: { lat: 34.0522, lng: -118.2437 },
  },
];

export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'Alex Ionescu',
    email: 'alex@example.com',
    avatarUrl: findImage('user-avatar-1'),
    role: 'user',
    createdAt: new Date('2023-01-15T09:30:00Z'),
    inviteCodeCount: 3,
  },
];

export const mockPartners: Partner[] = [
  {
    id: 'partner-001',
    name: 'The Daily Grind',
    email: 'contact@dailygrind.com',
    createdAt: new Date('2023-01-10T08:00:00Z'),
    offerCount: 1,
    totalRedemptions: 120,
  },
];

export const mockInvites: Invite[] = [
    {
        code: 'LOCAL-F8B2C',
        status: 'used',
        invitedBy: 'user-001',
        usedBy: 'user-002',
        createdAt: new Date('2023-02-19T10:00:00Z'),
    },
];

export const mockRedemptions: Redemption[] = [
    {
        id: 'red-001',
        userId: 'user-001',
        offerId: 'offer-001',
        partnerId: 'partner-001',
        redeemedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
];
