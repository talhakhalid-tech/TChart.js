/**
 *
 * TChart.js
 * Lightweight, elegant bar chart library
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

var TChart = function(options) {
	
	var that = this;
	
	//options
	var drawLabels = (options.drawLabels != undefined)? options.drawLabels : true;
	var drawGuidelines = (options.drawGuidelines != undefined)? options.drawGuidelines : true;
	var drawAxisX = (options.drawAxisX != undefined)? options.drawAxisX : true;
	var drawAxisY = (options.drawAxisY != undefined)? options.drawAxisY : true;

    //Canvas Specification came from outside
	var targetElement = document.getElementById(options.targetId);
	var targetElementSize = targetElement.getBoundingClientRect();
	targetElement.style.display = "flex";
	targetElement.style.alignItems = "center";
	targetElement.style.alignContent = "center";
	targetElement.style.justifyContent = "center";
	targetElement.style.overflow = "hidden";
	
    this.id = options.targetId;
    this.width = options.width || targetElementSize.width;
    this.height = options.height || targetElementSize.height;
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
    this.fontColor = "#555";
    this.verticalFontSize = (this.height * this.fontRatio) / 100;
    this.horizontalFontSize = (this.width * this.fontRatio) / 100;

    //Guideline Configurations
    this.guidelineColor = "lightgrey";
    this.guidelineWidth = 0.5;

    //Create Canvas
    var canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    var ctx = canvas.getContext("2d");

    //Append canvas to target container
    targetElement.innerHTML = "";
    targetElement.appendChild(canvas);

    //Handle data
    this.labels = [];
    this.values = [];

    if (this.data.length > 0 && typeof this.data[0] == "object"){
		this.data.forEach(function(element, i) {
			that.labels.push(element.label || i);
			that.values.push(element.value);
		});
	}else{
		this.data.forEach(function(element, i){
			that.labels.push(i);
			that.values.push(element);
		});
	}

    //Global variables
    this.itemsNumber = this.data.length;
    this.maxValue = (options.maxValue != undefined)? options.maxValue : Math.max.apply(null, this.values);
    this.minValue = (options.minValue != undefined)? options.minValue : Math.min.apply(null, this.values);

    //Axis specifications
    this.verticalAxisWidth = this.height - 2 * this.verticalMargin;
    this.horizontalAxisWidth = this.width - 2 * this.horizontalMargin;

    //label specifications
    this.verticalUpperBound = Math.ceil(this.maxValue / 10) * 10;
    this.verticalLabelFreq = this.verticalUpperBound / this.itemsNumber;
    this.horizontalLabelFreq = this.horizontalAxisWidth / (this.itemsNumber);

	//Draw Bar-Chart
    this.drawBarChart = function() {
        if (drawAxisY) 		drawVerticalAxis();
        if (drawLabels) 	drawVerticalLabels();
        if (drawAxisX) 		drawHorizontalAxis();
        if (drawLabels) 	drawHorizontalLabels();
        if (drawGuidelines) drawHorizontalGuidelines();
        drawBars();
    }
	//Draw Line-Chart
    this.drawLineChart = function() {
        if (drawAxisY) 		drawVerticalAxis();
        if (drawLabels) 	drawVerticalLabels();
        if (drawAxisX) 		drawHorizontalAxis();
        if (drawLabels) 	drawHorizontalLabels();
        if (drawGuidelines) drawHorizontalGuidelines();
        drawLines();
    }

    function drawVerticalAxis() {
        //vertical axis
        ctx.beginPath();
        ctx.strokeStyle = that.axisColor;
        ctx.lineWidth = that.axisWidth;
        ctx.moveTo(that.horizontalMargin, that.verticalMargin);
        ctx.lineTo(
            that.horizontalMargin,
            that.height - that.verticalMargin
        );
        ctx.stroke();
    }

    function drawVerticalLabels() {
        //text specifications
        let labelFont = that.fontStyle + " " + that.fontWeight + " " + that.verticalFontSize + "px " + that.fontFamily;
        ctx.font = labelFont;
        ctx.fillStyle = that.fontColor;
        ctx.textAlign = "right";

        //scale values
        let scaledVerticalLabelFreq = (that.verticalAxisWidth / that.verticalUpperBound) * that.verticalLabelFreq;

        //draw labels
        for (let i = 0; i <= that.itemsNumber; i++) {
            let labelText = Math.ceil(that.verticalUpperBound - i * that.verticalLabelFreq);
            let verticalLabelX = that.horizontalMargin - that.horizontalMargin / that.axisRatio;
            let verticalLabelY = that.verticalMargin + i * scaledVerticalLabelFreq;

            ctx.fillText(labelText, verticalLabelX, verticalLabelY);
        }
    }

    function drawHorizontalAxis() {
        //horizontal axis
        ctx.beginPath();
        ctx.strokeStyle = that.axisColor;
        ctx.lineWidth = that.axisWidth;
        ctx.moveTo(
            that.horizontalMargin,
            that.height - that.verticalMargin
        );
        ctx.lineTo(
            that.width - that.horizontalMargin,
            that.height - that.verticalMargin
        );
        ctx.stroke();
    }

    function drawHorizontalLabels() {
        //text specifications
        let labelFont = that.fontStyle + " " + that.fontWeight + " " + that.verticalFontSize + "px " + that.fontFamily;
        ctx.font = labelFont;
        ctx.fillStyle = that.fontColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        //draw labels
        for (let i = 0; i < that.itemsNumber; i++) {
            let horizontalLabelX = that.horizontalMargin + i * that.horizontalLabelFreq + that.horizontalLabelFreq / 2;
            let horizontalLabelY = that.height - that.verticalMargin + that.verticalMargin / that.axisRatio;

            ctx.fillText(that.labels[i], horizontalLabelX, horizontalLabelY);
        }
    }

    function drawHorizontalGuidelines() {
        //specifications
        ctx.strokeStyle = that.guidelineColor;
        ctx.lineWidth = that.guidelineWidth;

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

            ctx.beginPath();
            ctx.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
            ctx.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY);
            ctx.stroke();
        }
    }

    function drawBars() {
		let fillOpacity = "0.75";
		let fillColor, borderColor;
        for (let i = 0; i < that.itemsNumber; i++) {
			if (options.color){
				fillColor = options.color;
				borderColor = options.color;
			}else{
				let color = TChart.createRandomRGBColor();
				fillColor = "rgba(" + color.red + "," + color.green + "," + color.blue + "," + fillOpacity + ")";
				borderColor = "rgb(" + color.red + "," + color.green + "," + color.blue + ")";
			}

            ctx.beginPath();

            let barX = that.horizontalMargin + i * that.horizontalLabelFreq + that.horizontalLabelFreq / that.axisRatio * 2;
            let barY = that.height - that.verticalMargin;
            let barWidth = that.horizontalLabelFreq - 2 * that.horizontalLabelFreq / that.axisRatio * 2;
            let barHeight = -1 * (that.verticalAxisWidth * that.values[i] / that.verticalUpperBound);

            ctx.fillStyle = fillColor;
            ctx.strokeStyle = borderColor;
            ctx.rect(barX, barY, barWidth, barHeight);
            ctx.fill();
            ctx.stroke();
        }
    }

    function drawLines() {
        for (let i = 0; i < that.itemsNumber; i++) {
            ctx.beginPath()

            let barX = that.horizontalMargin + i * that.horizontalLabelFreq + that.horizontalLabelFreq / 2;
            let barY = (that.height - that.verticalMargin) + (-1 * (that.verticalAxisWidth * that.values[i] / that.verticalUpperBound));

            ctx.fillStyle = that.fontColor;
            ctx.arc(barX, barY, that.horizontalLabelFreq / 9, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.beginPath();
        ctx.moveTo(that.horizontalMargin, that.height - that.verticalMargin);
        ctx.strokeStyle = options.color || that.fontColor;

        for (let i = 0; i < that.itemsNumber; i++) {
            let barX = that.horizontalMargin + i * that.horizontalLabelFreq + that.horizontalLabelFreq / 2;
            let barY = (that.height - that.verticalMargin) + (-1 * (that.verticalAxisWidth * that.values[i] / that.verticalUpperBound));

            ctx.lineWidth = (that.axisWidth / ((that.itemsNumber - i) * 2)) * 2;
            ctx.lineTo(barX, barY);
            ctx.stroke();
        }
    }
};

//common

TChart.getRandomInt = function(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};
TChart.createRandomRGBColor = function(){
	const red = TChart.getRandomInt(0, 257);
	const green = TChart.getRandomInt(0, 257);
	const blue = TChart.getRandomInt(0, 257);
	return {
		red: red,
		green: green,
		blue: blue
	};
};
