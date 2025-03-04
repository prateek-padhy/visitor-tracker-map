import Map from "./components/Map/VisitorMap";
import "mapbox-gl/dist/mapbox-gl.css";

import { VisitorProvider } from "./contexts/VisitorContext";

function App() {
  return (
    <VisitorProvider>
      <Map />
    </VisitorProvider>
  );
}

export default App;
