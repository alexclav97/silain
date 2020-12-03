import React from "react";
// import { connect } from "react-redux";
import {
    Input
} from "reactstrap";

import api from "api_route.js";

class FiltersOnMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            depts: [],
            munis: {},
            fins: {},
            current_mun: [],
            current_fin: [],
            val_muni: -1,
            val_fin: -1,
            selections: {
                departamento: "Select",
                municipio: "Select",
                finca: "Select",
            }
        }
    }

    handleSelects(e) {
        var sele = { ...this.state.selections };
        var val = e.target.value;
        console.log(val);
        if (val === "-1") {
            val = -1;
            sele["finca"] = "Select";
        } else {
            sele["finca"] = this.state.current_fin[val];
        }
        this.props.getFilters(sele);
        this.setState({ selections: sele, val_fin: val })
    }

    handleSelectDEPT(e) {
        // Hago esto para guardar la categoria seleccionada y adicional cambiat current_sub
        // con las subcategorias correspondientes a la categoria seleccionada
        var sele = { ...this.state.selections };
        var val = e.target.value;
        var c_mun = [];

        if (val === "-1") {
            val = -1;
            sele["departamento"] = "Select";
        } else {
            sele["departamento"] = this.state.depts[val];
            c_mun = this.state.munis[sele["departamento"]];
        }
        sele["municipio"] = "Select";
        sele["finca"] = "Select";
        this.props.getFilters(sele);
        this.setState({
            selections: sele,
            current_mun: c_mun,
            current_fin: [],
            val_muni: -1,
            val_fin: -1
        });
    }


    handleSelectMUNI(e) {

        var sele = { ...this.state.selections };
        var val = e.target.value;
        var c_fin = [];

        if (val === "-1") {
            val = -1
            sele["municipio"] = "Select";
        } else {
            sele["municipio"] = this.state.current_mun[val];
            c_fin = this.state.fins[sele["municipio"]];
        }
        sele["finca"] = "Select";
        // console.log(sele.municipio)
        this.props.getFilters(sele);
        this.setState({
            selections: sele,
            current_fin: c_fin,
            val_muni: val,
            val_fin: -1
        });
    }

    async componentDidMount() {

        const res = await fetch(api.route + "/getfilters/onmap");
        var { departamentos, municipios, fincas } = await res.json();
        // console.log({ departamentos, municipios, fincas } );
        this.setState({
            depts: departamentos,
            munis: municipios,
            fins: fincas,
        });
    }

    render() {
        return (
            <div style={{ "width": "155px", "fontSize": "14px" }}>

                <b>Departamentos</b>
                <Input onChange={this.handleSelectDEPT.bind(this)} type="select" id="exampleSelect">
                    <option value={-1}>Select</option>
                    {
                        this.state.depts.map((e, i) => (
                            <option value={i} key={i}>{e}</option>
                        ))
                    }
                </Input>
                <b>Municipios</b>
                {/* SE HACE USO DE this.state.val_muni PARA QUE SE SETEE EL VALOR Y CAMBIE */}
                <Input onChange={this.handleSelectMUNI.bind(this)} value={this.state.val_muni} type="select" id="exampleSelect">
                    <option value={-1}>Select</option>
                    {
                        this.state.current_mun.map((e, i) => (
                            <option value={i} key={i}>{e}</option>
                        ))
                    }
                </Input>
                <b>Fincas</b>
                {/* SE HACE USO DE this.state.val_fin PARA QUE SE SETEE EL VALOR Y CAMBIE */}
                <Input onChange={this.handleSelects.bind(this)} value={this.state.val_fin} type="select" name="finca" id="exampleSelect">
                    <option value={-1}>Select</option>
                    {
                        this.state.current_fin.map((e, i) => (
                            <option value={i} key={i}>{e}</option>
                        ))
                    }
                </Input>
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

export default FiltersOnMap;