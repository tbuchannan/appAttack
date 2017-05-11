class Hud {
  constructor(view, player){
    this.view = view;
    this.player = player;

    this.healthbar = this.player.health;
    this.barSize = 350;
  }

  draw(){
    this.drawMax();
    if (this.player.health > 0){
      this.drawCurrentHealth();
    }
    this.drawLabels();
  }

  drawLabels(){
    let currentHealth = this.player.health > 0 ? this.player.health : 0;
    this.view.font = "24px Bangers";
    this.view.fillStyle="#000";
    this.view.fillText(`${currentHealth}/${this.healthbar}`, 250, 43);
  }
  drawMax(){
    this.view.fillStyle="#FFF";
    this.view.fillRect(10, 20, this.barSize, 30);
    this.view.strokeStyle="#000";
    this.view.strokeRect(10, 20, this.barSize, 30);
  }

  drawCurrentHealth(){
    let currentHealthPercent = this.player.health / this.healthbar;
    let healthPercentInPx = currentHealthPercent * this.barSize;

    this.view.fillStyle="#FF0000";
    this.view.fillRect(10, 20, healthPercentInPx, 30);
    this.view.strokeStyle="#000";
    this.view.strokeRect(10, 20, this.barSize, 30);
  }

}
module.exports = Hud;
