import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken = "pk.eyJ1Ijoicm9iZXJ0LW90aWVubyIsImEiOiJjbDZjMzc5MngwMHB3M2tuaXlkbWM2cDF1In0.IRo6CjTJCnlYHj0e-I9AEA";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 14,
        attributionControl: false,
      });

      new mapboxgl.Marker().setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map.current);

      const nav = new mapboxgl.NavigationControl();
      map.current.addControl(nav, "bottom-right");

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: "Where to?",
      });

      map.current.addControl(geocoder, "top-left");

      // const customAttributionControl = new mapboxgl.AttributionControl({
      //   customAttribution: "Joy Mwamsidu",
      // });
      // map.current.addControl(customAttributionControl, "top-right");
    });
  }, []);

  return (
    <main>
      <div className="max-w-7xl mx-auto">
        {/* <!-- Replace with your content --> */}
        <div className="">
          <div className="h-96">
            <div ref={mapContainer} className="relative h-full" />
          </div>
        </div>
        {/* <!-- /End replace --> */}
      </div>
    </main>
  );
};

export default Map;
