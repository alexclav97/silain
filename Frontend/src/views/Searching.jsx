import React from "react";

// reactstrap components
import {
  Row, Input, Col,
  Container, Alert, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';

import axios from "axios";

// import { Link } from "react-router-dom";
import Footer from "components/Footer.jsx";

import SNavBar from "components/SNavBar.jsx";
import CustomFilters from "components/CustomFilters.jsx";

import ReactLoading from "react-loading";
import ResultsTable from "components/ResultsTable";

class Searching extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: this.props.location.words,
      word_searched: "",
      results: [],
      counts_tipos: {},
      search_types: this.props.location.search_types || {
        clave: true,
        propiedad: false,
        mapa: false,
        diagrama: false
      },
      filters: {
        categoria: "Select",
        subcategoria: "Select",
        municipio: "Select",
        tipo: "Select",
        formato: "Select",
        finca: "Select",
      },
      roladFilters: false,
      loading: false,
    }
  }


  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.newBasicSearch();
  }

  newBasicSearch = e => {

    if (this.state.words !== "") {
      const basicURL = "http://localhost:8000/basic/search_by_filter";

      axios.post(basicURL, { filters: this.state.filters, word: this.state.words })
        .then(res => {
          // console.log(res.data.result)
          this.setState({
            results: res.data.result,
            counts_tipos: res.data.counts,
            word_searched: this.state.words,
            loading: false,
          });
        })
        .catch(err => {
          console.log(err);
        })
      this.setState({ loading: true });
    }
  }


  getFilters = obj => {
    const basicURL = "http://localhost:8000/basic/search_by_filter";
    this.setState({ loading: true })
    axios.post(basicURL, { filters: obj, word: this.state.word_searched })
      .then(res => {
        this.setState({
          results: res.data.result,
          counts_tipos: res.data.counts,
          word_searched: this.state.words,
          loading: false,
          filters: obj
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  // HANDELRS SOBRE LOS DIFERENTES TIPOS DE BUSQUEDA

  showTypeSearch = type => {
    this.setState({ reloadFilters: true }, () => {
      var types = { ...this.state.search_types };
      for (let i in types) {
        types[i] = false;
      }
      types[type] = true;
      this.setState({ search_types: types, 
        words: "", 
        word_searched: "", 
        results: [], 
        counts_tipos: {}, 
        filters: {
          categoria: "Select",
          subcategoria: "Select",
          municipio: "Select",
          tipo: "Select",
          formato: "Select"
        },
        reloadFilters: false })
      // console.log(this.state.results);
    })
  }

  componentDidMount() {
    this.newBasicSearch();
  }

  render() {

    const keyWord = <div>
      <Col md="12" lg="12">
        {
          this.state.search_types.clave ? (
            <Row>
              <Col md="12" lg="12">
                <form onSubmit={this.handleSubmit}>
                  <InputGroup className="no-border">
                    <Input onChange={this.handleInput} value={this.state.words} name="words" className="inputSearcher" placeholder="Palabras Clave..." />
                    <InputGroupAddon addonType="append">
                      <InputGroupText onClick={this.handleSubmit} className="icon-click">
                        <i className="nc-icon nc-zoom-split" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
              </Col>
            </Row>
          ) : true
        }
        {
          !this.state.reloadFilters ? (
            <CustomFilters getFilters={this.getFilters} />
          ) : true
        }
      </Col>
    </div>

    return (
      <div>
        <SNavBar />
        <Container>
          <div>
            <center>
              <Col md="12">
                <Row>
                  <Col sm="3" md="3" lg="3">
                    <button onClick={() => this.showTypeSearch("clave")} className={this.state.search_types.clave ? "ButtonLikeLinkSelected" : "ButtonLikeLink"} data-toggle="tooltip" title="Realiza busquedas escribiendo palabras clave">
                      Palabras Clave
                    </button>
                  </Col>
                  <Col sm="3" md="3" lg="3">
                    <button onClick={() => this.showTypeSearch("propiedad")} className={this.state.search_types.propiedad ? "ButtonLikeLinkSelected" : "ButtonLikeLink"} data-toggle="tooltip" title="Realiza busquedas seleccionando una propiedad">
                      Propiedades
                    </button>
                  </Col>
                  <Col sm="3" md="3" lg="3">
                    <button onClick={() => this.showTypeSearch("mapa")} className={this.state.search_types.mapa ? "ButtonLikeLinkSelected" : "ButtonLikeLink"} data-toggle="tooltip" title="Realiza busquedas explorando un mapa">
                      Mapa
                    </button>
                  </Col>
                  <Col sm="3" md="3" lg="3">
                    <button onClick={() => this.showTypeSearch("diagrama")} className={this.state.search_types.diagrama ? "ButtonLikeLinkSelected" : "ButtonLikeLink"} data-toggle="tooltip" title="Realiza busquedas explorando diagramas">
                      Diagramas
                    </button>
                  </Col>
                </Row>
              </Col>
            </center>

            <br />
            {
              this.state.search_types.clave || this.state.search_types.propiedad ? keyWord : true
            }
            {
              this.state.search_types.mapa ? <h1>MAPA</h1> : true
            }
            {
              this.state.search_types.diagrama ? <h1>DIAGRAMAS</h1> : true
            }
            <br />
          </div>
          {
            this.state.loading ||
              this.state.search_types.mapa ||
              this.state.search_types.diagrama ||
              this.state.search_types.clave ||
              this.state.search_types.propiedad ?
              (
                this.state.loading ? (
                  <center>
                    <ReactLoading type={"bars"} color={"#51BCDA"} />
                  </center>
                ) :
                  this.state.search_types.clave ||
                    this.state.search_types.propiedad ?
                    (
                      <div>
                        <div>
                          <Alert color={this.state.results.length > 0 || this.state.word_searched === "" ? "info" : "danger"}>
                            {
                              this.state.results.length > 0
                                ? (
                                  <div>
                                    <h5><b>Resultados para "{this.state.word_searched}": </b>{this.state.results.length}</h5>
                                    <Row className="datsBigger">
                                      <Col>
                                        *Archivo crudo:  <b>{this.state.counts_tipos.AC}</b>
                                      </Col>
                                      <Col>
                                        *Archivo procesado:  <b>{this.state.counts_tipos.AP}</b>
                                      </Col>
                                      <Col>
                                        *Imagen cruda:  <b>{this.state.counts_tipos.IC}</b>
                                      </Col>
                                      <Col>
                                        *Imagen procesada:  <b>{this.state.counts_tipos.IP}</b>
                                      </Col>
                                      <Col>
                                        *Compilación:  <b>{this.state.counts_tipos.C}</b>
                                      </Col>
                                    </Row>
                                  </div>
                                )
                                : (
                                  this.state.word_searched !== ""
                                    ?
                                    <h5><b>No hay datos relacionados con: "{this.state.word_searched}"</b></h5>
                                    :
                                    <h5><b>Selecciona un atributo de busqueda</b></h5>
                                )
                            }
                          </Alert>
                        </div>
                        {
                          this.state.results.length > 0 ?
                            (
                              <ResultsTable word_searched={this.state.words} results={this.state.results} counts_tipos={this.state.counts_tipos} />
                            ) : true
                        }
                      </div>
                    ) : true
              ) : true
          }

        </Container>
        <Footer />
      </div>
    )
  }
};

export default Searching;