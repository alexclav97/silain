import React from "react";
import axios from "axios";
// import { connect } from "react-redux";
import {
    Row, Col, Input
} from "reactstrap";

import api from "api_route.js";

class CustomFiltersByMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cultivos: [],
            cats: [],
            subs: [],
            tipos: [],
            formatos: [],
            current_sub: [],
            current_fin: [],
            selections: {
                cultivo: "Select",
                categoria: "Select",
                subcategoria: "Select",
                tipo: "Select",
                formato: "Select",
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

    componentDidMount() {

        const url = api.route + "/getfilters/ubication";

        axios.get(url)
            .then(res => {
                var { cultivos, cats, subs, tipos, formatos } = res.data;
                // console.log(res.data)
                this.setState({
                    cultivos: cultivos,
                    cats: cats,
                    subs: subs,
                    tipos: tipos,
                    formatos: formatos
                });
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
                        <b>Cultivo</b>
                        <Input onChange={this.handleSelects.bind(this)} type="select" name="cultivo" id="exampleSelect">
                            <option>Select</option>
                            {
                                this.state.cultivos.map((e, i) => (
                                    <option key={i}>{e.cultivo}</option>
                                ))
                            }
                        </Input>
                    </Col>
                    <Col>
                        <b>Categoria</b>
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
                        <b>Subcategoria</b>
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
                        <b>Tipo</b>
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
                        <b>Formato</b>
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

export default CustomFiltersByMap;