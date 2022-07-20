import React from "react";
import "./assets/css/app.css";
import "./assets/css/urban.css";
import ContentWrapper from "./components/ContentWrapper";
import Sidebar from "./components/Sidebar";

function App() {
  const pages = [
    {
      title: "Inicio",
      path: "/",
    },
    {
      title: "Tabla de Productos",
      path: "/products",
    },
    { title: "Tabla de Usuarios", path: "/users" },
  ];
  return (
    <React.Fragment>
      <div id="wrapper">
        <Sidebar pages={pages} />
        <ContentWrapper />
      </div>
    </React.Fragment>
  );
}

export default App;
