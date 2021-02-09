/**
 *
 * TChart.js
 * simple, elegant bar chart library
 * 9-February-2021 - version 1.1
 * https://github.com/talhakhalid-tech/TChart.js
 *
 * Copyright 2021 M.Talha Khalid
 * Release under the MIT License
 * https://github.com/talhakhalid-tech/TChart.js/blob/master/LICENSE.md
 *
 */

"use strict";

class TChart {
  constructor(targetId, width, height, data) {
    //Canvas Specification came from outside
    this.id = targetId;
    this.width = width;
    this.height = height;
    this.data = data;

    //Axis Configurations
    this.axisRatio = 10; //In term of percentage
    this.verticalMargin = (this.height * this.axisRatio) / 100;
    this.horizontalMargin = (this.width * this.axisRatio) / 100;
    this.axisColor = "grey";
    this.axisWidth = 0.75;

    //Label Configurations
    this.fontRatio = 2.5; //In term of percentage
    this.fontFamily = "times";
    this.fontStyle = "normal";
    this.fontWeight = "300";
    this.fontColor = "darkgrey";
    this.verticalFontSize = (this.height * this.fontRatio) / 100;
    this.horizontalFontSize = (this.width * this.fontRatio) / 100;

    //Guideline Configurations
    this.guidelineColor = "lightgrey";
    this.guidelineWidth = 0.5;

    //Create Canvas
    let canvas = document.createElement("canvas");
    canvas.id = this.id + "-" + Math.random();
    canvas.width = this.width;
    canvas.height = this.height;

    //Append canvas to target container
    document.getElementById(this.id).innerHTML = "";
    document.getElementById(this.id).appendChild(canvas);

    //Add canvas to chart object
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    //Handle data
    this.labels = [];
    this.values = [];

    this.data.forEach((element) => {
      this.labels.push(element.label);
      this.values.push(element.value);
    });

    //Global variables
    this.itemsNumber = this.data.length;
    this.maxValue = Math.max.apply(null, this.values);
    this.minValue = Math.min.apply(null, this.values);

    this.date = new Date();

    //Axis specifications
    this.verticalAxisWidth = this.height - 2 * this.verticalMargin;
    this.horizontalAxisWidth = this.width - 2 * this.horizontalMargin;

    //label specifications
    this.verticalUpperBound = Math.ceil(this.maxValue / 10) * 10;
    this.verticalLabelFreq = this.verticalUpperBound / this.itemsNumber;
    this.horizontalLabelFreq = this.horizontalAxisWidth / this.itemsNumber;

    //line chart configurations
    this.lineXLine = null;
    this.lineYLine = null;
    this.lineXArc = null;
    this.lineYArc = null;
    this.linePoints = [];
    this.lineCurrentPoint = {};
    this.linePointCount = 0;

    //bar chart configurations
    this.barsConfigurations = [];
    this.current;
  }

  drawBarChart(options = {}) {
    let { animation = false } = options;

    //vertical axis
    this.drawVerticalAxis();

    //vertical labels
    this.drawVerticalLabels();

    //horizontal axis
    this.drawHorizontalAxis();

    //horizontal labels
    this.drawHorizontalLabels();

    //horizontal guidelines
    this.drawHorizontalGuidelines();

    this.gettingBarsConfiguration();

    //bars
    if (animation) this.barAnimation();
    else this.drawBars();
  }

  drawLineChart(options = {}) {
    let { animation = false } = options;

    this.drawVerticalAxis();

    //vertical labels
    this.drawVerticalLabels();

    //horizontal axis
    this.drawHorizontalAxis();

    //horizontal labels
    this.drawHorizontalLabels();

    //horizontal guidelines
    this.drawHorizontalGuidelines();

    //getting line points
    this.gettingLinePoints();

    //lines
    if (animation) this.lineAnimation();
    else this.drawLines();
  }

  drawVerticalAxis() {
    //vertical axis
    this.context.beginPath();
    this.context.strokeStyle = this.axisColor;
    this.context.lineWidth = this.axisWidth;
    this.context.moveTo(this.horizontalMargin, this.verticalMargin);
    this.context.lineTo(
      this.horizontalMargin,
      this.height - this.verticalMargin
    );
    this.context.stroke();
  }

  drawVerticalLabels() {
    //text specifications
    let labelFont =
      this.fontStyle +
      " " +
      this.fontWeight +
      " " +
      this.verticalFontSize +
      "px " +
      this.fontFamily;
    this.context.font = labelFont;
    this.context.fillStyle = this.fontColor;
    this.context.textAlign = "right";

    //scale values
    let scaledVerticalLabelFreq =
      (this.verticalAxisWidth / this.verticalUpperBound) *
      this.verticalLabelFreq;

    //draw labels
    for (let i = 0; i <= this.itemsNumber; i++) {
      let labelText = Math.ceil(
        this.verticalUpperBound - i * this.verticalLabelFreq
      );
      let verticalLabelX =
        this.horizontalMargin - this.horizontalMargin / this.axisRatio;
      let verticalLabelY = this.verticalMargin + i * scaledVerticalLabelFreq;

      this.context.fillText(labelText, verticalLabelX, verticalLabelY);
    }
  }

  drawHorizontalAxis() {
    //horizontal axis
    this.context.beginPath();
    this.context.strokeStyle = this.axisColor;
    this.context.lineWidth = this.axisWidth;
    this.context.moveTo(
      this.horizontalMargin,
      this.height - this.verticalMargin
    );
    this.context.lineTo(
      this.width - this.horizontalMargin,
      this.height - this.verticalMargin
    );
    this.context.stroke();
  }

  drawHorizontalLabels() {
    //text specifications
    let labelFont =
      this.fontStyle +
      " " +
      this.fontWeight +
      " " +
      this.verticalFontSize +
      "px " +
      this.fontFamily;
    this.context.font = labelFont;
    this.context.fillStyle = this.fontColor;
    this.context.textAlign = "center";
    this.context.textBaseline = "top";

    //draw labels
    for (let i = 0; i < this.itemsNumber; i++) {
      let horizontalLabelX =
        this.horizontalMargin +
        i * this.horizontalLabelFreq +
        this.horizontalLabelFreq / 2;
      let horizontalLabelY =
        this.height -
        this.verticalMargin +
        this.verticalMargin / this.axisRatio;

      this.context.fillText(this.labels[i], horizontalLabelX, horizontalLabelY);
    }
  }

  drawHorizontalGuidelines() {
    //specifications
    this.context.strokeStyle = this.guidelineColor;
    this.context.lineWidth = this.guidelineWidth;

    //scale values
    let scaledVerticalLabelFreq =
      (this.verticalAxisWidth / this.verticalUpperBound) *
      this.verticalLabelFreq;

    //draw labels
    for (let i = 0; i <= this.itemsNumber; i++) {
      //start point coordinates
      let horizontalGuidelineStartX = this.horizontalMargin;
      let horizontalGuidelineStartY =
        this.verticalMargin + i * scaledVerticalLabelFreq;

      //end point coordinates
      let horizontalGuidelineEndX =
        this.horizontalMargin + this.horizontalAxisWidth;
      let horizontalGuidelineEndY =
        this.verticalMargin + i * scaledVerticalLabelFreq;

      this.context.beginPath();
      this.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
      this.context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY);
      this.context.stroke();
    }
  }

  gettingBarsConfiguration() {
    for (let i = 0; i < this.itemsNumber; i++) {
      let xAxis =
        this.horizontalMargin +
        i * this.horizontalLabelFreq +
        (this.horizontalLabelFreq / this.axisRatio) * 2;
      let yAxis = this.height - this.verticalMargin;
      let barWidth =
        this.horizontalLabelFreq -
        ((2 * this.horizontalLabelFreq) / this.axisRatio) * 2;
      let barHeight =
        -1 *
        ((this.verticalAxisWidth * this.values[i]) / this.verticalUpperBound);
      let heightVelocity = barHeight / 1000;

      let color = this.createRandomRGBColor();
      let fillOpacity = "0.5";
      let fillColor =
        "rgba(" +
        color.red +
        "," +
        color.green +
        "," +
        color.blue +
        "," +
        fillOpacity +
        ")";
      let borderColor =
        "rgb(" + color.red + "," + color.green + "," + color.blue + ")";
      this.barsConfigurations.push({
        xAxis,
        yAxis,
        barWidth,
        barHeight,
        heightVelocity,
        currentHeight: 0,
        fillColor,
        borderColor,
      });
    }
  }

  barAnimation() {
    for (let i = 0; i < this.itemsNumber; i++) {
      if (
        this.barsConfigurations[i].currentHeight >
        this.barsConfigurations[i].barHeight
      ) {
        for (let i = 0; i < this.itemsNumber; i++) {
          this.barsConfigurations[i].currentHeight += this.barsConfigurations[
            i
          ].heightVelocity;
        }
        this.context.clearRect(
          this.barsConfigurations[i].xAxis,
          this.barsConfigurations[i].yAxis,
          this.barsConfigurations[i].barWidth,
          this.barsConfigurations[i].currentHeight
        );
        this.context.beginPath();
        this.context.fillStyle = this.barsConfigurations[i].fillColor;
        this.context.strokeStyle = this.barsConfigurations[i].borderColor;
        this.context.rect(
          this.barsConfigurations[i].xAxis,
          this.barsConfigurations[i].yAxis,
          this.barsConfigurations[i].barWidth,
          this.barsConfigurations[i].currentHeight
        );
        this.context.fill();
        this.context.stroke();
      } else {
        return;
      }
    }
    window.requestAnimationFrame(this.barAnimation.bind(this));
  }

  drawBars() {
    for (let i = 0; i < this.itemsNumber; i++) {
      this.context.beginPath();

      this.context.fillStyle = this.barsConfigurations[i].fillColor;
      this.context.strokeStyle = this.barsConfigurations[i].borderColor;
      this.context.rect(
        this.barsConfigurations[i].xAxis,
        this.barsConfigurations[i].yAxis,
        this.barsConfigurations[i].barWidth,
        this.barsConfigurations[i].barHeight
      );
      this.context.fill();
      this.context.stroke();
    }
  }

  createRandomRGBColor() {
    const red = getRandomInt(0, 257);
    const green = getRandomInt(0, 257);
    const blue = getRandomInt(0, 257);
    return { red, green, blue };
  }

  gettingLinePoints() {
    this.context.strokeStyle = this.fontColor;
    this.lineCurrentPoint.xAxis = this.horizontalMargin;
    this.lineCurrentPoint.yAxis = this.height - this.verticalMargin;

    for (let i = 0; i < this.itemsNumber; i++) {
      this.lineXArc =
        this.horizontalMargin +
        i * this.horizontalLabelFreq +
        this.horizontalLabelFreq / 2;
      this.lineYArc =
        this.height -
        this.verticalMargin +
        -1 *
          ((this.verticalAxisWidth * this.values[i]) / this.verticalUpperBound);

      this.linePoints.push({
        xAxis: this.lineXArc,
        yAxis: this.lineYArc,
        xVelocity: (this.lineXArc - this.lineCurrentPoint.xAxis) / 50,
        yVelocity: (this.lineYArc - this.lineCurrentPoint.yAxis) / 50,
      });

      this.lineCurrentPoint.xAxis = this.lineXArc;
      this.lineCurrentPoint.yAxis = this.lineYArc;
    }

    this.lineCurrentPoint.xAxis = this.horizontalMargin;
    this.lineCurrentPoint.yAxis = this.height - this.verticalMargin;

    this.context.moveTo(
      this.lineCurrentPoint.xAxis,
      this.lineCurrentPoint.yAxis
    );

    this.context.lineWidth = this.axisWidth * 2;
    this.context.fillStyle = this.fontColor;
  }

  lineAnimation() {
    this.lineCurrentPoint.xAxis += this.linePoints[
      this.linePointCount
    ].xVelocity;
    if (
      (Math.round(this.lineCurrentPoint.yAxis * 1000) / 1000 <=
        Math.round(this.linePoints[this.linePointCount].yAxis * 1000) / 1000 &&
        this.linePoints[this.linePointCount].yVelocity < 0) ||
      (Math.round(this.lineCurrentPoint.yAxis * 1000) / 1000 >=
        Math.round(this.linePoints[this.linePointCount].yAxis * 1000) / 1000 &&
        this.linePoints[this.linePointCount].yVelocity > 0)
    ) {
      this.context.beginPath();
      this.context.arc(
        this.linePoints[this.linePointCount].xAxis,
        this.linePoints[this.linePointCount].yAxis,
        this.horizontalLabelFreq / 10,
        0,
        Math.PI * 2
      );
      this.context.fill();
      this.context.moveTo(
        this.linePoints[this.linePointCount].xAxis,
        this.linePoints[this.linePointCount].yAxis
      );
      this.linePointCount++;
    }

    if (this.linePointCount === this.itemsNumber) {
      return;
    }

    this.lineCurrentPoint.yAxis += this.linePoints[
      this.linePointCount
    ].yVelocity;

    this.context.lineTo(
      this.lineCurrentPoint.xAxis,
      this.lineCurrentPoint.yAxis
    );
    this.context.stroke();
    window.requestAnimationFrame(this.lineAnimation.bind(this));
  }

  drawLines() {
    for (let i = 0; i < this.itemsNumber; i++) {
      this.context.lineTo(this.linePoints[i].xAxis, this.linePoints[i].yAxis);

      this.context.stroke();
      this.context.beginPath();

      this.context.arc(
        this.linePoints[i].xAxis,
        this.linePoints[i].yAxis,
        this.horizontalLabelFreq / 10,
        0,
        Math.PI * 2
      );

      this.context.fill();
      this.context.moveTo(this.linePoints[i].xAxis, this.linePoints[i].yAxis);
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
