import { useRef, useState } from "react";
import Map, {
  NavigationControl,
  FullscreenControl,
  MapRef,
} from "react-map-gl";
import { useVisitors } from "../../contexts/VisitorContext";
import VisitorMarker from "./VisitorMarker";
import AddVisitorOverlay from "./AddVisitorOverlay";
import VisitorControl from "./VisitorControl";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = import.meta.env.VITE_MAPBOX_KEY!;

const VisitorMap = () => {
  const mapRef = useRef<MapRef>(null);
  
  const { visitors, addVisitor } = useVisitors();

  const [showAddVisitor, setShowAddVisitor] = useState(false);
  const [showVisitors, setShowVisitors] = useState(true);

  const handleAddVisitor = async (
    country: string,
    count: number,
    coordinates: [number, number]
  ) => {
    await addVisitor({count, country, latitude: coordinates[0], longitude: coordinates[1]});
    mapRef.current?.flyTo({
      center: [coordinates?.[1], coordinates?.[0]],
      zoom: 8,
    });
    setShowAddVisitor(false);
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: -2.2544,
        latitude: 53.4774,
        zoom: 15,
      }}
      mapboxAccessToken={TOKEN}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/light-v10"
      projection={{
        name: "globe",
      }}
    >
      <NavigationControl position="top-right" />
      <FullscreenControl position="top-right" />
      <VisitorControl
        onShowAddVisitor={() => setShowAddVisitor(!showAddVisitor)}
        onShowVisitors={() => setShowVisitors(!showVisitors)}
      />

      {showAddVisitor && (
        <AddVisitorOverlay
          onClose={() => setShowAddVisitor(false)}
          onAddVisitor={handleAddVisitor}
        />
      )}

      {showVisitors &&
        visitors.map((visitor) => (
          <VisitorMarker
            key={visitor.country}
            name={visitor.country}
            count={visitor.count}
            longitude={visitor.longitude}
            latitude={visitor.latitude}
          />
        ))}
    </Map>
  );
};

export default VisitorMap;
