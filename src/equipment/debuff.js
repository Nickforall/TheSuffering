import Debuff from '../../resources/debuff'
export default class deBuff{
    constructor(player){
        this.player = player;

        //todo checking if player is top or bottom
    }
    //checking value if your xp bar = 100
    checkValue(){
        if(this.player.experience >= 100){
            this.player.xpBar.addXP(-100);
            this.randomDeBuff();
        }else{
            console.log('lol niet genoeg velue')
        }
    }
    //this function is to choose a random debuff
    randomDeBuff() {
        
        //getting random number for the buffs
        let id = Math.floor((Math.random() * Debuff.length) + 1) -1;

        //checking which function to actived
        switch(Debuff[id].name){
            case 'noJump':
                this.noJump();
            break;
            case 'slowing' :
                this.slowing();
            break;
            case 'freeze' :
                this.freeze();
            break;
        }
    }
    noJump(){
        this.player.interfaceDebuff.style.backgroundImage = "url('../../resources/powerups/no-jump.png')"

        console.log('no jump');
        if(this.player.holdDebuff){
            this.player.interfaceDebuff.style.backgroundColor = "yellow"
            
            this.player.holdDebuff = '';
            let opp = this.player.getOpponent();
            opp.blockedJump = true;

            opp.debuffHandler();            
        } else {
            
            this.player.holdDebuff = 'noJump';

        }
    }
    slowing(){
        this.player.interfaceDebuff.style.backgroundImage = "url('../../resources/powerups/slow-down.png')"        

        console.log('slowing');
        if(this.player.holdDebuff){
            this.player.interfaceDebuff.style.backgroundColor = "yellow"
            
            this.player.holdDebuff = '';
            let opp = this.player.getOpponent();
            opp.slowing = true;

            opp.debuffHandler();
        } else {
            this.player.holdDebuff = 'slowing';

        }
    }
    freeze(){
        this.player.interfaceDebuff.style.backgroundImage = "url('../../resources/powerups/freeze.png')"                        
        console.log('freeze');
        if(this.player.holdDebuff){
            this.player.interfaceDebuff.style.backgroundColor = "yellow"
            
            this.player.holdDebuff = '';            
            let opp = this.player.getOpponent();
            opp.frozen = true;

            opp.debuffHandler();            
        } else {
            this.player.holdDebuff = 'freeze';
        }
    }
    gotDebuff(){
        //checking if u have a buff
        console.log(this.player.holdDebuff)
        if(this.player.holdDebuff){
            console.log('got a de buff it is' + this.player.holdDebuff)
            //checking which debuff to activet
            switch(this.player.holdDebuff){
                case 'noJump':
                    this.noJump();
                break;
                case 'slowing' :
                    this.slowing();
                break;
                case 'freeze' :
                    this.freeze();
                break;
            }
        }else{
            this.checkValue();
        }
    }
}

