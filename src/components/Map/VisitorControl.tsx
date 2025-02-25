import styled from "styled-components";

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
  font-size: 16px;
`;

type VisitorControlProps = {
  onShowAddVisitor?: () => void;
  onShowVisitors?: () => void;
};

const VisitorControl = ({
  onShowAddVisitor,
  onShowVisitors,
}: VisitorControlProps) =>  (
    <StyledVisitorControl className="visitor-control">
      <StyledControlButton
        onClick={() => {
          onShowAddVisitor?.();
        }}
      >
        ➕
      </StyledControlButton>
      <StyledControlButton
        onClick={() => {
          onShowVisitors?.();
        }}
      >
        👁️‍🗨️
      </StyledControlButton>
    </StyledVisitorControl>
  );

export default VisitorControl;
