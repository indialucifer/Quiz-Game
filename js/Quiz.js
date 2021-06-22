class Quiz {
  constructor(){}

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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){

    background("yellow");

    Contestant.getPlayerInfo();

    if (allContestants !== undefined){

      var displayPosition = 300;

      fill("blue");
      textSize(20);
      text("*Note: The contestant who answered correctly is highlited in green colour.",130,230);

      for (var plr in allContestants){
        var answer = "2";
        displayPosition += 20;
        if(answer === allContestants[plr].answer){
          fill("green");
        }
        else{
          fill("red");
        }
        text(allContestants[plr].name + " : " + allContestants[plr].answer,290,displayPosition);
      } 
    }   
  }

}
