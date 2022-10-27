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
    ARMOURmap,
    ArmourSubsetMaker,
    DMG_COLOUR,
    DMG_TYPE,
    dynamicBox,
    miscArt,
    miscColours,
    rarityByWeight,
    weapons,
    weaponSubset
} from "./game-objects/data.js";
import { copyMonster, monster } from "./game-objects/mobs.js";
import gradient from 'gradient-string';
import longest from 'longest';
import chalk, { Chalk } from "chalk";
import wrapAnsi from "wrap-ansi";

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
console.log(ARMOURmap)
console.log(ArmourSubsetMaker(16,22))
console.log(weaponSubset(0,0.4))

let lorem=
`Voluptate fugiat do deserunt consectetur sunt. Irure amet laboris enim magna consectetur quis ex magna. Dolore incididunt esse reprehenderit dolor anim exercitation amet labore laboris est eu velit aute.

Occaecat voluptate aliqua ullamco est Lorem qui et irure. Non ex aliqua qui duis adipisicing voluptate commodo dolor sint magna. Et eu sunt nisi aliqua est non adipisicing consectetur. Ex enim in nisi sit anim non duis commodo culpa et officia consectetur. Officia esse velit id enim commodo exercitation eiusmod eu anim aute. Occaecat irure eiusmod commodo exercitation nostrud ullamco.

Id nisi aute anim fugiat ea qui nostrud. Dolore mollit consequat deserunt esse adipisicing ipsum elit voluptate non ea pariatur velit irure. In reprehenderit Lorem labore minim id deserunt ad est sit.

Occaecat occaecat eu laboris sit non commodo. Duis exercitation laboris ad veniam sunt anim incididunt nostrud qui nulla excepteur officia. Mollit adipisicing veniam minim voluptate fugiat. Ipsum nulla ex duis nulla culpa ullamco sit nulla aliqua exercitation tempor ipsum. Non id mollit exercitation laborum irure et laboris sunt amet exercitation esse laboris minim minim. Do excepteur voluptate ullamco exercitation elit officia nisi Lorem ea occaecat duis duis excepteur. Proident fugiat id commodo tempor enim mollit eiusmod laborum culpa aliquip Lorem amet.

Non sit ut exercitation voluptate. Ipsum eiusmod deserunt sit excepteur laborum consectetur commodo. Ea fugiat ea velit reprehenderit culpa aute in enim ad quis duis ex. Veniam velit excepteur id nostrud amet do elit magna adipisicing. Occaecat incididunt veniam irure tempor laborum irure officia id excepteur voluptate veniam. Excepteur reprehenderit magna eiusmod incididunt do duis commodo consequat irure officia non sunt laborum eu.

Ullamco consectetur magna cillum nostrud aliquip sit enim proident do nostrud velit do consectetur. Non cillum ipsum veniam fugiat elit ut quis est reprehenderit. Sit anim et ea pariatur enim aliqua duis occaecat irure qui nisi velit nulla aliquip. Mollit veniam adipisicing deserunt nulla enim.

Ut aliquip sunt velit non excepteur irure commodo esse consequat incididunt cupidatat consequat non Lorem. Enim ullamco cupidatat consectetur qui ad laborum. Esse laborum ut ullamco cillum id. Pariatur Lorem occaecat quis proident ipsum aliquip commodo labore. Consequat incididunt consequat proident do eiusmod Lorem ad enim voluptate tempor sint eu pariatur.

Adipisicing minim adipisicing sunt tempor labore voluptate aliquip aliqua non id do est. Magna reprehenderit adipisicing excepteur ipsum labore. Nulla et adipisicing elit quis sunt id do velit do pariatur laborum labore in commodo. Mollit aute exercitation sit veniam nulla aute amet veniam dolor tempor. Excepteur ad nostrud eiusmod dolor laborum. Voluptate labore non elit Lorem fugiat fugiat minim exercitation culpa consequat deserunt aute eu occaecat.

Nostrud quis pariatur veniam cupidatat nulla ut dolor et aute duis ea culpa. Anim nulla ipsum consectetur cupidatat deserunt. Sint do veniam consequat veniam dolor eiusmod aute. Id aliquip qui ipsum voluptate esse reprehenderit qui adipisicing aliqua. Tempor ea fugiat magna irure sint. Nisi aute fugiat elit dolor eu nisi duis magna.

Deserunt sint ea consequat ipsum aliquip quis id exercitation proident sit consectetur ad sunt aute. Magna nisi qui consequat officia pariatur id ipsum. Laboris culpa esse enim adipisicing elit dolore. Consectetur occaecat deserunt sunt sint pariatur.`
let loremTest=wrapAnsi(gradient.retro(lorem),20,{hard:true}) 

console.log(loremTest)

// export function teststr(text, width = 80) {
// 	let multiline = ``
// 	let lorem_lines = wrapAnsi(text, width)
// 	for (let line of lorem_lines) {
// 		let line_str = line.join('')
// 		if (line_str) {
// 			line_str = line_str.concat('\n')
// 		}
// 		multiline = multiline.concat(line_str)
// 	}
// 	return multiline
// }
