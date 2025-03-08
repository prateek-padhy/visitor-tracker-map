import { useState, useEffect } from "react";
import styled from "styled-components";
import { Country } from "../../types/country";
import { fetchCountries } from "../../services/countryService";

const StyledAddVisitorOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 320px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(0, 0, 0, 1);
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: rgba(67, 88, 113, 1);
    box-shadow: 0 0 0 2px rgba(67, 88, 113, 0.1);
  }

  & option {
    background-color: rgba(255, 255, 255, 1);
    color: rgba(0, 0, 0, 1);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(0, 0, 0, 1);

  &:focus {
    outline: none;
    border-color: rgba(67, 88, 113, 1);
    box-shadow: 0 0 0 2px rgba(67, 88, 113, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid
    ${(props) => (props.primary ? "rgba(67, 88, 113, 1)" : "#ddd")};
  background-color: ${(props) =>
    props.primary ? "rgba(67, 88, 113, 1)" : "white"};
  color: ${(props) => (props.primary ? "white" : "#333")};

  &:hover {
    background-color: ${(props) =>
      props.primary ? "rgba(67, 88, 113, 0.9)" : "#f5f5f5"};
  }
`;

const Title = styled.h3`
  margin: 0 0 24px 0;
  font-size: 18px;
  color: #333;
`;

type AddVisitorOverlayProps = {
  onAddVisitor: (
    country: string,
    count: number,
    coordinates: [number, number]
  ) => void;
  onClose: () => void;
};

const AddVisitorOverlay = ({
  onAddVisitor,
  onClose,
}: AddVisitorOverlayProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [visitorCount, setVisitorCount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
      setLoading(false);
    };
    loadCountries();
  }, []);

  const handleAddVisitor = () => {
    const country = countries.find((c) => c.name.common === selectedCountry);
    if (country) {
      onAddVisitor(selectedCountry, visitorCount, country.latlng);
    }
  };

  return (
    <StyledAddVisitorOverlay>
      <Title>Add New Visitor</Title>
      <FormGroup>
        <Label htmlFor="country">Country</Label>
        <Select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          disabled={loading}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.cca2} value={country.name.common}>
              {country.name.common}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="visitors">Number of Visitors</Label>
        <Input
          id="visitors"
          type="number"
          min="1"
          value={visitorCount}
          onChange={(e) => setVisitorCount(Number(e.target.value))}
        />
      </FormGroup>
      <ButtonGroup>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          primary
          onClick={handleAddVisitor}
          disabled={!selectedCountry || loading}
        >
          Add Visitor
        </Button>
      </ButtonGroup>
    </StyledAddVisitorOverlay>
  );
};

export default AddVisitorOverlay;
