let $ = document.querySelector.bind(document);

let mymove = "rock";

function chooseMyMove()
    {
    let r = Math.floor(Math.random()*3);
    if (r==0)
        mymove = "rock";
    else if (r==1)
        mymove = "paper";
    else
        mymove = "scissors";
    }

window.onload = function ()
    {
    chooseMyMove();
    $("#rockbtn").addEventListener("click",function(){play("rock")});
    $("#paperbtn").addEventListener("click",function(){play("paper")});
    $("#scissorsbtn").addEventListener("click",function(){play("scissors")});
    }

function play(playermove)
    {
    let result = `I played ${mymove}. You played ${playermove}. `;
    if (playermove == mymove)
        result += "It's a tie.";
    else if ((mymove == "rock" && playermove == "paper") ||
             (mymove == "paper" && playermove == "scissors") ||
             (mymove == "scissors" && playermove == "rock"))
        result += "You win.";
    else
        result += "I win.";
    $("#result").innerHTML = result;
    chooseMyMove();
    }

