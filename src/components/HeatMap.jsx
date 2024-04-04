import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import countiesData from "../assets/kenya.geojson.json";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../utils/ContextProvider";

const HeatMap = () => {
  const kenyaCenter = [-1.2921, 36.8219];
  const kenyaZoom = 7;

  const navigate = useNavigate();
  const { setSelectedCounty } = useStateContext();

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        navigate(`/ken/${feature.properties.COUNTY_COD}`, { state: { countyName: feature.properties.COUNTY_NAM.toLowerCase() } });
        setSelectedCounty({ countyName: feature.properties.COUNTY_NAM.toLowerCase(), countyCode: feature.properties.COUNTY_COD });
      },
    });
  };

  const getColor = (countyName) => {
    // color is retrieved from prediction on malaria incidence
  };

  const getFeatureColor = (feature) => ({
    fillColor: getColor(feature.properties.COUNTY_NAM),
    // fillColor: "#f03b20",
    weight: 1,
    opacity: 1,
    color: "teal",
    dashArray: "3",
    fillOpacity: 0.3,
  });

  const { center, zoom } = {
    center: kenyaCenter,
    zoom: kenyaZoom,
  };

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <GeoJSON data={countiesData} style={getFeatureColor} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default HeatMap;
