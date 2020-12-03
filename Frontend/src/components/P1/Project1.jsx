import React from "react";

// import {
//     Row, Col,
//     Button
// } from 'reactstrap';// used for making the prop types of this component

import { Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import diagrams from "./diagrams.js";

import mermaid from 'mermaid';

// Objetivos 
import Eimage from "./Eimage.png";
import Fimage from "./Fimage.png";
import Gimage from "./Gimage.png";
import O2 from "./O2.png";
import O3 from "./O3.png";

// Resultados
import R11 from "./R1.1.png";
import R12 from "./R1.2.png";
import R122 from "./R1.2.2.png";
import R13 from "./R1.3.png";

import R21 from "./R2.1.png";
import R22 from "./R2.2.png";
import R23 from "./R2.3.png";
import R24 from "./R2.4.png";

import R31 from "./R3.1.png";
import R312 from "./R3.1.2.png";
import R32 from "./R3.2.png";
import R33 from "./R3.3.png";
import R332 from "./R3.3.2.png";

// Conclusiones
import C1 from "./C1.png";
import C2 from "./C2.png";


class Project1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            obj: "",
            showObj: "",
        }
    }

    diagramEvent(e) {
        this.setState({ showObj: e });
    }

    showDiagram(d) {

        this.setState({ "obj": d });

        var output;

        if (d[0] === "O") {
            output = document.getElementById('output');
        } else {
            output = document.getElementById('outputResults');
        }

        var config = {
            startOnLoad: true,
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'cardinal',
            },
            securityLevel: 'loose',
        };

        mermaid.initialize(config);

        var graphDefinition;

        switch (d) {
            case "O1":
                graphDefinition = diagrams.o1;
                break;
            case "O2":
                graphDefinition = diagrams.o2;
                break;
            case "O3":
                graphDefinition = diagrams.o3;
                break;
            case "R1":
                graphDefinition = diagrams.r1;
                break;
            case "R2":
                graphDefinition = diagrams.r2;
                break;
            case "R3":
                graphDefinition = diagrams.r3;
                break;
            default:
                break;
        }

        mermaid.render('theGraph', graphDefinition, (svgCode, bindFunctions) => {
            output.innerHTML = svgCode;
            bindFunctions()
        });
    }

    componentDidMount() {
        window.foo = e => { this.diagramEvent(e); }
    }

    render() {
        // console.log(this.props.history)
        return (
            <div className="animated bounceIn fast">
                <center>
                    <h5>
                        SUSTENTABILIDAD AMBIENTAL DEL MANEJO Y USO DEL AGUA EN CULTIVOS DE ARROZ DE RIEGO. CASO ESTUDIO: FINCA ARROCERA SAN JOSÉ, MUNICIPIO DE SANTANDER DE QUILICHAO, DEPARTAMENTO DEL CAUCA.
                    </h5>
                    <b>
                        Trabajo de Grado presentado como requisito parcial para optar por el título de <br></br>
                        Magister en Desarrollo Sustentable con énfasis en Ecosistemas Acuáticos
                    </b>
                </center>
                <b>Realizado por:</b> <br />
                    Claudia Patricia Vidal Puerta <br />
                <b>Director:</b> <br />
                    MAURICIO EDILBERTO RINCÓN ROMERO <br />
                    Ingeniero Catastral y Geodesta M.Sc. Ph.D. <br />
                <b>Codirector:</b> <br />
                    OSCAR BUITRAGO BERMÚDEZ <br />
                    Ingeniero Agrícola M.Sc. Ph.D. <br />
                <Link to="/article/421" style={{ "color": "green" }}>
                    <b>CONSULTAR TESIS</b> <span role="img" aria-label=".">📝</span>
                </Link>
                <hr />
                <br />
                <Accordion>
                    <div>
                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{ "backgroundColor": "#65A357" }}>
                            <h5 style={{ "cursor": "pointer", "textAlign": "center" }}><b>Resumen</b></h5>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <div className="projectBody" style={{ "textAlign": "justify" }}>
                                El cultivo de arroz inundado es uno de los agroecosistemas que ejerce mayor presión sobre el bien hídrico. Por ello, la evaluación de la sustentabilidad ambiental a partir del concepto de huella hídrica es importante ya que permite determinar cómo el manejo y uso del agua en el cultivo puede afectar la disponibilidad tanto en cantidad como en calidad. De ahí que, esta investigación parte de caracterizar el manejo y uso del agua en la producción primaria del arroz, el cual se define por las dimensiones culturales de los agricultores; posteriormente, se cuantifican los tres (3) componentes del indicador biofísico de sustentabilidad Huella Hídrica y, finalmente, se determinan los efectos ambientales mediante índices de sustentabilidad e indicadores de calidad y contaminación del agua. El estudio se centró en la finca San José perteneciente a la arrocera La Esmeralda S.A.S., ubicada en la zona plana del municipio de Santander de Quilichao – Departamento del Cauca durante el periodo comprendido entre septiembre de 2018 - febrero de 2019. Los resultados evidencian que el manejo y uso del agua está determinado por la percepción de abundancia del bien hídrico que tiene el agricultor, hecho que conlleva a su excesivo uso para mantener altos rendimientos y disminuir la aplicación de agroquímicos. Por otro lado, la cuantificación de la huella hídrica en el periodo indicado fue de  referida a  de , cero (0) de  y  de , mostrando que las aguas verdes, en la temporada de alto régimen pluviométrico, satisfacen las necesidades hídricas de la planta de arroz, por lo cual no es necesario el riego. No obstante, a partir del diseño e implementación de la estación automática medidora de caudal se encontró que se incorporaron  de agua de riego extraídos de los ríos y drenajes próximos para establecer la inundación permanente y garantizar el control residual de malezas; de este volumen  retornaron a las fuentes hídricas naturales. Finalmente, la evaluación de la sustentabilidad ambiental del manejo y uso del agua verde, azul y gris muestra una condición crítica de contaminación por agentes microbiológicos, compuestos químicos y un estado hipertrófico por el alto contenido de nutrientes, con lo cual se contribuye al deterioro progresivo de la calidad del agua cuando se reintegran a los ríos.
                            </div>
                        </Accordion.Collapse>
                    </div>
                    <div>
                        <Accordion.Toggle as={Card.Header} eventKey="1" style={{ "backgroundColor": "#98B503" }}>
                            <h5 style={{ "cursor": "pointer", "textAlign": "center" }}><b>Metodología</b></h5>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <div className="projectBody">
                                <h6>Objetivos</h6>
                                <ul>
                                    <li>
                                        <button className="ButtonLikeLink" onClick={this.showDiagram.bind(this, "O1")}>
                                            Caracterizacion del manejo y uso del agua en la unidad agricola
                                        </button>
                                    </li>
                                    <li>
                                        <button className="ButtonLikeLink" onClick={this.showDiagram.bind(this, "O2")}>
                                            Cuantificacion de la HHverde, HHazul, HHgris
                                        </button>
                                    </li>
                                    <li>
                                        <button className="ButtonLikeLink" onClick={this.showDiagram.bind(this, "O3")}>
                                            Definir los efectos ambientales de la HHverde, HHazul, HHgris
                                        </button>
                                    </li>
                                </ul>
                                <center>
                                    < div id="output" />
                                    {
                                        this.state.obj === "O1" ?
                                            <div>
                                                <br />
                                                <hr />
                                                {
                                                    this.state.showObj === "SS1O1" ? <img width="800px" height="480px" src={Eimage} alt="" /> : true
                                                }
                                                {
                                                    this.state.showObj === "SS2O1" ? <img width="800px" height="480px" src={Fimage} alt="" /> : true
                                                }
                                                {
                                                    this.state.showObj === "SS3O1" ? <img width="800px" height="480px" src={Gimage} alt="" /> : true
                                                }
                                                <div style={{ "textAlign": "left" }}>
                                                    <h6>Articulos Relacionados:</h6>
                                                    <ul>
                                                        <li>
                                                            <Link to="/article/407" style={{ "color": "green" }}>
                                                                Caudales promedio diarios en cultivos de arroz
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>
                                            : true
                                    }
                                    {
                                        this.state.obj === "O2" ?
                                            <div>
                                                <br />
                                                <hr />
                                                {
                                                    this.state.showObj === "SS1O2" || this.state.showObj === "SS2O2" ? <img width="700px" height="480px" src={O2} alt="" /> : true
                                                }
                                                <br />
                                                <div style={{ "textAlign": "left" }}>
                                                    <h6>Articulos Relacionados:</h6>
                                                    <ul>
                                                        <li>
                                                            <Link to="/article/406" style={{ "color": "green" }}>
                                                                Datos climáticos finca arrocera San José para el cálculo de las necesidades hídricas del cultivo
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/article/408" style={{ "color": "green" }}>
                                                                Análisis de los parámetros del agua en finca San José
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/article/409" style={{ "color": "green" }}>
                                                                Análisis de los parámetros del suelo en finca San José
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            : true
                                    }
                                    {
                                        this.state.obj === "O3" ?
                                            <div>
                                                <br />
                                                <hr />
                                                {this.state.showObj === "SS1O3" || this.state.showObj === "SS2O3" || this.state.showObj === "SS3O3" ? <img width="700px" height="480px" src={O3} alt="" /> : true}
                                                <div style={{ "textAlign": "left" }}>
                                                    <h6>Datos Relacionados:</h6>
                                                    <ul>
                                                        <li>
                                                            <Link to="/article/417" style={{ "color": "green" }}>
                                                                Polígonos de Coberturas Vegetales, finca San José
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/article/410" style={{ "color": "green" }}>
                                                                Imagen MODIS Evapotranspiración finca San José, Enero 2018
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/article/411" style={{ "color": "green" }}>
                                                                Imagen MODIS Evapotranspiración finca San José, Febrero 2018
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/article/412" style={{ "color": "green" }}>
                                                                Imagen MODIS Evapotranspiración finca San José, Septiembre 2017
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/article/413" style={{ "color": "green" }}>
                                                                Imagen MODIS Evapotranspiración finca San José, Octubre 2017
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/article/414" style={{ "color": "green" }}>
                                                                Imagen MODIS Evapotranspiración finca San José, Noviembre 2017
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/article/415" style={{ "color": "green" }}>
                                                                Imagen MODIS Evapotranspiración finca San José, Diciembre 2017
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/article/416" style={{ "color": "green" }}>
                                                                Imagen MODIS Evapotranspiración finca San José, Periodo Septiembre 2017 - Febrero 2018
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <br />
                                            </div>
                                            : true
                                    }
                                </center>

                            </div>

                        </Accordion.Collapse>
                    </div>
                    <div>
                        <Accordion.Toggle as={Card.Header} eventKey="2" style={{ "backgroundColor": "#EBC038" }}>
                            <h5 style={{ "cursor": "pointer", "textAlign": "center" }}><b>Resultados</b></h5>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <div className="projectBody">
                                <h6>Resultados Por objetivo</h6>
                                <ul>
                                    <li>
                                        <button className="ButtonLikeLink" onClick={this.showDiagram.bind(this, "R1")}>
                                            Caracterizacion del manejo y uso del agua en la unidad agricola
                                        </button>
                                    </li>
                                    <li>
                                        <button className="ButtonLikeLink" onClick={this.showDiagram.bind(this, "R2")}>
                                            Cuantificacion de la HHverde, HHazul, HHgris
                                        </button>
                                    </li>
                                    <li>
                                        <button className="ButtonLikeLink" onClick={this.showDiagram.bind(this, "R3")}>
                                            Definir los efectos ambientales de la HHverde, HHazul, HHgris
                                        </button>
                                    </li>
                                </ul>
                                <center>
                                    < div id="outputResults" />
                                    {
                                        this.state.obj === "R1" ?
                                            <div>
                                                <br />
                                                <hr />
                                                {
                                                    this.state.showObj === "ST1R1" ? <img width="800px" height="480px" src={R11} alt="" /> : true
                                                }
                                                {
                                                    this.state.showObj === "ST2R1" ?
                                                        <div>
                                                            <img width="800px" height="480px" src={R12} alt="" />
                                                            <br />
                                                            <img width="800px" height="480px" src={R122} alt="" />
                                                        </div>
                                                        : true
                                                }
                                                {
                                                    this.state.showObj === "ST3R1" ? <img width="800px" height="480px" src={R13} alt="" /> : true
                                                }
                                            </div>
                                            : true
                                    }
                                    {
                                        this.state.obj === "R2" ?
                                            <div>
                                                <br />
                                                <hr />
                                                {
                                                    this.state.showObj === "ST1R2" ? <img width="800px" height="480px" src={R21} alt="" /> : true
                                                }
                                                {
                                                    this.state.showObj === "ST2R2" ? <img width="800px" height="480px" src={R22} alt="" /> : true
                                                }
                                                {
                                                    this.state.showObj === "ST3R2" ? <img width="800px" height="480px" src={R23} alt="" /> : true
                                                }
                                                {
                                                    this.state.showObj === "ST4R2" ? <img width="800px" height="480px" src={R24} alt="" /> : true
                                                }
                                            </div>
                                            : true
                                    }
                                    {
                                        this.state.obj === "R3" ?
                                            <div>
                                                <br />
                                                <hr />
                                                {
                                                    this.state.showObj === "ST1R3" ?
                                                        <div>
                                                            <img width="800px" height="480px" src={R31} alt="" />
                                                            <br />
                                                            <img width="800px" height="480px" src={R312} alt="" />
                                                        </div>
                                                        : true
                                                }
                                                {
                                                    this.state.showObj === "ST2R3" ? <img width="800px" height="480px" src={R32} alt="" /> : true
                                                }
                                                {
                                                    this.state.showObj === "ST3R3" ?
                                                        <div>
                                                            <img width="800px" height="480px" src={R33} alt="" />
                                                            <br />
                                                            <img width="800px" height="480px" src={R332} alt="" />
                                                        </div>
                                                        : true
                                                }
                                            </div>
                                            : true
                                    }
                                </center>
                            </div>
                        </Accordion.Collapse>
                    </div>
                    <div>
                        <Accordion.Toggle as={Card.Header} eventKey="3" style={{ "backgroundColor": "#E7B107" }}>
                            <h5 style={{ "cursor": "pointer", "textAlign": "center" }}><b>Conclusiones</b></h5>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <center>
                                <div className="projectBody">
                                    <img width="800px" height="380px" src={C1} alt="" />
                                    <br />
                                    <img width="800px" height="380px" src={C2} alt="" />
                                </div>
                            </center>
                        </Accordion.Collapse>
                    </div>
                </Accordion>
            </div>
        )
    }
}

export default Project1;