import React, { ReactElement } from "react";
import { Container, Box } from "@material-ui/core";
import { Login } from "features/Login";

function HomePage(): ReactElement {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        height="100vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Login />
      </Box>
    </Container>
  );
}

export default HomePage;
