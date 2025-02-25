export interface Country {
  name: {
    common: string;
    official: string;
  };
  latlng: [number, number];
  cca2: string;
  flags: {
    png: string;
    svg: string;
  };
}
