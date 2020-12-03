import React from "react";

import { Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import m_1 from "./p3_m_1.png";
import m_2 from "./p3_m_2.png";

class Project3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            obj: "",
        }
    }

    diagramEvent(e) {
        this.setState({ obj: e });
    }

    render() {
        // console.log(this.props.history)
        return (
            <div className="animated bounceIn fast">
                <center>
                    <h5>
                        ESTIMACIÓN DE LAS CONCENTRACIONES DE NITRÓGENO EN EL CULTIVO DE ARROZ A PARTIR DE DATOS HIPERESPECTRALES
                    </h5>
                    <b>
                        Trabajo de Grado presentado como requisito para optar por el título de <br></br>
                        Ingeniero Topográfico
                    </b>
                </center>
                <b>Realizado por:</b> <br />
                Duvan Felipe Quintero Perea <br />
                <b>Director:</b> <br />
                    MAURICIO EDILBERTO RINCÓN ROMERO <br />
                    Ingeniero Catastral y Geodesta M.Sc. Ph.D. <br />
                <Link to="/article/423" style={{ "color": "green" }}>
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
                                El rendimiento de un cultivo de arroz depende de la disponibilidad y asimilación de
                                nutrientes, el tiempo de exposición de la planta a la radiación solar, disponibilidad del
                                recurso hídrico y el manejo adecuado que se le dé a la interacción del sistema
                                agrícola. La geomática en la gestión agrícola y en particular en la agricultura de
                                precisión juega un papel muy importante, dado que permite relacionar espacialmente
                                los individuos, procesos y variables que intervienen en un evento, y de esta manera
                                atender puntualmente las necesidades de cada planta, y a partir de ellos entender
                                mejor el proceso de producción, sus relaciones, efectos e impactos para el apoyo a la
                                toma de decisiones. En la presente investigación, se realizó el seguimiento de un
                                conjunto de plantas de arroz en todo el ciclo de crecimiento. Se adoptaron cuatro
                                experimentos usando diferentes planes de manejo en la aplicación del nitrógeno; una
                                con los niveles estándares usados en la producción normal (200 kg/ha) y las otras tres
                                con -50%, +100% y +200%, respectivamente. Las variables de respuesta se
                                capturaron a través de lecturas de fenotipo, espectroradiometría y análisis químico del
                                contenido de N en muestras foliares en cuatro momentos del desarrollo del cultivo. Se
                                estimaron las longitudes de onda más sensibles a la variabilidad del nitrógeno en el
                                arroz, para así desarrollar un índice de vegetación (IDN) que permite estimar las
                                condiciones de contenido de nitrógeno en el follaje del arroz para la variedad
                                Fedearroz 60. Finalmente, se establecieron los cuatro modelos de estimación
                                basados en el índice IDN con una muestra de 20 datos que presentaron valores de
                                precisión de estimación prometedores (34 % &lt; R2 &gt; 87 %) y, además, se encontró
                                concordancia frente a la respuesta de las variables evaluadas con la literatura, por lo
                                cual, se recomienda la aplicación de esta metodología en el manejo del estado
                                nutricional del cultivo de arroz.
                        </div>
                        </Accordion.Collapse>
                    </div>
                    <div>
                        <Accordion.Toggle as={Card.Header} eventKey="1" style={{ "backgroundColor": "#98B503" }}>
                            <h5 style={{ "cursor": "pointer", "textAlign": "center" }}><b>Metodología</b></h5>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <div className="projectBody">
                                Como estrategia global de la investigación se propone el desarrollo de un experimento
                                que evalúa el efecto de cuatros dosis diferentes de nitrógeno en el cultivo de arroz con
                                el objetivo de estimar los niveles de tal concentración a partir de datos
                                hiperespectrales. Se formula la estructura metodología basado en la experiencia de
                                los estudios de Peña, Cruzan y Martineza (2010) y Stroppiana et al. (2006), además,

                                se incorporan las recomendaciones de uso de cada fabricante de los equipos
                                utilizados PhilRice, (2007); Ocean Optics, (2009) juntos a Primera et al, (2005) en su
                                guía de adquisición de datos espectrales.
                                De este modo, como diseño experimental se propuso el desarrollo de cuatro
                                experimentos con diferentes planes de manejo en la aplicación de N; las dosis
                                aplicadas fueron basadas en un nivel estándar recomendado para las condiciones del
                                área de estudio (N= 200 kg/ha) y las otras tres con la variación del nitrógeno en -50%,
                                +100% y +200%, respectivamente. Se capturaron tres tipos de variables de
                                respuestas que se agrupan en datos de fenotipo, espectrometría y análisis químico
                                del contenido de N foliar durante cuatro momentos del desarrollo del cultivo. De ahí
                                que, el efecto de cada tratamiento fue medido por medio de la cantidad de N foliar
                                absorbido, en contraste con lo que reflejo las características fisiológicas y la respuesta
                                espectral para identificar tendencias físicas en el desarrollo y el aprovechamiento de
                                los insumos en las plantas inducido por la disponibilidad de nutrientes, para
                                desarrollar un índice de vegetación que permite estimar las condiciones de contenido
                                de N en el follaje del arroz.

                                <br />
                                <br />

                                <center>
                                    <img src={m_1} alt="imagen1" width="50%" height="50%" />

                                    <br />
                                    <br />

                                    <img src={m_2} alt="imagen2" width="50%" height="50%" />
                                </center>

                                <br />
                                <br />

                                <div style={{ "textAlign": "left" }}>
                                    <h6>Datos Relacionados:</h6>
                                    <ul>
                                        <li><Link to='/article/90' style={{ 'color': 'green' }}>Fisiología de plantas de arroz en finca San José Fase 1</Link></li>
                                        <li><Link to='/article/91' style={{ 'color': 'green' }}>Fisiología de plantas de arroz en finca San José Fase 2</Link></li>
                                        <li><Link to='/article/92' style={{ 'color': 'green' }}>Fisiología de plantas de arroz en finca San José Fase 3</Link></li>
                                        <li><Link to='/article/93' style={{ 'color': 'green' }}>Fisiología de plantas de arroz en finca San José Fase 4</Link></li>

                                        <li><Link to='/article/37' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N1, fase 1</Link></li>
                                        <li><Link to='/article/38' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N2, fase 1</Link></li>
                                        <li><Link to='/article/39' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N3, fase 1</Link></li>
                                        <li><Link to='/article/40' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento T, fase 1</Link></li>
                                        <li><Link to='/article/41' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento K1, fase 2</Link></li>
                                        <li><Link to='/article/42' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento K2, fase 2</Link></li>
                                        <li><Link to='/article/43' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento K3, fase 2</Link></li>
                                        <li><Link to='/article/44' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N1-R, fase 2</Link></li>
                                        <li><Link to='/article/45' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N1, fase 2</Link></li>
                                        <li><Link to='/article/46' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N2-R, fase 2</Link></li>
                                        <li><Link to='/article/47' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N2, fase 2</Link></li>
                                        <li><Link to='/article/48' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N3-R, fase 2</Link></li>
                                        <li><Link to='/article/49' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N3, fase 2</Link></li>
                                        <li><Link to='/article/50' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento P1, fase 2</Link></li>
                                        <li><Link to='/article/51' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento P2, fase 2</Link></li>
                                        <li><Link to='/article/52' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento P3, fase 2</Link></li>
                                        <li><Link to='/article/53' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento T-R, fase 2</Link></li>
                                        <li><Link to='/article/54' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento T, fase 2</Link></li>
                                        <li><Link to='/article/55' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento K1, fase 3</Link></li>
                                        <li><Link to='/article/56' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento K2, fase 3</Link></li>
                                        <li><Link to='/article/57' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento K3, fase 3</Link></li>
                                        <li><Link to='/article/58' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N1-R, fase 3</Link></li>
                                        <li><Link to='/article/59' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N1, fase 3</Link></li>
                                        <li><Link to='/article/60' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N2-R, fase 3</Link></li>
                                        <li><Link to='/article/61' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N2, fase 3</Link></li>
                                        <li><Link to='/article/62' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N3-R, fase 3</Link></li>
                                        <li><Link to='/article/63' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N3, fase 3</Link></li>
                                        <li><Link to='/article/64' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento P1, fase 3</Link></li>
                                        <li><Link to='/article/65' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento T-R, fase 3</Link></li>
                                        <li><Link to='/article/66' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento T, fase 3</Link></li>
                                        <li><Link to='/article/67' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento K1, fase 4</Link></li>
                                        <li><Link to='/article/68' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento K2, fase 4</Link></li>
                                        <li><Link to='/article/69' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento K3, fase 4</Link></li>
                                        <li><Link to='/article/70' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N1, fase 4</Link></li>
                                        <li><Link to='/article/71' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N2, fase 4</Link></li>
                                        <li><Link to='/article/72' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N3, fase 4</Link></li>
                                        <li><Link to='/article/73' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento P1, fase 4</Link></li>
                                        <li><Link to='/article/74' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento P2, fase 4</Link></li>
                                        <li><Link to='/article/75' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento T, fase 4</Link></li>
                                        <li><Link to='/article/76' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento K1, fase 4</Link></li>
                                        <li><Link to='/article/77' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento K2, fase 4</Link></li>
                                        <li><Link to='/article/78' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento K3, fase 4</Link></li>
                                        <li><Link to='/article/79' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N1, fase 4</Link></li>
                                        <li><Link to='/article/80' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N2, fase 4</Link></li>
                                        <li><Link to='/article/81' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N3, fase 4</Link></li>
                                        <li><Link to='/article/82' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento N3_R, fase 4</Link></li>
                                        <li><Link to='/article/83' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento P1, fase 4</Link></li>
                                        <li><Link to='/article/84' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento P2, fase 4</Link></li>
                                        <li><Link to='/article/85' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento P3, fase 4</Link></li>
                                        <li><Link to='/article/86' style={{ 'color': 'green' }}>Lectura de espectrometría en cultivo de arroz, finca San José tratamiento T, fase 4</Link></li>

                                    </ul>
                                </div>
                            </div>

                        </Accordion.Collapse>
                    </div>
                    <div>
                        <Accordion.Toggle as={Card.Header} eventKey="3" style={{ "backgroundColor": "#E7B107" }}>
                            <h5 style={{ "cursor": "pointer", "textAlign": "center" }}><b>Conclusiones</b></h5>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <div className="projectBody">
                                Para la variedad de arroz Fedearroz 60 se analizaron cuatro fases fenológicas en un
                                experimento en campo realizado en la finca San José de la Arrocera La Esmeralda
                                S.A.S, ubicada en el Departamento del Cauca, municipio de Santander de Quilichao
                                (zona del suroccidente colombiano)- En este estudio se encontró que cada etapa
                                fenológica presenta una respuesta diferente para las variables de estudio, es decir
                                que no hay una tendencia que trascienda durante todo el ciclo del cultivo aunque en
                                las fases que se compararon contra los demás autores las respuestas encontradas
                                fueron coherentes. Por otro lado, en las variables macollos y altura se presentaron
                                casos en los que iguales niveles de fertilización se comportaron como diferentes
                                poblaciones, mientras que diferentes niveles de fertilización demostraron ser de la
                                misma población debido a las alteraciones de factores que no se pudieron controlar
                                como las condiciones de aplicación homogénea, absorción homogénea por tener un
                                riego inundado, volatilización de la urea o la deficiencia de otros nutrientes.
                                <br />
                                <br />
                                Se encontró también que, si se conserva la aplicación de N del tratamiento Testigo
                                (200 kg/ha) la variedad Fedearroz 60 puede alcanzar una cantidad máxima de
                                macollos que oscila entre 15 unidades con algunas alteraciones de plantas que
                                alcanzan las 22 unidades, la altura promedio para la fase final estará entre 94 cm a
                                106 cm, sin embargo, acerca del verdor no se alcanzaron intensidades altas como se
                                esperaban pero se evidenció la respuesta al déficit de N con valores críticos, no
                                obstante, los tratamientos de mayor concentración de N no desarrollaron intensidades
                                mayores al umbral de 3,5.
                                <br />
                                <br />
                                Se determinaron las firmas espectrales para cada una de las fases estudiadas y se
                                comprobó que cada parcela experimental se comporta como un tratamiento distinto
                                dentro de su fase, esto mediante el análisis de varianza prueba H de Kruskal – Wallis,
                                y, además, se pudo reconocer las zonas del espectro donde se presentan los cambios
                                asociado a las concentraciones de N: la absorbancia en las longitudes de ondas del
                                violeta(400 – 445 nm), del azul B(400 – 510 nm) con registros menores del 12 % y en
                                la banda del rojo R(640 – 670 nm); en la región del verde G(530 – 590 nm), marcada
                                por el primer pico de reflectancia, se crea una separación entre las firmas de los
                                diferentes tratamiento que finaliza con tres comportamientos donde los registros de
                                mayor y menor magnitud corresponden a N3R y N1 respectivamente, sin superar el
                                30 % de reflectancia; por último, el borde rojo NIR(670 – 750 nm) que se encuentra
                                entre los valores entre 62 y 70 %. En cuanto a la variabilidad de los datos, la primera
                                fase presentó dispersiones altas para todos los tratamientos debido al ruido generado
                                por el tamaño de las hojas y las condiciones que propiciaba la lámina de agua junto
                                con la condición climática, sin embargo, en el resto de las fases se obtuvo un balance
                                de variabilidad bajo, a lo cual no se encontró relación con la magnitud de la
                                reflectancia ni con la hora de la toma de datos, por lo cual, se afirma que la
                                metodología planteada para los datos espectrales fue la adecuada.
                                El índice IDN general subestima los valores elevados de N, mientras que sobre estimo
                                los valores pequeños de N, por lo cual se planteó realizar el cálculo de un índice IDN
                                sectorizado por fase fenológica, a los cuales se les desarrolló los modelos de
                                regresión que permitieron identificar que se mantuvo la correlación entre las
                                concentraciones de N y la longitud de onda localizada en la región del infrarrojo
                                cercano NIR(670 – 750 nm), mientras que aquella ubicada en el pico del verde por el
                                IDN general se desplazó hacia las regiones en los que la clorofila genera la mayor
                                absorbancia como lo fueron la banda del violeta (400 – 430 nm) y del rojo R(640 – 670
                                nm). Los datos usados en el modelo fueron tomados sobre parcelas a las que se les
                                brindó las mejores condiciones de producción; es decir que a pesar de que se tuvo un
                                experimento de dosis baja, no se tuvieron datos de plantas o parcelas con malas
                                condiciones nutricionales. Esto implica que sería conveniente poder complementar el
                                experimento con observaciones tomadas en parcelas deficitarias, y de esta forma se
                                podría mejorar el espectro de representatividad de la información para afinar el
                                modelo.
                                <br />
                                <br />
                                Para uno de los modelos sectorizados (Fase 1), se encontró una tendencia negativa
                                para la correlación de modo que a medida que aumenta el valor del índice IDN F1, el
                                valor de N foliar disminuye, mientras que en las demás fases se estableció una
                                tendencia positiva. Esto se explica porque las regiones a las que pertenecen las
                                longitudes de onda que se asociaron con el N foliar para IDN F1 son ρ1 = 723,88 nm y
                                ρ2 = 407,97 nm, es decir que el comportamiento de una planta sana siempre estará
                                regido por ρ1 &gt; ρ2, lo que indica que para esta fase a medida que la diferencia de
                                reflectancia de estas dos bandas aumentaba el valor de N foliar de la planta
                                disminuía.
                                <br />
                                <br />
                                En cuanto a los modelos de estimación se encontró que aquellos generados con 4
                                muestras (Fase 1 y Fase 4) arrojaron pendientes elevadas y valores de ajustes altos
                                con R2 = 87 % y R2 = 83 % respectivamente, mientras que aquellos con un número de
                                muestras mayor a 12 (Fase 3 y el general) reducen el valor de la pendiente debido a
                                que el modelo se entrena con una mayor varianza y, por lo tanto, el valor R2
                                disminuye a valores de R2 = 34 % y R2 = 35 % respectivamente. De esto, se puede
                                concluir que las condiciones del cultivo Fedearroz 60 requieren pendientes altas en el
                                modelo para una capacidad de estimación alta y que es indispensable un grupo de
                                muestras más grande para que el modelo sea confiable, además, es una excelente
                                consideración el generar un modelo de estimación para cada fase ya que la pendiente
                                de cada uno se ajustaría al momento de desarrollo del cultivo.
                                Los resultados que se obtuvieron de este estudio son coherentes por lo que describen
                                otros autores con investigaciones similares, a lo cual se considera como una buena
                                herramienta para estimar las concentraciones de N foliar a partir de una metodología
                                basada en datos hiperespectrales que resulta ser no destructiva y con resultados en
                                un tiempo oportuno para la toma de decisiones frente a las necesidades de
                                fertilizantes. Sin embargo, pese a que el modelo de IDN general reporta un valor
                                similar al de la literatura es conveniente desarrollar un modelo específico para cada
                                fase fenológica para que la pendiente y el intercepto se ajusten al desarrollo de ese
                                momento del cultivo y, además, se debe de actualizar estos modelos con nuevos
                                conjuntos de datos que entre 12 a 20 muestras para entrenar el modelo por etapa y
                                así que los modelos tengan validez en las estimaciones del estado nutricional del
                                cultivo de arroz.

                            </div>
                        </Accordion.Collapse>
                    </div>
                </Accordion>
            </div>
        )
    }
}

export default Project3;