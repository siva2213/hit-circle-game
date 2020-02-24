
//call generateCircleLayout function to choose, how many rows and number of cicles per row you need?
generateCircleLayout(6, 6);

//Generating circle Layout
function generateCircleLayout(rowCount, colCount) {
  var circleContainer = document.getElementById("circle-container");
  circleContainer.style.textAlign = "center"
  var rowData = {};
  for (let row = 1; row <= rowCount; row++) {
    rowData[row] = document.createElement("div");
    rowData[row].style.display = "flex";
    rowData[row].style.flexDirection = "row";
    rowData[row].style.justifyContent = "center";
    rowData[row].style.width = "100%";
    for (let col = 1; col <= colCount; col++) {
      var colData = document.createElement("div");
      colData.setAttribute("id", `r${row} + ${col}`);
      colData.style.background = "grey";
      colData.style.width = "20px";
      colData.style.height = "20px";
      colData.style.margin = "16px";
      colData.style.cursor = "pointer";
      colData.style.border = "1px solid grey";
      colData.style.borderRadius = "10px";
      rowData[row].appendChild(colData);
      colData.addEventListener("click", this.updateScoreAndCicle);
    }
    circleContainer.appendChild(rowData[row]);
  }
}

//on hitting the circle updating the score and activating random circle 
function updateScoreAndCicle(e) {
  //checking the whether play button is triggered or not
  let isPlay = document.getElementById("playButton").disabled
  if(isPlay) {
    updateScore(e)
    setActiveCircle()
  } else {
    alert("please click on play to start the game!")
  }
}

//Score updation
function updateScore(e) {
  let lastScore = document.getElementById("inputScore").value;
  if (e) {
    if (e.srcElement.style.background === "red") {
      document.getElementById("inputScore").value = +lastScore + 1;
      e.srcElement.style.background = "grey";
    } else {
      resetCircles();
      document.getElementById("inputScore").value = lastScore - 1;
    }
  }
}

//setting random active circle
function setActiveCircle() {
  var circleContainer = document.getElementById("circle-container");
  var randomItem =
    circleContainer.children[
      Math.floor(Math.random() * circleContainer.children.length)
    ];
  var nestedRandom =
    randomItem.children[
      Math.floor(Math.random() * circleContainer.children.length)
    ];
  nestedRandom.style.background = "red";
}

//on handle play button
function onHandlePlay(isStopFlag) {
  let playButton = document.getElementById("playButton");
  playButton.setAttribute("disabled", true);
  document.getElementById("inputScore").value = 0
  if(!isStopFlag) {
    setActiveCircle()
  } else {
    playButton.removeAttribute("disabled");
  }
}

//on handle stop button
function onHandleStop() {
  if(+(document.getElementById("inputScore").value)) {
    alert("Your final score is " + document.getElementById("inputScore").value);
    resetCircles()
    onHandlePlay(stopFlag = true)
  }
}

//resetting the values on handle stop and wrong circle entry.
function resetCircles() {
  var circleContainer = document.getElementById("circle-container");
  let resetCircle = circleContainer.children;
  for (let child of resetCircle) {
    let cols = Object.values(child.children);
    cols.forEach(c => {
      c.style.background = "grey";
    });
  }
}
