// Element Selector
const dice1 = document.getElementById("dice-1");
const dice2 = document.getElementById("dice-2");
const rollButton = document.getElementById("rollButton");
// const totalElement = document.getElementById("total");
const historyContainer = document.getElementById("hiscon");
var totalValue;
// Execute Dice Roll
const rollDice = (dice1Val, dice2Val) => {

  if(totalValue)
  {
    getNormal(totalValue)
  }
    // Animate Dices to Roll
    if (!dice1.classList.contains("rolling")) dice1.classList.add("rolling");
    if (!dice2.classList.contains("rolling")) dice2.classList.add("rolling");
  
    setTimeout(() => {
      // Set dices to values after a certain duration of rolling
      dice1.dataset.face = dice1Val;
      dice2.dataset.face = dice2Val;
  
      // Remove rolling animation
      if (dice1.classList.contains("rolling")) dice1.classList.remove("rolling");
      if (dice2.classList.contains("rolling")) dice2.classList.remove("rolling");
  
      // Calculate and display the total value with color coding
       totalValue = dice1Val + dice2Val;
    //   totalElement.innerHTML = "Your roll is " + totalValue;
  
    //   // Apply color coding based on the specified ranges
    //   if (totalValue >= 1 && totalValue <= 6) {
    //     totalElement.style.color = "red";
    //   } else if (totalValue >= 8 && totalValue <= 12) {
    //     totalElement.style.color = "green";
    //   } else {
    //     totalElement.style.color = "blue";
    //   }
  
      // Add the total value to the history container with color coding
    //   addToHistory(totalValue);

    checkGuess(totalValue);

    const history = document.createElement('div');
    history.innerText = totalValue;
    history.classList.add('container')
    history.classList.add('border')
    history.classList.add('border-light')
    history.classList.add('text-light')
    history.classList.add('text-center')
    history.classList.add('mx-2')
    history.classList.add('px-3')
    history.style.borderRadius = "15px"
    history.style.margin = "13px 0px 0px 0px"
    historyContainer.prepend(history);
    }
    , 3000
    
    );
  };
  
  // Trigger Dices to Roll when clicking at different sections of the rollButton
  rollButton.addEventListener("click", function (e) {
    const buttonRect = rollButton.getBoundingClientRect();
    const clickX = e.clientX - buttonRect.left;
  
    if (clickX < buttonRect.width / 3) {
      // Left section: Get random numbers between 2 and 6
      const dice1Val = Math.floor(Math.random() * 3) + 1;
      const dice2Val = Math.floor(Math.random() * 3) + 1;
  
      
      // const dice1Val =  2;
      // const dice2Val = 2;
  
      e.preventDefault();

      rollDice(dice1Val, dice2Val);
    } else if (clickX < (2 * buttonRect.width) / 3) {
      // Center section: Fixed values for a total of seven
      const dice1Val = Math.floor(Math.random() * 6) + 1;
      const dice2Val = 7 - dice1Val;
      e.preventDefault();
      rollDice(dice1Val, dice2Val);
    } else {
      // Right section: Get random numbers between 8 and 12
      const dice1Val = Math.floor(Math.random() * 3) + 4;
      const dice2Val = Math.floor(Math.random() * 3) + 4;
  
      
      // const dice1Val = 5;
      // const dice2Val = 5;
  
      e.preventDefault();
      rollDice(dice1Val, dice2Val);
    }
  });

// Trigger Dices to Roll
// rollButton.addEventListener("click", function (e) {
//   e.preventDefault();
//   rollDice();
// });

let balance = 500;
let bettingAmounts = {
  1: 0,
  2: 0,
  3: 0,
};
// let bettingdone = {
//     1: false,
//     2: false,
//     3: false,
// };
let selectedGuess = 0;

function addMoney(amount) {
  if (selectedGuess !== 0) {
    if (balance >= amount) {
      balance -= amount;
      bettingAmounts[selectedGuess] += amount;
      updateDisplay();
    } else {
      alert("Insufficient balance!");
    }
  } else {
    alert("Please select a guess section first.");
  }
}

function makeGuess(guess) {
  selectedGuess = guess;
  updateDisplay();
}

// function checkGuess(totalValue) {
//     if (
//         (selectedGuess == 1 && totalValue <= 6) ||
//         (selectedGuess == 2 && totalValue === 7) ||
//         (selectedGuess == 3 && totalValue >= 8)
//     ) {
//         // Guess is correct
//         balance += bettingAmounts[selectedGuess] * 2;
//         bettingAmounts[selectedGuess] *= 2;
//         updateDisplay();
//         if (selectedGuess ==  1)
//         alert(`Congratulations! Your guess 1-6 is correct. You won $${bettingAmounts[selectedGuess] * 2}`);
//         else if (selectedGuess ==  2)
//         alert(`Congratulations! Your guess 7 is correct. You won $${bettingAmounts[selectedGuess] * 2}`);
//         else if (selectedGuess ==  3)
//         alert(`Congratulations! Your guess 8-12 is correct. You won $${bettingAmounts[selectedGuess] * 2}`);
//     } else {
//         // Guess is incorrect
//         bettingAmounts[selectedGuess] = 0;
//         updateDisplay();
//         if (selectedGuess ==  1)
//         alert(`Oops! Your guess 1-6 is incorrect. You lost $${bettingAmounts[selectedGuess]}`);
//         else if (selectedGuess ==  2)
//         alert(`Oops! Your guess 7 is incorrect. You lost $${bettingAmounts[selectedGuess]}`);
//         else if (selectedGuess ==  3)
//         alert(`Oops! Your guess 8-12 is incorrect. You lost $${bettingAmounts[selectedGuess]}`);
//     }
// }

function checkGuess(totalValue) {
  if (totalValue <= 6) {
    bettingAmounts[1] *= 2;
    bettingAmounts[2] = 0;
    bettingAmounts[3] = 0;
    // if (selectedGuess == 1) {
    //   balance += bettingAmounts[1];
    // }
    updateDisplay();
    let list = document.getElementById("1-6-outer");
    list.classList.remove("bg-transparent");
    list.classList.add("bg-light");

    let list2 = document.getElementById("1-6");
    list2.classList.remove("text-light");
    list2.classList.add("text-primary");

    const win = document.createElement("div");
    win.innerText = "Winner";
    win.classList.add("text-primary");
    win.classList.add("fs-1");
    win.classList.add("bg-transparent");
    win.style.margin = "20px 0px 0px 110px";
    document.getElementById("1-6-win").appendChild(win);
  } else if (totalValue == 7) {
    bettingAmounts[1] = 0;
    bettingAmounts[2] *= 3;
    bettingAmounts[3] = 0;
    // if (selectedGuess == 2) {
    //   balance += bettingAmounts[2];
    // }
    updateDisplay();
    let list = document.getElementById("777-outer");
    list.classList.remove("bg-transparent");
    list.classList.add("bg-light");

    let list2 = document.getElementById("777");
    list2.classList.remove("text-light");
    list2.classList.add("text-primary");

    const win = document.createElement("div");
    win.innerText = "Winner";
    win.classList.add("text-primary");
    win.classList.add("fs-2");
    win.classList.add("bg-transparent");
    win.style.margin = "0px 0px 0px 120px";
    document.getElementById("777-win").prepend(win);
  } else if (totalValue >= 8) {
    bettingAmounts[1] = 0;
    bettingAmounts[2] = 0;
    bettingAmounts[3] *= 2;
    // if (selectedGuess == 3) {
    //   balance += bettingAmounts[3];
    // }
    updateDisplay();
    let list = document.getElementById("8-12-outer");
    list.classList.remove("bg-transparent");
    list.classList.add("bg-light");

    let list2 = document.getElementById("8-12");
    list2.classList.remove("text-light");
    list2.classList.add("text-primary");

    const win = document.createElement("div");
    win.innerText = "Winner";
    win.classList.add("text-primary");
    win.classList.add("fs-1");
    win.classList.add("bg-transparent");
    win.style.margin = "20px 0px 0px 110px";
    document.getElementById("8-12-win").appendChild(win);
  }
}

function rollDice2(totalValue) {
  // const dice1 = Math.floor(Math.random() * 6) + 1;
  // const dice2 = Math.floor(Math.random() * 6) + 1;
  // const totalValue = dice1 + dice2;

  checkGuess(totalValue);

  // Display total value and update history
  // document.getElementById("totalValue").textContent = totalValue;
  // document.getElementById("history").textContent += totalValue + ' ';
}

function updateDisplay() {
  document.getElementById("balanceAmount").textContent = balance;
  document.getElementById(
    "bettingAmount1"
  ).textContent = `₹${bettingAmounts[1]}`;
  document.getElementById(
    "bettingAmount2"
  ).textContent = `₹${bettingAmounts[2]}`;
  document.getElementById(
    "bettingAmount3"
  ).textContent = `₹${bettingAmounts[3]}`;

  // Remove the 'selected' class from all buttons
  const buttons = document.querySelectorAll(".guess-button");
  buttons.forEach((button) => button.classList.remove("selected"));

  // Add the 'selected' class to the currently selected button
  if (selectedGuess !== 0) {
    const selectedButton = document.getElementById(`button${selectedGuess}`);
    if (selectedButton) {
      selectedButton.classList.add("selected");
    }
  }
}

function getNormal(totalValue)
{
  if(totalValue <= 6)
  {
    let list = document.getElementById("1-6-outer");
    list.classList.add("bg-transparent");
    list.classList.remove("bg-light");

    let list2 = document.getElementById("1-6");
    list2.classList.add("text-light");
    list2.classList.remove("text-primary");

    const win = document.getElementById("1-6-win")
    win.removeChild(win.lastElementChild);
  }
  else if(totalValue == 7)
  {
    let list = document.getElementById("777-outer");
    list.classList.add("bg-transparent");
    list.classList.remove("bg-light");

    let list2 = document.getElementById("777");
    list2.classList.add("text-light");
    list2.classList.remove("text-primary");

    const win = document.getElementById("777-win")
    win.removeChild(win.lastElementChild.previousElementSibling);
  }
  else if (totalValue >= 8){
    let list = document.getElementById("8-12-outer");
    list.classList.add("bg-transparent");
    list.classList.remove("bg-light");

    let list2 = document.getElementById("8-12");
    list2.classList.add("text-light");
    list2.classList.remove("text-primary");

    const win = document.getElementById("8-12-win")
    win.removeChild(win.lastElementChild);
  }
}
