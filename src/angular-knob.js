'use strict';
angular.module('ui.knob', []).directive('knob', ['$timeout', function() {

    return {
        restrict: 'EA',
        replace: true,
        template: '<input autocomplete="off" value="{{ knobData }}"/>',
        scope: {
            knobData: '=',
            knobOptions: '&',
            knobRelease: '=',
            knobChange: '='
        },
        link: function(scope, element) {
            scope.el = element;
        },
        controller: function($scope, $window){
            var knobInit = $scope.knobOptions() || {};

            knobInit.change = function(newValue) {
                if(newValue)
                {
                    $scope.$evalAsync(function(){
                        $scope.knobData = Number(newValue).toFixed(0);
                    });
                }
            };

            knobInit.release = function(newValue) {
                try
                {
                    $scope.knobRelease();
                }
                catch(e)
                {
                    debugger;
                }
                $scope.$evalAsync(function(){
                    $scope.knobData = newValue;    
                });
            };

            $scope.$watch('knobData', function(newValue, oldValue) {
                if (newValue !== oldValue)
                {
                    $window.jQuery($scope.el).val(newValue).change();
                }
            });

            var cancel = $scope.$watch('el',function(newVal){
                if(newVal)
                {
                    var initVal = $scope.knobData || 0;

                    $window
                    .jQuery($scope.el)
                    .knob(knobInit);

                    $window
                    .jQuery($scope.el)
                    .val(initVal)
                    .trigger('change');

                    knobInit.change(initVal);

                    cancel();
                }
            });
        }
    };
}]);
