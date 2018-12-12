module.exports = class AnaliseSintatica {
    constructor(arrToken) {
        this.arrToken = arrToken;
        this.pos = 0;
        this.token = null;
        this.tokenAnt = null;
        this.tokenDps = null;
        this.sair = false;
    }

    analisar() {

        //Inicializa controle de token
        this.iniciarToken();

        this.arrToken.forEach(token => {
            
                if (token.tipo == "TAG") {
                    console.log("OK");
                }
            
        });

    }

    //Funções de controle
    iniciarToken() {
        this.token = this.arrToken[this.pos];
        this.tokenAnt = null;
        this.tokenDps = this.arrToken[this.pos + 1];
    }

    pegaToken() {
        if (this.pos < this.arrToken.length - 2) {
            this.pos++;
            this.tokenAnt = this.token;
            this.token = this.tokenDps;
            this.tokenDps = this.arrToken[this.pos + 1];
        } else if (this.pos == this.arrToken.length - 2) {
            this.pos++;
            this.tokenAnt = this.token;
            this.token = this.tokenDps;
            this.tokenDps = null;
            this.sair = true;
        } else {
            //fim do array
        }
    }

    voltaToken() {
        if (this.pos > 1) {
            this.pos--;
            this.tokenDps = this.token;
            this.token = this.tokenAnt;
            this.tokenAnt = this.arrToken[this.pos - 1];
        } else if (this.pos == 1) {
            this.pos--;
            this.tokenDps = this.token;
            this.token = this.tokenAnt;
            this.tokenAnt = null;
        } else {
            //Início do array
        }
    }
}