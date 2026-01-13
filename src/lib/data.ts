import type { Offer, User, Partner, Invite, Redemption } from '@/types';
import { PlaceHolderImages } from './placeholder-images';
import { Timestamp } from 'firebase/firestore';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || 'https://placehold.co/600x400';

// Note: This data is for seeding/testing purposes.
// The app can fetch live data from Firestore, but this provides a starting point.

export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'Alex Ionescu',
    email: 'alex@example.com',
    avatarUrl: findImage('user-avatar-1'),
    role: 'user',
    createdAt: Timestamp.fromDate(new Date('2023-01-15T09:30:00Z')),
    inviteCodeCount: 3,
  },
   {
    id: 'saV65GII0QRvvgFPswoiZ9QaWh83', // Your admin UID
    name: 'Mihai Marincea',
    email: 'mihai.marincea@gmail.com',
    avatarUrl: findImage('user-avatar-2'),
    role: 'admin',
    createdAt: Timestamp.fromDate(new Date('2023-01-10T08:00:00Z')),
    inviteCodeCount: 99,
  },
  {
    id: 'partner-user-001', 
    name: 'John Partner',
    email: 'john.partner@example.com',
    avatarUrl: findImage('user-avatar-1'),
    role: 'partner',
    createdAt: Timestamp.fromDate(new Date('2023-02-10T08:00:00Z')),
    inviteCodeCount: 5,
  }
];

export const mockPartners: Partner[] = [
  {
    id: 'partner-001',
    name: 'The Daily Grind',
    email: 'contact@dailygrind.com',
    createdAt: Timestamp.fromDate(new Date('2023-01-10T08:00:00Z')),
    offerCount: 1,
    totalRedemptions: 120,
  },
];

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
    expiresAt: Timestamp.fromDate(new Date(new Date().setDate(new Date().getDate() + 30))),
    isPaused: false,
    location: { lat: 34.0522, lng: -118.2437 },
  },
];

export const mockInvites: Invite[] = [
    {
        id: 'invite-001',
        code: 'LOCAL-F8B2C',
        status: 'used',
        generatedBy: 'user-001',
        redeemedByUserId: 'user-002',
        createdAt: Timestamp.fromDate(new Date('2023-02-19T10:00:00Z')),
        redeemedAt: Timestamp.fromDate(new Date('2023-02-20T11:00:00Z')),
    },
    {
        id: 'invite-002',
        code: 'LOCAL-A9D4E',
        status: 'available',
        generatedBy: 'user-001',
        createdAt: Timestamp.fromDate(new Date('2023-03-01T12:00:00Z')),
    },
     {
        id: 'invite-003',
        code: 'LOCAL-G5H6I',
        status: 'available',
        generatedBy: 'user-001',
        createdAt: Timestamp.fromDate(new Date('2023-03-01T12:01:00Z')),
    }
];

export const mockRedemptions: Redemption[] = [
    {
        id: 'red-001',
        userId: 'user-001',
        offerId: 'offer-001',
        partnerId: 'partner-001',
        redeemedAt: Timestamp.fromDate(new Date(new Date().setDate(new Date().getDate() - 2))),
    },
];
