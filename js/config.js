import Main from './main.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1280,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  backgroundColor: '#5DACD8',
  scene: [Main],
};

export const game = new Phaser.Game(config);
