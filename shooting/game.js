enchant();
window.onload = function(){
  var DEBUG = false;
  var game = new Game(640, 480);
  enchant.game = game;
  game.fps = 24;
  game.preload('kawaz.png', 'bullet.png', 'player.png', 'background.png', 'boss.png', 'bgm.mp3');
  game.keybind(90, 'a');
  game.onload = function(){
    var titleScene = new Scene();
    var logo = new Scene();
    var logoSurface = game.assets['kawaz.png']
    var logo = new Sprite(logoSurface.width, logoSurface.height);
    logo.x = 100;
    logo.y = 100;
    logo.image = logoSurface;
    titleScene.addChild(logo);
    var gameScene = new Scene();
    enchant.world = new World();
    gameScene.addChild(enchant.world);
    if(DEBUG){
      game.pushScene(gameScene);
    }else{
      game.pushScene(titleScene);
    }
    var v = new Vector(0, 0);
    var timer = new Timer(100);
    timer.play();


    game.addEventListener('enterframe', function(){
      if(timer.isOver() && !DEBUG){
        game.pushScene(gameScene)
      }
    });
  };
  game.start();
};
