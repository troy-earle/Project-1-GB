var trailList = JSON.parse(localStorage.getItem("trailList")) || [];
console.log(trailList);

var arryLength = trailList.length;

var trailNumber = trailList[arryLength-1];

console.log(trailNumber);

var trailName = document.getElementById("trail-name");
trailName.textContent = trailList[trailNumber - 1].name;

var trailLength = document.getElementById("length");
trailLength.textContent = trailList[trailNumber-1].distance;

var trailTerrain = document.getElementById("terrain");
trailTerrain.textContent = trailList[trailNumber - 1].terrain;

var trailMode = document.getElementById("mode");
trailMode.textContent = trailList[trailNumber - 1].mode;

var trailDescription = document.getElementById("description");
trailDescription.textContent = trailList[trailNumber - 1].description;
