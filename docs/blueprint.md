# **App Name**: LOCALKEY

## Core Features:

- User Authentication: Secure user authentication via email and SMS OTP with invite-only access.
- QR Code Generation: Generate temporary QR codes (valid for 60 seconds) for users to redeem offers at partner locations. This token will be linked to the user device.
- Offer Dashboard: Display available offers on a dashboard with map integration. Each dashboard is specific to its type (User, Partner, Admin).
- Usage Tracking: Track user redemptions (1 redeem/partner/month, max 3/day) and implement device fingerprinting for anti-fraud measures. Use this information as a tool, combined with other usage statistics, to produce fraud alerts when suspicious usage is detected.
- Invitation System: Allow users to invite others with a limited number of invite codes (3 per user).
- Partner Portal: Enable partners to log in, scan QR codes for redemption validation, and view dashboards with usage statistics. Includes a QR code scanner, an overview dashboard, and controls for offer pausing or scheduling.
- Admin Panel: Comprehensive admin panel with dashboards, user/partner/offer management, invite system controls, fraud detection, payment integration via Stripe, content editing, and reporting analytics.

## Style Guidelines:

- Primary color: Warm terracotta (#E07A5F) to convey a cozy and inviting feeling.
- Background color: Soft beige (#F8F0E3), desaturated and light to ensure a clean, mobile-first user experience, allowing the primary color to stand out.
- Accent color: Mustard yellow (#F2CC8F) for interactive elements, adding warmth and attracting the user's attention.
- Font: 'Nunito Sans' (sans-serif) for a friendly and modern look across all platforms. This will apply to headlines and body text.
- Rounded, friendly icons to represent categories, actions, and status indicators.
- Mobile-first responsive design with clear hierarchy and easy navigation.
- Subtle transitions and animations for QR code generation and data updates, creating a smooth user experience.