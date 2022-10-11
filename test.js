import { Chance } from "chance";
const chance1 = new Chance();
console.log(chance1.rpg('0d6', { sum: true }));