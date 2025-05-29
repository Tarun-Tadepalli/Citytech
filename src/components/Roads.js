import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import RecenterMap from './RecenterMap';

const RoadsOnlyMap = () => {
  const [center, setCenter] = useState([20, 0]); // Default location
  const [roads, setRoads] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter([latitude, longitude]);
      },
      (error) => {
        console.error('Geolocation error:', error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    const fetchRoads = async () => {
      // Fetch only roads (highway="primary" for example, you can modify the filter)
      const query = `[out:json];way["highway"](bbox);out geom;`;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const roadPolylines = data.elements.map(element => element.geometry.map(point => [point.lat, point.lon]));
        setRoads(roadPolylines);
      } catch (error) {
        console.error('Error fetching roads:', error);
      }
    };

    fetchRoads();
  }, []);

  return (
    <MapContainer center={center} zoom={12} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <RecenterMap center={center} />
      {roads.map((polyline, idx) => (
        <Polyline key={idx} positions={polyline} color="gray" weight={3} />
      ))}
    </MapContainer>
  );
};

export default RoadsOnlyMap;
