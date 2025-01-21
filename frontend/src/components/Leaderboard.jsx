import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import { fetchLeaderboard } from "../services/api"; // Assuming you have the API service set up

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLeaderboard(limit);
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit]);

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold", color: "#B71C1C" }}
      >
        Leaderboard
      </Typography>

      {/* Table */}
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <CircularProgress color="error" />
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{ maxWidth: 800, margin: "0 auto", boxShadow: 3 }}
          >
            <Table>
              <TableHead sx={{ borderBottom: "3px solid #00000015" }}>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    Rank
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    Rating
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard?.data?.data?.map((player, index) => (
                  <TableRow key={player.name} hover>
                    <TableCell align="center" sx={{ fontSize: "0.9rem" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {player.name}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "0.9rem" }}>
                      {player.rating}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {leaderboard?.data?.data?.length < leaderboard?.data?.totalCount && (
            <Button
              onClick={() => {
                setLimit((prev) => prev + 10);
              }}
              variant="standard"
              sx={{ color: "#2da1bc" }}
            >
              Show more...
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default Leaderboard;
