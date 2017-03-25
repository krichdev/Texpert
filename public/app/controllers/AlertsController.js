angular
.module('GenericApp')
.controller('AlertsCtrl', [
  '$scope',
  'AlertsFactory',
  function($scope, AlertsFactory) {
    $scope.alerts = AlertsFactory.get();
  }
]);