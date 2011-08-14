enchant();
(function(){
  enchant.World = Class.create(Group, {
    initialize:function(){
      this.bullets = new Array();
      var background = new Sprite(640, 480);
      background.image = enchant.game.assets['background.png'];
      enchant.game.currentScene.addChild(background);
      this.player = new Player(320, 440, enchant.game.assets['player.png']);
      var player = this.player;
      enchant.game.currentScene.addChild(player);
      var boss = new Boss(280, 50);
      enchant.game.currentScene.addChild(boss);
      enchant.game.currentScene.addEventListener('enterframe', function(){
        for(i=0;i<enchant.world.bullets.length;++i){
          b = enchant.world.bullets[i];
          if(player.within(b, 5)){
            player.x = 10000;
          };
          if(boss.within(b, 30)){
            b.x = 10000;
            boss.hp -= 1
          }
        };
      });
      var bgm = enchant.Sound.load("bgm.mp3", 'audio/mp3');
      bgm.play();
    },
    popEnemy:function(){

    }
  });

  enchant.MapSprite = Class.create(Sprite, {
    initialize:function(x, y, image){
      Sprite.call(this, image.width, image.height);
      this.image = image
      this.x = x;
      this.y = y;
      this.v = new Vector(0, 0);
      this.addEventListener('enterframe', function(){
        this.update();
      });
    },
    update:function(){
      this.x += this.v.x;
      this.y += this.v.y;
    }
  });
  enchant.Character = Class.create(enchant.MapSprite, {
    initialize:function(x, y, image){
      MapSprite.call(this, x, y, image);
      this.image = image
      this.speed = 1;
      this.offset = -30;
      this.addEventListener('enterframe', function(){
        this.update();
      });
    },
    shot: function(){
      var b = new Bullet(this.x + this.image.width/2, this.y + this.offset);
      enchant.world.bullets.push(b);
      enchant.game.currentScene.addChild(b);
    },
    update:function(){
      this.v.resize(this.speed);
      this.x += this.v.x;
      this.y += this.v.y;
    }
  });
  enchant.Player = Class.create(enchant.Character, {
    initialize: function(x, y, image){
      Character.call(this, x, y, image);
      this.speed = 5;
      this.addEventListener('enterframe', function(){
        this.input();
        this.update();
      });
    },
    input:function(){
      this.v.x = 0;
      this.v.y = 0;
      if(enchant.game.input.left){
        this.v.x = -1;
      }
      if(enchant.game.input.right){
        this.v.x = 1;
      }
      if(enchant.game.input.down){
        this.v.y = 1;
      }
      if(enchant.game.input.up){
        this.v.y = -1;
      }
      if(enchant.game.input.a){
        this.shot();
      }
    }
  });
  enchant.Bullet = Class.create(enchant.MapSprite, {
    initialize: function(x, y){ 
    MapSprite.call(this, x, y, enchant.game.assets['bullet.png']);
    this.v.y = -1;
    this.speed = 10;
  },
  update: function(x, y){
    this.v.resize(this.speed);
    this.moveBy(this.v.x, this.v.y);
    /*if(this.y < 100){
       //enchant.game.removeChild(this);
     }*/
  }
});

enchant.Boss = Class.create(enchant.MapSprite, {
  initialize: function(x, y){
    MapSprite.call(this, x, y, enchant.game.assets['boss.png'])
    this.hp = 100;
    this.v.x = 3;
    this.offset = 50;
  },
  update:function(){
    if(this.hp < 0){
      this.x = 10000
    }
    if(this.x > 640 - 240){
      this.v.x = -5;
    }
    if(this.x < 0){
      this.v.x = 5;
    }
    this.moveBy(this.v.x, this.v.y);
    r = Math.floor(Math.random()*30);
    if(r==0){
      this.shot();
    }
  },
  shot:function(){
    r = Math.floor(Math.random()*2);
    if(true){
      for(i=0;i<24;++i){
        var vec = new Vector(0, 100);
        vec.rotate(i*15);;
        var b = new Bullet(this.x + this.image.width/2 + vec.x, this.y + vec.y);
        b.v.x = vec.x
        b.v.y = vec.y;
        b.rotate(i*15);
        enchant.world.bullets.push(b);
        enchant.game.currentScene.addChild(b);
      }
      }else{
        var my = enchant.world.player;
        var a = Vector(this.x + this.image.width/2, this.y + this.image.height/2);
        var c = Vector(my.x + my.image.width/2, my.y + my.image.height/2);
        c.sub(a);
        var b = new Bullet(this.x + this.image.width/2, this.y + 100);
        console.log(a.x);
        b.v.x = c.x;
        b.v.y = c.y;
        enchant.world.bullets.push(b);
        enchant.game.currentScene.addChild(b);
      }
    }
  });



})();
