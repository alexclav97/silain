import React from "react";

import {
    Table,
    Button
} from "reactstrap";

import axios from "axios";
import api from "../../api_route.js";

import { NavLink } from "react-router-dom";
import auth from "components/auth/auth.js";

class ResultsTableByMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: this.props.results,
        }
    }

    changeLabel(pos, id) {

        var r = [...this.state.results];
        var new_val = !r[pos].publico
        r[pos].publico = new_val;

        axios.post(api.route + "/makepublic/", { id: id, val: new_val })
            .then(res => {
                this.setState({ results: r });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <Table hover={true}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Titulo y resumen</th>
                            <th>Tipo</th>
                            <th>Formato</th>
                            <th>Tamaño</th>
                            <th>Acceso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.results.map((e, i) => (
                                <tr key={i}>
                                    <th scope="row">{(20 * this.props.currentPage) + i + 1}</th>
                                    <td>
                                        <b>
                                            <NavLink to={"/article/" + e.idmetadato}
                                                className="silain_green_links"
                                            >
                                                {e.titulo}
                                            </NavLink>
                                        </b>
                                        <br />
                                        <i>{e.resumen}</i>
                                    </td>
                                    <td className="centerTd">
                                        {e.tipo}
                                    </td>
                                    <td className="centerTd">
                                        {e.formato} <br />
                                    </td>
                                    <td className="centerTd">
                                        {e.tamano}
                                    </td>
                                    {
                                        auth.isAdmin() ?
                                            <td className="centerTd">
                                                <Button onClick={this.changeLabel.bind(this, i, e.idmetadato)} color={e.publico ? "success" : "danger"}>
                                                    {e.publico ? "Público" : "Privado"}
                                                </Button>
                                            </td>
                                            : <td className="centerTd">
                                                {e.publico ? "Público" : "Privado"} <br />
                                            </td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ResultsTableByMap;