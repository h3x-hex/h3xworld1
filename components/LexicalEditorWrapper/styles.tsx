import styled from "@emotion/styled";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

export const MuiContentEditable = styled(ContentEditable)({
  height: "100%",
  width: "100%",
  padding: "0 8px",
  borderRadius: 5,
  paddingTop: 2,
  paddingLeft: 10,
  position: "relative",
  outline: "none",
});

export const placeHolderSx = {
  position: "absolute",
  top: 0,
  left: 10,
  userSelect: "none",
  display: "inline-block",
  pointerEvents: "none",
};
