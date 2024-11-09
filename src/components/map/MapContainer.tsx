import LocationForm from "./LocationForm";
import Map from "./Map";
import { MapProvider } from "./MapContext";

export default function MapContainer() {
  return (
    <MapProvider>
      <div className="flex h-screen w-screen">
        <div className="z-10 relative h-full ">
          <LocationForm />
        </div>
        <Map />
      </div>
    </MapProvider>
  );
}
