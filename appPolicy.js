var express = require('express');
var path = require('path');
var appPolicy = express();
var http = require('http');

// Mensaje de saludo
appPolicy.get('/', function (req, res) {
    res.send('Hello World!');
});

// View engine setup
appPolicy.set('views', path.join(__dirname, 'views'));
appPolicy.set('view engine', 'pug');

// Example Message
appPolicy.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

/**
 * Inicia Desarrollo Rossana Piñeros
 */
const bodyParser = require('body-parser');
appPolicy.use(bodyParser.json());

// Parámetros de entrada
appPolicy.get("/worker", (request, response) => {
    const trabajadorEntrada = {age: Number, children: Number, dentalCare: Boolean, percentageCompany: Number};
    response.json(trabajadorEntrada);
});

// Api Rest calcula valor de poliza
appPolicy.post("/calculationPolicy", (request, response) => {
    const trabajadorSalida = {valuePolicy: Number, typeCoverage: String};
    const trabajadorEntrada = request.body;
    if (trabajadorEntrada.dentalCare) {
        trabajadorSalida.typeCoverage = "Dental";
        if (trabajadorEntrada.age <= 65) {
            if (trabajadorEntrada.children == 0) {
                trabajadorSalida.valuePolicy = calculaValorPoliza(0.12, trabajadorEntrada.percentageCompany, null);
            } else if (trabajadorEntrada.children == 1) {
                trabajadorSalida.valuePolicy = calculaValorPoliza(0.1950, trabajadorEntrada.percentageCompany, null);
            } else if (trabajadorEntrada.children >= 2) {
                trabajadorSalida.valuePolicy = calculaValorPoliza(0.2480, trabajadorEntrada.percentageCompany, null);
            }
        } else {
            trabajadorSalida.valuePolicy = 0;
        }
    } else {
        trabajadorSalida.typeCoverage = "Salud / Vida";
        if (trabajadorEntrada.age <= 65) {
            if (trabajadorEntrada.children == 0) {
                trabajadorSalida.valuePolicy = calculaValorPoliza(0.279, trabajadorEntrada.percentageCompany, null);
            } else if (trabajadorEntrada.children == 1) {
                trabajadorSalida.valuePolicy = calculaValorPoliza(0.4396, trabajadorEntrada.percentageCompany, null);
            } else if (trabajadorEntrada.children >= 2) {
                trabajadorSalida.valuePolicy = calculaValorPoliza(0.5599, trabajadorEntrada.percentageCompany, null);
            }
        } else {
            trabajadorSalida.valuePolicy = 0;
        }
    }
    response.json(trabajadorSalida);
});

// Función que calcula el valor de la poliza final
var calculaValorPoliza = function (costo, porcEmpresa, done) {
    let costoTotal = Number;
    let coberturaEmpresa = Number;
    let costoFinal = Number;
    if (porcEmpresa > 0) {
        porcEmpresa = porcEmpresa / 100;
        costoTotal = costo * 28.601;
        coberturaEmpresa = (costo * 28.601) * porcEmpresa;
        costoFinal = costoTotal - coberturaEmpresa;
    } else {
        costoTotal = costo * 28.601;
        costoFinal = costoTotal;
    }
    return costoFinal;
};

// Consumo api REST Bice Vida
var entrada = require("request");
entrada.get("https://dn8mlk7hdujby.cloudfront.net/interview/insurance/policy", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    const util = require('util')
    console.log("Resultado util: ");
    console.log(util.inspect(JSON.parse(body), {showHidden: true, depth: null}))
});
/**
 * Finaliza Desarrollo Rossana Piñeros
 */


