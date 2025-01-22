import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#B71C1C", mb: "1.5rem" }}>
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
            }}
          >
            <LeaderboardIcon />
            <Typography variant="body1" fontWeight={600} m={"6px 0 0 4px"}>
              Leaderboard
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
