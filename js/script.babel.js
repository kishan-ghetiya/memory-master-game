document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("game");
  gameContainer.style.display = "none";
  
  const loadingScreen = document.createElement("div");
  loadingScreen.setAttribute("class", "loading-screen");
  loadingScreen.innerHTML = `
      <img src="img/logo.png" alt="Game Logo" class="logo">
      <p>Loading...</p>
  `;
  document.body.appendChild(loadingScreen);

  setTimeout(() => {
      loadingScreen.style.display = "none";
      gameContainer.style.display = "block";
  }, 3000);

  const cardsArray = [
      { name: "shell", img: "img/blueshell.png" },
      { name: "star", img: "img/star.png" },
      { name: "bobomb", img: "img/bobomb.png" },
      { name: "mario", img: "img/mario.png" },
      { name: "luigi", img: "img/luigi.png" },
      { name: "peach", img: "img/peach.png" },
      { name: "1up", img: "img/1up.png" },
      { name: "mushroom", img: "img/mushroom.png" },
      { name: "thwomp", img: "img/thwomp.png" },
      { name: "bulletbill", img: "img/bulletbill.png" },
      { name: "coin", img: "img/coin.png" },
      { name: "goomba", img: "img/goomba.png" }
  ];

  let gameGrid, firstGuess, secondGuess, count, previousTarget, score;
  let delay = 1200;
  const scoreBoard = document.createElement("p");
  
  const initializeGame = () => {
      gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
      firstGuess = "";
      secondGuess = "";
      count = 0;
      previousTarget = null;
      score = 0;
      scoreBoard.innerHTML = `Score: ${score}`;
      grid.innerHTML = "";
      
      gameGrid.forEach(item => {
          const { name, img } = item;
          const card = document.createElement("div");
          card.classList.add("card");
          card.dataset.name = name;
  
          const front = document.createElement("div");
          front.classList.add("front");
  
          const back = document.createElement("div");
          back.classList.add("back");
          back.style.backgroundImage = `url(${img})`;
  
          grid.appendChild(card);
          card.appendChild(front);
          card.appendChild(back);
      });
  };

  scoreBoard.setAttribute("class", "score-board");
  scoreBoard.style.cssText = "position: absolute; top: 10px; right: 20px; font-size: 24px; font-weight: bold;";
  gameContainer.appendChild(scoreBoard);

  const grid = document.createElement("section");
  grid.setAttribute("class", "grid");
  gameContainer.appendChild(grid);

  const updateScore = (points) => {
      score = Math.max(0, score + points);
      scoreBoard.innerHTML = `Score: ${score}`;
  };

  const match = () => {
      const selected = document.querySelectorAll(".selected");
      selected.forEach(card => card.classList.add("match"));
      updateScore(10);
      checkGameCompletion();
  };

  const resetGuesses = () => {
      firstGuess = "";
      secondGuess = "";
      count = 0;
      previousTarget = null;
      
      document.querySelectorAll(".selected").forEach(card => card.classList.remove("selected"));
  };

  const checkGameCompletion = () => {
      if (document.querySelectorAll(".match").length === gameGrid.length) {
          setTimeout(() => {
              alert("Finished game!");
              initializeGame();
          }, 500);
      }
  };

  grid.addEventListener("click", event => {
      const clicked = event.target;

      if (clicked.nodeName === "SECTION" || clicked === previousTarget || clicked.parentNode.classList.contains("selected") || clicked.parentNode.classList.contains("match")) {
          return;
      }

      if (count < 2) {
          count++;
          if (count === 1) {
              firstGuess = clicked.parentNode.dataset.name;
              clicked.parentNode.classList.add("selected");
          } else {
              secondGuess = clicked.parentNode.dataset.name;
              clicked.parentNode.classList.add("selected");
          }

          if (firstGuess && secondGuess) {
              if (firstGuess === secondGuess) {
                  setTimeout(match, delay);
              } else {
                  updateScore(-2);
              }
              setTimeout(resetGuesses, delay);
          }
          previousTarget = clicked;
      }
  });

  const resetButton = document.createElement("button");
  resetButton.innerText = "Reset Game";
  resetButton.setAttribute("class", "reset-button");
  resetButton.style.cssText = "display: block; margin: 20px auto; padding: 10px 20px; background-color: grey; color: white; font-size: 18px; font-weight: bold; cursor: pointer; border: none; border-radius: 5px;";
  gameContainer.appendChild(resetButton);
  
  resetButton.addEventListener("mouseover", () => {
      resetButton.style.backgroundColor = "red";
  });

  resetButton.addEventListener("mouseout", () => {
      resetButton.style.backgroundColor = "grey";
  });

  resetButton.addEventListener("click", initializeGame);

  initializeGame();
});
