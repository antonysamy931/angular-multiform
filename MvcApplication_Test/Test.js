var app = angular.module("myapp", []);
app.controller("test", function ($scope) {
    $scope.Form1 = true;
    //$scope.name = "My name is antony";
    $scope.checkValid = function (model) {
        if (angular.isUndefined(model) || model === null || model === "") {
            //$scope.Valid = true;
            return true;
        }
        else
            return false;
    };

    $scope.checkEmail = function (model) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(model);
    };

    $scope.Save = function () {        
        if ($scope.formname.$valid) {
            alert('hi');
        }
        else {
            $scope.formname.$error[name].required = true;
        }
    };

    $scope.hasherror = function (field, validation) {
        if (validation) {
            return ($scope.formname[field].$dirty && $scope.formname[field].$error[validation]) || ($scope.submitted && $scope.formname[field].$error[validation]);
        }
        return ($scope.formname[field].$dirty && $scope.formname[field].$invalid) || ($scope.submitted && $scope.formname[field].$invalid);
    };

    $scope.triggerSubmit = function (name, defaultname) {
        if (angular.isUndefined(name) || name === null || name === '') {
            $scope.$broadcast(defaultname);
        } else {
            $scope.$broadcast(name);
        }
    };

    $scope.onSubmitted = function () {
        $scope.myform.$submitted = true;
        $scope.myform.$touched = true;
        if ($scope.myform.$valid) {
            alert('submitted!');
        }
    };

    $scope.onSubmitted1 = function () {
        $scope.myform1.$submitted = true;
        $scope.myform1.$touched = true;
        if ($scope.myform1.$valid) {
            alert('submitted!');
        }
    };

    $scope.setTab = function (name) {
        $scope.form = name;
    };
});

app.directive('submitOn', function () {
    return {
        link: function (scope, elm, attrs) {
            scope.$on(attrs.submitOn, function () {
                //We can't trigger submit immediately, or we get $digest already in progress error :-[ (because ng-submit does an $apply of its own)                
                setTimeout(function () {
                    elm.triggerHandler('submit');
                });
            });
        }
    };
});