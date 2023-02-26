import * as React from "react";
import { CircularProgress, Box } from "@mui/material";
import styled from "styled-components";

export default function GeneratingSpinner(props) {
  return (
    <Box
      sx={{ display: "flex" }}
      style={{ display: "grid", placeItems: "center", height: "70vh" }}
    >
      <Center>
        <CircularProgress size={80} color="primary" />
        {props.children ?? "Generating your plan...."}
      </Center>
    </Box>
  );
}

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;
