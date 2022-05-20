import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WatchLaterDisplay } from "../../components/WatchLaterDisplay/WatchLaterDisplay";
import { getAuth, getWatchLater } from "../../features/auth/authSlice";

function WatchLater() {
  const authState = useSelector(getAuth);
  const dispatch = useDispatch();
  const { tokenVal } = authState;

  const getWatchLaterHandler = () => {
    dispatch(getWatchLater({ tokenVal }));
  };
  useEffect(() => {
    (async () => getWatchLaterHandler())();
  }, []);
  return <WatchLaterDisplay videos={authState.watchlater} />;
}

export { WatchLater };
