import { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/all?fields=name,latlng,cca2,flags`
    );
    if (!response.ok) throw new Error('Failed to fetch countries');
    const data: Country[] = await response.json();
    return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};
