import React from "react";
import PropTypes from "prop-types";

function RowProducts(props) {
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

RowProducts.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
};
RowProducts.defaultProps = {
  id: "Not defined",
  name: "Not defined",
  price: "Not defined",
  description: "Not defined",
};

export default RowProducts;
