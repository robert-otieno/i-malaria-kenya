import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const HeatMap = ({ data, selectedCounty }) => {
  const kenyaCenter = [-1.2921, 36.8219];
  const kenyaZoom = 7;

  const countyCoordinates = {
    Baringo: { center: [0.5565, 36.0899], zoom: 9 },
    Bomet: { center: [-0.7823, 35.3349], zoom: 9 },
    // Add more counties as needed
  };

  const { center, zoom } = countyCoordinates[selectedCounty] || {
    center: kenyaCenter,
    zoom: kenyaZoom,
  };

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

export default HeatMap;
