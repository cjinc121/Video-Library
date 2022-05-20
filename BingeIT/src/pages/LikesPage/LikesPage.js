import React, { useEffect } from "react";
import { LikesDisplay } from "../../components/LikesDisplay/LikesDisplay";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, getLikes } from "../../features/auth/authSlice";
function LikesPage() {
  const authState = useSelector(getAuth);
  const dispatch = useDispatch();
  const { tokenVal } = authState;
  const getLikesHandler = () => {
    dispatch(getLikes(tokenVal));
  };
  useEffect(() => {
    (async () => getLikesHandler())();
  }, []);
  return <LikesDisplay videos={authState.likes} />;
}

export { LikesPage };
