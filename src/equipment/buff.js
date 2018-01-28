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
        document.getElementById('buff').style.backgroundImage = "url('../../resources/powerups/gun.png')"
        console.log('gun')
        if(this.player.holdBuff){
            this.player.gotGun = true;
            this.player.buffHandler();
        }else{
            this.player.holdBuff = 'gun';
        }
    }
    oneHit(){
        document.getElementById('buff').style.backgroundImage = "url('../../resources/powerups/one-hit.png')"
        console.log('one hit')
        if(this.player.holdBuff){
            this.player.oneHit = true;
            this.player.buffHandler();            
        }else{
            this.player.holdBuff = 'oneHit';
        }
    }
    noDamage(){
        document.getElementById('buff').style.backgroundImage = "url('../../resources/powerups/no-damage.png')"
        console.log('no damage')
        if(this.player.holdBuff){
            this.player.noDamage = true;
            this.player.buffHandler();
        }else{
            this.player.holdBuff = 'noDamage';
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