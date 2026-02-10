import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LegoExplorer from "./pages/LegoExplorer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LegoExplorer />} />
        <Route path="*" element={<LegoExplorer />} />
      </Routes>
    </Router>
  );
}

export default App;
