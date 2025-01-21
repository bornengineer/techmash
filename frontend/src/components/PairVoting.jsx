import React, { useState, useEffect } from "react";
import { fetchRandomPair, submitRating } from "../services/api";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Stack,
  Container,
  Box,
} from "@mui/material";

function PairVoting() {
  const [pair, setPair] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voteInProgress, setVoteInProgress] = useState(false);

  useEffect(() => {
    fetchNewPair();
  }, []);

  const fetchNewPair = async () => {
    setLoading(true);
    try {
      const randomPair = await fetchRandomPair();
      setPair(randomPair);
    } catch (error) {
      console.error("Error fetching pair:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (winnerId, loserId) => {
    try {
      setVoteInProgress(true);
      await submitRating(winnerId, loserId);
      fetchNewPair(); // Fetch a new pair after voting
    } catch (error) {
      console.error("Error submitting vote:", error);
    } finally {
      setVoteInProgress(false);
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <Container sx={{ overflowX: "hidden" }}>
      <Stack
        minHeight={{ xs: "90vh", sm: "80vh" }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h5"
          sx={{ mb: 1, fontWeight: 600, textAlign: "center" }}
        >
          Which one's a better programming language?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: { xs: 3, sm: 8 },
            textAlign: "center",
            color: "#2da1bc",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => {
            fetchNewPair();
          }}
        >
          Not sure? Refresh choices!
        </Typography>

        <Stack
          flexDirection={{
            xs: "column",
            sm: "row",
          }}
          minHeight={{ xs: "70vh", sm: "35vh" }}
          gap={{ xs: 1.5, sm: 3 }}
          justifyContent="center"
          alignItems="center"
        >
          {loading ? (
            <CircularProgress color="error" />
          ) : (
            <>
              {voteInProgress && (
                <Stack
                  sx={{
                    position: "absolute",
                    height: "70vh",
                    width: "90vw",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "100",
                    backdropFilter: "blur(3px)",
                  }}
                >
                  <CircularProgress color="success" />
                </Stack>
              )}
              {pair?.data?.map((player, index) => (
                <Stack
                  flexDirection={{ xs: "column", sm: "row" }}
                  alignItems="center"
                  gap={{ xs: 1.5, sm: 3 }}
                  item
                  key={player.id}
                >
                  <Card
                    sx={{
                      position: "relative",
                      cursor: "pointer",
                      "&:hover .hoverOverlay": {
                        display: "flex",
                      },
                    }}
                    onClick={() =>
                      handleVote(player.id, pair?.data?.[1 - index].id)
                    }
                  >
                    <CardMedia
                      component="img"
                      alt={player.name}
                      height="200"
                      sx={{ objectFit: "cover" }}
                      image={`data:image/jpeg;base64,${arrayBufferToBase64(
                        player.image.data
                      )}`}
                    />
                    <Box
                      className="hoverOverlay"
                      sx={{
                        display: "none",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography variant="h5">Vote for</Typography>
                      <Typography
                        variant="h5"
                        fontWeight={600}
                        textTransform={"capitalize"}
                      >
                        "{player.name}"
                      </Typography>
                    </Box>
                    <CardContent sx={{ padding: "12px !important" }}>
                      <Typography
                        variant="h6"
                        component="div"
                        textAlign={"center"}
                        textTransform={"capitalize"}
                      >
                        {player.name}
                      </Typography>
                    </CardContent>
                  </Card>
                  {index === 0 && <Typography fontWeight={600}>OR</Typography>}
                </Stack>
              ))}
            </>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

export default PairVoting;
