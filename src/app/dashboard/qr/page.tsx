
'use client';
import { QrCodeGenerator } from "@/components/qr/qr-code-generator";
import { useLanguage } from "@/contexts/language-context";

export default function QrCodePage() {
    const { t } = useLanguage();
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-6">{t('dashboardUser.qr.title')}</h1>
            <div className="flex justify-center items-center">
                 <QrCodeGenerator />
            </div>
        </div>
    );
}
