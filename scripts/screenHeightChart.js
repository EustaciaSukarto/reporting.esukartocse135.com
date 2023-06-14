var shPieChartConfig = {
  type: "pie",
  plot: {
    borderColor: "#2B313B",
    borderWidth: 1,
    // slice: 90,
    valueBox: {
      placement: 'out',
      text: '%t\n%v (%npv%)',
      fontFamily: "Open Sans"
    },
    tooltip: {
      fontSize: '18',
      fontFamily: "Open Sans",
      padding: "5 10",
      text: "%v (%npv%)"
    },
    animation: {
      effect: 2,
      method: 5,
      speed: 900,
      sequence: 1,
      delay: 1000
    }
  },
  title: {
    fontColor: "#8e99a9",
    text: 'screen height',
    align: "left",
    offsetX: 10,
    fontFamily: "Open Sans",
    fontSize: 25
  },
  plotarea: {
    margin: "20 0 0 0"
  },
  series: []
};

function getRandomColor() {
// Generate random values for red, green, and blue components
  var r = Math.floor(Math.random() * 256); // Random value between 0 and 255
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  // Construct the color string in RGB format
  var color = 'rgb(' + r + ',' + g + ',' + b + ')';

  return color;
}
// Populate Pie Chart with data from endpoint
fetch('https://reporting.esukartocse135.com/api/data/screen-height-data', {
  headers: {
      'auth-token': sessionStorage.getItem('auth_token')
    },
})
.then(response => response.json())
.then(data => {
  // Process the data and pass it to the chart
  var max = 0;
  for (var i = 0; i < data.length; i++) {
      var item = {};
      item.text = data[i].r_dimension;
      item.values = [data[i].session_count];
      item.backgroundColor = getRandomColor();
      shPieChartConfig.series.push(item);
  }
  zingchart.render({
      id: 'screenHeightPC',
      data: shPieChartConfig,
      height: '300px',
      width: '100%'
  });
}).catch(error => {
  console.error('Error fetching data:', error);
});