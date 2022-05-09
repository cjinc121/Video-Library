import React, { useEffect } from "react";
import { useAuth } from "../../context/auth-context";
import { LikesDisplay } from "../../components/LikesDisplay/LikesDisplay";
function LikesPage() {
  const { authState, getLikesHandler } = useAuth();
  useEffect(() => {
    (async () => getLikesHandler())();
  }, []);
  return <LikesDisplay videos={authState.likes} />;
}

export { LikesPage };
