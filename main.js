// $(document).on('ready', function() {
 
var unicorn = './images/8_bit_unicorn.png';
var monster1 = 'http://www.placekitten.com/50/50'
var monster2 = 'http://www.placekitten.com/60/60'
var monster3 = 'http://www.placekitten.com/40/40'
var monster4 = 'http://www.placekitten.com/55/55'
var monster5 = 'http://www.placekitten.com/65/65'

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
	this.image = './images/8_bit_unicorn.png';
	this.inventory = [];
	this.health = 100;
	this.magic = 100;
};

var Monster = function(name, type){
	this.name = name || 'Evil Monkey';
	this.type = type || 'evil monkey';
	this.health = 100;
};

// Dragon is a type of Monster
var Dragon = function(name){
	Monster.call(name, 'dragon');
	this.dmgCaused = 10;
	this.img = 'http://www.placekitten.com/50/50';
};
Dragon.prototype = new Monster();
Dragon.prototype.constructor = Dragon;


///////////////////
// WORLD METHODS //
///////////////////

World.prototype.addPlayer = function(player){
	this.players.push(player);
	console.log(player.name + ' has been added!');
	player.create();
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
	this.element = $('<img>');
	this.element
	.attr('src', this.image)
	.attr('class', 'current-player')
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
	this.element = $('<img>');
	this.element
	.attr('src', this.image)
	.attr('class', 'monster')
	console.log(this.name + ' has been created!');
	return this.element
};

Monster.prototype.monsterVitals = function(){
	monsterName = this.name;
	$('.monster-vitals').first('span').text(this.name);
};

/////////////
// TESTING //
/////////////

var unicornWorld = new World();
var player1 = new Player();
var superBad = new Dragon('SuperBad');
unicornWorld.addPlayer(player1);
console.log(superBad.img);



// });