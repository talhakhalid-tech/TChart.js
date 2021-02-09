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

  let targetId1 = "lineChart";
  let canvas1Width = 1000;
  let canvas1Height = 750;

  let targetId2 = "barChart";
  let canvas2Width = 1000;
  let canvas2Height = 750;

  let chart1 = new TChart(targetId1, canvas1Width, canvas1Height, data);
  chart1.drawLineChart({ animation: true });

  let chart2 = new TChart(targetId2, canvas2Width, canvas2Height, data);
  chart2.drawBarChart({ animation: true });
};
