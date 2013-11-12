angular.module('zloch', []).

	directive('menu', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			controller: function($scope, $element) {
				
			},
			template:
				'<div class="tabbable">' +
				'<ul class="nav nav-tabs">' +
				'<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
				'<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
				'</li>' +
				'</ul>' +
				'<div class="tab-content" ng-transclude></div>' +
				'</div>',
			replace: true
		};
	});
