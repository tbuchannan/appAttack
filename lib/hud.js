const Player = require('./player');
const Enemy = require('./enemy');
class Hud {
  constructor(view, player){
    this.view = view;
    this.player = player;
    this.enemy = this.isEnemy(player);

    this.healthBar = this.player.maxHealth;
    this.barSize = 350;
    this.hudX = 10;
    this.hudY = 20;
    this.hudWidth = 30;

    this.populateVariables();
  }

  draw(){
    this.view.lineWidth = 1;
    if (!this.enemy || this.player.injured){
      this.drawMax();
      this.drawCurrentHealth();
    }
    this.drawLabels();
  }

  drawLabels(){
    if (!this.enemy) {
      let currentHealth = this.player.currentHealth > 0 ? this.player.currentHealth : 0;
      this.view.font = "24px Bangers";
      this.view.fillStyle="#000";
      this.view.fillText(`${currentHealth}/${this.healthBar}`, 250, 43);
      this.view.font = "40px Bangers";
      this.view.fillStyle="#FFF";

      this.view.fillText(`${this.player.score}`, 450, 50);
      this.view.lineWidth = 2;
      this.view.strokeText(`${this.player.score}`, 450, 50);



    }

  }
  drawMax(){
      this.populateVariables();
      this.view.fillStyle="#F00";
      this.view.fillRect(this.hudX, this.hudY, this.barSize, this.hudWidth);
      this.view.strokeStyle="#000";
      this.view.strokeRect(this.hudX, this.hudY, this.barSize, this.hudWidth);
  }

  drawCurrentHealth(){
      let currentHealthPercent = this.player.currentHealth / this.healthBar;
      let healthPercentInPx = currentHealthPercent * this.barSize;
      if (this.player.alive) {
        this.view.fillStyle="#008e10";
        this.view.fillRect(this.hudX, this.hudY, healthPercentInPx, this.hudWidth);
        this.view.strokeStyle="#000";
        this.view.strokeRect(this.hudX, this.hudY, this.barSize, this.hudWidth);
      }

  }

  isEnemy(player){
    return (player instanceof Enemy);
  }

  populateVariables(){
    if (this.enemy) {
        this.hudX = this.player.pos[0] + 30;
        this.hudY = this.player.pos[1] + this.player.height - 15;
        this.barSize = Math.floor(this.player.width * .30);
        this.hudWidth = 5;
    } else{
      this.healthBar = this.player.maxHealth;
    }
  }

}
module.exports = Hud;
