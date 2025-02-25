import { useRef, useState } from "react";
import Map, {
  NavigationControl,
  FullscreenControl,
  useMap,
  MapRef,
} from "react-map-gl";

import VisitorMarker from "./VisitorMarker";
import AddVisitorOverlay from "./AddVisitorOverlay";
import VisitorControl from "./VisitorControl";

import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN =
  "pk.eyJ1IjoicHJhdGVlay1wYWRoeSIsImEiOiJjbTc5Z2ptMGwwNDRyMnJzYm1hM3lweW01In0.XtTCyFimo951D2wU1V0mkA";

interface Visitor {
  country: string;
  count: number;
  coordinates: [number, number];
}

const VisitorMap = () => {
  const mapRef = useRef<MapRef>(null);

  const [showAddVisitor, setShowAddVisitor] = useState(false);
  const [showVisitors, setShowVisitors] = useState(true);
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  const addVisitor = (
    country: string,
    count: number,
    coordinates: [number, number]
  ) => {
    setVisitors((prev) => {
      const countryIndex = prev.findIndex((v) => v.country === country);
      if (countryIndex === -1) {
        return [
          ...prev,
          {
            country,
            count,
            coordinates: [coordinates?.[1], coordinates?.[0]],
          },
        ];
      }

      const updatedVisitors = [...prev];
      updatedVisitors[countryIndex].count += count;
      return updatedVisitors;
    });

    mapRef.current?.flyTo({center: [ coordinates?.[1], coordinates?.[0] ], zoom: 8});

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
          onAddVisitor={addVisitor}
        />
      )}

      {showVisitors &&
        visitors.map((visitor) => (
          <VisitorMarker
            key={visitor.country}
            name={visitor.country}
            count={visitor.count}
            longitude={visitor.coordinates[0]}
            latitude={visitor.coordinates[1]}
          />
        ))}
    </Map>
  );
};

export default VisitorMap;
