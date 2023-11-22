import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import countiesData from "../assets/kenya.geojson.json";

const HeatMap = () => {
  const kenyaCenter = [-1.2921, 36.8219];
  const kenyaZoom = 7;

  const [selectedCounty, setSelectedCounty] = useState(null);

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        setSelectedCounty(feature.properties.COUNTY_NAM);
      },
    });
  };

  const getColor = (x) => {
    return x > 1000 ? "#f03b20" : x > 500 ? "#feb24c" : "#ffeda0";
  };

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const getFeatureStyle = (feature) => {
    return {
      fillColor: getColor(getRndInteger(1, 1000)),
      weight: 1,
      opacity: 1,
      color: "teal",
      dashArray: "3",
      fillOpacity: 0.6,
    };
  };

  const { center, zoom } = {
    center: kenyaCenter,
    zoom: kenyaZoom,
  };

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={countiesData} style={getFeatureStyle} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default HeatMap;
