"use client";
import { useEffect, useState } from "react";

export default function ARPage() {
  const [coords, setCoords] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Dynamically load A-Frame and AR.js from public folder
    const loadScripts = () => {
      // Load aframe.min.js
      const aframeScript = document.createElement("script");
      aframeScript.src = "/arjs/aframe.min.js"; // Public folder path
      aframeScript.onload = () => {
        // Load aframe-ar.js after aframe is ready
        const arScript = document.createElement("script");
        arScript.src = "/arjs/aframe-ar.js"; // Public folder path
        arScript.onload = () => setReady(true);
        document.body.appendChild(arScript);
      };
      document.body.appendChild(aframeScript);
    };

    loadScripts();

    // Get GPS position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => console.error("GPS error", err),
      { enableHighAccuracy: true }
    );
  }, []);
  console.log("cor::", coords);

  if (!ready || !coords) {
    return <p className="text-center mt-10">Fetching GPS & loading AR...</p>;
  }

  return (
    <main className="h-screen w-screen relative">
      {/* Centered overlay */}
      {coords && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                 bg-white bg-opacity-80 px-6 py-4 rounded-xl shadow-xl z-50 text-center"
        >
          <p className="font-bold text-lg">📍 Your Location</p>
          <p className="text-sm">Latitude: {coords.lat.toFixed(6)}</p>
          <p className="text-sm">Longitude: {coords.lon.toFixed(6)}</p>
        </div>
      )}

      {/* AR scene */}
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; gpsMinDistance: 5; gpsTimeInterval: 5000;"
      >
        {/* Marker-based AR (for desktop test) */}
        <a-marker preset="hiro">
          <a-box color="red" scale="0 0 0"></a-box>
        </a-marker>

        {/* GPS-based AR (for mobile) */}
        {coords && (
          <>
            {/* Red box */}
            <a-box
              gps-entity-place={`latitude: ${coords.lat}; longitude: ${coords.lon};`}
              color="red"
              scale="4 4 4"
            ></a-box>

            {/* Blue sphere */}
            <a-sphere
              gps-entity-place={`latitude: ${coords.lat}; longitude: ${coords.lon};`}
              color="blue"
              scale="5 5 5"
            />

            {/* Sample 3D model */}
            {/* <a-entity
              gps-entity-place={`latitude: ${coords.lat}; longitude: ${coords.lon};`}
              gltf-model="/models/plane.glb"
              scale="10 10 10"
              rotation="0 180 0"
              crossorigin="anonymous"
            ></a-entity> */}
          </>
        )}
        {/* Fallback test object always in front of camera */}
        <a-entity position="0 0 -5">
          <a-box color="green" scale="2 2 2"></a-box>
        </a-entity>
        {/* Single camera */}
        <a-camera gps-camera rotation-reader></a-camera>
      </a-scene>
    </main>
  );
}
