enchant();
window.onload = function(){
 var game = new Game(640, 480);
 game.fps = 24;
 game.preload('resources/image/kawaz.png');
 game.onload = function(){
   var titleScene = new Scene();
   var logo = new Scene();
   var logoSurface = game.assets['resources/image/kawaz.png']
   var logo = new Sprite(logoSurface.width, logoSurface.height);
   logo.x = 100;
   logo.y = 100;
   logo.image = logoSurface;
   titleScene.addChild(logo);
   var gameScene = new Scene();
   gameScene.backgroundColor = 'rgb(182, 255, 255)';
   game.pushScene(titleScene);
   var v = new Vector(0, 0);
   var timer = new Timer(100);
   timer.play();
   game.addEventListener('enterframe', function(){
     timer.tick();
     if(timer.isOver()){
       game.pushScene(gameScene)
     }
   });
 };
 game.start();
};
