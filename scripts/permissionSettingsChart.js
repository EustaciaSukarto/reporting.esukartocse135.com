ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
var barChartConfig = {
    "graphset": [{
        "type": "bar",
        "title": {
            "text": "User and Session Permission Settings",
            "backgroundColor": "none",
            "font-size": "24px",
            "alpha": 1,
            "adjust-layout": true,
        },
        "plotarea": {
            "margin": "dynamic"
        },
        "legend": {
            "layout": "x2",
            "overflow": "page",
            "alpha": 0.05,
            "shadow": false,
            "align": "center",
            "adjust-layout": true,
            "marker": {
                "type": "circle",
                "border-color": "none",
                "size": "10px"
            },
            "border-width": 0,
            "maxItems": 3,
            "toggle-action": "hide",
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
        "plot": {
            "bars-space-left": 0.15,
            "bars-space-right": 0.15,
            "animation": {
                "effect": "ANIMATION_SLIDE_BOTTOM",
                "sequence": 0,
                "speed": 800,
                "delay": 800
            }
        },
        "scaleY": {
            "line-color": "#7E7E7E",
            "item": {
                "font-color": "#7E7E7E"
            },
            "minValue": 0,
            "maxValue": 50,
            "guide": {
                "line-style": "dashed",
                "visible": true
            },
            "label": {
                "text": "Session Count",
                "bold": true,
                "font-size": "14px",
                "font-color": "white",
            },
        },
        "scaleX": {
            "values": ["cookies", "javascript", "images", "css", "", "cookies", "javascript", "images", "css"],
            "placement": "default",
            "tick": {
                "size": 58,
                "placement": "cross"
            },
            "itemsOverlap": true,
            "item": {
                "offsetY": -55,
                "wrapText": true
            }
        },
        "scaleX2": {
            "values": ["sessions", "users"],
            "placement": "default",
            "tick": {
              "size": 20,
            },
            "item": {
              "offsetY": -15
            }
        },
        "tooltip": {
            "visible": false
        },
        "crosshair-x": {
            "line-width": "100%",
            "alpha": 0.18,
            "plot-label": {
                "header-text": "%kv permissions"
            }
        },
        "series": [{
            "values": [],
            "alpha": 0.95,
            "borderRadiusTopLeft": 7,
            "background-color": "purple",
            "text": "allow",
        },
        {
            "values": [],
            "alpha": 0.95,
            "borderRadiusTopLeft": 7,
            "background-color": "orange",
            "text": "disallow"
        }]
    }]
};
// Populate Bar Chart with data from endpoint
fetch('https://reporting.esukartocse135.com/api/data/permissions-data', {
    headers: {
        'auth-token': sessionStorage.getItem('auth_token')
      },
})
.then(response => response.json())
.then(data => {
    // Process the data and pass it to the chart
    var max = 0;
    // for (var i = 0; i < data.length; i++) {
    //     barChartConfig.graphset[0].scaleX.values.push(data[i].hour);
    //     barChartConfig.graphset[0].series[0].values.push(data[i].sessions_lt_500);
    //     barChartConfig.graphset[0].series[1].values.push(data[i].sessions_ge_500);
    //     if (data[i].sessions_lt_500 > max) max = data[i].sessions_lt_500;
    //     if (data[i].sessions_ge_500 > max) max = data[i].sessions_ge_500;
    // }
    console.log(data[0].ns_accepts_cookies)
    barChartConfig.graphset[0].series[0].values = [
        data[0].ns_accepts_cookies, data[0].ns_allows_js, 
        data[0].ns_allows_images, data[0].ns_allows_css,
        0,
        data[0].nu_accepts_cookies, data[0].nu_allows_js, 
        data[0].nu_allows_images, data[0].nu_allows_css
    ];
    barChartConfig.graphset[0].series[1].values = [
        data[0].ns_naccepts_cookies, data[0].ns_nallows_js, 
        data[0].ns_nallows_images, data[0].ns_nallows_css,
        0,
        data[0].nu_naccepts_cookies, data[0].nu_nallows_js, 
        data[0].nu_nallows_images, data[0].nu_nallows_css
    ]
    for (var i = 0; i < barChartConfig.graphset[0].series[0].values.length; i++) {
        if (barChartConfig.graphset[0].series[0].values[i] > max)
            max = barChartConfig.graphset[0].series[0].values[i];
    }
    for (var i = 0; i < barChartConfig.graphset[0].series[1].values.length; i++) {
        if (barChartConfig.graphset[0].series[1].values[i] > max)
            max = barChartConfig.graphset[0].series[1].values[i];
    }

    barChartConfig.graphset[0].scaleY.maxValue = max + 1;
    zingchart.render({
        id: 'barChart',
        data: barChartConfig,
        height: '100%',
        width: '100%%'
    });
}).catch(error => {
    console.error('Error fetching data:', error);
});