//Load Event (Event Listener)
window.addEventListener('load', function()
{

//Constants
var GAME_WIDTH =1024;
var GAME_HEIGHT = 360;

//Keep the game running
var gameLive = true;

//Game Level

var level = 1;

//Enemies 

var enemies=[
{
	x:100,  	//x coordinate
	y:100,  	//y coordinate
	speedY:2,	// speed in y axis
	w:40,		// width
	h:40		// height
},


{
	x:200,
	y:100,
	speedY:3,
	w:40,
	h:40
},

{
	x:300,
	y:100,
	speedY:4,
	w:40,
	h:40
},

{
	x:400,
	y:100,
	speedY:5,
	w:40,
	h:40
},

{
	x:500,
	y:100,
	speedY:3,
	w:40,
	h:40
},

{
	x:600,
	y:100,
	speedY:5,
	w:40,
	h:40
}
];

//Player Object
var player =
{
	x: 10,
	y: 155,
	speedX: 3,
	w: 40,
	h: 40,
	isMoving: false
}


//Goal Object

var goal = 
{
	x:700,
	y:0,
	w:40,
	h:360

}

//Make the player move

var movePlayer = function()
{
	player.isMoving = true;
};

//Make the player stop
var stopPlayer = function()
{
	player.isMoving = false;
};
//Grab the canvas and context
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
//Event Listeners To Move Player
canvas.addEventListener("mousedown", movePlayer);
canvas.addEventListener("mouseup", stopPlayer);
canvas.addEventListener("touchstart", movePlayer);
canvas.addEventListener("touchend", stopPlayer);

//Update Logic
var update = function()
{	

	//Check If You Won
  
   if(checkCollision(player, goal))
   {
   	

			level++;
            alert("You Have Won! Press Ok To Continue To Level "+ level);

			player.x = 10;
			player.y = 160;

			enemies.forEach(function(element,index)
			{
				if (element.speedY > 0) 
				{
					element.speedY++;
				}
				else
				{
					element.speedY--;
				}
			})
   }

//Update Player

	if(player.isMoving)
	{
		player.x = player.x + player.speedX
	}


	//Update Enemies
	var i = 0;
	var n = enemies.length;
	
	//Update the position of each enemy

	enemies.forEach(function(element, index)
	{	
	
	//Check for collision

		if(checkCollision(player, element))
		{

			//Stop Game
			gameLive = false;

			alert("Game Over");

	//Reload the page (window.location = empty string)

			window.location = "" 
		}


	//Move Player

	element.y = element.y + element.speedY;

		
	//Check Border (Bounce Effect)

	if(element.y<=10)
		{
			element.y=10;
			element.speedY=element.speedY * -1;
		}

	else if(element.y>=GAME_HEIGHT-50)
		{
			element.y=GAME_HEIGHT-50;
			element.speedY=element.speedY * -1;
		}

	})

}

//Show the game on screen

var draw = function()
{
	//Clear the canvas
	ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
	
	//Draw Player

	ctx.fillStyle="rgb(0,200,0)";
	ctx.fillRect(player.x, player.y, player.w, player.h);



	//Draw each enemy
	ctx.fillStyle = "rgb(200,0,0)";
	enemies.forEach(function(element, index)
	{
		ctx.fillRect(element.x, element.y, element.w, element.h);
	});


//Draw Goal
	ctx.fillStyle="rgb(0,1,255)";
	ctx.fillRect(goal.x, goal.y, goal.w, goal.h);


}


//Gets Executed Many Times Per Second

var step = function()
{
	update();
	draw();

	if(gameLive)
	{
		window.requestAnimationFrame(step);
	}
	
};

//Check collision

var checkCollision = function (rect1, rect2)
{
	var closeOnWidth = Math.abs(rect1.x - rect2.x)<=Math.max(rect1.w,rect2.w);
	var closeOnHeight = Math.abs(rect1.y - rect2.y)<=Math.max(rect1.h,rect2.h);

	return closeOnHeight && closeOnWidth;
}	


//Initial Kick

step();
})




