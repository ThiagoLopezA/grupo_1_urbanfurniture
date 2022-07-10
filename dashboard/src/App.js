import React from "react";
import "./assets/css/app.css";
import "./assets/css/urban.css";
import ContentWrapper from "./components/ContentWrapper";
import Sidebar from "./components/Sidebar";

function App() {
  const pages = [
    {
      title: "Generos",
      path: "/genres",
    },
    {
      title: "Ultima pelicula",
      path: "/lastMovie",
    },
    {
      title: "Peliculas",
      path: "/movies",
    },
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
