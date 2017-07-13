 // Directive for generic chart, pass in chart options
 "use strict";

var hcChart = function (Highcharts) {
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    scope: {
                        options: '='
                    },
                    link: function (scope, element) {
                        Highcharts.chart(element[0], scope.options);
                    }
                };
            };

module.exports = hcChart;