import { Player } from "./game-objects/player.js";
// import {fire_damage, poison_damage} from "./game-objects/data.js";
// console.log(poison_damage)
let testplayer = new Player()
// testplayer.hp=100
// for(let i=0; i<100; i++){
// console.log(testplayer.hp)
// console.log(testplayer.weapon.dmgType.applyEffectWF(testplayer,false,testplayer))}

import { armourArray, armourArrayWeights, border, damageTypes, pickWeapon, res } from "./game-objects/data.js";
import { copyMonster, monster } from "./game-objects/mobs.js";



//test array values
// console.log(weaponsArray)
// console.log(weaponWeights)
// for(let i=0; i<1000; i++){
//     let k = pickWeapon()
//     if(k.dmgType.name==='gravity_damage'){
//         testplayer.int=4
//         testplayer.weapon=k
//         console.log(k)
//         console.log(k.dmgType.applyEffect.toString())
//         break
//     }
// }
// for(let i=0; i<20; i++){
//     console.log(testplayer.hp)
//     console.log(testplayer.weapon.dmgType.applyEffectWF(testplayer,false,testplayer))
// }
// testplayer.weapon.dmgType= damageTypes.weeb_damage
// console.log(testplayer.weapon.dmgType.applyEffectWF(testplayer,true,testplayer))
// for(let i=0; i<40; i++){
//     console.log(testplayer.hp)
//     console.log(testplayer.weapon.dmgType.applyEffectWF(testplayer,false,testplayer))

// }
// console.log(armourArray)
// console.log(armourArrayWeights)
// console.log(testplayer.armourName)

let tempMonster = new monster({
	name: "testCreature",
	hitDie: 3,
	ac: 6,
	morale: 6,
	weapon: "ruler",
	dmgDie: 6,
	aggro: 6,
	rarity: 1
})

let copy = copyMonster(tempMonster)
console.log(tempMonster)
console.log(copy)
console.log(border)
console.log(res);
