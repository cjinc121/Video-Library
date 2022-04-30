import "./App.css";
import Mockman from "mockman-js";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage/Homepage";
import { Header } from "./components/Header/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Footer } from "./components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/mockman" element={<Mockman />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
