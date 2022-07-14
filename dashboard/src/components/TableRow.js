import React from "react";
import PropTypes from "prop-types";

function TableRow(props) {
  return (
    <React.Fragment>
      <tr>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>${props.price}</td>
        <td>{props.description}</td>
      </tr>
    </React.Fragment>
  );
}

TableRow.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string,
};
TableRow.defaultProps = {
  id: "Not defined",
  name: "Not defined",
  price: "Not defined",
  description: "Not defined",
};

export default TableRow;
