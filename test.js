import { fire_damage } from "./game-objects/items.js";
import { Player } from "./game-objects/player.js";
console.log(fire_damage)
let testplayer = new(Player)
testplayer.hp=100
for(let i=0; i<100; i++){
console.log(testplayer.hp)
console.log(testplayer.weapon.dmgType.applyEffect(testplayer,testplayer.weapon.dmgType,false,testplayer))}
