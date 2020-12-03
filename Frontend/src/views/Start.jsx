import React from "react";
// import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import Footer from "components/Footer.jsx";

import { Redirect } from "react-router-dom";

import {
    InputGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    Container,
    Button,
    Col
} from "reactstrap";

import SNavBar from "components/SNavBar.jsx";

// import logo from "back2.png";
// import logoLetter from "lett2.png";
import logo from "s.png";

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirect_by_searchType: false,
            words: "",
            search_type: "/search/clave",
        }
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    setRedirect() {
        if (this.state.words !== "") {
            this.setState({ redirect: true });
        }
    }

    renderRedirect() {
        if (this.state.redirect) {
            const w = this.state.words;
            return <Redirect to={{
                pathname: this.state.search_type,
                words: w,
            }} />;
        }
    }

    setRedirect_searchType(type) {
        this.setState({ redirect: true, search_type: "/search/" + type })
    }

    render() {
        return (
            <div className="bgForest_top">
                <SNavBar />
                <div style={{ "paddingBottom": "110px" }} >
                    <center>
                        {/* <img src={logo} width="280px" height="280px" alt="description" className="rotating"></img> */}
                        {/* <img src={logoLetter} width="280px" height="280px" alt="description"></img> */}
                        <img src={logo} width="280px" height="280px" alt="description" className="animated fadeInDown fast"></img>
                        <br></br>
                        <br></br>
                        <b id="logoMeans">Sistema de Información del Laboratorio de Agricultura Inteligente</b>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Container className="animated fadeIn">
                            <Col md="7" sm="12" xs="12">
                                <form onSubmit={this.setRedirect.bind(this)} style={{ "backgroundColor": "white" }}>
                                    <InputGroup className="no-border">
                                        <Input value={this.state.words} onChange={this.handleInput.bind(this)} name="words" placeholder="Escriba una palabra clave..." />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <i className="nc-icon nc-zoom-split" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </form>
                            </Col>
                        </Container>
                        <Button className="silain_green" onClick={this.setRedirect.bind(this)}>Buscar</Button>
                        {this.state.redirect ? this.renderRedirect() : true}
                    </center>
                </div>
                {/* <br/><br/> */}
                <Footer />
            </div>
        )
    }
}

export default Start;