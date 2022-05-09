import React, { useEffect } from "react";
import { WatchLaterDisplay } from "../../components/WatchLaterDisplay/WatchLaterDisplay";
import { useAuth } from "../../context/auth-context";

function WatchLater() {
  const { authState, getWatchLaterHandler } = useAuth();
  useEffect(() => {
    (async () => getWatchLaterHandler())();
  }, []);
  return <WatchLaterDisplay videos={authState.watchlater} />;
}

export { WatchLater };
