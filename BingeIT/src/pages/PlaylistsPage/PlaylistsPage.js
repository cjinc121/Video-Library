import { PlaylistsCardDisplay } from "../../components/PlaylistCardDisplay/PlaylistsCardDisplay";
import { useAuth } from "../../context/auth-context";
const Playlists = () => {
  const { authState } = useAuth();

  return <PlaylistsCardDisplay playlists={authState.playlists} />;
};
export { Playlists };
