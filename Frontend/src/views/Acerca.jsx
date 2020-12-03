import React from "react";

// // reactstrap components
import {
    Container
} from 'reactstrap';

import logotipos from "assets/logotipos.png";
import { NavLink } from "react-router-dom";

class Acerca extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div style={{ "text-align": "justify" }}>
                <Container>
                    <h3>Sistema de Información del Laboratorio de Agricultura Inteligente – SILAIN</h3>
                        En el marco del Proyecto del Sistema General de Regalías 2014-2020 se consolidó el Centro de
                        Investigación e Innovación en Bioinformática y Fotónica (CIBioFi). Dentro de CiBioFi se construyó
                        un Subproyecto Agricultura Inteligente (SAI) para el cual y con el apoyo del Grupo de Investigación
                        en Simulación y Modelación Dinámica Espacial (GISMODEL) se desarrollaron cinco proyectos en
                        diversos temas de Agricultura Inteligente.
                        <br /><br />
                        Estos proyectos generaron un gran volumen de información agronómica y ambiental mediante la
                        utilización de variadas técnicas como la fotografía multiespectral, espectrometría, muestreo de
                        suelos y vegetación, levantamientos posicionales de campo y estaciones de monitoreo ambiental.
                        <br /><br />
                        Ante la necesidad de una herramienta para facilitar la consulta y acceso a los datos e información
                        del SAI se construyó el Sistema de Información del Laboratorio de Agricultura Inteligente (SILAIN),
                        siendo este una plataforma web desarrollada con software libre que cuenta con diferentes
                        utilidades para consultar, localizar, explorar y acceder a información, datos, publicaciones,
                        metodologías, autores, técnicas, resultados, geoportales y demás productos del SAI. SILAIN se
                        apoya en los principios de datos FAIR (Findable: Localizable, Accessible: Accesible, Interoperable:
                        Interoperable, Reusable: Reutilizable), los cuales son un conjunto de cualidades con las que deben
                        contar los datos científicos para garantizar su validez, su reproductibilidad y para conducir a
                        nuevos descubrimientos.
                        <br /><br />
                        De este modo, SILAIN busca convertirse en una memoria de investigación y a la vez en un medio
                        de divulgación de los datos, haciendo posible la reutilización de la información, procesos y
                        productos que se generan en el Centro, dando visibilidad a los autores para potenciar la gestión
                        científica del Centro en la comunidad Vallecaucana.
                        <br /><br />
                        SILAIN hizo parte del trabajo de grado del estudiante de ingeniería topográfica Alexander Clavijo
                        Ledesma del Grupo de Investigación GISMODEL. El desarrollo de SILAIN inició en marzo de 2020
                        y finalizó en diciembre de este mismo año.
                        <br /><br />
                    <h5>
                        <NavLink to="/">
                            Regresar al inicio
                        </NavLink>
                    </h5>
                    <hr />
                    <center>
                        <img src={logotipos} alt="logotipos" width="60%" height="20%" />
                    </center>
                </Container>
            </div>
        )
    }
};

export default Acerca;