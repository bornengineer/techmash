import { Stack, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Stack
      sx={{
        height: "40px",
        bottom: "0px",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        mt: "0.5rem",
      }}
    >
      <Typography sx={{ color: "grey" }}>Made with ❣️ by Amaan</Typography>
    </Stack>
  );
};

export default Footer;
