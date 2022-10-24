import { Player, playerState } from "./game-objects/player.js";
// import {fire_damage, poison_damage} from "./game-objects/data.js";
// console.log(poison_damage)
let testplayer = new Player()
import assert from 'node:assert/strict';
// testplayer.hp=100
// for(let i=0; i<100; i++){
// console.log(testplayer.hp)
// console.log(testplayer.weapon.dmgType.applyEffectWF(testplayer,false,testplayer))}

import {
    DMG_COLOUR,
    DMG_TYPE,
    dynamicBox,
    miscArt,
    miscColours,
    rarityByWeight,
    weapons
} from "./game-objects/data.js";
import { copyMonster, monster } from "./game-objects/mobs.js";
import gradient from 'gradient-string';
import longest from 'longest';
import chalk, { Chalk } from "chalk";

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


// console.log(border)

// var str = `Lorem ipsum dolor sit amet,ew
// consectetur adipiscing elit,
// sed do eiusmod tempor
// incididunt ut
// labore et dolore
// magna aliqua.
// Ut enim
// ad minim veniam, quis.
// Lorem ipsum dolor
// sit amet,
// consectetur adipiscing elit,
// sed do eiusmod tempor
// incididunt ut labore
// et dolore magna aliqua.
// Ut enim ad minim veniam, quis`;
// let strArr = str.split('\n')
// //40 is stand in for terminal width
// console.log(textBoxNotUI(str,40-longest(strArr).length));
// console.log(testContent)
// console.log(padString(testContent,10));
// let ansi_escape = testContent2.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,'')
// console.log(textBoxNotUI(ansi_escape))
// console.log(textBoxNotUI(testContent2))
// let a=fireball
// console.log(a)
// let copy = copyMonster(tempMonster)
// //console.log(tempMonster)
// console.log(copy)
// console.log(testplayer)
// //console.log(testplayer.useScroll())

// //console.log(pickScroll())
// testplayer.state=playerState.COMBAT
// // testplayer.hp-=10
// console.log(testplayer.useScroll({monster:copy}))
// // console.log(enemiesArt)
// // console.log(testplayer.hp)

// chalk.level = 2;
// console.log(chalk.red('Hello world!'));











// console.log(testbox(`
// sfdsdsf
// sfdfdsfdsdfsds
// fdssdfdsf
// fdsdsf
// dsffsdfdssd
// sffdsdsf`))

// console.log(gradient.fruit.multiline(`
// sfdsdsf
// sfdfdsfdsdfsds
// fdssdfdsf
// fdsdsf
// dsffsdfdssd
// sffdsdsf`).cleanANSI())

// console.log(testbox(gradient.fruit.multiline(`
// sfdsdsf
// sfdfdsfdsdfsds
// fdssdfdsf
// fdsdsf
// dsffsdfdssd
// sffdsdsf`),50))

function padwithspc (str='', amount=4,first=true,char=' ') {
    let lines=str.split('\n')
    lines=lines.map((line,i)=>{
        if(i===0 && first){
            return line
        }
        return `${` `.repeat(amount)}${line}`
    })
    return lines.join('\n')
}
export let apicon=
`\

[95m[40m≈[37m[40m   [92m[40m▌[37m[40m [95m[40m≈≈[37m[40m  [m
[37m[40m  [31m[40m███[97m[41m▀[97m[40m█[37m[40m [95m[40m≈[37m[40m [m
[37m[40m [95m[40m≈[31m[40m████[97m[41m▀[37m[40m  [95m[40m≈[m
[37m[40m [95m[40m≈[37m[40m [31m[40m▀▀▀[30m[40m[37m[40m [m\
`



// let hmmmsaf=
// `\
//  ${chalk.hex('8b4513')('{▄}')}
//  \u001b[97m\u001b[40m█\u001b${chalk.hex('ff2d57')('█')}\u001b[97m\u001b[40m█\u001b[m
//  \u001b[37m\u001b[40m \u001b[97m\u001b[40m▀\u001b[37m\u001b[40m \u001b[m\
// `
console.log(apicon)
//console.log(apicon.cleanANSI())
//'\033[0m'
//"oil";
//"scroll"
//"potion"


//oil
let hmmmsaf=`\
[37m[40m▀${chalk.bgHex('ffffff')(chalk.hex(DMG_COLOUR[DMG_TYPE.MAGIC])('☼§≈♫'))}[37m[40m [m
[37m[40m ${chalk.bgHex('ffffff')(chalk.hex(DMG_COLOUR[DMG_TYPE.MAGIC])('φ♫§≈'))}[37m[40m [m
[37m[40m [97m[40m▀[37m[40m▀▀▀▀[m\
`
let blah=`\
[37m[40m█▒▒▒▒█[m
[37m[40m ▒▒▒▒ [m\
`
console.log(hmmmsaf)
console.log(blah)