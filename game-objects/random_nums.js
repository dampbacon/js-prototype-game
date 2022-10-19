import Chance from 'chance';
//monster die
export var monsterRandom = new Chance();
//stats roll die
export var chance1 = new Chance();
//player rolls die
export var chance2 = new Chance();
//random picker dice
export var chance3 = new Chance();


export function resetRandoms(seed){
    if(seed){
        monsterRandom = new Chance(seed);
        chance1 = new Chance(seed);
        chance2 = new Chance(seed);
        chance3 = new Chance(seed)
    }else{
        monsterRandom = new Chance();
        chance1 = new Chance();
        chance2 = new Chance();
        chance3 = new Chance();
    }
}