/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import carIcon from "../../assets/carIcon.png";
import { useEffect } from "react";
/* cspell:disable-next-line */
import "leaflet-rotatedmarker";
import { useMapContext } from "./MapContext";

const carMarkerIcon = L.icon({
  iconUrl: carIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, 0],
});

function Map() {
  const {
    carPosition,
    rotation,
    displayPathOnMap,
    routePoints,
    isSidePanelOpen,
  } = useMapContext();

  const MapViewUpdater = ({
    position,
    isSidePanelOpen,
  }: {
    position: LatLngExpression;
    isSidePanelOpen: boolean;
  }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position);
    }, [position, map]);
    useEffect(() => {
      map.invalidateSize();
    }, [isSidePanelOpen, map]);
    return null;
  };

  return (
    <div className="flex-grow border">
      <MapContainer
        className="w-full h-full border z-0"
        center={carPosition}
        zoom={16}
        scrollWheelZoom={false}
      >
        <MapViewUpdater
          position={carPosition}
          isSidePanelOpen={isSidePanelOpen}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={carPosition}
          icon={carMarkerIcon}
          rotationAngle={rotation}
          key={rotation}
        >
          <Popup>
            <div>
              <p>Lat : {carPosition[0]}</p>
              <p>Lon : {carPosition[1]}</p>
            </div>
          </Popup>
        </Marker>
        {displayPathOnMap && routePoints && (
          <Polyline pathOptions={{ color: "red" }} positions={routePoints} />
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
