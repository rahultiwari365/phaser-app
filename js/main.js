import { game } from './config.js';

export default class Main extends Phaser.Scene {
  constructor() {
    super('Main');
  }

  preload() {
    for (var i = 1; i <= 7; i++) {
      // this.load.image("bomb" + i, "assets/bomb" + i + ".png");
      this.load.image('bomb', 'assets/bomb.png');
    }
    for (var i = 1; i <= 7; i++) {
      // this.load.image("bomb" + i, "assets/bomb" + i + ".png");
      this.load.image('star', 'assets/star.png');
    }
  }

  create() {
    this.container = this.add.rectangle(300, 300, 148, 148, 0xff66ff);
    this.container.setStrokeStyle(2, 0x1a65ac);
    this.container.setInteractive();

    this.container1 = this.add.rectangle(500, 300, 148, 148, 0x9966ff);
    this.container1.setStrokeStyle(2, 0x1a65ac);
    this.container1.setInteractive();

    var bombWidth = 40,
      bombHeight = 150,
      starWidth = 750,
      starHeight = 150;
    for (var i = 1; i <= 7; i++) {
      var xx = bombWidth;
      var yy = bombHeight;
      var bomb = this.add.image(xx, yy, 'bomb');
      bomb.setScale(2);
      bomb.setInteractive();
      // widthMargin += 20;
      bombHeight += 60;
    }

    for (var i = 1; i <= 7; i++) {
      var xx = starWidth;
      var yy = starHeight;
      var star = this.add.image(xx, yy, 'star');
      star.setScale(2);
      star.setInteractive();
      // starWidth += 60;
      starHeight += 60;
    }
    this.input.on('pointerover', this.pointerOver, this);
    this.input.on('pointerdown', this.startDrag, this);
  }

  pointerOver(pointer) {
    // console.log('pointerOver --- true', pointer);
  }

  startDrag(pointer, targets) {
    this.input.off('pointerdown', this.startDrag, this);
    this.dragObj = targets[0];
    this.input.on('pointermove', this.doDrag, this);
    this.input.on('pointerup', this.stopDrag, this);
  }

  doDrag(pointer) {
    if (this.dragObj && this.dragObj.type !== 'Rectangle') {
      this.dragObj.x = pointer.x;
      this.dragObj.y = pointer.y;
      // if(this.dragObj.texture.key === 'star'){
      this.dragObj.clearTint();
      // }
    }
  }

  stopDrag() {
    this.input.on('pointerdown', this.startDrag, this);
    this.input.off('pointermove', this.doDrag, this);
    this.input.off('pointerup', this.stopDrag, this);
    if (this.dragObj && this.dragObj.type !== 'Rectangle') {
      if (
        this.dragObj.x > this.container.x - 67 &&
        this.dragObj.x < this.container.x - 67 + this.container.width &&
        this.dragObj.y > this.container.y - 67 &&
        this.dragObj.y < this.container.y - 67 + this.container.height
      ) {
        console.log('Image is inside the rect---');
        this.dragObj.x = Phaser.Math.Between(
          this.container.x - 67,
          this.container.x - 67 + this.container.width
        );
        this.dragObj.y = Phaser.Math.Between(
          this.container.y - 67,
          this.container.y - 67 + this.container.height
        );
        if (this.dragObj.texture.key === 'star') {
          // this.container.setStrokeStyle(5, "#4287f5");
          this.dragObj.setTint(0xff0000);
        } else {
          // this.container.setStrokeStyle(2, 0x1a65ac);
        }
        this.dragObj.setScale(1.5);
      } else if (
        this.dragObj.x > this.container1.x - 67 &&
        this.dragObj.x < this.container1.x - 67 + this.container1.width &&
        this.dragObj.y > this.container1.y - 67 &&
        this.dragObj.y < this.container1.y - 67 + this.container1.height
      ) {
        console.log('Image is inside the rect---');
        this.dragObj.x = Phaser.Math.Between(
          this.container1.x - 67,
          this.container1.x - 67 + this.container1.width
        );
        this.dragObj.y = Phaser.Math.Between(
          this.container1.y - 67,
          this.container1.y - 67 + this.container1.height
        );
        if (this.dragObj.texture.key === 'bomb') {
          // this.container1.setStrokeStyle(5, "#4287f5");
          this.dragObj.setTint(0xff0000);
        } else {
          // this.container1.setStrokeStyle(2, 0x1a65ac);
        }
        this.dragObj.setScale(1.5);
      } else {
        this.dragObj.setScale(2);
      }
    }
  }

  update() {}
}
