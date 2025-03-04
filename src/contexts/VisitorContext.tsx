import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseTable = "Visitor";
const supabaseUrl = "https://otrbejvtipnfsbdpcdxy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90cmJlanZ0aXBuZnNiZHBjZHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNDQxOTQsImV4cCI6MjA1NjYyMDE5NH0.0HRwxWWicut38DZvsa5Zl6rNXZkA1eK5Q7pQq2GFojw";
const supabase = createClient(supabaseUrl, supabaseKey);

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
