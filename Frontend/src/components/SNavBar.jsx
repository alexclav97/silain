import React from "react";

import {
  Navbar,
  NavbarBrand,
  Row, Col
} from "reactstrap";

import { NavLink } from "react-router-dom";

// import lupa from "../lupa.png";
import auth from "components/auth/auth.js";

class SNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Navbar color="dark" expand="md" className="navbar_silain_links">
        <NavbarBrand>
          <NavLink to="/">
            SILAIN

        </NavLink>
        </NavbarBrand>
        {/* <NavLink href="/"> */}
        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
        {/* <img src={lupa} width="400px" height="40px" alt="description"></img> */}
        {/* </NavLink> */}
        <Col md="12">
          <Row >
            <Col className="silain_link silain_link_yellow">
              <center>
                <NavLink to="/search/clave"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#65A357",
                    fontSize: "14px",

                  }}
                  title="Realiza búsquedas escribiendo palabras clave">
                  <i className="nc-icon nc-align-left-2" style={{ "fontSize": "18px" }}></i>
                    Búsqueda por palabras Clave
                      </NavLink>
              </center>
            </Col>
            <Col className="silain_link silain_link_orange">
              <center>
                <NavLink to="/search/propiedad"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#98B503",
                    fontSize: "14px",

                  }}
                  title="Realiza búsquedas seleccionando una propiedad">
                  <i className="nc-icon nc-bullet-list-67" style={{ "fontSize": "18px" }}></i>
                    Exploración de datos
                    </NavLink>
              </center>
            </Col>
            <Col className="silain_link silain_link_greenorange">
              <center>

                <NavLink to="/search/mapa"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#EBC038",
                    fontSize: "14px",

                  }}
                  title="Realiza búsquedas explorando un mapa">
                  <i className="nc-icon nc-pin-3" style={{ "fontSize": "20px" }}></i>
                    Búscador Geográfico
                    </NavLink>
              </center>
            </Col>
            <Col className="silain_link silain_link_green">
              <center>
                <NavLink to="/search/proyecto"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#E7B107",
                    fontSize: "14px",

                  }}
                  title="Realiza búsquedas explorando proyectos">
                  <i className="nc-icon nc-bulb-63" style={{ "fontSize": "20px" }}></i>
                      Proyectos de Investigación
                    </NavLink>
              </center>
            </Col>
            <Col className="silain_link">
              <center>
                <NavLink to="/perfil"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "E7B107",
                    fontSize: "14px",
                  }}
                  title="Logueate en la plataforma">
                  <i className="nc-icon nc-circle-10" style={{ "fontSize": "20px" }}></i>
                  &nbsp;&nbsp;
                  {
                    auth.isAuthenticated() ? auth.getIdName() : "Login"
                  }
                  {/* Login */}
                </NavLink>
              </center>
            </Col>
          </Row>
        </Col>
      </Navbar>
    )
  }
}

export default SNavBar;