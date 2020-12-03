const diagrams = {
    o1: `
    graph TD
    TO1["Caracterizacion del manejo y uso del agua en la unidad agricola"];
    TO1-->ST1O1["Manejo del Agua"];
    TO1-->ST2O1["Uso del Agua"];
    TO1-->ST3O1["Aspectos culturales"];

    ST1O1-->SS1O1["Identificacion y descripcion de las</br> practicas agricolas de regadio:
    </br></br>
        <li>Preparacion de la tierra</li>
        <li>Proceso de siembra</li>
        <li>Metodo de riego</li>
        <li>Programa de riego</li>
        <li>Aplicacion de agroquimicos y bioinsumos</li>
        <li>Proceso de cosecha</li>
    
    <b><i>Click para mas detalles</i></b>"];
    
    ST2O1-->SS2O1["Calculo del volumen de agua</br> superficial que ingresa a la</br> parcela eperimental</br><b><i>Click para mas detalles</i></b>"];
    ST3O1-->SS3O1["Descripcion de significados</br> culturales que definen el</br> manejo y uso del agua en el</br> cultivo de arroz</br><b><i>Click para mas detalles</i></b>"];
    click SS1O1 foo
    click SS2O1 foo
    click SS3O1 foo
    `,
    o2: `
    graph TD
    TO2["Cuantificacion de la </br> HHverde, HHazul, HHgris"];
    TO2-->ST1O2["Cuantificacion de la </br> HHverde y HHazul"];
    TO2-->ST2O2["Cuantificacion de la HHgris"];
    ST1O2-->SS1O2["<b>Metodo CROPWAT</b></br>
    <b>Datos Climaticos</b>
    </br>
    <ul>
        <li>Precipitacion</li>
        <li>Temperatura Maxima</li>
        <li>Temperatura Minima</li>
        <li>Humedad relativa</li>
        <li>velocidad del viento</li>
        <li>Radiacion solar</li>
        <li>Datos del suelo</li>
        <li>Programa de rirgo</li>
        <li>Datos del cultivo</li>
    </ul>
    <b><i>Click para mas detalles</i></b>"];
    ST2O2-->SS2O2["<ul>
    <li><b>Programa de riego</b></li>
    <li><b>Parametros fisicoquimicos </br> y microbiologicos del agua</b></li>
    <li>Nitrogeno total</li>
    <li>Fosforo total</li>
    <li>Cloruro</li>
    <li>Alcanilidad total</li>
    <li>Pesticidas, entre otros</li> 
    </ul>
    </br><b><i>Click para mas detalles</i></b>"];

    click SS1O2 foo
    click SS2O2 foo
    `,
    o3: `
    graph TD
    TO3["Definir los efectos ambientales de la HHverde, HHazul, HHgris"];
    TO3-->ST1O3["Sustentabilidad hidrica de la HHverde"];
    TO3-->ST2O3["Sustentabilidad hidrica de la HHazul"];
    TO3-->ST3O3["Sustentabilidad hidrica de la HHgris"];
    ST1O3-->SS1O3["Calculo del inidice de presion </br> a los ecosistemas (IPHE) a traves de: 
    <ul>
        <li>Coberturas y usos del suelo de la microcuenca</li>
        <li>Imagenes MODIS MYD16</li>
    </ul>
    </br><b><i>Click para mas detalles</i></b>"];
    ST2O3-->SS2O3["
    <ul>
        <li>Calculo del indice de agua</br>no retomada a la cuenca (IARC)</li>
        <li>Caracterizacion fisicoquimica microbiologica </br> de las aguas que retoman las fuentes naturales</li>
    </ul>
    </br><b><i>Click para mas detalles</i></b>"];
    ST3O3-->SS3O3["
    <ul>
        <li>Calculo del indices de calidad</br>de agua: ICA-IDEAM, ICA-DENIUS</li>
        <li>Calculo de indices de contaminacion ICO: </br> ICOMI, ICOSUS, ICOMO e ICOTRO</li>
    </ul></br><b><i>Click para mas detalles</i></b>"]

    click SS1O3 foo
    click SS2O3 foo
    click SS3O3 foo
    `,
    r1: `
    graph TD
    TR1["Caracterizacion del manejo y uso del agua en la unidad agricola"];
    TR1-->ST1R1["Manejo del Agua</br><b><i>Click para mas detalles</i></b>"];
    TR1-->ST2R1["Uso del Agua</br><b><i>Click para mas detalles</i></b>"];
    TR1-->ST3R1["Aspectos culturales</br><b><i>Click para mas detalles</i></b>"];
    
    click ST1R1 foo
    click ST2R1 foo
    click ST3R1 foo
    `,
    r2: `
    graph TD
    TR2["Cuantificacion de la </br> HHverde, HHazul, HHgris"];
    TR2-->ST1R2["Huella hidrica verde</br><b><i>Click para mas detalles</i></b>"];
    TR2-->ST2R2["Huella hidrica azul</br><b><i>Click para mas detalles</i></b>"];
    TR2-->ST3R2["Huella hidrica gris</br><b><i>Click para mas detalles</i></b>"];
    TR2-->ST4R2["Huella hidrica total</br><b><i>Click para mas detalles</i></b>"];

    click ST1R2 foo
    click ST2R2 foo
    click ST3R2 foo
    click ST4R2 foo
    `,
    r3: `
    graph TD
    TR3["Definir los efectos ambientales de la HHverde, HHazul, HHgris"];
    TR3-->ST1R3["Sustentabilidad Huella hidrica verde</br><b><i>Click para mas detalles</i></b>"];
    TR3-->ST2R3["Sustentabilidad Huella hidrica azul</br><b><i>Click para mas detalles</i></b>"];
    TR3-->ST3R3["Sustentabilidad Huella hidrica gris</br><b><i>Click para mas detalles</i></b>"];

    click ST1R3 foo
    click ST2R3 foo
    click ST3R3 foo
    `
}

export default diagrams;