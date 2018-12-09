module.exports = class Token{ 
    constructor(string, tipo, posicao){
        this.string = string;
        this.tipo = tipo;
    }

    toString(){
        return this.string;
    }

}