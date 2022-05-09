import { useEffect } from "react";
import { PlaylistsCardDisplay } from "../../components/PlaylistCardDisplay/PlaylistsCardDisplay";
import { useAuth } from "../../context/auth-context";
const Playlists = () => {
  const { authState, getPlaylistHandler } = useAuth();
  useEffect(() => {
    (async () => getPlaylistHandler())();
  }, []);
  return <PlaylistsCardDisplay playlists={authState.playlists} />;
};
export { Playlists };
