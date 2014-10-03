// $(document).on('ready', function() {
 
 // image link bank
var unicorn = './images/8_bit_unicorn.png';
var monster1 = '\'http://www.placekitten.com/g/65/65\''
var monster2 = '\'http://www.placekitten.com/g/110/100\''
var monster3 = '\'http://www.placekitten.com/g/80/80\''
var monster4 = '\'http://www.placekitten.com/g/95/95\''
var monster5 = '\'http://www.placekitten.com/g/155/150\''

// arrays for random name generation
var monsterNames = ['Evan', 'Judy', 'Roy', 'Steve', 'Richard', 'Chris', 'Reginald', 'Spook', 'Ned', 'Kelly', 'Ursula', 'Pheobe', 'Pheobo', 'Chandler', 'Rachel', 'Ross', 'Joey', 'Monica', 'Gus', 'Jack', 'Randy', 'Ivan', 'Jill', 'Hansel', 'Bobby', 'Laura', 'Max'];
var playerFirstNamesF = ['Princess', 'Sylvia', 'Baroness', 'Queen', 'Duchess', 'Fluffy', 'Valentine'];
var playerFirstNamesM = ['Prince', 'Sir', 'Baron', 'King', 'Duke', 'Lord', 'Valentino'];
var playerLastNames = ['Bubbles', 'Sparkles', 'Firework', 'Firefly', 'Shooting Star', 'Star', 'Moon', 'Sundrop'];

/////////////////////////
// CREATE CONSTRUCTORS //
/////////////////////////

var World = function(){
	this.players = [];
	this.rooms = [];
	this.items = [];
	this.monsters = [];
};

var Player = function(name, type){
	this.name = name || 'Princess Bubbles';
	this.type = type || 'unicorn';
	this.img = './images/8_bit_unicorn.png';
	this.inventory = [];
	this.health = 100;
	this.magic = 100;
};

var Monster = function(name, type){
	this.name = name || 'Leonard';
	this.type = type || 'evil monkey';
	this.health = 100;
};

// Dragon is a type of Monster
var Dragon = function(name){
	var instanceofDragon = this;
	Monster.call(instanceofDragon, name, 'Dragon');
	this.dmgCaused = 10;
	this.img = monster1;
};
Dragon.prototype = new Monster();
Dragon.prototype.constructor = Dragon;

// Cyclops is a type of Monster
var Cyclops = function(name){
	var instanceofCyclops = this;
	Monster.call(instanceofCyclops, name, 'Cyclops');
	this.dmgCaused = 5;
	this.img = monster2;
};
Cyclops.prototype = new Monster();
Cyclops.prototype.constructor = Cyclops;


// Velociraptor is a type of monster
var Velociraptor = function(name){
	var instanceofVelociraptor = this;
	Monster.call(instanceofVelociraptor, name, 'Velociraptor');
	this.dmgCaused = 7;
	this.img = monster3;
};
Velociraptor.prototype = new Monster();
Velociraptor.prototype.constructor = Velociraptor;


// Sharknado is a type of monster
var Sharknado = function(name){
	var instanceofSharknado = this;
	Monster.call(instanceofSharknado, name, 'Sharknado');
	this.dmgCaused = 15;
	this.img = monster4;
};
Sharknado.prototype = new Monster();
Sharknado.prototype.constructor = Sharknado;

// Zombie is a type of monster
var Zombie = function(name){
	var instanceofZombie = this;
	Monster.call(instanceofZombie, name, 'Zombie');
	this.dmgCaused = 2;
	this.img = monster5;
};
Zombie.prototype = new Monster();
Zombie.prototype.constructor = Zombie;

// array of monster types
var monsterTypes = [Dragon, Cyclops, Sharknado, Zombie, Velociraptor];

///////////////////
// WORLD METHODS //
///////////////////

World.prototype.addPlayer = function(player){
	this.players.push(player);
	player.create();
};
World.prototype.addMonster = function(monster){
	this.monsters.push(monster);
	monster.create();
};

World.prototype.generateName = function(gender){
	if(gender === 'male'){
		var first = (_.shuffle(playerFirstNamesM))[0];
	} else {
	var first = (_.shuffle(playerFirstNamesF))[0];
	}
	var last = (_.shuffle(playerLastNames))[0];
	var randomName = first + ' ' + last;

	return randomName;
};

World.prototype.randomPlayer = function(){
	var first = (_.shuffle(playerFirstNamesF))[0];
	var last = (_.shuffle(playerLastNames))[0];

	var randomName = first + ' ' + last;
	console.log('Your name is: ' + randomName);
	var newPlayer = new Player(randomName);
	this.addPlayer(newPlayer);
};

World.prototype.randomMonster = function(array){
	if($('.monster')) $('.monster').remove();

	var randomMonster = (_.shuffle(this.monsters))[0];
	var roomWidth = $('#current-room').css('width');
	roomWidth = roomWidth.split('');
	roomWidth = _.without(roomWidth, 'p', 'x');
	roomWidth = roomWidth.join('');

	var roomHeight = $('#current-room').css('height');
	roomHeight = roomHeight.split('');
	roomHeight = _.without(roomHeight, 'p', 'x');
	roomHeight = roomHeight.join('');

	var fromTop = _.range(roomHeight);
	var fromLeft = _.range(roomWidth);
	 
	randomMonster.element
		.css('top', (_.shuffle(fromTop))[0])
		.css('left', (_.shuffle(fromTop))[0]);

	randomMonster.monsterVitals();
	$('#current-room').append(randomMonster.element);

	return randomMonster.element

};

World.prototype.generateMonsters = function(){

	var i = 0;
	while(i<10){
	var newName = (_.shuffle(monsterNames))[0];
	var whichKind = (_.shuffle(monsterTypes))[0];
	var thisGuy = new whichKind(newName);
	this.addMonster(thisGuy);
	i++
	}
};



World.prototype.gameOver = function(){
	if (this.escape) return this.escape;

	this.escape = $('<img class=\'game-over\' src="./images/game-over.png" alt="">');
	$('body').append(this.escape);

	this.escape.on('click', function(){
		this.escape.remove();
	})
};

////////////////////
// PLAYER METHODS //
////////////////////

///creates the new players DOM element
Player.prototype.create = function(){
	// check to make sure the element doesn't already exist
	if(this.element) return this.element;
	// create image jQuery object and add attributes
	console.log(this.img);
	this.element = $('<img src=' + this.img +'>');
	this.element
	.attr('src', this.img)
	.attr('class', 'current-player')

	$('#subtitle').html('The Adventures of '+ this.name);
	console.log(this.name + ' has been created!');
	return this.element
};

// injure method decreases current players health and executes "game over cat" on depletion
Player.prototype.injure = function(){
	// retrieve current width (in pixels) of the health bar
	var currentPX = $('#health').css('width');
	currentPX = currentPX.split('');
	currentPX = _.without(currentPX, 'p', 'x');
	currentPX = +(currentPX.join(''));

	// find current health percent in player object
	currentPercent = this.health;
	newPercent = this.health - 5;
	// find what px width bar is at 100%
	startBarWidth = (currentPX*100)/currentPercent;
	
	console.log('Your current health is: ' + currentPercent + '%');
	var newHealth = ((startBarWidth*newPercent)/100) + 'px';
	console.log('Your new health is: ' + newPercent + '%');
	if(newPercent <= 0) {
		this.health = newPercent;
		$('#health').css('width', newHealth);
		unicornWorld.gameOver();
	} else {
		this.health = newPercent;
		$('#health').css('width', newHealth);
	}
};

// depletes magic stores as character battles monsters
Player.prototype.depleteMagic = function(){
	// retrieve current width (in pixels) of the magic bar
	var currentPX = $('#magic').css('width');
	currentPX = currentPX.split('');
	currentPX = _.without(currentPX, 'p', 'x');
	currentPX = +(currentPX.join(''));

	// find current magic percent in player object
	currentPercent = this.magic;
	newPercent = this.magic - 5;
	// find what px width bar is at 100%
	startBarWidth = (currentPX*100)/currentPercent;
	
	console.log('Your current magic is: ' + currentPercent + '%');
	var newHealth = ((startBarWidth*newPercent)/100) + 'px';
	console.log('Your new magic is: ' + newPercent + '%');
	if(newPercent <= 0) {
		this.magic = newPercent;
		$('#magic').css('width', newHealth);
		unicornWorld.gameOver();
	} else {
		this.magic = newPercent;
		$('#magic').css('width', newHealth);
	}
};

/////////////////////
// MONSTER METHODS //
/////////////////////
Monster.prototype.create = function(){
	// check to make sure the element doesn't already exist
	if(this.element) return this.element;
	// create image jQuery object and add attributes
	this.element = $('<img src=' + this.img + ' >');
	this.element
	.attr('class', 'monster');
	return this.element
};

Monster.prototype.monsterVitals = function(){
	var monsterName = this.name;
	var monsterType = this.type;
	var vitals = $('<span>'+ monsterName + ' - ' + monsterType +  '</span><div class=\"health\"><span>HEALTH</span><div id=\'monster-health\'></div></div>');
	$('.monster-vitals').html(vitals);
};

//////////////////////////
// BUTTON FUNCTIONALITY //
//////////////////////////

$('#newGame').on('click', function(){
	$('.lightbox').attr('id', '');
});

$('#randomize').on('click', function(e){
	e.preventDefault();
	// $('.createForm').attr('id','hidden');
	// $('.mORf').attr('id', '');
	
	var name = unicornWorld.generateName();
	$('#enterName').val(name);
});

$('#addCharacter').on('click', function(e){
	e.preventDefault();
	var name = $('#enterName').val();
	var newPlayer = new Player(name);

	unicornWorld.addPlayer(newPlayer);
	$('.lightbox').attr('id', 'hidden');
});

/////////////
// TESTING //
/////////////

var unicornWorld = new World();
var player1 = new Player();
var scaryDragon = new Dragon('Demitri');
var superCyclops= new Cyclops('Leonard');
var bigSharknado = new Sharknado('The Bloods');
var sadZombie = new Zombie('Reginald');
var littleVeloci = new Velociraptor('Chuck');

unicornWorld.generateMonsters();

// unicornWorld.addPlayer(player1);
// unicornWorld.addMonster(scaryDragon);
// unicornWorld.addMonster(superCyclops);
// unicornWorld.addMonster(sadZombie);
// unicornWorld.addMonster(littleVeloci);
// unicornWorld.addMonster(bigSharknado);





// });