import React, { useEffect, useState } from "react";
import { getNasaImage } from "../services/nasaService";
import { getISSLocation } from "../services/issService";
import { getLatestLaunch } from "../services/spacexService";
import { getAstronauts } from "../services/astronautService";
import ISSMap from "../components/ISSMap";

import "../App.css";

function Dashboard() {

  const [nasa, setNasa] = useState(null);
  const [iss, setIss] = useState(null);
  const [launch, setLaunch] = useState(null);
 const [astronauts, setAstronauts] = useState([]);


  useEffect(() => {

    getNasaImage().then((data) => {
      setNasa(data);
    });

    getISSLocation().then((data) => {
      setIss(data.iss_position);
    });

    getLatestLaunch().then((data) => {
      setLaunch(data);
    });

   getAstronauts().then((data) => {
  setAstronauts(data?.people || []);
});

    const interval = setInterval(() => {
      getISSLocation().then((data) => {
        setIss(data.iss_position);
      });
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="dashboard">

      <div className="cards-container">

        {/* NASA */}
<div className="card">
  <h3>🌌 NASA Image</h3>

  {nasa ? (
    <div>
      <img
        src={
          nasa.media_type === "image"
            ? nasa.url
            : nasa.thumbnail_url
        }
        alt="NASA APOD"
        style={{ width: "100%", borderRadius: "8px" }}
      />

      <p>{nasa.title}</p>
    </div>
  ) : (
    <p>Loading NASA image...</p>
  )}
</div>
        {/* ISS */}
        <div className="card">
          <h3>🌍 ISS Location</h3>

          {iss && (
            <div>
              <p>Latitude: {Number(iss.latitude).toFixed(2)}</p>
              <p>Longitude: {Number(iss.longitude).toFixed(2)}</p>
            </div>
          )}
        </div>

        {/* SpaceX */}
        <div className="card">
          <h3>🚀 SpaceX Launch</h3>

          {launch && (
            <div>
              <p>Mission: {launch.name}</p>
              <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        {/* Astronauts */}
        <div className="card">
          <h3>👨‍🚀 Astronauts</h3>

          {astronauts.length > 0 ? (
  astronauts.map((astro, index) => (
    <p key={index}>{astro.name}</p>
  ))
) : (
  <p>Loading astronauts...</p>
)}
        </div>

      </div>

      <h2 className="tracker-title">🌍 Live ISS Tracker</h2>

      {iss && (
        <ISSMap lat={iss.latitude} lon={iss.longitude} />
      )}

    </div>
  );
}

export default Dashboard;