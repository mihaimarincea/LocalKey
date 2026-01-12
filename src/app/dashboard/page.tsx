import { OfferCard } from "@/components/dashboard/offer-card";
import { MapView } from "@/components/dashboard/map-view";
import { mockOffers } from "@/lib/data";

export default function UserDashboardPage() {
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {mockOffers.filter(o => !o.isPaused).map(offer => (
                <OfferCard key={offer.id} offer={offer} />
            ))}
        </div>
      </div>
      <div className="lg:col-span-1 xl:col-span-2">
        <MapView offers={mockOffers.filter(o => !o.isPaused)} />
      </div>
    </div>
  );
}
