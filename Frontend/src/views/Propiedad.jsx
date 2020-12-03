import React from "react";

// reactstrap components
import {
    Row, Col, Alert, Badge, Container
} from 'reactstrap';

import axios from "axios";
import ReactLoading from "react-loading";

import CustomFilters from "components/CustomFilters.jsx";
import ResultsTable from "components/ResultsTable";
import Pagination from "components/Pagination";

import api from "api_route.js";

class Propiedad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            totalResults: 0,
            counts_tipos: {},
            pages: [],
            currentPage: 0,
            filters: {
                categoria: "Select",
                subcategoria: "Select",
                municipio: "Select",
                tipo: "Select",
                formato: "Select",
                finca: "Select",
            },
            loading: false,
        }
    }

    allSelect() {
        for (let i in this.state.filters) {
            if (this.state.filters[i] !== "Select") {
                return false;
            }
        }
        return true;
    }

    getFilters(obj) {
        const basicURL = api.route + "/basic/search_by_filter";
        this.setState({ loading: true, currentPage: 0 })
        axios.post(basicURL, { filters: obj, word: "", currentPage: 0 })
            .then(res => {

                this.setState({
                    results: res.data.result,
                    totalResults: res.data.totalResults,
                    pages: res.data.pages,
                    counts_tipos: res.data.counts,
                    loading: false,
                    filters: obj
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    changePage(page) {

        const basicURL = api.route + "/basic/search_by_filter";
        this.setState({ loading: true })
        axios.post(basicURL, {
            filters: this.state.filters,
            word: "",
            currentPage: page
        })
            .then(res => {
                this.setState({
                    results: res.data.result,
                    totalResults: res.data.totalResults,
                    pages: res.data.pages,
                    currentPage: page,
                    counts_tipos: res.data.counts,
                    loading: false,
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <Container>
                <div className="searchBody" style={{ "marginBottom": "372px" }}>
                    <CustomFilters getFilters={this.getFilters.bind(this)} />
                    {
                        this.state.loading ? (
                            <center>
                                <ReactLoading type={"bars"} color={"#A5C80A"} />
                            </center>
                        ) :
                            <div>
                                <br />
                                <div>
                                    <Alert
                                        color={this.state.results.length > 0 || this.allSelect() ? "success" : "danger"}
                                        style={{ paddingLeft: "10px" }}
                                    >
                                        {
                                            this.state.results.length > 0
                                                ? (
                                                    <div>
                                                        <h5><b>Resultados según los filtros: </b>{this.state.totalResults}</h5>
                                                        <Row className="datsBigger">
                                                            <Col>
                                                                *Archivo crudo:  <Badge pill><b>{this.state.counts_tipos.AC}</b></Badge>
                                                            </Col>
                                                            <Col>
                                                                *Archivo procesado:  <Badge pill><b>{this.state.counts_tipos.AP}</b></Badge>
                                                            </Col>
                                                            <Col>
                                                                *Imagen cruda:  <Badge pill><b>{this.state.counts_tipos.IC}</b></Badge>
                                                            </Col>
                                                            <Col>
                                                                *Imagen procesada:  <Badge pill><b>{this.state.counts_tipos.IP}</b></Badge>
                                                            </Col>
                                                            <Col>
                                                                *Compilación:  <Badge pill><b>{this.state.counts_tipos.C}</b></Badge>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                )
                                                : (
                                                    this.allSelect() ?
                                                        <h5> <b>Seleccione un atributo de búsqueda</b></h5>
                                                        : <h5><b>No hay datos relacionados</b></h5>
                                                )

                                        }
                                    </Alert>
                                </div>
                                {
                                    this.state.results.length > 0 ?
                                        (
                                            <div>
                                                <ResultsTable results={this.state.results} currentPage={this.state.currentPage} />
                                                <Pagination pages={this.state.pages} currentPage={this.state.currentPage} changePage={this.changePage.bind(this)} />
                                            </div>
                                        ) : true
                                }
                            </div>
                    }

                </div>
            </Container>
        )
    }
};

export default Propiedad;