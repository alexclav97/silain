import React from "react";

import { Provider } from "react-redux";
import store from "../store";

import { Router, Route, Switch } from "react-router-dom";
import Footer from "components/Footer.jsx";

import SNavBar from "components/SNavBar.jsx";

import Clave from "views/Clave.jsx";
import Propiedad from "views/Propiedad.jsx";
import TheMap from "views/TheMap.jsx";
import Proyectos from "views/Proyectos.jsx";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Provider store={store}>
        <div className="bgForest_center">
          <SNavBar />
          <div>
            <center>

            </center>
          </div>
          <br />
          <Router history={this.props.history}>
            <Switch>
              <Route path="/search/clave" component={Clave} />
              <Route path="/search/propiedad" component={Propiedad} />
              <Route path="/search/mapa" component={TheMap} />
              <Route path="/search/proyecto" component={Proyectos} />
            </Switch>
          </Router>
          <Footer />
        </div>
      </Provider>
    )
  }
};

export default Search;