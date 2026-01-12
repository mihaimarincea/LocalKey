import { QrCodeGenerator } from "@/components/qr/qr-code-generator";

export default function QrCodePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-6">Redeem Offer</h1>
            <div className="flex justify-center items-center">
                 <QrCodeGenerator />
            </div>
        </div>
    );
}