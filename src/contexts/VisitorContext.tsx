import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseTable = "Visitor";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Supabase URL: ", supabaseUrl);

interface Visitor {
  country: string;
  count: number;
  latitude: number;
  longitude: number;
}

interface VisitorContextType {
  visitors: Visitor[];
  addVisitor: ({
    count,
    country,
    latitude,
    longitude,
  }: Visitor) => Promise<void>;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

export function VisitorProvider({ children }: { children: ReactNode }) {
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  const fetchVisitors = async () => {
    const { data: visitors, error } = await supabase
      .from(supabaseTable)
      .select("*");

    if (error) {
      console.error("Error fetching visitors:", error);
      return;
    }

    console.log("Visitors: ", visitors);

    if (visitors) {
      setVisitors(visitors);
    }
  };

  const addVisitor = async ({
    count,
    country,
    latitude,
    longitude,
  }: Visitor) => {
    const { error } = await supabase
      .from(supabaseTable)
      .insert([{ country, count, latitude, longitude }]);

    if (error) {
      console.error("Error adding visitor:", error);
      return;
    }

    setVisitors((prevVisitors) => [
      ...prevVisitors,
      { country, count, latitude, longitude },
    ]);
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <VisitorContext.Provider value={{ visitors, addVisitor }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitors() {
  const context = useContext(VisitorContext);
  if (context === undefined) {
    throw new Error("useVisitors must be used within a VisitorProvider");
  }
  return context;
}
