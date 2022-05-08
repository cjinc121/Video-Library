import { useAuth } from "../../context/auth-context";

const Profile = () => {
  const { signOutHandler, authState } = useAuth();

  return (
    <div className="login-container">
      <div className="login-form">
        <h3>BingeIT</h3>

        <h4>
          {" "}
          Name: {authState.user.firstName} {authState.user.lastName}
        </h4>
        <p>Email: {authState.user.email}</p>
        <button onClick={() => signOutHandler()}>Sign Out</button>
      </div>
    </div>
  );
};
export { Profile };
