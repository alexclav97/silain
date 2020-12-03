import React from "react";
import axios from "axios";
// import { connect } from "react-redux";
import {
    Row, Col, Input
} from "reactstrap";

import api from "api_route.js";

class CustomFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cats: [],
            subs: [],
            municipios: [],
            tipos: [],
            formatos: [],
            fincas: [],
            current_sub: [],
            current_fin: [],
            selections: {
                categoria: "Select",
                subcategoria: "Select",
                municipio: "Select",
                tipo: "Select",
                formato: "Select",
                finca: "Select"
            }
        }
    }

    handleSelects(e) {
        var sele = { ...this.state.selections };
        sele[e.target.name] = e.target.value;
        this.props.getFilters(sele);
        this.setState({ selections: sele })
    }

    handleSelectCAT(e) {
        // Hago esto para guardar la categoria seleccionada y adicional cambiat current_sub
        // con las subcategorias correspondientes a la categoria seleccionada
        var sele = { ...this.state.selections };
        var val = e.target.value;
        var c_sub = [];

        if (val === "-1") {
            sele["categoria"] = "Select";
        } else {
            sele["categoria"] = this.state.cats[val];
            c_sub = this.state.subs[val]
        }
        sele["subcategoria"] = "Select";
        this.props.getFilters(sele);
        this.setState({ selections: sele, current_sub: c_sub });

    }

    handleSelectMUNICIPIO(e) {
        // Hago esto para guardar el municipio seleccionado y adicional cambiar current_fin
        // con las fincas correspondientes al municipio seleccionado
        var sele = { ...this.state.selections };
        var val = e.target.value;
        var c_fin = [];

        if (val === "-1") {
            sele["municipio"] = "Select";
        } else {
            sele["municipio"] = this.state.municipios[val];
            c_fin = this.state.fincas[val]
        }
        sele["finca"] = "Select";
        this.props.getFilters(sele);
        this.setState({ selections: sele, current_fin: c_fin });
    }

    componentDidMount() {

        const url = api.route + "/getfilters/";

        axios.get(url)
            .then(res => {
                var { cats, subs, municipios, tipos, formatos, fincas } = res.data;
                // console.log(res.data)
                this.setState({ cats: cats, subs: subs, municipios: municipios, tipos: tipos, formatos: formatos, fincas: fincas });
            })
            .catch(err => {
                console.log(err);
            })

    }

    render() {
        return (
            <div>

                <Row>
                    <Col>
                        <center>
                            <b>Categoria</b>
                        </center>
                        <Input onChange={this.handleSelectCAT.bind(this)} type="select" name="cat" id="exampleSelect">
                            <option value={-1}>Select</option>
                            {
                                this.state.cats.map((e, i) => (
                                    <option value={i} key={i}>{e}</option>
                                ))
                            }
                        </Input>
                    </Col>
                    <Col>
                        <center>
                            <b>Subcategoria</b>
                        </center>
                        <Input onChange={this.handleSelects.bind(this)} value={this.state.selections.subcategoria} type="select" name="subcategoria" id="exampleSelect">
                            <option>Select</option>
                            {
                                this.state.current_sub.map((e, i) => (
                                    <option key={i}>{e}</option>
                                ))
                            }
                        </Input>
                    </Col>
                    <Col>
                        <center>
                            <b>Municipio</b>
                        </center>
                        <Input onChange={this.handleSelectMUNICIPIO.bind(this)} type="select" name="municipio" id="exampleSelect">
                            <option value={-1}>Select</option>
                            {
                                this.state.municipios.map((e, i) => (
                                    <option value={i} key={i}>{e}</option>
                                ))
                            }
                        </Input>
                    </Col>
                    <Col>
                        <center>
                            <b>Finca</b>
                        </center>
                        <Input onChange={this.handleSelects.bind(this)} value={this.state.selections.finca} type="select" name="finca" id="exampleSelect">
                            <option>Select</option>
                            {
                                this.state.current_fin.map((e, i) => (
                                    <option key={i}>{e}</option>
                                ))
                            }
                        </Input>
                    </Col>
                    <Col>
                        <center>
                            <b>Tipo</b>
                        </center>
                        <Input onChange={this.handleSelects.bind(this)} type="select" name="tipo" id="exampleSelect">
                            <option>Select</option>
                            {
                                this.state.tipos.map((e, i) => (
                                    <option key={i}>{e.tipo}</option>
                                ))
                            }
                        </Input>
                    </Col>
                    <Col>
                        <center>
                            <b>Formato</b>
                        </center>
                        <Input onChange={this.handleSelects.bind(this)} type="select" name="formato" id="exampleSelect">
                            <option>Select</option>
                            {
                                this.state.formatos.map((e, i) => (
                                    <option key={i}>{e.formato}</option>
                                ))
                            }
                        </Input>
                    </Col>
                </Row>
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     console.log(state)
//     return { theFilters: state };
//     // return {}
// }

// const mapDispatchToPros = state => ({});

// export default connect(mapStateToProps, mapDispatchToPros)(CustomFilters);

export default CustomFilters;