const https = require("https");
const indicador = process.argv[2];

https
.get(`https://mindicador.cl/api/${indicador}/`, (res) =>{
    let data = "";

    
    res.on("data", (chunk) => {
        data += chunk;
    });

    res.on("end", () => {
        const dailyIndicators = JSON.parse(data);

        console.log(dailyIndicators);
        

    });
})
.on("error", (err) =>{
    console.error("Error al realizar la consulta a la API: ", err);
});