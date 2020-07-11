class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      createCanvas(displayWidth-20,displayHeight-30);
      naruto = createSprite(100,200);
      naruto.addImage("naruto",naruto_Img);
      naruto2 = createSprite(300,200);
      naruto2.addImage("naruto2",naruto2_Img);
      kakashi = createSprite(500,200);
      kakashi.addImage("kakashi",kakashi_Img);
      rasengan = createSprite(700,200);
      rasengan.addImage("rasengan",rasengan_Img);
      sharingan = createSprite(900,200);
      sharingan.addImage("sharingan",sharingan_Img);
    }
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      player.getCarsAtEnd();
      
      if(allPlayers !== undefined){
        background(backgroundImage);
        image(ground_Img,-displayWidth * 4,0,displayWidth * 5,displayHeight);
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 200;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
          cars[index-1].x = x;
          cars[index-1].y = y;
  
          if (index === player.index){
            strokeWeight(10);
        fill("red");
        ellipse(x,y,60,60)
            cars[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
      if(player.distance>38600){
        gameState = 2;
        player.rank+=1;
        Player.updateCarsAtEnd(player.rank);
      }
  
      drawSprites();
    }
    end(){
       console.log("GameEnded");
       console.log(player.rank);
    }
    }
  
