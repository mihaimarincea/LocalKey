'use client';

import { QrCodeScanner } from "@/components/partner/qr-code-scanner";

export default function PartnerScanPage() {
    return (
        <div className="flex flex-col items-center gap-6">
           <QrCodeScanner />
        </div>
    );
}
