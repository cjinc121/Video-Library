import React, { useEffect } from "react";
import { HistoryDisplay } from "../../components/HistoryDisplay/HistoryDisplay";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, getHistory } from "../../features/auth/authSlice";
function HistoryPage() {
  const authState = useSelector(getAuth);
  const dispatch = useDispatch();
  const { tokenVal } = authState;
  const getHistoryHandler = async () => {
    dispatch(getHistory({ tokenVal }));
  };
  useEffect(() => {
    (async () => getHistoryHandler())();
  }, []);
  return <HistoryDisplay videos={authState.history} />;
}

export { HistoryPage };
