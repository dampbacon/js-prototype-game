//
// Weapon objects
//

import chalk from "chalk";
import { Player, playerState } from "./player.js";
import { chance2, chance3, monsterRandom } from "./random_nums.js";

//

export class dmgTypeClassBase{
    constructor({name,color}){
        this.name = name;
        this.color = color;
    }
}
export class dmgTypeClass extends dmgTypeClassBase{
    constructor({name, chanceToApply, color, effectDuration, applyEffect}){
        super({name,color})
        this.effectDurationMax = effectDuration?effectDuration:0;
        //callback function to apply effect passed as argument
        this.applyEffect = applyEffect?applyEffect:((arg1,this_,arg2,arg3)=>{return ''}); 
        this.chanceToApply = chanceToApply?chanceToApply:0
    }
    
    applyEffectWF(arg1,arg2,arg3){
        return this.applyEffect(arg1,this,arg2,arg3)
    }
}


export class weapon {
    constructor({name, dmgDie, dmgType, rarity, enchant, description}) {
        this.name = name?name:'Stick';
        this.dmgDie = dmgDie?dmgDie:'1d4';
        this.dmgType = dmgType?dmgType:new dmgTypeClass({name:'blunt',color:'ffffff'});
        this.rarity = rarity?rarity:1;
        this.enchant = enchant?enchant:0;
        this.description = description?description: this.generateDescription();
    }
}



// export class MakeScroll{

// }
export class Scroll{
    constructor({
        targetmonster, 
        targetplayer, 
        changeMonster, 
        nonhostile, 
        changePlayer, 
        resolveEncounter,
        teleport, 
        scrollFunction,
        scrollFunctionParams,  
        name, 
        rarity, 
        description,
        altar,
        dmgType,
    }){
        //mix of sorting and function flags
        this.targetmonster=targetmonster?targetmonster:false
        this.targetplayer=targetplayer?targetplayer:false
        this.changeMonster=changeMonster?changeMonster:false
        this.nonhostile=nonhostile?nonhostile:false
        this.changePlayer=changePlayer?changePlayer:false
        this.resolveEncounter=resolveEncounter?resolveEncounter:false
        this.teleport=teleport?teleport:false
        this.altar = altar?altar:false
        this.dmgType = dmgType?dmgType:null

        this.name = name?name:'Scroll';
        this.rarity = rarity?rarity:1;
        this.description = description?description: this.generateDescription();


        this.scrollFunction=scrollFunction?scrollFunction:((player, params)=>{return 'poof'});
    }
    use(player, params={}){
        player.scrolls--
        return this.scrollFunction(player, params)
    }
}
 

export let fireball = new Scroll({
    name:'fireball',
    targetmonster:true,
    rarity:1,
    description:'A scroll that summons a fireball to attack a monster',
    scrollFunction: dmgScrollFun(
        `dodges the worst of the blast and takes`,
        `catches the full force of the fiery explosion and takes`,
        `Unfortunately you are not in combat, you cast it out of the room.`,
        `FFA500`,
        `4d6`,
        `fireball`
    )
})
export let kill = new Scroll({
    name:'kill',
    targetmonster:true,
    rarity:1,
    description:'A scroll that kills a monster most of the time',
    scrollFunction: dmgScrollFun(
        `takes a glancing blow from the curse and takes`,
        `absorbs the full force of the curse killing it`,
        `unfortunately there is nothing to kill besides yourself.\nYou let the scroll fizzle into ashes`,
        `5d5d5d`,
        `4d6`,
        `kill`,
        true
    )
})
export let heal = new Scroll({
    name:'heal',
    targetplayer:true,
    rarity:1,
    description:'A scroll that heals the player',
    scrollFunction: (player, params={})=>{
        let heal = chance2.rpg('2d8', {sum: true})
        if (player.hp===player.hpMax){
            return chalk.hex(`FFC0CB`)(`You cast heal on yourself even though you are already at full health.\nWasting a spell that could have been used to save yourself.`)
        }else{
            let healAmount=heal
            if((player.hp+heal)>player.hpMax){
				healAmount = player.hpMax-player.hp
            }
            player.increaseHP(heal)
            return chalk.hex(`FFC0CB`)(`You cast heal on yourself and heal`)+` ${chalk.greenBright(healAmount+`hp`)}`
        }
    }
})
export let vitalize = new Scroll({
    name:'vitalize',
    targetplayer:true,
    rarity:0.02,
    description:'A scroll that strengthens the players life force',
    scrollFunction: (player, params={})=>{
        let hpInc = chance2.rpg('1d6', {sum: true})
        player.hpMax+=hpInc
        player.hp+=hpInc
        return chalk.hex(`FFC0CB`)(`You cast the spell and feel your vitality strengthened`)+` ${chalk.greenBright(`Max HP increased by ${hpInc}`)}`
    }
})

//make one for unique dmg types to weapons
export let enchantWeapon = new Scroll({
    name:'enchant weapon',
    targetplayer:true,
    rarity:0.1,
    description:'A scroll that enchants the players weapon',
    scrollFunction: (player, params={})=>{
        if(player.weapon.enchant<3){
            player.weapon.enchant+=1
            return chalk.blue(`You cast the spell and your weapon is infused with magic`)+` ${chalk.greenBright(`weapon enchant increased by 1`)}`
        }else{
            //
            //
            //  something special later
            //
            //
            return chalk.blue(`You attempt to enchant your weapon but it is already at max enchant`)
        }
    }
})

export let curseWeapon = new Scroll({
    name:'enchant weapon',
    targetplayer:true,
    rarity:0.1,
    description:'A scroll that enchants the players weapon',
    scrollFunction: (player, params={})=>{
        if(player.weapon.enchant>-3){
            player.weapon.enchant-=1
            return chalk.blue(`You cast the spell and your weapon is cursed`)+` ${chalk.greenBright(`weapon quality drops by 1`)}`
        }else{
            //
            //
            //  something special later specifically for max curse
            //
            //
            return chalk.blue(`You attempt to curse your weapon but it is already at max curse`)
        }
    }
})













let defDodgeStr=` dodges the worst of the blast, and takes `
let defHitStr=`catches the full force of the fiery explosion and takes`
let defNoTarget=`Unfortunately you are not in combat, you cast it out of the room`

function dmgScrollFun(
    dodgestr=defDodgeStr,
    hitstr=defHitStr,
    notarget=defNoTarget,
    color='FFA500',
    dmg='4d6', 
    name='fireball',
    instakill=false)
{
    return (player, params={})=>
    {
        if(player.state===playerState.COMBAT)
        {
            let monster = params.monster
            let damage = instakill?monster.hp:chance2.rpg(dmg,{sum: true})
            let saveDC = 10 + player.int + (player.level > 4 ? 4 : player.level);
            if(monsterRandom.d20() + monster.hitDie >= saveDC)
            {
                monster.hp-=Math.floor(damage/2) //str
                return `${chalk.hex(color)(`The`)} ${chalk.blueBright(monster.name)} ${chalk.hex(color)(dodgestr)} \
${chalk.hex('fe2c54')(Math.floor(damage/2))} ${chalk.hex(color)(`damage.`)}`;

            }
            else
            {
                monster.hp-=damage  //target
                return `${chalk.hex(color)(`You cast ${chalk.yellow(name)} at`)} \
${chalk.blueBright(monster.name+`.`)}\n${chalk.blueBright(monster.name)} ${chalk.hex(color)(hitstr)} \
${chalk.red(damage)} ${chalk.hex(color)('damage.')}`
            } 
        }
        else
        {
            return `${chalk.hex(color)(`You cast`)} ${chalk.yellow(name)} ${chalk.hex(color)(notarget+`.`)}`
        }
    }
}








