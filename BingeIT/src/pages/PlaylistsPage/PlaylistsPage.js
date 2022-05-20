import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlaylistsCardDisplay } from "../../components/PlaylistCardDisplay/PlaylistsCardDisplay";
import { getAuth, getPlaylist } from "../../features/auth/authSlice";

const Playlists = () => {
  const authState = useSelector(getAuth);
  const dispatch = useDispatch();
  const { tokenVal } = authState;
  const getPlaylistHandler = () => {
    dispatch(getPlaylist({ tokenVal }));
  };
  useEffect(() => {
    (async () => getPlaylistHandler())();
  }, []);
  return <PlaylistsCardDisplay playlists={authState.playlists} />;
};
export { Playlists };
