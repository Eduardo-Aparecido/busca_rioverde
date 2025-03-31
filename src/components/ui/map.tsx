import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  latitude: number;
  longitude: number;
  title: string;
  description: string;
}

export function Map({ latitude, longitude, title, description }: MapProps) {
  useEffect(() => {
    // Criar o mapa
    const map = L.map('map').setView([latitude, longitude], 15);

    // Adicionar o tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Criar o ícone personalizado
    const icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Adicionar o marcador
    const marker = L.marker([latitude, longitude], { icon }).addTo(map);
    
    // Adicionar o popup
    marker.bindPopup(`
      <div class="text-sm">
        <h3 class="font-semibold">${title}</h3>
        <p>${description}</p>
      </div>
    `).openPopup();

    // Cleanup
    return () => {
      map.remove();
    };
  }, [latitude, longitude, title, description]);

  return <div id="map" className="h-full w-full rounded-lg" />;
} 