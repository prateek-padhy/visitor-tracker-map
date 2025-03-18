import styled from "styled-components";
import {CirclePlus, Eye, EyeOff} from 'lucide-react'

const StyledVisitorControl = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 10px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 4px;
    box-shadow: 0 0 0 2px rgba(0,0,0,.1);
`;

const StyledControlButton = styled.button`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
  padding: 8px;
`;

type VisitorControlProps = {
  showVisitors?: boolean;
  onShowAddVisitor?: () => void;
  onShowVisitors?: () => void;
};

const VisitorControl = ({
  showVisitors,
  onShowAddVisitor,
  onShowVisitors,
}: VisitorControlProps) =>  (
    <StyledVisitorControl className="visitor-control">
      <StyledControlButton
        onClick={() => {
          onShowAddVisitor?.();
        }}
      >
        <CirclePlus color='#5a32a8'/>
      </StyledControlButton>
      <StyledControlButton
        onClick={() => {
          onShowVisitors?.();
        }}
      >
        {showVisitors ? <Eye color='#5a32a8'/> : <EyeOff color='#a8325a' />}
      </StyledControlButton>
    </StyledVisitorControl>
  );

export default VisitorControl;
