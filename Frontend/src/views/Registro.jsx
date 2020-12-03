import React from "react";

// import auth from "components/auth/auth.js";
import axios from 'axios';
import api from "api_route.js";

import { Link } from "react-router-dom";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Col, Row, Form, FormGroup, Label, Input, Button, Alert
} from "reactstrap";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombres: '',
            apellidos: '',
            email: '',
            pais: '',
            departamento: '',
            ciudad: '',
            institucion: '',
            ocupacion: '',
            password: '',
            confirm: '',
            doAnime: false,
            errorRegistro: false,
            registroSuccess: false,
        };
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    signup = e => {
        e.preventDefault();
        if (!this.validation()) {
            this.setState({ errorRegistro: true });
            window.setTimeout(() => {
                this.setState({ errorRegistro: false });
            }, 2000);
            return ;
        }
        const data = {
            nombres: this.state.nombres,
            apellidos: this.state.apellidos,
            email: this.state.email,
            pais: this.state.pais,
            departamento: this.state.departamento,
            ciudad: this.state.ciudad,
            institucion: this.state.institucion,
            ocupacion: this.state.ocupacion,
            password: this.state.password
        }
        axios.post(api.route + "/users/register", data)
            .then(res => {
                this.setState({ registroSuccess: true, password: "" });
                document.getElementById("registerForm").reset();
                window.setTimeout(() => {
                    this.setState({ registroSuccess: false });
                }, 2000);
            })
            .catch(err => {
                this.setState({ errorRegistro: true });
                window.setTimeout(() => {
                    this.setState({ errorRegistro: false });
                }, 2000);
            })
    }

    validation() {
        return this.state.nombres !== "" &&
            this.state.apellidos !== "" &&
            this.state.email !== "" &&
            this.state.pais !== "" &&
            this.state.departamento !== "" &&
            this.state.ciudad !== "" &&
            this.state.institucion !== "" &&
            this.state.ocupacion !== "" &&
            this.state.password !== "" &&
            this.state.confirm !== "" &&
            this.state.password === this.state.confirm
    }

    render() {

        const alert = (this.state.errorRegistro) ? <Alert className="animated rubberBand" color="danger">
            <center>
                <h6>Verifica la entrada</h6>
            </center>
        </Alert> : true;

        const alertSuccess = (this.state.registroSuccess) ? <Alert className="animated rubberBand" color="success">
            <center>
                <h6>Registrado Exitosamente!</h6>
            </center>
        </Alert> : true;

        return (
            <div>
                <Col md="6" id="login">
                    {alert}
                    {alertSuccess}
                    <Card id="cardLogin" className={this.state.doAnime ? "animated zoomOutUp" : " "}>
                        <CardHeader>
                            <center>
                                <h2>Crear Cuenta</h2>
                            </center>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={this.signin} id="registerForm">
                                <FormGroup>
                                    <Row>
                                        <Col>
                                            <Label>Nombres</Label>
                                            <Input onChange={this.handleInput} name="nombres" type="text" required />
                                        </Col>
                                        <Col>
                                            <Label>Apellidos</Label>
                                            <Input onChange={this.handleInput} name="apellidos" type="text" required />
                                        </Col>
                                    </Row>
                                    <Label>email</Label>
                                    <Input onChange={this.handleInput} name="email" type="email" requiered />
                                    <Row>
                                        <Col>
                                            <Label>Pais</Label>
                                            <Input onChange={this.handleInput} name="pais" type="text" required />
                                        </Col>
                                        <Col>
                                            <Label>Departamento</Label>
                                            <Input onChange={this.handleInput} name="departamento" type="text" required />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Label>Ciudad</Label>
                                            <Input onChange={this.handleInput} name="ciudad" type="text" required />
                                        </Col>
                                        <Col>
                                            <Label>Institucion</Label>
                                            <Input onChange={this.handleInput} name="institucion" type="text" required />
                                        </Col>
                                    </Row>
                                    <Label>Ocupacion</Label>
                                    <Input onChange={this.handleInput} name="ocupacion" type="text" required />
                                    <Label for="examplePassword">Contrasena</Label>
                                    <Input onChange={this.handleInput} type="password" name="password" required />
                                    <Label for="examplePassword">Confirmar Contrasena</Label>
                                    <Input onChange={this.handleInput}
                                        style={this.state.confirm === this.state.password && this.state.confirm !== '' && this.state.password !== '' ? { "backgroundColor": "#a7eb77" } : { "backgroundColor": "pink" }}
                                        type="password" name="confirm" required />

                                </FormGroup>
                                <center>
                                    <Button color="success" type="submit" onClick={this.signup.bind(this)} >REGISTRAR</Button>
                                    {/* <Button color="success" type="submit">REGISTRAR</Button> */}

                                    <br />
                                    <b>
                                        <Link to="/login">Iniciar Sesión</Link>
                                    </b>
                                    <br />
                                    <b>
                                        <Link to="/">Inicio</Link>
                                    </b>
                                </center>
                            </Form>
                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                </Col>
            </div>
        )
    }
}

export default Login;