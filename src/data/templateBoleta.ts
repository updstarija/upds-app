import { IResponseDetalleBoleta, IResponseModuloProyeccion } from "@/types";

export const templateBoleta = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Boleta</title>

<style>
    body{
        font-family: Arial, Helvetica, sans-serif;
    }

  .datos {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @page {
    size: landscape;
  }

  .gris,
  th{
    background-color: #ccc;
    font-weight: bold;
  }
  table, th, td {
border: 1px solid black;
border-collapse: collapse;
}
  td,th{
    padding: 10px;
  
  }

  td{
    text-align: center;
  }

  tfoot p{
    text-align: left;
  }

  .divlogo{
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .bold{
    font-weight: bold;
  }
</style>
</head>
<body>
<p class="bold" style="text-align: center;">UNIVERSIDAD PRIVADA DOMINGO SAVIO</p>
<p class="bold" style="text-align: center;">BOLETA DE PROYECCION</p>

<div class="datos">
  <div class="divlogo">
    <img src="https://www.upds.edu.bo/wp-content/uploads/2020/10/upds_logo-1-1-1.png" alt="" style="width: 100px;">
   <div>
    <div>
        <span class="bold">Nombre:</span>
        <span>DANTE ARIAS TARIFA</span>
      </div>

      <div>
        <span class="bold">Documento:</span>
        <span>12755611</span>
      </div>
   </div>
  </div>

  <div>
    <div>
      <span class="bold">Fecha:</span>
      <span>10/23/2002</span>
    </div>

    <div>
      <span class="bold">Carrera:</span>
      <span>Ing Petrolera</span>
    </div>
  </div>
</div>

<table style="width: 100%; margin-top: 30px;">
  <thead>
    <tr>
      <th>MODULOS</th>
      <th>1.1.2023</th>
      <th>2.1.2023</th>
      <th>3.1.2023</th>
      <th>4.1.2023</th>
      <th>5.1.2023</th>
      <th>6.1.2023</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="gris">Materia</td>
      <td>Sistemas</td>
      <td>Sistemas 2</td>
      <td>Sistemas 3</td>
      <td>Sistemas 4</td>
      <td>Sistemas 5</td>
      <td>Sistemas 6</td>
    </tr>
    <tr>
      <td class="gris">Turno</td>
      <td>Medio Dia</td>
      <td>NOche</td>
      <td>Manana</td>
      <td>NOche 4</td>
      <td>Manana</td>
      <td>NOche 6</td>
    </tr>

    <tr>
      <td class="gris">Materia</td>
      <td>Progrmacion</td>
      <td>Progrmacion 2</td>
      <td>Progrmacion 3</td>
      <td>Progrmacion 4</td>
      <td>Progrmacion 5</td>
      <td>Progrmacion 6</td>
    </tr>
    <tr>
      <td class="gris">Medio Dia</td>
      <td>Manana</td>
      <td>Turno</td>
      <td>NOche 4</td>
      <td>NOche 6</td>
      <td>NOche</td>
      <td>Manana</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <td colspan="7">
        <p style="font-weight: bold;">Nota:</p>
        <p style="line-height: 1.5;">
          Este sistema de proyección se crea como “sistema de apoyo”. Los
          errores generados en la boleta son responsabilidad exclusiva del
          estudiante.
        </p>
        <p style="line-height: 1.5;">La Institución puede modificar la oferta de materias
            en cualquier momento de acuerdo con la demanda.</p>
      </td>
    </tr>
  </tfoot>
</table>
</body>
</html>

`;

export const templateBoletaV3 = {
generateHeader: () => {
return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Boleta</title>

<style>
    body{
        font-family: Arial, Helvetica, sans-serif;
    }

  .datos {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @page {
    size: landscape;
  }

  .gris,
  th{
    background-color: #ccc;
    font-weight: bold;
  }
  table, th, td {
border: 1px solid black;
border-collapse: collapse;
}
  td,th{
    padding: 10px;
  
  }

  td{
    text-align: center;
  }

  tfoot p{
    text-align: left;
  }

  .divlogo{
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .bold{
    font-weight: bold;
  }
</style>
</head>
<body>
<p class="bold" style="text-align: center;">UNIVERSIDAD PRIVADA DOMINGO SAVIO</p>
<p class="bold" style="text-align: center;">BOLETA DE PROYECCION</p>

`
},
  generateDatosHeader: (nombre:string, documento: string, carrera:string) => {
    return `
    <div class="datos">
  <div class="divlogo">
    <img src="https://www.upds.edu.bo/wp-content/uploads/2020/10/upds_logo-1-1-1.png" alt="" style="width: 100px;">
   <div>
    <div>
        <span class="bold">Nombre:</span>
        <span>${nombre}</span>
      </div>

      <div>
        <span class="bold">Documento:</span>
        <span>${documento}</span>
      </div>
   </div>
  </div>

  <div>
    <div>
      <span class="bold">Fecha:</span>
      <span>${new Date().toLocaleDateString("es-ES", {day: "2-digit", month: "2-digit", year: "numeric"})}</span>
    </div>

    <div>
      <span class="bold">Carrera:</span>
      <span>${carrera}</span>
    </div>
  </div>
</div>
    `
  },


  generateBody: (modulos: IResponseModuloProyeccion["data"], materiasBoleta: IResponseDetalleBoleta["data"]) => {
 let newMaterias = [...materiasBoleta]
  

 let htmlMaterias = "";
 
 let htmlMateriasv2:string[]= [];
 let htmlTurnosv2:string[]= [];


 let cantidadMaterias = 0;


 while(newMaterias.length>0){

  let htmlMats = "";
  let htmlTurn = "";


   
    modulos.map((mod) => {
      
      const materia = newMaterias.find((mat) => mat.modulo == mod.nombre.split("-")[1].trim())
    newMaterias = newMaterias.filter((mat) => mat.materiaAdmId != materia?.materiaAdmId)

    htmlMats+= `<td>${materia?.materia|| ''}</td>`
    htmlTurn+= `<td>${materia?.turno|| ''}</td>`
    //  return `<td>${materia?.materia|| ''}</td>`
    })
    

    htmlMateriasv2.push(htmlMats)
    htmlTurnosv2.push(htmlTurn)
cantidadMaterias++;
 }

 let bodyHtml = ""
 for(let i =0;i< cantidadMaterias ; i++){
bodyHtml += `
<tr>
  <td class="gris">MATERIAS</td>
  ${htmlMateriasv2[i]}
</tr>
  

    <tr>
      <td class="gris">Turno</td>
      ${htmlTurnosv2[i]}
    </tr>`
 }

return `
<table style="width: 100%; margin-top: 30px;">
  <thead>
    <tr>
      <th>MODULOS</th>
      ${modulos.map((x) => `<th>${x.nombre}</th>`)}
    </tr>
  </thead>
  <tbody>
    
  ${bodyHtml}
  </tbody>

  <tfoot>
    <tr>
      <td colspan="7">
        <p style="font-weight: bold;">Nota:</p>
        <p style="line-height: 1.5;">
          Este sistema de proyección se crea como “sistema de apoyo”. Los
          errores generados en la boleta son responsabilidad exclusiva del
          estudiante.
        </p>
        <p style="line-height: 1.5;">La Institución puede modificar la oferta de materias
            en cualquier momento de acuerdo con la demanda.</p>
      </td>
    </tr>
  </tfoot>
</table>
`
  },

  generateFooter: () => {
    return `</body>
    </html>`
  }

}
