import "./App.css";
import Mockman from "mockman-js";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage/Homepage";
import { Header } from "./components/Header/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Footer } from "./components/Footer/Footer";
import { VideoPage } from "./pages/VideoPage/VideoPage";
import { LoginPage } from "./pages/AuthPage/Loginpage";
import { Profile } from "./pages/AuthPage/Profile";
import { PrivateRoute } from "./routes/PrivateRoute";
import { Playlists } from "./pages/PlaylistsPage/PlaylistsPage";
import PlaylistPage from "./pages/PlaylistPage/PlaylistPage";
import Errorpage from "./pages/Errorpage";
import { WatchLater } from "./pages/WatchLater/WatchLater";
import { LikesPage } from "./pages/LikesPage/LikesPage";
import { HistoryPage } from "./pages/History/HistoryPage";
import SignUpPage from "./pages/AuthPage/SignUpPage";
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
            <Route path="/video/:videoid" element={<VideoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<Errorpage />} />
            <Route
              path="/playlist"
              element={<PrivateRoute navigateTo={<Playlists />}></PrivateRoute>}
            />
            <Route
              path={`/playlist/:playlistId`}
              element={
                <PrivateRoute navigateTo={<PlaylistPage />}></PrivateRoute>
              }
            />
            <Route
              path="/watchlater"
              element={
                <PrivateRoute navigateTo={<WatchLater />}></PrivateRoute>
              }
            />
            <Route
              path="/likes"
              element={<PrivateRoute navigateTo={<LikesPage />}></PrivateRoute>}
            />
            <Route
              path="/history"
              element={
                <PrivateRoute navigateTo={<HistoryPage />}></PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={<PrivateRoute navigateTo={<Profile />}></PrivateRoute>}
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
