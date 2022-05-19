import { useEffect } from "react";
import { useAuth } from "../../context/auth-context";

const Profile = () => {
  const { signOutHandler, authState } = useAuth();
  useEffect(() => {
    window.scrollTo(0, 500);
  }, []);
  return (
    <div className="login-container">
      <div className="login-form">
        <h3>BingeIT</h3>

        {authState.user.firstName && (
          <h4>
            {" "}
            Name: {authState.user.firstName} {authState.user.lastName}
          </h4>
        )}
        {authState.user.email && <p>Email: {authState.user.email}</p>}
        <button onClick={() => signOutHandler()}>Sign Out</button>
      </div>
    </div>
  );
};
export { Profile };
