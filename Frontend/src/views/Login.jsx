import React from "react";

import logo from "s.png";

import auth from "components/auth/auth.js";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import api from "api_route.js";


import { Link } from "react-router-dom";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Col, Form, FormGroup, Label, Input, Button, Alert
} from "reactstrap";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabledLoginBtn: true,
            username: '',
            password: '',
            doAnime: false,
            errorLogin: false,
            messageError: "",
        };
    }

    onChange = params => {
        this.setState({
            disabledLoginBtn: false
        });
    };

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    signin = e => {
        e.preventDefault();

        const delay = 800;

        let data = { user: this.state.username, password: this.state.password };
        let obj;

        // dummy
        // obj = {
        //     "token": "123",
        //     "user_id": "abc",
        // };
        // auth.login(obj, () => {
        //     this.setState({ doAnime: true });
        //     window.setTimeout(() => {
        //         this.props.history.push("/perfil")
        //     }, delay);
        // });

        axios.post(api.route + "/users/login", data)
            .then(res => {
                obj = {
                    "id": res.data.user_id,
                    "role": res.data.role
                };

                auth.login(obj, () => {
                    this.setState({ doAnime: true });
                    window.setTimeout(() => {
                        this.props.history.push("/")
                    }, delay);
                });
            })
            .catch(err => {
                console.log(err);
                document.getElementById("loginForm").reset();
                this.setState({ errorLogin: true, messageError: "Revisar datos de entrada" });
                window.setTimeout(() => {
                    this.setState({ errorLogin: false });
                }, 2000);
            })
    }

    render() {

        const alert = (this.state.errorLogin) ? <Alert className="animated rubberBand" color="danger">
            <center>
                <h6>{this.state.messageError}</h6>
            </center>
        </Alert> : true;

        return (
            <div>
                <Col md="4" id="login">
                    {alert}
                    <Card id="cardLogin" className={this.state.doAnime ? "animated rotateOut fast" : " "}>
                        <CardHeader>
                            <center>
                                <img src={logo} width="210px" height="210px" alt="description"></img>
                            </center>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={this.signin} id="loginForm">
                                <FormGroup>
                                    <Label for="exampleEmail">email</Label>
                                    <Input onChange={this.handleInput} type="email" name="username" id="exampleEmail" requiered />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Contrasena</Label>
                                    <Input onChange={this.handleInput} type="password" name="password" id="examplePassword" required />
                                </FormGroup>

                                <center>
                                    <ReCAPTCHA
                                        sitekey="6LfP99wUAAAAAPHZbEWQ8x6fXjgBkasCd4ztoqL8"
                                        onChange={this.onChange}
                                    />
                                </center>

                                <center>
                                    <Button color="success" type="submit" disabled={this.state.disabledLoginBtn}>ENTRAR</Button>
                                    <br />
                                    <b>
                                        <Link to="/registro">Crea una cuenta</Link>
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