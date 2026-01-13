import { Timestamp } from "firebase/firestore";

export type UserRole = 'user' | 'partner' | 'admin';

export interface User {
  id: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: Date | Timestamp;
  inviteCodeCount?: number;
}

export type PartnerStatus = 'pending' | 'approved' | 'rejected';

export interface Partner {
  id: string; // Corresponds to the user UID
  companyName?: string;
  cui?: string;
  regCom?: string;
  address?: string;
  city?: string;
  county?: string;
  iban?: string;
  bank?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  status: PartnerStatus;
  createdAt: Date | Timestamp;
  offerCount?: number;
  totalRedemptions?: number;
  name?: string;
  email?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  partnerId: string;
  partnerName: string;
  partnerLogoUrl: string;
  imageUrl: string;
  category: string;
  expiresAt: Date | Timestamp;
  isPaused: boolean;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Invite {
    id: string;
    code: string;
    status: 'available' | 'used';
    generatedBy: string;
    redeemedByUserId?: string;
    createdAt: Date | Timestamp;
    redeemedAt?: Date | Timestamp;
}

export interface Redemption {
    id: string;
    userId: string;
    offerId: string;
    partnerId: string;
    redeemedAt: Date | Timestamp;
}

export type NavItem = {
  href: string;
  title: string;
  icon: React.ElementType;
  label?: string;
  active?: boolean;
}


export type WithId<T> = T & { id: string };
