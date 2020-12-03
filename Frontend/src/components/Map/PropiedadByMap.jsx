import React from "react";

// reactstrap components
import {
    Row, Col, Alert, Badge
} from 'reactstrap';

import axios from "axios";
import ReactLoading from "react-loading";

import CustomFiltersByMap from "components/Map/CustomFiltersByMap.jsx";
import ResultsTableByMap from "components/Map/ResultsTableByMap";
import Pagination from "components/Pagination";

import api from "api_route.js";

class PropiedadByMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            counts_tipos: {},
            ubication: "",
            ubi_type: "",
            pages: [],
            currentPage: 0,
            totalResults: 0,
            filters: {
                cultivo: "Select",
                categoria: "Select",
                subcategoria: "Select",
                tipo: "Select",
                formato: "Select",
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
        const basicURL = api.route + "/map/ubication_by_filter";
        this.setState({ loading: true, currentPage: 0 })
        axios.post(basicURL, { filters: obj, ubication: this.state.ubication, ubi_type: this.state.ubi_type, currentPage: 0 })
            .then(res => {

                this.setState({
                    results: res.data.result,
                    counts_tipos: res.data.counts,
                    loading: false,
                    filters: obj,
                    totalResults: res.data.totalResults,
                    pages: res.data.pages
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    changePage(page) {
        this.props.changePage(page);
        this.setState({ currentPage: page });
    }

    componentDidMount() {
        // this.newBasicSearch();
        this.setState(
            {
                counts_tipos: this.props.counts_tipos,
                results: this.props.results,
                ubication: this.props.ubication,
                ubi_type: this.props.ubi_type,
                pages: this.props.pages,
                currentPage: this.props.currentPage,
                totalResults: this.props.totalResults
            })
    }

    render() {
        return (
            <div>
                <CustomFiltersByMap getFilters={this.getFilters.bind(this)} />
                {
                    this.state.loading ? (
                        <center>
                            <ReactLoading type={"bars"} color={"#A5C80A"} />
                        </center>
                    ) :
                        <div>
                            <br />
                            <div>
                                <Alert color={this.state.results.length > 0 || this.allSelect() ? "success" : "danger"}>
                                    {
                                        this.state.results.length > 0
                                            ? (
                                                <div>
                                                    <h5><b>Resultados: </b>{this.state.totalResults}</h5>
                                                    <Row className="datsBigger">
                                                        <Col>
                                                            *Archivo crudo:  <Badge pill><b>{this.state.counts_tipos.AC}</b></Badge>
                                                        </Col>
                                                        <Col>
                                                            *Archivo procesado:  <Badge pill><b>{this.state.counts_tipos.AP}</b></Badge>
                                                        </Col>
                                                        <Col>
                                                        </Col>
                                                    </Row>
                                                    <Row className="datsBigger">
                                                        <Col>
                                                            *Imagen cruda: <Badge pill> <b>{this.state.counts_tipos.IC}</b></Badge>
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
                                                    <h5> <b>Selecciona un atributo de busqueda</b></h5>
                                                    : <h5><b>No hay datos relacionados</b></h5>
                                            )

                                    }
                                </Alert>
                            </div>
                            {
                                this.state.results.length > 0 ?
                                    (
                                        <div>
                                            <ResultsTableByMap results={this.state.results} currentPage={this.state.currentPage} />
                                            <Pagination pages={this.state.pages} currentPage={this.state.currentPage} changePage={this.changePage.bind(this)} />
                                        </div>
                                    ) : true
                            }
                        </div>
                }

            </div>
        )
    }
};

export default PropiedadByMap;