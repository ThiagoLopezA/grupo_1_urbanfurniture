import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  return (
    <React.Fragment>
      <ul
        className="navbar-nav sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/*<!-- Sidebar - Brand --!> */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <div className="sidebar-brand-icon">
            <div className="section__logo mb-3 mt-5">
              <h2 className="logo__top">URBAN</h2>
              <h3 className="logo__bottom">FURNITURE</h3>
            </div>
          </div>
        </a>

        {/*<!-- Divider --!> */}
        <hr className="sidebar-divider mt-4" />

        {/*<!-- Heading --!> */}
        <div className="sidebar-heading">Páginas</div>

        {/*<!-- Nav Item - Pages --!> */}
        {props.pages.map((e, i) => {
          return (
            <li className="nav-item" key={e + i}>
              <Link className="nav-link collapsed" to={e.path}>
                <i className="fas fa-fw fa-folder"></i>
                <span>{e.title}</span>
              </Link>
            </li>
          );
        })}
        {/*<!-- Divider --!> */}
        <hr className="sidebar-divider d-none d-md-block" />
        <li className="nav-item">
          <a href="http://localhost:3030" className="nav-link static-link">
            <i class="fa-solid fa-arrow-left-long"></i>
            <span>Volver a la web</span>
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
}
