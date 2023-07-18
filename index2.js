const { log } = require("console");
const archivo = require("fs");
let path = "./files/";
let prompt = require('prompt-sync')();
const https = require("https");

console.log("peticion de datos\n");
let nombrearchivo = prompt("Ingrese Nombre del Archivo ");
let extensionArchivo = prompt("Ingrese Nombre de la Extension ");
let indicadorEconomico = prompt("Ingrese Nombre del Indicador Economico ");
let cantidad = prompt("Ingrese Cantidad de Pesos a Cambiar ");



https.get(`https://mindicador.cl/api/${indicadorEconomico}`, (res) =>{
    let data = "";

    
    res.on("data", (chunk) => {
        data += chunk;
    });

    res.on("end", () => {

        const dailyIndicators = JSON.parse(data);
        let valorDolar = dailyIndicators.serie[0].valor;
            
        const hoy = new Date();
        let mensaje =`\n A la fecha: ${hoy.toISOString()}
        Fue realizada la cotizacion de los siguientes datos
        Cantidad de pesos a convertir: ${cantidad} pesos
        Convertido a "${indicadorEconomico}" da un total de: 
        $${cantidad / valorDolar} \n`;
            path += nombrearchivo + extensionArchivo
        archivo.appendFileSync(path, mensaje);

        const contenido = archivo.readFileSync(path).toString();
         console.log(contenido); 

      });
})
.on("error", (err) =>{
    console.error("Error al realizar la consulta a la API: ", err);
});