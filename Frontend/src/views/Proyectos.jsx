import React from "react";

// reactstrap components
import {
    Row, Col, Container
} from 'reactstrap';

import { Router, Route, Switch, NavLink } from "react-router-dom";

import Project1 from "components/P1/Project1.jsx";
import Project2 from "components/P2/Project2.jsx";
import Project3 from "components/P3/Project3.jsx";
import Project4 from "components/P4/Project4.jsx";


class Proyectos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (

            <Container>
                <div className="searchBody" style={{ "backgroundColor": "white", "marginBottom": "255px", "paddingBottom": "15px" }}>
                    <Router history={this.props.history}>
                        <Switch>
                            <Route exact path="/search/proyecto" render={props =>
                                <div>
                                    <center>
                                        <i>La Información presentada fue suministrada por las personas involucradas</i>
                                    </center>
                                    <br />
                                    <Col size="sm">
                                        <Row>
                                            <Col md="11">
                                                <center>
                                                    <h5>
                                                        Sustentabilidad ambiental del manejo y uso del agua en cultivos de arroz de riego. caso estudio: finca arrocera san Jose, municipio Santander de Quilichao, Departamento del Cauca
                                                    </h5>
                                                </center>
                                            </Col>
                                            <Col md="1">
                                                <NavLink to="/search/proyecto/p1" className="proLink">
                                                    <i className="nc-icon nc-zoom-split" />

                                                </NavLink>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col md="11">
                                                <center>
                                                    <h5>
                                                        Análisis del efecto del grosor de la lámina de agua en el cultivo de arroz a partir del análisis de respuestas espectrales.
                                                    </h5>
                                                </center>
                                            </Col>
                                            <Col md="1">
                                                <NavLink to="/search/proyecto/p2" className="proLink">
                                                    <i className="nc-icon nc-zoom-split" />
                                                </NavLink>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col md="11">
                                                <center>
                                                    <h5>
                                                        Estimación de las concentraciones de nitrógeno en el cultivo de arroz a partir de datos hiperespectrales
                                                    </h5>
                                                </center>
                                            </Col>
                                            <Col md="1">
                                                <NavLink to="/search/proyecto/p3" className="proLink">
                                                    <i className="nc-icon nc-zoom-split" />
                                                </NavLink>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col md="11">
                                                <center>
                                                    <h5>
                                                        Integración multiescala entre modelos climáticos globales y regionales mediante técnicas de inteligencia artificial
                                                    </h5>
                                                </center>
                                            </Col>
                                            <Col md="1">
                                                <NavLink to="/search/proyecto/p4" className="proLink">
                                                    <i className="nc-icon nc-zoom-split" />
                                                </NavLink>
                                            </Col>
                                        </Row>
                                    </Col>
                                </div>
                            } />
                            <Route exact path="/search/proyecto/p1" component={Project1} />
                            <Route exact path="/search/proyecto/p2" component={Project2} />
                            <Route exact path="/search/proyecto/p3" component={Project3} />
                            <Route exact path="/search/proyecto/p4" component={Project4} />

                            {/* <Route exact path="/search/diagrama/p1/obj2" component={() => <h1>fghfg</h1>} /> */}
                            {/* <Route exact path="/search/diagrama/p1/obj3" component={() => <h1>fhgfg</h1>} /> */}

                        </Switch>
                    </Router>
                </div>
            </Container>
        )
    }
};

export default Proyectos;