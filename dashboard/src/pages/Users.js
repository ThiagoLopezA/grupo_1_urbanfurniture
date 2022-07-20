import React from "react";
import Table from "../components/Table";

export default function Users() {
  const headers = ["Id", "Nombre", "Apellido", "Email"];
  return (
    <div className="row px-3 page">
      <Table link="/users" headers={headers} type="users" />
    </div>
  );
}
