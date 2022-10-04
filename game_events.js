import gradient from 'gradient-string';



const defaults={
    id:0,
    body:{
        body:'',
        format:{
            //later make write modes like an enum thing with 'default', 'scan lines',
            writeMode:'gradientScanlines', 
            gradientFunction:gradient.retro.multiline,
            gradientArr:['#3f51b1', '#5a55ae', '#7b5fac', '#8f6aae', '#a86aa4', '#cc6b8e', '#f18271', '#f3a469', '#f7c978'],
            speed:20,
        },
        TextFile:{
            exists:false,
            url:''
        },
    },
    toScreen:{
        toScreen:'',
        AnsiFile:{
            exists:false,
            url:'',
        },
    },
    buttons:[[]],
}
//to factory event builder

export class game_event{
    constructor({id,body,toScreen,buttons}={defaults}){
        this.id=id
        this.body=body
        this.toScreen=toScreen
        this.buttons=buttons
        //buttons are in the format of [[event_id,"button label", enabled_always=true]]        
    }
    disableButton(number){
        this.buttons[number-1][2]=false
    }
    test = () => console.log("mmmmmmmmmmmmmmmmmmmmmm!!")

}

export class game_event_gain_item extends game_event{
    constructor({id,body,toScreen,buttons,arryItems}={...defaults,arryItems:[]}){
        super(id,body,toScreen,buttons)
        this.arryItems=arryItems;
    }
}

export class game_event_enemy extends game_event{
    constructor({id,body,toScreen,buttons,Enemy}={...defaults,Enemy:[]}){
        super(id,body,toScreen,buttons)
        this.Enemy=Enemy;
    }
}

//stub
export class game_event_skillcheck extends game_event{
    constructor({'id':id,'body':body,'toScreen':toScreen,'buttons':buttons,'arrySkillCheck':arrySkillCheck}={...defaults,arrySkillCheck:[]}){
        super(id,body,toScreen,buttons)
        this.arrySkillCheck=arrySkillCheck;
    }
}