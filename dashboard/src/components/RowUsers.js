import React from "react";
import PropTypes from "prop-types";

function RowUsers(props) {
  return (
    <React.Fragment>
      <tr>
        <td>{props.id}</td>
        <td>{props.first_name}</td>
        <td>{props.last_name}</td>
        <td>{props.email}</td>
      </tr>
    </React.Fragment>
  );
}

RowUsers.propTypes = {
  id: PropTypes.number,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string,
};
RowUsers.defaultProps = {
  id: "Not defined",
  first_name: "Not defined",
  last_name: "Not defined",
  email: "Not defined",
};

export default RowUsers;
