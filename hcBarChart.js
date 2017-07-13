"use strict";

var hcBarChart = function (Highcharts) {
 // Directive for pie charts, pass in title and data only
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    scope: {
                        title: '@',
                        data: '='
                    },
                    link: function (scope, element) {
                        Highcharts.chart(element[0], {
 chart: {
        type: 'column'
    },
    title: {
        text: 'Days in field'
    },
    subtitle: {
        text: 'Days in field per activity. See: <a href="http://data.npolar.no/expedition">expedition database</a>.'
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Activity'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
            }
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
 series: [{
                                data: scope.data
                            }]
                        });
                    }
                };
};

module.exports = hcBarChart;