import React from "react";
// import Parse from "parse";

/* STATEFUL PARENT COMPONENT */
const MainList = () => {
  // Variables in the state to hold data
  // var user = Parse.User.current();
  return (
    <div>
      <hr />
      This is the main list parent component.
      {/* {user?.get("username")} */}
      {/* Stateless Child component passing up events from form */}
    </div>
  );
};

export default MainList;