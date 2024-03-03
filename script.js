let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = false; //playerX, playerO
let count = 0;
const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const resetGame = () => {
    turnO = false;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.style.color = "white";
    msg.innerText = "";
};

const disableBoxes = () => {
    for(box of boxes){
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("Ocolor");
        box.classList.remove("Xcolor");
    }
};

const showWinner = (winner) => {
    if(winner === "X"){
        msg.style.color = "red";
        msg.innerText = `Congratulations! The Winner is Player: ${winner}`;
    }
    else if(winner === "O"){
        msg.style.color = "blue";
        msg.innerText = `Congratulations! The Winner is Player: ${winner}`;
    }
    msgContainer.classList.remove("hide"); 
    disableBoxes();
};

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                setTimeout(() => {showWinner(pos1Val)}, 500);
                return true;
            }
        }        
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            box.classList.add("Ocolor");
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.classList.add("Xcolor");
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            setTimeout(() => {gameDraw()}, 500);
        }
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
