'use client';
import { OfferCard } from "@/components/dashboard/offer-card";
import { MapView } from "@/components/dashboard/map-view";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import type { Offer } from "@/types";
import { useLanguage } from "@/contexts/language-context";

export default function UserDashboardPage() {
  const firestore = useFirestore();
  const { t } = useLanguage();
  const offersRef = useMemoFirebase(() => collection(firestore, "offers"), [firestore]);
  const activeOffersQuery = useMemoFirebase(() => offersRef && query(offersRef, where("isPaused", "==", false)), [offersRef]);
  
  const { data: offers, isLoading } = useCollection<Offer>(activeOffersQuery);

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">{t('dashboardUser.page.availableOffers')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboardUser.page.browseOffers')}</p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {isLoading && Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
            {offers?.map(offer => (
                <OfferCard key={offer.id} offer={offer} />
            ))}
            {!isLoading && offers?.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground">{t('dashboardUser.page.noOffers')}</p>
            )}
        </div>
      </div>
      <div className="lg:col-span-1 xl:col-span-2">
        <MapView offers={offers || []} />
      </div>
    </div>
  );
}


const CardSkeleton = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[250px] w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
)
