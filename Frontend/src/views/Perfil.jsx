import React from "react";

// reactstrap components
import {
    Container, Button, Row, Table
} from 'reactstrap';

// import axios from "axios";
// import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

import auth from "components/auth/auth.js";
import CreateFile from "components/CreateFile.jsx";
import SNavBar from "components/SNavBar.jsx";
import api from "api_route.js";
import CreateLicence from "components/CreateLicence";

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            hist: [],
            loading: true
        }
    }

    async componentDidMount() {
        const res = await fetch(api.route + "/users/user/" + auth.getSession().id);
        const res_hist = await fetch(api.route + "/users/user/des_hist/" + auth.getSession().id);
        const { user } = await res.json();
        const { hist } = await res_hist.json();
        this.setState({
            user: user,
            hist: hist,
            loading: false
        });
    }

    logout() {
        auth.logout(() => this.props.history.push("/"));
    }

    render() {
        return (
            <div>
                <SNavBar />
                <Container>
                    <Row>
                        {
                            auth.isAdmin() ?
                                (
                                    <img src="https://www.flaticon.com/svg/static/icons/svg/3039/3039392.svg" alt="" width="80px" height="80px" />
                                ) : (
                                    <img src="https://image.flaticon.com/icons/svg/929/929422.svg" alt="" width="50px" height="50px" />
                                )
                        }
                        <h2>Bienvenido {this.state.user.nombres} {this.state.user.apellidos}</h2>
                    </Row>
                    <b>{this.state.user.email}</b> | <b>{this.state.user.pais}</b>
                    {
                        auth.isAdmin() ? (
                            <div>
                                <CreateFile />
                                <CreateLicence />
                            </div>
                        ) : true
                    }

                    <center>
                        <h4>Historial de descargas</h4>
                    </center>
                    <ul>
                        {
                            this.state.hist.length !== 0 ?
                                <Table striped bordered hover>
                                    <thead>
                                        <tr style={{ "textAlign": "left" }}>
                                            <th>#</th>
                                            <th>Articulo</th>
                                            <th>Fecha</th>
                                            <th>Hora</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.hist.map((ele, i) => (
                                                <tr key={i}>
                                                    <th>{i + 1}</th>
                                                    <th>
                                                        <Link to={"/article/" + ele.idmetadato}>{ele.titulo}</Link>
                                                    </th>
                                                    <th>
                                                        {ele.fecha}

                                                    </th>
                                                    <th>
                                                        {ele.hora}
                                                    </th>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                                : <b>No ha hecho ninguna descarga todavía</b>
                        }
                    </ul>
                    <hr />
                    <center>
                        <Button onClick={this.logout.bind(this)} color="danger">Salir</Button>
                    </center>
                </Container>
            </div >
        )
    }
};

export default Perfil;