const snakes = {
   '10' : 3 ,
   '5' : 1 ,
   '7' : 4 ,
   '23' : 16 ,
   '26' : 13 ,
   '20' : 2 ,
  
   
   
}
const ladder = {
   '6' : 22 ,
   '14' : 29 ,
   '12' : 18 
}
const winner  = {
   '30' : 'WINNER'
  

}

function renderBoard(){
    const boardBlocks = [
        [25, 26, 27, 28, 29, 30],
        [24, 23, 22, 21, 20, 19],
        [13, 14, 15, 16, 17, 18],
        [12, 11, 10, 9, 8, 7],
        [1, 2, 3, 4, 5, 6]
    ];
    
       const  boardContent = boardBlocks.map(row => `
        <div class="row"> 
           ${
              row.map(col=> `
              <div data-block="${col}" class="col ${snakes[col] ? 'snake-el' : '' }   ${ladder[col] ? 'ladder-el' :'' } ${winner[col] ? 'winner-el' :'' }"> 
            
              ${col} 
              ${snakes[col] ? '&#128013;' + snakes[col] : '' }
              ${ladder[col] ? '&#128640;'+ ladder[col] : '' }
             
              ${winner[col] ? '&#129395;' + winner[col] : '' }
              </div>
            
             
              `).join('')
    
           }
         </div>`
        ).join('');
     
    
        document.querySelector('#board').innerHTML = boardContent;
          
    
}

function rollDice() {
     // get a random number between 1 to 6
    const diceResult = Math.round(Math.random() * (6 - 1) ) + 1;
    document.querySelector('.dice').innerText = diceResult;

    const currentPosition = getPlayerPosition();
    
    setPlayerPosition(currentPosition + diceResult)
}


function setPlayerPosition(blockNumber){
   //check if the new blockNumber has snake
   const snakeTail = snakes[blockNumber];
   console.log(blockNumber , snakeTail);
   if(snakeTail) {
        //set player position to its tail
       setPlayerPosition(snakeTail);
       return;
     
   }

   const ladderHead = ladder[blockNumber];
   //check if the new blockNumber has ladder
   console.log(blockNumber , ladderHead);
   if(ladderHead) {
       //set player position to its head
       setPlayerPosition(ladderHead);
       return;
   }
   
   //Remove the player class from current player
    const currentPlayerE1 = document.querySelector('.player');
    if(currentPlayerE1){
        currentPlayerE1.classList.remove('player');
    }

   //set new player position
   const newPlayerE1 = document.querySelector(`.col[data-block="${blockNumber}"]`)
   newPlayerE1.classList.add('player');
}

function getPlayerPosition() {
   const currentPlayerE1 = document.querySelector('.player');
   return parseInt(currentPlayerE1.dataset.block);
}


//main
renderBoard();
setPlayerPosition(1);

document.querySelector('#roll-dice').addEventListener('click',rollDice)






