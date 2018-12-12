module.exports = class Token{ 
    constructor(string, tipo, arrAtributos){
        this.string = string;
        this.tipo = tipo;
        this.arrAtributos = arrAtributos;
    }

    toString(){
        return this.string;
    }

}