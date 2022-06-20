const linesElements = document.querySelectorAll(".lines");
const board = document.querySelector(".board");
let messageDialog = document.querySelector(".message p");

let turn;
let message;
let cont = 0;

const wCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

window.onload = () =>{
    startGame();
}

const startGame = () =>{
    cont = 0;
    turn = true;
    for(const line of linesElements){
        line.addEventListener("click",handleClick,{once: true});
    }
};
const placeMark = (line) =>{
    if(turn){
        line.classList.add("x");
        turn = false;
    }else{
        line.classList.add("circle");
        turn = true;
    }
};
const checkWin = (currentPlayer) => {
    return wCombinations.some((combination) =>{
        return combination.every((index) =>{
            return linesElements[index].classList.contains(currentPlayer);
        });
    });
};
const messageEndGame = (win,turn,cont) =>{
    if(cont >= 5 && cont < 9){
        if(win && turn){
            messageDialog.textContent = "Vencedor é o Circulo";
            messageDialog.parentElement.style.display = "block";
        }else{
            if(win){
            messageDialog.textContent = "Vencedor é o X";
            messageDialog.parentElement.style.display = "block";
            }
        }
     }else{
         if(cont == 9){
            messageDialog.textContent = "Empate";
            messageDialog.parentElement.style.display = "block";
         } 
    }
};
const handleClick = (e) => {
    cont++;
    const line = e.target;
    placeMark(line);
    const classToAdd = turn ? "circle" : "x";
    let win =  checkWin(classToAdd);
    messageEndGame(win,turn,cont);
};
const newGame = () => {
    for(const line of linesElements){
        line.classList.remove("circle","x");
    }
    messageDialog.parentElement.style.display = "none";
    startGame();
}