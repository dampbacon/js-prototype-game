//
// Weapon objects
//

import chalk from "chalk";
import { Player, playerState } from "./player";
import { chance2, chance3, monsterRandom } from "./random_nums";

//
export class dmgTypeClass{
    constructor({name, /*effectAdverb, */chanceToApply, color, effectDuration, applyEffect}){
        this.name = name;
        //effectAdverb=effectAdverb?effectAdverb:''
        //can be a normal number but can be a list with apply effect function callback
        //this.effectparams = effectparams?effectparams:null;
        this.color = color;
        this.effectDurationMax = effectDuration?effectDuration:0;
        //callback function to apply effect passed as argument
        //
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
        altar
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

        this.name = name?name:'Scroll';
        this.rarity = rarity?rarity:1;
        this.description = description?description: this.generateDescription();


        this.scrollFunction=scrollFunction?scrollFunction:((player, params)=>{return 'poof'});
    }
    use(player=new Player(), params={}){
        player.scrolls--
        return this.scrollFunction(player, this.params)
    }
}
 

let fireball = new Scroll({
    name:'fireball',
    targetmonster:true,
    rarity:1,
    description:'A scroll that summons a fireball to attack a monster',
    scrollFunction: dmgScrollFun()
})











let defDodgeStr=` dodges the worst of the blast, and takes `
let defHitStr=`catches the full force of the firey explosion and takes`
function dmgScrollFun(dodgestr=defDodgeStr,hitstr=defHitStr,color='FFA500',dmg='4d6', name='fireball'){
    return (player, params={})=>{
        if(player.state===playerState.COMBAT){
            let monster = params.monster
            let damage = chance2.rpg(dmg,{sum: true})
            let saveDC = 10 + player.int + (player.level > 4 ? 4 : player.level);
            if(monsterRandom.d20() + monster.hitDie >= saveDC){
                monster.hp-=Math.floor(damage/2) //str
                return "The " + monster.name + dodgestr + Math.floor(damage/2) + " damage.";
            }else{
                monster.hp-=damage  //target
                return `${chalk.hex(color)(`You cast a ${name} at`)} \
${monster.name}. ${monster.name} ${chalk.hex(color)(hitstr)} \
${chalk.red(damage)} ${chalk.hex(color)('damage')}`
            } 
        }else{
            return `You cast a ${name} unfortunately you are not in combat, you cast it out of the room`
        }
    }
}








