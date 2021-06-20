import React from "react";
import { connect } from "react-redux";

function UserPage() {
  const onLogout = () => {};

  return (
    <div>
      <h3>User Page</h3>
      <button onClick={onLogout}>logout</button>
    </div>
  );
}

export default connect()(UserPage);
