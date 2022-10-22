//
// Weapon objects
//

import chalk from "chalk";
import { DMG_TYPE } from "./data.js";
import {playerState} from "./player.js";
import {chance2, monsterRandom} from "./random_nums.js";

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
        dmgTypeE,
        targetmonster, 
        targetplayer, 
        changeMonster, 
        nonhostile, 
        changePlayer, 
        resolveEncounter,
        teleport, 
        scrollFunction,  
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

        this.dmgTypeE = dmgTypeE?dmgTypeE:DMG_TYPE.NONE
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
let defDodgeStr=` dodges the worst of the blast, and takes `
let defHitStr=`catches the full force of the fiery explosion and takes`
let defNoTarget=`Unfortunately you are not in combat, you cast it out of the room`

export function dmgScrollFun(
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
        let descStr = `${chalk.hex(color)(`You use a scroll, it casts`)} ${chalk.greenBright(name)}`
        if(player.state===playerState.COMBAT)
        {
            let monster = params.monster
            let damage = instakill?monster.hp:chance2.rpg(dmg,{sum: true})
            let saveDC = 10 + player.int + (player.level > 4 ? 4 : player.level);
            if(monsterRandom.d20() + monster.hitDie >= saveDC)
            {
                damage=Math.floor(damage/2)
                monster.hp-=damage //str
                player.encDat.AHM(true)
                player.encDat.ATdmg(damage)
                return `${descStr}
${chalk.hex(color)(`The`)} ${chalk.blueBright(monster.name)} ${chalk.hex(color)(dodgestr)} \
${chalk.hex('fe2c54')(damage)} ${chalk.hex(color)(`damage.`)}`;

            }
            else
            {
                monster.hp-=damage  //target
                player.encDat.AHM(true)
                player.encDat.ATdmg(damage)
                return `${descStr} ${chalk.hex(color)('at')} \
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








