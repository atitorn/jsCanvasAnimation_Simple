var canvas = document.getElementById("game-layer");
var ctx = canvas.getContext("2d");
// construtor function
// Player Object
function Player(x, y) {
  this.x = x;
  this.y = y;
  this.width = 20;
  this.height = 20;
  this.direction = -1;
}
// adding method to Player object for creating animation 
// do not put in main constructor so that we cannot mess with it when create object 
Player.prototype.draw = function () {
  ctx.fillStyle = "blue";
  ctx.fillRect(this.x, this.y, this.width, this.height);
};
Player.prototype.update = function () {
  this.y = this.y + this.direction;
  if (this.y <= 0 || this.y + this.height >= canvas.height) {
    this.direction *= -1;
  }
};


// create player
var player = new Player(50, 100);

// render
function frameUpdate() {
  var canvas = document.getElementById("game-layer");
  var ctx = canvas.getContext("2d");

  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  player.draw();

  window.requestAnimationFrame(frameUpdate);
};

frameUpdate();


// var canvas_btm = document.getElementById("game-layer2");
// var ctx_btm = canvas_btm.getContext("2d");

// Player Object
function Anotherplayer(x, y) {
  this.x = x;
  this.y = y;
  this.width = 20;
  this.height = 20;
  this.direction = -1;
}
Anotherplayer.prototype.update = function () {
  if (this.y <= 0 || this.y + this.height >= game.gameFieldHeight()) {
    this.direction *= -1;
  }
};

// Enemy Object
function Enemy(x, y) {
  this.x = x;
  this.y = y;
  this.width = 10;
  this.height = 10;
  this.direction = 1;
}
Enemy.prototype.update = function () {
  if (this.y <= 0 || this.y + this.height >= game.gameFieldHeight()) {
    this.direction *= -1;
  }
};

// Renderer Object
var renderer = (function () {

  function _drawEnemy(context_btm, enemy) {
    context_btm.fillStyle = "red";
    context_btm.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  }

  function _drawPlayer(context_btm, player) {
    context_btm.fillStyle = "blue";
    context_btm.fillRect(player.x, player.y, player.width, player.height);
  }

  function _render() {
    var canvas_btm = document.getElementById("game-layer2");
    var context_btm = canvas_btm.getContext("2d");

    context_btm.fillStyle = "gray";
    context_btm.fillRect(0, 0, canvas_btm.width, canvas_btm.height);

    var i,
      entity,
      entities = game.entities();

    for (i = 0; i < entities.length; i++) {
      entity = entities[i];

      if (entity instanceof Enemy) {
        _drawEnemy(context_btm, entity);
      }
      else if (entity instanceof Anotherplayer) {
        _drawPlayer(context_btm, entity);
      }
    }
  }

  return {
    render: _render  // return a dict so we can call just 1 method
    // the rest of the methods are called inside thie _render method
  };

})();
// Physics Object
var physics = (function () {

  function _update() {
    var i,
      entities = game.entities();

    for (i = 0; i < entities.length; i++) {
      entities[i].y += entities[i].direction;
    }
  }

  return {
    update: _update
  };

})();

// Game Object
var game = (function () {
  var _gameFieldHeight = 200;
  var _entities = [];

  function _start() {
    _entities.push(new Anotherplayer(100, 175));
    _entities.push(new Enemy(20, 25));
    _entities.push(new Enemy(80, 25));
    _entities.push(new Enemy(160, 25));

    window.requestAnimationFrame(this.update.bind(this));
  }

  function _update() {
    physics.update();

    var i;
    for (i = 0; i < _entities.length; i++) {
      _entities[i].update();
    }

    renderer.render();

    window.requestAnimationFrame(this.update.bind(this));
  }

  return {
    start: _start,
    update: _update,
    entities: function () { return _entities; },
    gameFieldHeight: function () { return _gameFieldHeight; }
  };

})();

game.start();

// function anotherFrameUpdate() {
//   var canvas_btm = document.getElementById("game-layer2");
//   var ctx_btm = canvas_btm.getContext("2d");

//   ctx_btm.fillStyle = "gray";
//   ctx_btm.fillRect(0, 0, canvas_btm.width, canvas_btm.height);

//   anotherPlayer.update();
//   anotherPlayer.draw();

//   window.requestAnimationFrame(anotherFrameUpdate);
// };

// anotherFrameUpdate();

// function Person(first, last, age, gender) {
//   // property
//   this.name = {
//     'first': first,
//     'last': last
//   };
//   this.age = age;
//   this.gender = gender;
// };

// Person.prototype.farewell = function () {
//   alert(this.name.first + 'has left the chat');
// };

// let person1 = new Person('James', 'Bond', '42', 'male');

// document.getElementById("log-text").innerHTML = person1.age;
// console.log(person1.constructor);
// person1.farewell();