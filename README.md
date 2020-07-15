# TChart.js
simple and configurable Bar and Line Chart library in Javascript

![GitHub](https://img.shields.io/github/license/talhakhalid-tech/TChart.js)
![GitHub last commit](https://img.shields.io/github/last-commit/talhakhalid-tech/TChart.js)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/talhakhalid-tech/TChart.js)

## Description
TChart.js is a canvas based simple Javascript Bar and Line Chart Library to provide simple, configurable and dependency-free experience.

## Installation
Download the `bar.min.js` and include it in your project

```html
<script src="bar.min.js"></script>
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
let chart = new TChart(chartId, chartWidth, chartHeight, data);
```

### Parameters
- `chartId - containerId (String)`
Defines the id of container like "chart"

- `chartWidth (Integer)`
Defines the width of chart like 600

- `chartHeight (Integer)`
Defines the Height of chart like 450

- `data (Objects Array)`
Defines the data objects. The objects should have 2 key-value pairs: label and value. Example data:

```js
let data = [
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





