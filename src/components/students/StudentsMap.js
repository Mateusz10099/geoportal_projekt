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
import studenciIcon from "./studenci3.png";
import "./StudentsMap.css";

// Ustawienie ikony studenta
const studentIcon = new L.Icon({
  iconUrl: studenciIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function StudentsMap() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Pobieranie danych z GeoServera w formacie GeoJSON
    axios
      .get(
        "http://localhost:8080/geoserver/prge/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=prge%3Astudenci&maxFeatures=50&outputFormat=application%2Fjson"
      )
      .then((response) => {
        const features = response.data.features;
        const studentsData = features.map((feature) => ({
          id: feature.id.split(".")[1], // Wydobywanie ID z feature.id
          name: feature.properties.name,
          surname: feature.properties.surname,
          city: feature.properties.city,
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
          univesity: feature.properties.univesity,
        }));
        setStudents(studentsData);
      })
      .catch((error) => console.error("Error fetching student data:", error));
  }, []);

  return (
    <div className="students-map-container">
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
        {students.map((student) => (
          <Marker
            key={student.id}
            position={[student.latitude, student.longitude]}
            icon={studentIcon}
          >
            <Popup>
              {student.name} {student.surname} <br /> {student.univesity}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="student-info">
        <h2>Zarządzanie studentami</h2>
        <img src={studenciIcon} alt="Studenci" className="student-icon" />
        <div className="student-table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Miasto</th>
                <th>Uczelnia</th> {/* Dodano nagłówek */}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.surname}</td>
                  <td>{student.city}</td>
                  <td>{student.univesity}</td> {/* Dodano kolumnę */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/" className="student-button">
          Powrót do menu
        </Link>
      </div>
    </div>
  );
}

export default StudentsMap;
