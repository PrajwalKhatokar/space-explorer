import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const issIcon = new L.Icon({
  iconUrl: "https://i.sstatic.net/xp8Ck.png",
  iconSize: [35, 35],
});

function ISSMap({ lat, lon }) {

  const [path, setPath] = useState([]);
  const [position, setPosition] = useState([lat, lon]);

  useEffect(() => {

    if (lat && lon) {
      setPosition([lat, lon]);
      setPath((prev) => [...prev, [lat, lon]]);
    }

  }, [lat, lon]);

  return (
    <MapContainer
      center={position}
      zoom={3}
      style={{
        height: "420px",
        width: "100%",
        marginTop: "40px",
        borderRadius: "12px"
      }}
    >

      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position} icon={issIcon}>
        <Popup>
          🛰 International Space Station <br />
          Lat: {Number(lat).toFixed(2)} <br />
          Lon: {Number(lon).toFixed(2)}
        </Popup>
      </Marker>

      <Polyline positions={path} color="cyan" />

    </MapContainer>
  );
}

export default ISSMap;