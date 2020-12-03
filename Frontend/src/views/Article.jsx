import React from "react";

// reactstrap components
import {
    Col, Container, Row, Button, Modal, ModalBody, ModalHeader
} from 'reactstrap';

import { Map, TileLayer, FeatureGroup, Polygon, Tooltip } from 'react-leaflet';
import axios from "axios";
import ReactLoading from "react-loading";
import download from "downloadjs";
import { Redirect } from "react-router-dom";
import auth from "components/auth/auth.js";


import SNavBar from "components/SNavBar.jsx";
import api from "api_route.js";

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            loading: true,
            finca: [],
            centroid: [],
            redirect: false,
            redirect_word: "",
            toggleModal: false,
            toggleModalRequest: false,
            textarea: "",
            textarea_request: "",
            loading_mail: false,
            publico: false,
            errorArticle: false
        }
    }

    sendPurpose() {
        var data = {
            id_usuario: auth.getSession().id,
            id_metadato: this.props.match.params.id,
            proposito: this.state.textarea
        };
        axios.post(api.route + "/article/proposito", data)
            .then(res => {
                this.setState({ textarea: "" });
            })
            .catch(err => {
                console.log(err);
                this.setState({ textarea: "" });
            })
    }

    async getFile() {
        this.toggleModal();
        // Conseguir el nombre del archivo
        const res = await fetch(api.route + "/article/download/filename/" + this.props.match.params.id);
        const { filename } = await res.json();
        // Conseguir el archivo a descargar
        axios.get(api.route + "/article/download/" + this.props.match.params.id, {
            responseType: "blob"
        }).then(res => {
            console.log(res);
            let blob = new Blob([res.data])
            download(blob, filename);
            this.sendPurpose();
        }).catch(err => {
            console.log(err);
            alert("No se encontro el recurso");
        });
    }

    componentDidMount() {
        if (auth.isAuthenticated()) {
            // const res = await fetch(api.route + "/article/get/" + this.props.match.params.id + "/" + auth.getSession().id);
            axios.get(api.route + "/article/get/" + this.props.match.params.id + "/" + auth.getSession().id)
                .then(res => {
                    const { info, finca, publico } = res.data;
                    this.setState({ info: info, loading: false, finca: finca, centroid: finca[0].centroid, publico: publico });
                })
                .catch(err => {
                    this.setState({ errorArticle: true });
                })
        } else {
            // const res = await fetch(api.route + "/article/get/" + this.props.match.params.id);
            axios.get(api.route + "/article/get/" + this.props.match.params.id)
                .then(res => {
                    const { info, finca, publico } = res.data;
                    this.setState({ info: info, loading: false, finca: finca, centroid: finca[0].centroid, publico: publico });
                })
                .catch(err => {
                    this.setState({ errorArticle: true });
                })
        }
    }

    sendRequestDownload() {
        this.setState({ loading_mail: true });
        axios.post(api.route + "/sendmail", {
            id: auth.getSession().id,
            textarea_request: this.state.textarea_request
        })
            .then(res => {
                this.setState({ textarea_request: "", loading_mail: false })
                this.toggleModalRequest();
                alert("Mensaje enviado con exito");
            })
            .catch(err => {
                console.log(err);
                alert("Error");
            })
    }


    redirectPclave(w) {
        this.setState({ redirect: true, redirect_word: w });
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: "/search/clave",
                words: this.state.redirect_word,
            }} />;
        }
    }

    toggleModal() {
        this.setState({ toggleModal: !this.state.toggleModal });
    }

    toggleModalRequest() {
        this.setState({ toggleModalRequest: !this.state.toggleModalRequest });
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <SNavBar />
                {
                    this.state.errorArticle ? <center><h5>No se encuentra el recurso</h5></center> : true
                }
                {
                    this.state.loading ? (
                        <center>
                            <ReactLoading type={"bars"} color={"#A5C80A"} />
                        </center>
                    ) :
                        <Container>

                            {/* Modal */}
                            <Modal toggle={this.toggleModal.bind(this)} isOpen={this.state.toggleModal} >
                                <ModalHeader>Datos para descarga</ModalHeader>
                                <ModalBody>
                                    <textarea onChange={this.handleInput.bind(this)} name="textarea" cols="47" rows="7" placeholder="Escriba brevemente el motivo por el cual accederá a este dato y que uso le dará a este.">
                                    </textarea>
                                </ModalBody>
                                <center>
                                    <i style={{"fontSize": "12px"}}>Si el tamaño del archivo es superior a 1 GB, la descarga podría tardar unos segundos en iniciar.</i>
                                    <br/>
                                    <Button onClick={this.getFile.bind(this)} color="success" disabled={this.state.textarea === ""}>
                                        Descargar
                                    </Button>
                                </center>
                            </Modal>

                            <Modal request={this.toggleModalRequest.bind(this)} isOpen={this.state.toggleModalRequest} >
                                <ModalHeader toggle={this.toggleModalRequest.bind(this)}>Datos para descarga</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Este dato se encuentra con acceso restringido, si desea contar con él póngase en
                                        contacto con la administración del CIBioFi a través del correo electrónico
                                        <a href="mailto: abc@example.com"> cibiofi@correounivalle.edu.co</a>, enviando una solicitud de acceso en la que se
                                        especifique el identificador o ID del dato, el email que registró en la plataforma
                                        SILAIN y el motivo por el cual desea contar con el dato. Una vez su solicitud sea
                                        atendida, en caso de ser autorizada podrá continuar con la descarga del dato.
                                    </p>
                                    {/* <textarea onChange={this.handleInput.bind(this)} name="textarea_request" cols="47" rows="7" placeholder="Ingresa el motivo por el cual quieres descargar este archivo"> */}
                                    {/* </textarea> */}
                                </ModalBody>
                                {/* <center>
                                    {
                                        !this.state.loading_mail ?
                                            <Button color="primary" onClick={this.sendRequestDownload.bind(this)} disabled={this.state.textarea_request === ""}>
                                                Enviar
                                            </Button>
                                            :
                                            <center>
                                                <ReactLoading type={"bars"} color={"#51cbce"} />
                                            </center>
                                    }
                                </center> */}
                            </Modal>

                            <h3>{this.state.info.titulo}</h3>
                            <hr />
                            {
                                !auth.isAuthenticated() ? (
                                    <center>
                                        <p style={{ "backgroundColor": "yellow", "color": "red" }}>
                                            Para descargar debes iniciar sesión
                                        </p>
                                    </center>
                                ) : true
                            }
                            <Row>
                                <Col md="6" lg="6">
                                    <Row>
                                        <Col lg="1">
                                            <b>
                                                <i className="nc-icon nc-pin-3" style={{ "fontSize": "25px" }}></i>
                                            </b>
                                        </Col>
                                        <Col lg="6">
                                            <b>Departamento: </b>
                                            {this.state.info.departamento}
                                            <br />
                                            <b>Municipio: </b>
                                            {this.state.info.municipio}
                                            {/* &nbsp;&nbsp; */}
                                            <br />
                                            <b>Finca: </b>
                                            {this.state.info.finca}
                                        </Col>
                                    </Row>
                                    <br />
                                    <ul style={{ "textAlign": "left" }}>
                                        <h5>Características</h5>
                                        <li><b>Categoria: </b>{this.state.info.categoria}</li>
                                        <li><b>Subcategoria: </b>{this.state.info.subcategoria}</li>
                                        <li><b>Fecha de creacion: </b>{this.state.info.creado}</li>
                                        <li><b>Fecha de disponibilidad: </b>{this.state.info.disponibilidad}</li>
                                        <li><b>Accesso: </b>{this.state.publico ? "Inmediato" : "Sujeto a autorización"}</li>

                                    </ul>
                                    <ul style={{ "textAlign": "left" }}>
                                        <h5>Datos de descarga</h5>
                                        <li><b>Tipo: </b>{this.state.info.tipo}</li>
                                        <li><b>Formato: </b>{this.state.info.formato}</li>
                                        <li><b>Tamano: </b>{this.state.info.tamano}</li>

                                        {
                                            auth.isAdmin() ? (
                                                <Button onClick={this.toggleModal.bind(this)}
                                                    color="success">
                                                    Descargar
                                                </Button>
                                            ) : (
                                                    <Button onClick={this.state.publico ? this.toggleModal.bind(this) : this.toggleModalRequest.bind(this)}
                                                        color={this.state.publico ? "success" : "primary"}
                                                        disabled={!auth.isAuthenticated()}>
                                                        {
                                                            this.state.publico ? "Descargar" : "Solicitar Descarga"
                                                        }
                                                    </Button>
                                                )

                                        }

                                    </ul>
                                    <ul style={{ "textAlign": "left" }}>
                                        <h5>Palabras clave</h5>
                                        {
                                            this.state.info.pclave.split(",").map((e, i) => (
                                                <button key={i} onClick={this.redirectPclave.bind(this, e)} className="ButtonLikeLink">{e}</button>
                                            ))
                                        }
                                    </ul>
                                    {this.state.redirect ? this.renderRedirect() : true}


                                </Col>

                                <Col md="6" lg="6">
                                    <b style={{ "color": "#6bd098" }}>Identificador: </b>
                                    {this.state.info.idmetadato}
                                    <br />
                                    <b>Resumen: </b>
                                    <br />
                                    {this.state.info.resumen}
                                    <br />
                                    <b>Descripcion: </b>
                                    <br />
                                    {this.state.info.descripcion}

                                    <Map className="amapa-minimap leaflet-container-minimap" center={this.state.centroid} zoom={16} zoomControl={false} minZoom={16} maxZoom={16}>
                                        <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        {
                                            this.state.finca.length === 1 ? (
                                                <FeatureGroup color="green">
                                                    <Tooltip direction="top">
                                                        <center>
                                                            <h5>Finca: {this.state.info.finca}</h5>
                                                            <b>Lat: {this.state.centroid[0]}</b>
                                                            <br />
                                                            <b>Lng: {this.state.centroid[1]}</b>
                                                        </center>
                                                    </Tooltip>
                                                    <Polygon positions={this.state.finca[0].poly} />
                                                </FeatureGroup>
                                            ) : true
                                        }
                                    </Map>
                                </Col>
                            </Row>
                        </Container >

                }
            </div >
        )
    }
};

export default Article;