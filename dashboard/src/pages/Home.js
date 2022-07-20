import React from "react";
import CategoriesList from "../components/CategoriesList";
import ContentRow from "../components/ContentRow";
import ProductDetail from "../components/ProductDetail";
import Table from "../components/Table";

export default function Home() {
  const headers = ["Id", "Nombre", "Precio", "Descripción"];
  return (
    <React.Fragment>
      <div className="container-fluid page">
        <ContentRow />
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <ProductDetail />
          </div>
          <div className="col-sm-12 col-md-8">
            <CategoriesList />
          </div>
        </div>
        <div className="row px-3 mt-3">
          <Table link="/products" headers={headers} type="products" />
        </div>
      </div>
    </React.Fragment>
  );
}
