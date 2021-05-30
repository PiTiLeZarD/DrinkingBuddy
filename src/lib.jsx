import { parse } from "algebra.js";

const VOL2WEIGHT = 1.267;
const ABSORPTION_RATE = 0.5;
const ELIMINATION_RATE = 0.4;
const BIOAVAILABILITY = 0.8;

export class Person {
    constructor(gender, height, weight) {
        this.gender = gender; // male/female
        this.height = height; // in cm
        this.weight = weight; // in kg
    }

    getBloodVolume() {
        return (
            (this.getNadlerBloodVolume() +
                this.getLemmensBernsteinBrodskyBloodVolume() +
                this.getWeightBasedBloodVolume()) /
            3
        );
    }

    getNadlerBloodVolume() {
        const factors = this.gender == "male" ? [0.3669, 0.03219, 0.6041] : [0.3561, 0.03308, 0.1833];
        return (factors[0] * Math.pow(this.height / 100, 3) + factors[1] * this.weight + factors[2]) * 1000;
    }

    getLemmensBernsteinBrodskyBloodVolume() {
        return this.weight * (70 / Math.sqrt(this.getBMI() / 22));
    }

    getWeightBasedBloodVolume() {
        return (this.gender == "male" ? 70 : 65) * this.weight;
    }

    getBMI() {
        return this.weight / Math.pow(this.height / 100, 2);
    }

    getBACInGramPct(alcohol) {
        return (alcohol.content * 100) / this.getBloodVolume();
    }
}

export class Alcohol {
    constructor(content) {
        this.content = content; // in mg
    }

    static fromPercentageAndVolume(percentage, volume) {
        return new Alcohol((volume * percentage) / 100 / VOL2WEIGHT);
    }

    static fromStandardDrink(standard_drink) {
        return new Alcohol(standard_drink * 10);
    }
}

export class Drink {
    constructor(start_date, duration, alcohol) {
        this.start_date = start_date;
        this.duration = duration;
        this.alcohol = alcohol;
    }

    getAlcoholContentForDate(person, date) {
        /* linear first f(x) = alc - t * ELIMINATION_RATE */
        const { seconds } = date.diff(this.start_date, ["seconds"]).toObject();
        return parse("y = a - a * r * t")
            .eval({ t: seconds, a: parse(this.alcohol.content.toString()), r: parse("1/7200") })
            .solveFor("y")
            .valueOf();
    }
}

export class Timeline {
    constructor() {
        this.data = [];
    }

    addDrink(drink) {
        this.data.push(drink);
    }
}
