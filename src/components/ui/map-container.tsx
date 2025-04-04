import { Map } from "./map";

interface MapContainerProps {
  latitude: number;
  longitude: number;
  title: string;
}

export function MapContainer({ latitude, longitude, title }: MapContainerProps) {
  return (
    <div className="w-full h-[300px]">
      <Map
        latitude={latitude}
        longitude={longitude}
        title={title}
        description=""
      />
    </div>
  );
} 