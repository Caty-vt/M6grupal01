const archivo = require("fs");
let path = "./files/";
let prompt = require('prompt-sync')();
const https = require("https");
  //  archivo.appendFileSync(path, "Hola Mundo!\n");
   // archivo.appendFileSync(path, "Chao Mundo!");

//archivo.writeFileSync (path, "hola mundo\n");

const indicador = {
    codigo: "dolar"
};

let nombrearchivo = prompt("Ingrese Nombre del Archivo ");
let extensionArchivo = prompt("Ingrese Nombre de la Extension ");
let indicadorEconomico = prompt("Ingrese Nombre del Indicador Economico ");
let cantidad = prompt("Ingrese Cantidad de Pesos a Cambiar ");
//console.log(nombrearchivo, extensionArchivo, indicadorEconomico, cantidad);

leer()
async function leer() {
    try {
      let response = await fetch("https://mindicador.cl/api/"+indicadorEconomico);
      let data = await response.json();
        
        let valorDolar = data.serie[0].valor;
        console.log(valorDolar);
        
    const hoy = new Date();
    let mensaje =`\n A la fecha: ${hoy.toISOString()}
    Fue realizada la cotizacion de los siguientes datos
    Cantidad de pesos a convertir: ${cantidad} pesos
    Convertido a "${indicadorEconomico}" da un total de: 
    $${cantidad / valorDolar} \n`;
        path += nombrearchivo + extensionArchivo
    archivo.appendFileSync(path, mensaje);

    archivo.readFileSync(path);
        

    } catch (err) {
        console.log(err);
        console.log(" ess");
      }
    }

