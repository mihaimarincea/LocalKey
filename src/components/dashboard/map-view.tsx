import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Offer } from "@/types";
import { MapPin } from "lucide-react";

interface MapViewProps {
    offers: Offer[];
}

// NOTE: This is a placeholder component.
// To implement a real map, you would use a library like @vis.gl/react-google-maps
// and provide a Google Maps API key in your environment variables.
//
// Example:
//
// import {APIProvider, Map} from '@vis.gl/react-google-maps';
//
// <APIProvider apiKey={"YOUR_GOOGLE_MAPS_API_KEY"}>
//   <Map
//     style={{width: '100%', height: '500px'}}
//     defaultCenter={{lat: 34.0522, lng: -118.2437}}
//     defaultZoom={12}
//     gestureHandling={'greedy'}
//     disableDefaultUI={true}
//   />
// </APIProvider>

export function MapView({ offers }: MapViewProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Oferte Lângă Tine</CardTitle>
        <CardDescription>Găsește oferte în zona ta. Apasă pe un pin pentru detalii.</CardDescription>
      </CardHeader>
      <CardContent>
        <div 
            className="relative flex h-[500px] w-full items-center justify-center rounded-lg border-2 border-dashed bg-secondary"
            aria-label="Placeholder Hartă"
        >
          <div className="text-center text-muted-foreground">
            <MapPin className="mx-auto h-12 w-12" />
            <p className="mt-2 font-semibold">Vizualizare Hartă</p>
            <p className="mt-1 text-sm">O hartă reală ar afișa {offers.length} oferte lângă tine.</p>
            <p className="mt-4 text-xs">Pentru a activa, adaugă cheia ta API Google Maps.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
