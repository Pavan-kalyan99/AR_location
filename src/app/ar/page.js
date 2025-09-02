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

  if (!ready || !coords) {
    return <p className="text-center mt-10">Fetching GPS & loading AR...</p>;
  }

  return (
    <main className="h-screen w-screen">
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; gpsMinDistance: 5; gpsTimeInterval: 5000;"
      >
        {/* Dynamic red box at current location */}
        <a-box
          gps-entity-place={`latitude: ${coords.lat}; longitude: ${coords.lon};`}
          color="red"
          scale="10 10 10"
        ></a-box>

        {/* Example: object 10m north of user */}
        <a-sphere
          gps-entity-place={`latitude: ${coords.lat + 0.0001}; longitude: ${coords.lon};`}
          color="blue"
          scale="5 5 5"
        ></a-sphere>

        <a-camera gps-camera rotation-reader></a-camera>
      </a-scene>
    </main>
  );
}
