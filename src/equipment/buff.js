import Buff from '../../resources/buff.json'
export default class Buffs {
    constructor(player) {
        this.player = player;

        //checking player is Top or bottom
    }
    //checking value if your xp bar = 100
    checkValue(){
        if(this.player.experience >= 100){
            this.player.xpBar.addXP(-100);
            this.randomBuff();
        }else{
            console.log('lol niet genoeg velue');
        }
    }
    //this function is to choose a random buff 
    randomBuff() {
        
        //getting random number for the buffs
        let id = Math.floor((Math.random() * Buff.length) + 1) -1;

        //checking which function to actived
        switch(Buff[id].name){
            case 'gun':
                this.gun();
            break;
            case 'oneHit' :
                this.oneHit();
            break;
            case 'noDamage' :
                this.noDamage();
            break;
        }
        
    }
    gun(){
        console.log('gun')
        if(!this.player.holdBuff){
            this.player.gotGun = true;
        }
    }
    oneHit(){
        console.log('one hit')
        if(!this.player.holdBuff){
            this.player.holdBuff = 'oneHit';
        }
    }
    noDamage(){
        console.log('no damage')
        if(!this.player.holdBuff){
            this.player.holdBuff = 'noDamage';
            this.player.noDamage = true;
            this.player.buffHandler();
        }
    }
    //checking if player has buffa
    gotBuff(){
        //if player has buff buff gets acitivated
        if(this.player.holdBuff){
            console.log('got a buff it is' + this.player.holdBuff)
            switch(this.player.holdBuff){
                case 'gun':
                    this.gun();
                break;
                case 'oneHit' :
                    this.oneHit();
                break;
                case 'noDamage' :
                    this.noDamage();
                break;
            }
        }else{
            this.checkValue();
        }
    }
}