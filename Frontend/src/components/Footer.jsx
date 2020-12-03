/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import silainLogo from "./silainLogo.jpg";

class Footer extends React.Component {
  render() {
    return (
      <footer
        // className={"footer" + (this.props.default ? " footer-default" : "")}
        style={{
          "backgroundColor": "white", "opacity": "0.9",
          "bottom": "0px", "paddingTop": "10px"
        }}
      // style={{"marginTop": "300px"}}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <Row>
            <nav className="footer-nav">
              <Link to="/acerca">Acerca de SILAIN</Link>
              <div className="credits ml-auto">
                <div className="copyright">
                  &copy; {1900 + new Date().getYear()}, made with{" "}
                  <i className="fa fa-heart heart" /> by Creative Tim
              </div>
              </div>
            </nav>
            <div className="credits ml-auto">
              <a href="http://cibiofi.univalle.edu.co/index.php/es/inicio/">
                <img width="230px" src={silainLogo} alt="" />
              </a>
            </div>
          </Row>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
