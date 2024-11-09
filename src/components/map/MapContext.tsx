import { createContext, useContext, useState, ReactNode } from "react";

type MapContextType = {
  carPosition: [number, number];
  setCarPosition: (position: [number, number]) => void;
  rotation: number;
  setRotation: (angle: number) => void;
  displayPathOnMap: boolean;
  setDisplayPathOnMap: (show: boolean) => void;
  routePoints?: [number, number][];
  setRoutePoints?: (userLocation: [number, number][] | undefined) => void;
  isSidePanelOpen: boolean;
  setIsSidePanelOpen: (open: boolean) => void;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [carPosition, setCarPosition] = useState<[number, number]>([
    35.73366, 51.43519,
  ]);
  const [rotation, setRotation] = useState(0);
  const [showPath, setShowPath] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  const [userLocations, setUserLocations] = useState<
    [number, number][] | undefined
  >(undefined);

  return (
    <MapContext.Provider
      value={{
        carPosition,
        setCarPosition,
        rotation,
        setRotation,
        routePoints: userLocations,
        setRoutePoints: setUserLocations,
        displayPathOnMap: showPath,
        setDisplayPathOnMap: setShowPath,
        isSidePanelOpen,
        setIsSidePanelOpen,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
