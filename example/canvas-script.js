
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

window.onload = function () {


  let min = 1;
  let max = 200;

  let data = [
    { label: "Jan", value: getRandomInt(min, max) },
    { label: "Feb", value: getRandomInt(min, max) },
    { label: "March", value: getRandomInt(min, max) },
    { label: "April", value: getRandomInt(min, max) },
    { label: "May", value: getRandomInt(min, max) },
    { label: "June", value: getRandomInt(min, max) },
    { label: "July", value: getRandomInt(min, max) },
    { label: "Aug", value: getRandomInt(min, max) },
    { label: "Sep", value: getRandomInt(min, max) },
  ];

  let targetId = "chart";
  let canvasWidth = 900;
  let canvasHeight = 600;

  let chart = new TChart(targetId, canvasWidth, canvasHeight, data);
  chart.drawChart()


}
