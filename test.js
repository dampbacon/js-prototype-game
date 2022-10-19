import { Player } from "./game-objects/player.js";
import {fire_damage, poison_damage} from "./game-objects/data.js";
console.log(poison_damage)
let testplayer = new(Player)
testplayer.hp=100
for(let i=0; i<100; i++){
console.log(testplayer.hp)
console.log(testplayer.weapon.dmgType.applyEffectWF(testplayer,false,testplayer))}
