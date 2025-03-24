import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

interface GoogleMapProps {
  endereco: string;
  className?: string;
}

declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: google.maps.MapOptions) => google.maps.Map;
        Geocoder: new () => google.maps.Geocoder;
        Marker: new (options: google.maps.MarkerOptions) => google.maps.Marker;
        Animation: {
          DROP: number;
        };
        MapOptions: google.maps.MapOptions;
        MarkerOptions: google.maps.MarkerOptions;
        GeocoderResult: google.maps.GeocoderResult;
        GeocoderStatus: {
          OK: string;
        };
      };
    };
    initMap: () => void;
  }
}

export function GoogleMap({ endereco, className = "" }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!window.google) {
      scriptRef.current = document.createElement("script");
      scriptRef.current.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      scriptRef.current.async = true;
      scriptRef.current.defer = true;
      document.head.appendChild(scriptRef.current);

      window.initMap = () => {
        if (mapRef.current) {
          map.current = new window.google.maps.Map(mapRef.current, {
            zoom: 15,
            center: { lat: -17.8013, lng: -50.9199 }, // Centro de Rio Verde - GO
            mapId: "DEMO_MAP_ID",
          });

          geocoder.current = new window.google.maps.Geocoder();
          
          geocodeAddress();
        }
      };
    } else {
      geocodeAddress();
    }

    return () => {
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, [endereco]);

  const geocodeAddress = () => {
    if (geocoder.current && map.current) {
      geocoder.current.geocode(
        { address: `${endereco}, Rio Verde - GO` },
        (results: google.maps.GeocoderResult[], status: string) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            const location = results[0].geometry.location;
            map.current?.setCenter(location);

            if (marker.current) {
              marker.current.setMap(null);
            }

            marker.current = new window.google.maps.Marker({
              map: map.current,
              position: location,
              animation: window.google.maps.Animation.DROP,
            });
          } else {
            console.error("Geocode falhou:", status);
          }
        }
      );
    }
  };

  return (
    <div className={`relative min-h-[300px] rounded-lg overflow-hidden ${className}`}>
      <div ref={mapRef} className="w-full h-full absolute inset-0" />
      {!window.google && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
} 