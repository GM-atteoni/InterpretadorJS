const Token = require("../Objetos/Token");
const Atributo = require("../Objetos/Atributo");

module.exports = class Scan {

    constructor(MOCK_TEXT) {
        this.MOCK_TEXT = MOCK_TEXT

        //variáveis de controle
        this.pos = 0;
        this.char;
        this.charAnt;
        this.charDps;
        this.sair = false; 

        //variável de resultado
        this.tokenArr = [];
        this.arrAtrb = [];
    }

    escanear() {

        //Inicialização
        this.iniciarChar();

        while (!this.sair) {

            if (this.pos != 0) {
                this.pegaChar();
            }


            //Scaneamento baseado em regras de negócio. Nesse momento, definiremos o que é um Token.
            switch (this.char) {
                //abertura de TAG
                case '<':
                    //Regra de negócio
                    let strTk = "";
                    strTk = strTk + this.char;
                    while (this.char != '>') {
                        this.pegaChar();
                        strTk = strTk + this.char;
                    }
                    //Validação fechamento
                    var valid = "</"
                    if (strTk.includes(valid)) {
                        //Criação do Token
                        let objToken = new Token(strTk, "FECHAMENTO");
                        this.tokenArr.push(objToken);
                    } else {
                        //Validação para pegar atributos
                        if(strTk.includes(" ")){
                            var arrAtrb = strTk.split(" ");
                            arrAtrb.forEach(atributo => {
                                var chave = atributo.split("=")[0];
                                var valor = atributo.split("=")[1];
                                if(chave != undefined && valor != undefined){
                                this.arrAtrb.push(new Atributo(chave, valor));
                            }
                            });
                        }

                        //Criação do Token
                        let objToken = new Token(strTk, "TAG", this.arrAtrb);
                        this.tokenArr.push(objToken);
                        this.arrAtrb = [];
                    }
                    break;

                //O default extrairá números e palavras, além de caracteres não característicos.
                default:
                    //Verificação para palavras fora das TAGs
                    if (this.isLetter(this.char)) {
                        let strTk = "";
                        strTk = strTk + this.char;
                        while (this.charDps != " " && this.charDps != "<") {
                            this.pegaChar();
                            strTk = strTk + this.char;
                        }
                        //Criação do Token
                        let objToken = new Token(strTk, "Texto");
                        this.tokenArr.push(objToken);
                    } else if (this.char == ' ') {
                        //tratamento espaço em branco
                        let objToken = new Token(this.char, "Espaço");
                        this.tokenArr.push(objToken);
                    }
                    break;
            }
        }

        return this.tokenArr;

    }


    //Funções de controle
    iniciarChar() {
        this.char = this.MOCK_TEXT[this.pos];
        this.charAnt = null;
        this.charDps = this.MOCK_TEXT[this.pos + 1];
    }

    pegaChar() {
        if (this.pos < this.MOCK_TEXT.length - 2) {
            this.pos++;
            this.charAnt = this.char;
            this.char = this.charDps;
            this.charDps = this.MOCK_TEXT[this.pos + 1];
        } else if (this.pos == this.MOCK_TEXT.length - 2) {
            this.pos++;
            this.charAnt = this.char;
            this.char = this.MOCK_TEXT[this.pos];
            this.charDps = null;
            this.sair = true;
        } else {
            //fim do array
        }
    }

    voltaChar() {
        if (this.pos > 1) {
            this.pos--;
            this.charDps = this.char;
            this.char = this.charAnt;
            this.charAnt = this.MOCK_TEXT[this.pos - 1];
        } else if (this.pos == 1) {
            this.pos--;
            this.charDps = this.char;
            this.char = this.charAnt;
            this.charAnt = null;
        } else {
            //início do array
        }
    }


    //Funções de suporte

    isLetter(char) {
        return this.char.toLowerCase() != this.char.toUpperCase();
    }
}

