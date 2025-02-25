import styled from "styled-components";

const StyledVisitorControl = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 10px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 4px;
`;

const StyledControlButton = styled.button`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
  padding: 8px;
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
