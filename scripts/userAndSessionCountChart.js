ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
zingchart.THEME = 'dark';
var lineChartConfig = {
    "type": "line",
    "utc": true,
    "title": {
        "text": "User and Session Count",
        "font-size": "24px",
        "adjust-layout": true
    },
    'scroll-x': {

    },
    'scroll-y': {
  
    },
    "plotarea": {
        "margin": "dynamic 45 60 dynamic",
    },
    "legend": {
        "layout": "float",
        "background-color": "none",
        "border-width": 0,
        "shadow": 0,
        "align": "center",
        "adjust-layout": true,
        "toggle-action": "remove",
        "item": {
            "padding": 7,
            "marginRight": 17,
            "cursor": "hand"
        },
        "pageOn": {
            "backgroundColor": "#000",
            "size": "10px",
            "alpha": 0.65
        },
        "pageOff": {
            "backgroundColor": "#7E7E7E",
            "size": "10px",
            "alpha": 0.65
        },
        "pageStatus": {
            "color": "white"
        }
    },
    "scaleX": {
        "labels": [],
        "zooming": true,
        'zoom-to': [0,50],
        "item": {
            'font-size':10
        }
    },
    "scaleY": {
        "line-color": "#f6f7f8",
        "shadow": 0,
        "guide": {
            "line-style": "dashed"
        },
        "label": {
            "text": "Count",
        },
        "minValue": 0,
        "maxValue": 50,
        "minor-ticks": 0,
        "thousands-separator": ",",
        "zooming": true,
        'zoom-to': [0,50],
        "guide": {
            'line-style': "dotted"
        },
        "item": {
            'font-size':10
        }
    },
    "crosshair-x": {
        "line-color": "#efefef",
        "plot-label": {
            "border-radius": "5px",
            "border-width": "1px",
            "border-color": "#f6f7f8",
            "padding": "10px",
            "font-weight": "bold"
        },
        "scale-label": {
            "font-color": "#000",
            "background-color": "#f6f7f8",
            "border-radius": "5px"
        }
    },
    "tooltip": {
        "visible": false
    },
    "plot": {
        "highlight": true,
        "shadow": 0,
        "line-width": "2px",
        "marker": {
            "type": "circle",
            "size": 3
        },
        "highlight-state": {
            "line-width": 3
        },
        "animation": {
            "effect": 1,
            "sequence": 2,
            "speed": 100,
        }
    },
    "series": [{
        "values": [],
        "text": "Unique Users",
        "line-color": "#007790",
        "legend-item": {
        "background-color": "#007790",
        "borderRadius": 5,
        "font-color": "white"
        },
        "legend-marker": {
        "visible": false
        },
        "marker": {
        "background-color": "#007790",
        "border-width": 1,
        "shadow": 0,
        "border-color": "#69dbf1"
        },
        "highlight-marker": {
        "size": 6,
        "background-color": "#007790",
        }
    },
    {
        "values": [],
        "text": "Unique Sessions",
        "line-color": "#da534d",
        "legend-item": {
        "background-color": "#da534d",
        "borderRadius": 5,
        "font-color": "white"
        },
        "legend-marker": {
        "visible": false
        },
        "marker": {
        "background-color": "#da534d",
        "border-width": 1,
        "shadow": 0,
        "border-color": "#faa39f"
        },
        "highlight-marker": {
        "size": 6,
        "background-color": "#da534d",
        }
    },
    {
        "values": [],
        "text": "Bounce Sessions (< 2 seconds)",
        "line-color": "#009872",
        "legend-item": {
        "background-color": "#009872",
        "borderRadius": 5,
        "font-color": "white"
        },
        "legend-marker": {
        "visible": false
        },
        "marker": {
        "background-color": "#009872",
        "border-width": 1,
        "shadow": 0,
        "border-color": "#69f2d0"
        },
        "highlight-marker": {
        "size": 6,
        "background-color": "#009872",
        }
    }
    ]
};
// Populate Line Chart with data from endpoint
fetch('https://reporting.esukartocse135.com/api/data/user-and-session-data', {
    headers: {
        'auth-token': sessionStorage.getItem('auth_token')
      },
})
.then(response => response.json())
.then(data => {
    // Process the data and pass it to the chart
    var max = 0;
    for (var i = 0; i < data.length; i++) {
        lineChartConfig.scaleX.labels.push(data[i].date_val);
        lineChartConfig.series[0].values.push(data[i].user_count);
        lineChartConfig.series[1].values.push(data[i].session_count);
        lineChartConfig.series[2].values.push(data[i].bounce_session_count);
        if (data[i].user_count > max) max = data[i].user_count;
        if (data[i].session_count > max) max = data[i].session_count;
        if (data[i].bounce_session_count > max) max = data[i].bounce_session_count;
    }
    lineChartConfig.scaleY.maxValue = max + 1;
    lineChartConfig.scaleY["zoom-to"] = [0, max+1];
    zingchart.render({
        id: 'lineChart',
        data: lineChartConfig,
        height: '100%',
        width: '100%'
      });
}).catch(error => {
    console.error('Error fetching data:', error);
});