# TChart.js
Simple, lightweight (10kb) and configurable Bar and Line Chart library in Javascript.  
  
Forked from: [TChart.js by M.Talha Khalid](https://github.com/talhakhalid-tech)  
Modified to work with IE11.

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

```js
var chart = new TChart({
	targetId: "myChart",
	width: 600,
	height: 450,
	data: data
});
```

### Parameters
- `targetId - containerId (String)`
Defines the id of container like "chart"

- `width (Integer)`
Defines the width of chart like 600

- `height (Integer)`
Defines the Height of chart like 450

- `data (Objects Array)`
Defines the data objects. The objects should have 2 key-value pairs: label and value. Example data:

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
    { label: "Sep", value: 77 },
  ];
```
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



## License
[MIT](LICENSE.md) © [M.Talha Khalid](https://github.com/talhakhalid-tech)  
Modified for IE11 by FQ - bytemind.de





