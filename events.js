class game_event{
    contructor({id,body,buttons}={id:null,body:"",buttons:{}}){
        this.id=id
        this.body=body
        this.buttons=buttons
        // buttons are in the format of {event_id:"button label"}
    }
}

class game_event_gain_item extends game_event{
    contructor({id,body,buttons,arryItems}){
        super(id,body,buttons)
        this.arryItems=arryItems;
    }
}

class game_event_enemy extends game_event{
    contructor({id,body,buttons,arryenemy}){
        super(id,body,buttons)
        this.arryenemy=arryenemy;
    }
}