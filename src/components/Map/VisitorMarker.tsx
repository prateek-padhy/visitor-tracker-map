import {
  Marker,
  MarkerProps,
} from "react-map-gl";
import styled from "styled-components";

const MarkerPill = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 8px 16px;
  padding: 4px 8px;
`;

const Name = styled.span`
  font-size: 12px;
  padding: 4px 8px;
  border-right: 1px solid rgba(255, 255, 255, 0.7);
  color: rgba(255, 255, 255, 1);
`;

const Count = styled.span`
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  color: rgba(255, 255, 255, 1);
`;

type VisitorMarkerProps = MarkerProps & {
  name: string;
  count: number;
};

const VisitorMarker = ({ name, count, children, ...props }: VisitorMarkerProps) => (
  <Marker {...props}>
    <MarkerPill>
      <Name>{name}</Name>
      <Count>{count}</Count>
    </MarkerPill>
  </Marker>

);

export default VisitorMarker
