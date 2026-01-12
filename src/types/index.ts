export type UserRole = 'user' | 'partner' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  createdAt: Date;
  inviteCodeCount: number;
}

export interface Partner {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  offerCount: number;
  totalRedemptions: number;
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
  expiresAt: Date;
  isPaused: boolean;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Invite {
    code: string;
    status: 'available' | 'used';
    invitedBy: string;
    usedBy?: string;
    createdAt: Date;
}

export interface Redemption {
    id: string;
    userId: string;
    offerId: string;
    partnerId: string;
    redeemedAt: Date;
}

export type NavItem = {
  href: string;
  title: string;
  icon: React.ElementType;
  label?: string;
  active?: boolean;
}
