import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LegoExplorer from "./pages/LegoExplorer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LegoExplorer />} />
          <Route path="*" element={<LegoExplorer />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
