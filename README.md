# TChart.js
Simple, lightweight (10kb) and configurable Bar and Line Chart library in Javascript.  
  
Forked from: [TChart.js by M.Talha Khalid](https://github.com/talhakhalid-tech)  
Modified to work with IE11.  
  
This is work in progress (see roadmap). If you're looking for a lightweight, super fast, production ready library for timeseries data check out [uPlot](https://github.com/leeoniya/uPlot).
  
## Description
TChart.js is a canvas based, super lightweight, easy to use Javascript Bar and Line Chart Library to provide a configurable and dependency-free experience.

## Installation
Download the `TChart.min.js` and include it in your project

```html
<script src="TChart.js"></script>
```

## Usage
To create a Bar or Line chart, you'll need a block level container e.g 'div'.

```html
<div id="chart">
  This will be our chart!
</div>
```

Then you can create the TChart object in your Javascipt file.  
  
Minimum required options:

```js
var chart = new TChart({
	targetId: "myChart",
	data: [10, 10, 15, 5, 10, 10]
});
```

All currently available options:

```js
var chart = new TChart({
	targetId: "lineChart2",
	data: data,
	color: "#f00",
	width: 320,
	height: 240,
	drawGuidelines: false,
	drawLabels: false,
	drawAxisX: false,
	drawAxisY: false,	
	maxValue: 220,
	minValue: 0
});
```

### Options
- `targetId - containerId (String)`
Defines the id of container like "chart"

- `width (Integer)`
Defines the width of chart like 600

- `height (Integer)`
Defines the Height of chart like 450

- `data (Objects Array or Number Array)`
Defines the data objects. Use simple array of numbers (y-values) or objects with the key-value pairs 'label' and 'value' . Example object data:

```js
var data = [
    { label: "Jan", value: 24 },
    { label: "Feb", value: 124 },
    { label: "March", value: 65 },
    { label: "April", value: 98 },
    { label: "May", value: 65 },
    { label: "June", value: 129 },
    { label: "July", value: 198 },
    { label: "Aug", value: 256 },
    { label: "Sep", value: 77 }
];
```

**TODO:** Document all options

### Drawing Chart

After Creating TChart object call methods for creating Line or Bar Chart.

#### For Bar Chart:

```js
chart.drawBarChart()
```

!["BarChart"](TChart-BarChart.JPG)


#### For Line Chart:

```js
chart.drawLineChart()
```
!["LineChart"](TChart-LineChart.JPG)

### To-Do/Roadmap

* **Properly support negative values (O_O)**
* Draw new data in existing chart (for fast updates)
* Add more options
* Optimize class structure (add prototypes etc.)
* tbd

## License
[MIT](LICENSE.md) © [M.Talha Khalid](https://github.com/talhakhalid-tech)  
Modified for IE11 by FQ - bytemind.de





