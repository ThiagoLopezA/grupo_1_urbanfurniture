import React from "react";
import Footer from "./Footer";
import Topbar from "./Topbar";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";

export default function ContentWrapper() {
  return (
    <React.Fragment>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content" className="pt-4">
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/products" exact={true} component={Products} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}
