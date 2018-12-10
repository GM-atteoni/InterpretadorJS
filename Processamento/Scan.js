const Token = require("../Objetos/Token");

module.exports = class Scan {

    constructor(MOCK_TEXT) {
        this.MOCK_TEXT = MOCK_TEXT

        //variáveis de controle
        let pos = 0;
        let char;
        let charAnt;
        let charDps;
        let sair = false; 

        //variável de resultado
        let tokenArr = [];
    }

    escanear() {

        //Inicialização
        this.iniciarChar();

        while (!sair) {

            if (pos != 0) {
                pegaChar();
            }


            //Scaneamento baseado em regras de negócio. Nesse momento, definiremos o que é um Token.
            switch (char) {
                //abertura de TAG
                case '<':
                    //Regra de negócio
                    let strTk = "";
                    strTk = strTk + char;
                    while (char != '>') {
                        pegaChar();
                        strTk = strTk + char;
                    }
                    //Validação fechamento
                    var valid = "</"
                    if (strTk.includes(valid)) {
                        //Criação do Token
                        let objToken = new Token(strTk, "FECHAMENTO");
                        tokenArr.push(objToken);
                    } else {
                        //Criação do Token
                        let objToken = new Token(strTk, "TAG");
                        tokenArr.push(objToken);
                    }
                    break;

                //O default extrairá números e palavras, além de caracteres não característicos.
                default:
                    //Verificação para palavras fora das TAGs
                    if (isLetter(char)) {
                        let strTk = "";
                        strTk = strTk + char;
                        while (charDps != " " && charDps != "<") {
                            pegaChar();
                            strTk = strTk + char;
                        }
                        //Criação do Token
                        let objToken = new Token(strTk, "Texto");
                        tokenArr.push(objToken);
                    } else if (char == ' ') {
                        //tratamento espaço em branco
                        let objToken = new Token(char, "Espaço");
                        tokenArr.push(objToken);
                    }
                    break;
            }
        }

        return tokenArr;

    }


    //Funções de controle
    iniciarChar() {
        this.char = this.MOCK_TEXT[this.pos];
        charAnt = null;
        charDps = MOCK_TEXT[pos + 1];
    }

    pegaChar() {
        if (pos < MOCK_TEXT.length - 2) {
            pos++;
            charAnt = char;
            char = charDps;
            charDps = MOCK_TEXT[pos + 1];
        } else if (pos == MOCK_TEXT.length - 2) {
            pos++;
            charAnt = char;
            char = MOCK_TEXT[pos];
            charDps = null;
            sair = true;
        } else {
            //fim do array
        }
    }

    voltaChar() {
        if (pos > 1) {
            pos--;
            charDps = char;
            char = charAnt;
            charAnt = MOCK_TEXT[pos - 1];
        } else if (pos == 1) {
            pos--;
            charDps = char;
            char = charAnt;
            charAnt = null;
        } else {
            //início do array
        }
    }




    //Funções de suporte

    isLetter(char) {
        return char.toLowerCase() != char.toUpperCase();
    }
}

