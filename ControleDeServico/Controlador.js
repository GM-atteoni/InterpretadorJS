const Scan = require("../Processamento/Scan")
const AnalSin = require ("../Processamento/AnaliseSintatica")

//Input do arquivo
let MOCK_TEXT = ['<', 'h', 't', 'm', 'l', '>', '<', 'h', 'e', 'a', 'd', 'e', 'r', '>', '<', 't', 'i', 't', 'l', 'e', '>', 'T', 'h', 'i', 's', ' ', 'i', 's', ' ', 't', 'i', 't', 'l', 'e', '<', '/', 't', 'i', 't', 'l', 'e', '>', '<', '/', 'h', 'e', 'a', 'd', 'e', 'r', '>', '<', 'b', 'o', 'd', 'y', '>', 'H', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', '<', '/', 'b', 'o', 'd', 'y', '>', '<', '/', 'h', 't', 'm', 'l', '>'];
let arrTk = [];

//Chama o scanner e espera um array de token como retorno
let scanner = new Scan(MOCK_TEXT);
arrTk = scanner.escanear();

//Chama a análise sintática para aplicar a regra de negócio nos tokens
let objAnal = new AnalSin(arrTk);
objAnal.analisar();
