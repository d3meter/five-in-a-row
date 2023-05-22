import React from "react";

function PlayerConfig({ user, onLogoutPlayer }) {

 const handleLogout = () => {
  onLogoutPlayer();
};

  return (
    <div>
      <p>{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default PlayerConfig;
