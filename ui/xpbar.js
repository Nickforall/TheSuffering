
export default class xpbar{ 
    constructor(player) {
        //getting player from instances in world.js
        this.player = player;
        //making xp bar for the players
        if(this.player.world.isTop()){
            //adding xpbar toe player
            this.player.experienceBar = document.getElementById('xpbarTop') 
            //value of bar is 0 in beginning
            this.player.experience = 0;
            //value of player is equel to bar value
            this.player.experienceBar.value = this.player.experience;
        }
        if(this.player.world.isBottom()){
            //adding xpbar toe player
            this.player.experienceBar = document.getElementById('xpbarBottom') 
            //value of bar is 0 in beginning
            this.player.experience = 0;
            //value of player is equel to bar value
            this.player.experienceBar.value = this.player.experience;
        }        
    }
    addXP(){
       this.player.value += 10;
       this.player.experienceBar = this.player.experience;
    }
}
