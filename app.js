angular.module('gpioClient', []);
angular.module('gpioClient').controller('mainCtrl', function ($scope, $http) {

    var apiUrl = 'http://192.168.1.16:3000/api/gpio/';

    $scope.pins = [2, 3, 4, 7, 8, 9, 10, 11, 14, 15];
    $scope.logs = ["System initialized"];
    $scope.pinsStates = {};

    $scope.onPinClick = function (pinNumber) {
        var pinUrl = apiUrl + pinNumber;
        var occurenceDate = new Date().toLocaleString();
        $http.get(pinUrl).then(function (results) {
            $scope.logs.push('[' + occurenceDate + '] Sent to gpio pin ' + pinNumber + ' (' + pinUrl + ')');
            $scope.pinsStates[pinNumber] = results.data.value;
        }).catch(function (err) {
            $scope.logs.push('[' + occurenceDate + '] ERROR: ' + err.data.message + ' at ' + err.config.url);
        });
    }
});