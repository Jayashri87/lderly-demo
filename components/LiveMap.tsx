"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow, Polyline } from "@react-google-maps/api";
import { useJsApiLoader } from "@react-google-maps/api";
import { JourneyService, LocationMap } from "../services/journeyService";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
};

const defaultCenter = {
  lat: 12.9352,
  lng: 77.6245,
};

export default function LiveMap() {
  const [locations, setLocations] = useState<LocationMap | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    const unsub = JourneyService.subscribeToLocations((data) => {
      setLocations(data);
      if (data?.caretaker && data?.user) {
        const midLat = (data.caretaker.latitude + data.user.latitude) / 2;
        const midLng = (data.caretaker.longitude + data.user.longitude) / 2;
        setMapCenter({ lat: midLat, lng: midLng });
      }
    });

    return () => unsub();
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  if (!locations) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
        <p className="text-gray-600">No location data available</p>
      </div>
    );
  }

  const caretakerPos = {
    lat: locations.caretaker.latitude,
    lng: locations.caretaker.longitude,
  };

  const userPos = {
    lat: locations.user.latitude,
    lng: locations.user.longitude,
  };

  return (
    <div className="w-full rounded-xl overflow-hidden shadow">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={14}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        <Polyline
          path={[caretakerPos, userPos]}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.7,
            strokeWeight: 2,
          }}
        />

        <Marker
          position={caretakerPos}
          onClick={() => setSelectedMarker("caretaker")}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#3B82F6",
            fillOpacity: 1,
            strokeColor: "#1E40AF",
            strokeWeight: 2,
          }}
        >
          {selectedMarker === "caretaker" && (
            <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
              <div className="text-sm">
                <p className="font-semibold">Caretaker</p>
                <p>{locations.caretaker.latitude.toFixed(4)}</p>
                <p>{locations.caretaker.longitude.toFixed(4)}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>

        <Marker
          position={userPos}
          onClick={() => setSelectedMarker("user")}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#10B981",
            fillOpacity: 1,
            strokeColor: "#047857",
            strokeWeight: 2,
          }}
        >
          {selectedMarker === "user" && (
            <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
              <div className="text-sm">
                <p className="font-semibold">Your Location</p>
                <p>{locations.user.latitude.toFixed(4)}</p>
                <p>{locations.user.longitude.toFixed(4)}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    </div>
  );
}
