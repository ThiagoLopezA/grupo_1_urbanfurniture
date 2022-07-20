import React from "react";
import Table from "../components/Table";

export default function Products() {
  const headers = ["Id", "Nombre", "Precio", "Descripción"];
  return (
    <div className="row px-3 page">
      <Table link="/products" headers={headers} type="products" />
    </div>
  );
}
