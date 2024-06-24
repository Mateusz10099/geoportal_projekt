import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import uczelnieIcon from "./uczelnie.png";
import "./UniversitiesMap.css";

// Ustawienie ikony uczelni
const universityIcon = new L.Icon({
  iconUrl: uczelnieIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function UniversitiesMap() {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    // Pobieranie danych z GeoServera w formacie GeoJSON
    axios
      .get(
        "http://localhost:8080/geoserver/prge/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=prge%3Auczelnie&maxFeatures=50&outputFormat=application%2Fjson"
      )
      .then((response) => {
        const features = response.data.features;
        const universitiesData = features.map((feature) => ({
          id: feature.id.split(".")[1], // Wydobywanie ID z feature.id
          name: feature.properties.name,
          city: feature.properties.city,
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
        }));
        setUniversities(universitiesData);
      })
      .catch((error) =>
        console.error("Error fetching university data:", error)
      );
  }, []);

  return (
    <div className="universities-map-container">
      <MapContainer
        center={[52.237049, 21.017532]}
        zoom={7}
        style={{ height: "100vh", width: "70%" }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Maps">
            <TileLayer
              attribution="&copy; Google"
              url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Satellite">
            <TileLayer
              attribution="&copy; Google"
              url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {universities.map((uni) => (
          <Marker
            key={uni.id}
            position={[uni.latitude, uni.longitude]}
            icon={universityIcon}
          >
            <Popup>
              {uni.name} <br /> {uni.city}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="university-info">
        <h2>Zarządzanie uczelniami</h2>
        <img src={uczelnieIcon} alt="Uczelnie" className="university-icon" />
        <div className="university-table-container">
          <table className="university-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nazwa</th>
                <th>Miasto</th>
              </tr>
            </thead>
            <tbody>
              {universities.map((uni) => (
                <tr key={uni.id}>
                  <td>{uni.id}</td>
                  <td>{uni.name}</td>
                  <td>{uni.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/" className="university-button">
          Powrót do menu
        </Link>
      </div>
    </div>
  );
}

export default UniversitiesMap;
