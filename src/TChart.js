/**
 *
 * TChart.js
 * simple, elegant bar chart library
 * 14-JULY-2020 - version 1.0
 * https://github.com/talhakhalid-tech/TChart.js
 *
 * Copyright 2020 M.Talha Khalid
 * Release under the MIT License
 * https://github.com/talhakhalid-tech/TChart.js/blob/master/LICENSE.md
 *
 * Modified to work with IE11 by Florian Quirin - bytemind.de
 *
 */
"use strict";

function TChart(options) {

    //common
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    var that = this;

    //Canvas Specification came from outside
    this.id = options.targetId;
    this.width = options.width;
    this.height = options.height;
    this.data = options.data;

    //Axis Configurations
    this.axisRatio = 10; //In term of percentage
    this.verticalMargin = (this.height * this.axisRatio) / 100;
    this.horizontalMargin = (this.width * this.axisRatio) / 100;
    this.axisColor = "grey";
    this.axisWidth = 0.75;

    //Label Configurations
    this.fontRatio = 2.5; //In term of percentage
    this.fontFamily = "sans-serif";
    this.fontStyle = "normal";
    this.fontWeight = "300";
    this.fontColor = "darkgrey";
    this.verticalFontSize = (this.height * this.fontRatio) / 100;
    this.horizontalFontSize = (this.width * this.fontRatio) / 100;

    //Guideline Configurations
    this.guidelineColor = "lightgrey";
    this.guidelineWidth = 0.5;

    //Create Canvas
    this.canvas = document.createElement("canvas");
    this.canvas.id = this.id + "-" + Math.random();
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");

    //Append canvas to target container
    document.getElementById(this.id).innerHTML = "";
    document.getElementById(this.id).appendChild(this.canvas);

    //Handle data
    this.labels = [];
    this.values = [];

    this.data.forEach(function(element) {
        that.labels.push(element.label);
        that.values.push(element.value);
    });

    //Global variables
    this.itemsNumber = this.data.length;
    this.maxValue = Math.max.apply(null, this.values);
    this.minValue = Math.min.apply(null, this.values);

    //Axis specifications
    this.verticalAxisWidth = this.height - 2 * this.verticalMargin;
    this.horizontalAxisWidth = this.width - 2 * this.horizontalMargin;

    //label specifications
    this.verticalUpperBound = Math.ceil(this.maxValue / 10) * 10;
    this.verticalLabelFreq = this.verticalUpperBound / this.itemsNumber;
    this.horizontalLabelFreq = this.horizontalAxisWidth / (this.itemsNumber);

    this.drawBarChart = function() {
        //vertical axis
        drawVerticalAxis();

        //vertical labels
        drawVerticalLabels();

        //horizontal axis
        drawHorizontalAxis();

        //horizontal labels
        drawHorizontalLabels();

        //horizontal guidelines
        drawHorizontalGuidelines();

        //bars
        drawBars();
    }

    this.drawLineChart = function() {
        //vertical axis
        drawVerticalAxis();

        //vertical labels
        drawVerticalLabels();

        //horizontal axis
        drawHorizontalAxis();

        //horizontal labels
        drawHorizontalLabels();

        //horizontal guidelines
        drawHorizontalGuidelines();

        //bars
        drawLines();
    }

    function drawVerticalAxis() {
        //vertical axis
        that.context.beginPath();
        that.context.strokeStyle = that.axisColor;
        that.context.lineWidth = that.axisWidth;
        that.context.moveTo(that.horizontalMargin, that.verticalMargin);
        that.context.lineTo(
            that.horizontalMargin,
            that.height - that.verticalMargin
        );
        that.context.stroke();
    }

    function drawVerticalLabels() {
        //text specifications
        let labelFont = that.fontStyle + " " + that.fontWeight + " " + that.verticalFontSize + "px " + that.fontFamily
        that.context.font = labelFont
        that.context.fillStyle = that.fontColor
        that.context.textAlign = "right"

        //scale values
        let scaledVerticalLabelFreq = (that.verticalAxisWidth / that.verticalUpperBound) * that.verticalLabelFreq

        //draw labels
        for (let i = 0; i <= that.itemsNumber; i++) {
            let labelText = Math.ceil(that.verticalUpperBound - i * that.verticalLabelFreq);
            let verticalLabelX = that.horizontalMargin - that.horizontalMargin / that.axisRatio;
            let verticalLabelY = that.verticalMargin + i * scaledVerticalLabelFreq;

            that.context.fillText(labelText, verticalLabelX, verticalLabelY)
        }
    }

    function drawHorizontalAxis() {
        //horizontal axis
        that.context.beginPath();
        that.context.strokeStyle = that.axisColor;
        that.context.lineWidth = that.axisWidth;
        that.context.moveTo(
            that.horizontalMargin,
            that.height - that.verticalMargin
        );
        that.context.lineTo(
            that.width - that.horizontalMargin,
            that.height - that.verticalMargin
        );
        that.context.stroke();
    }

    function drawHorizontalLabels() {
        //text specifications
        let labelFont = that.fontStyle + " " + that.fontWeight + " " + that.verticalFontSize + "px " + that.fontFamily
        that.context.font = labelFont
        that.context.fillStyle = that.fontColor
        that.context.textAlign = "center"
        that.context.textBaseline = "top"

        //draw labels
        for (let i = 0; i < that.itemsNumber; i++) {
            let horizontalLabelX = that.horizontalMargin + i * that.horizontalLabelFreq + that.horizontalLabelFreq / 2;
            let horizontalLabelY = that.height - that.verticalMargin + that.verticalMargin / that.axisRatio;

            that.context.fillText(that.labels[i], horizontalLabelX, horizontalLabelY)
        }
    }

    function drawHorizontalGuidelines() {
        //specifications
        that.context.strokeStyle = that.guidelineColor;
        that.context.lineWidth = that.guidelineWidth;

        //scale values
        let scaledVerticalLabelFreq = (that.verticalAxisWidth / that.verticalUpperBound) * that.verticalLabelFreq;

        //draw labels
        for (let i = 0; i <= that.itemsNumber; i++) {

            //start point coordinates
            let horizontalGuidelineStartX = that.horizontalMargin;
            let horizontalGuidelineStartY = that.verticalMargin + i * scaledVerticalLabelFreq;

            //end point coordinates
            let horizontalGuidelineEndX = that.horizontalMargin + that.horizontalAxisWidth;
            let horizontalGuidelineEndY = that.verticalMargin + i * scaledVerticalLabelFreq;

            that.context.beginPath();
            that.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
            that.context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY);
            that.context.stroke();
        }
    }

    function drawBars() {
        let color = that.createRandomRGBColor();
		
        for (let i = 0; i < that.itemsNumber; i++) {
            let color = that.createRandomRGBColor();
            let fillOpacity = "0.5";
            let fillColor = "rgba(" + color.red + "," + color.green + "," + color.blue + "," + fillOpacity + ")";
            let borderColor = "rgb(" + color.red + "," + color.green + "," + color.blue + ")";

            that.context.beginPath()

            let barX = that.horizontalMargin + i * that.horizontalLabelFreq + that.horizontalLabelFreq / that.axisRatio * 2;
            let barY = that.height - that.verticalMargin;
            let barWidth = that.horizontalLabelFreq - 2 * that.horizontalLabelFreq / that.axisRatio * 2;
            let barHeight = -1 * (that.verticalAxisWidth * that.values[i] / that.verticalUpperBound);

            that.context.fillStyle = fillColor;
            that.context.strokeStyle = borderColor;
            that.context.rect(barX, barY, barWidth, barHeight);
            that.context.fill();
            that.context.stroke();
        }
    }

    this.createRandomRGBColor = function() {
        const red = getRandomInt(0, 257);
        const green = getRandomInt(0, 257);
        const blue = getRandomInt(0, 257);
        return {
            red: red,
            green: green,
            blue: blue
        };
    }

    function drawLines() {
        for (let i = 0; i < that.itemsNumber; i++) {
            that.context.beginPath()

            let barX = that.horizontalMargin + i * that.horizontalLabelFreq + that.horizontalLabelFreq / 2;
            let barY = (that.height - that.verticalMargin) + (-1 * (that.verticalAxisWidth * that.values[i] / that.verticalUpperBound));

            that.context.fillStyle = that.fontColor;
            that.context.arc(barX, barY, that.horizontalLabelFreq / 9, 0, Math.PI * 2);
            that.context.fill();
        }
        that.context.beginPath()
        that.context.moveTo(that.horizontalMargin, that.height - that.verticalMargin)
        that.context.strokeStyle = that.fontColor

        for (let i = 0; i < that.itemsNumber; i++) {
            let barX = that.horizontalMargin + i * that.horizontalLabelFreq + that.horizontalLabelFreq / 2;
            let barY = (that.height - that.verticalMargin) + (-1 * (that.verticalAxisWidth * that.values[i] / that.verticalUpperBound));

            that.context.lineWidth = (that.axisWidth / ((that.itemsNumber - i) * 2)) * 2
            that.context.lineTo(barX, barY)
            that.context.stroke();
        }
    }
}