import React, { useEffect } from "react";
import { useAuth } from "../../context/auth-context";
import { HistoryDisplay } from "../../components/HistoryDisplay/HistoryDisplay";
function HistoryPage() {
  const { authState, getHistoryHandler } = useAuth();
  useEffect(() => {
    (async () => getHistoryHandler())();
  }, []);
  return <HistoryDisplay videos={authState.history} />;
}

export { HistoryPage };
