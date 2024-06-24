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
import pracownicyIcon from "./pracownicy.png";
import "./EmployeeMap.css";

// Ustawienie ikony pracownika
const employeeIcon = new L.Icon({
  iconUrl: pracownicyIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function EmployeeMap() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Pobieranie danych z GeoServera w formacie GeoJSON
    axios
      .get(
        "http://localhost:8080/geoserver/prge/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=prge%3Apracownicy&maxFeatures=50&outputFormat=application%2Fjson"
      )
      .then((response) => {
        const features = response.data.features;
        const employeesData = features.map((feature) => ({
          id: feature.id.split(".")[1], // Wydobywanie ID z feature.id
          name: feature.properties.name,
          surname: feature.properties.surname,
          birthDate: feature.properties.birthdate.replace("Z", ""), // Usuwanie "Z"
          city: feature.properties.city,
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
          university: feature.properties.university,
        }));
        setEmployees(employeesData);
      })
      .catch((error) => console.error("Error fetching employee data:", error));
  }, []);

  return (
    <div className="employee-map-container">
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
        {employees.map((emp) => (
          <Marker
            key={emp.id}
            position={[emp.latitude, emp.longitude]}
            icon={employeeIcon}
          >
            <Popup>
              {emp.name} {emp.surname} <br /> {emp.university}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="employee-info">
        <h2>Zarządzanie pracownikami</h2>
        <img src={pracownicyIcon} alt="Pracownicy" className="employee-icon" />
        <div className="employee-table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Data urodzenia</th>
                <th>Miasto</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.surname}</td>
                  <td>{emp.birthDate}</td>
                  <td>{emp.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/" className="employee-button">
          Powrót do menu
        </Link>
      </div>
    </div>
  );
}

export default EmployeeMap;
