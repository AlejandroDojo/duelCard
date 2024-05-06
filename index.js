class Card {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}
class Unit extends Card{
    constructor(name, cost, power, res) {
        super(name,cost);
        this.power = power;
        this.res = res;
    }
    attack(target) {
        if( target instanceof Unit ) {
            target.res - this.power;
            return target.res === 0
            ? console.log(`${target.name} was defeaded`)
            : console.log(`You make ${this.power} damage`)
        }
    }
}
class Effect extends Card {
    constructor(name, cost, text, stat, mag){
        super(name, cost);
        this.mag = mag;
        this.stat = stat;
        this.text = text;
    }
    play( target ) {
        if( target instanceof Unit ) {
            if (this.stat === "Resistencia") {
                let calc = () => {
                    let mag =  this.mag;
                    return mag.slice(0,1) === "+"
                    ? target.res += Number(mag.slice(1,2))
                    : target.res -= Number(mag.slice(1,2));
                };
                calc();
                console.log(this.text);
            } else {
                let calc = () => {
                    let mag =  this.mag;
                    return mag.slice(0,1) === "+"
                    ? target.power += Number(mag.slice(1,2))
                    : target.power -= Number(mag.slice(1,2));
                };
                calc();
                console.log(this.text);
            }
        } else {
            throw new Error( "Target must be a unit!" );
        }
    }
}
let algorithHard = new Effect("Algorithmo Dificil",2,"Aumenta la resistencia del objetivo en 3","Resistencia", "+3");
let rechazo = new Effect("Rechazado de Promise", 1,"Reduce la resistencia del objetivo en 2", "Resistencia", "-2");
let pareja = new Effect("Programacion en pareja", 3,"Aumenta el poder del objetivo en 2", "Poder", "+2");

let ninjaRojo = new Unit("Ninja Cinturón Rojo", 3, 3, 5); //El jugador 1 convoca a "Ninja Cinturón Rojo"
algorithHard.play(ninjaRojo); //El jugador 1 juega "Algoritmo duro" en "Ninja Cinturón Rojo"
let ninjaNegro = new Unit("Ninja Cinturón Negro", 4, 5, 4); //El jugador 2 convoca a "Ninja Cinturón Negro"
rechazo.play(ninjaRojo); // El jugador 2 juega "Rechazo de promesa no controlada" en "Ninja Cinturón Rojo"
pareja.play(ninjaRojo);
ninjaRojo.attack(ninjaNegro);


/*
1	
1	
2	
2	
3	
3	El jugador 1 tiene el ataque "Ninja Cinturón Rojo" "Ninja Cinturón Negro"
*/
