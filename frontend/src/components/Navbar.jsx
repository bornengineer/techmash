import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#B71C1C" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
          }}
        >
          TECHMASH 🧑‍💻
        </Typography>
        <Box>
          <Button
            component={Link}
            to="/leaderboard"
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Leaderboard
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
