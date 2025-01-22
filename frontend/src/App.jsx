import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PairVoting from "./components/PairVoting";
import Leaderboard from "./components/Leaderboard";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <Navbar />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<PairVoting />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
