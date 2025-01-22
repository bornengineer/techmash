import { Link, Stack, Typography } from "@mui/material";
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
        flexDirection: "row",
        gap: 1,
      }}
    >
      <Typography sx={{ color: "grey" }}>Made with ❣️ by </Typography>
      <Link
        href="https://github.com/bornengineer"
        sx={{ fontSize: "17px", color: "grey" }}
        target="_blank"
      >
        MAK
      </Link>
    </Stack>
  );
};

export default Footer;
