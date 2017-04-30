/**
 * Created by triptoli on 4/29/2017.
 */
angular.module('ParkenApp', [])
    .controller('ParkenCtrl', function ($scope, $http) {
        $scope.contact = {};
        var getData = function () {
            $http.get('/parken').then(function (res) {
                $scope.contacts = res.data;
            })
        }

        getData();
        $scope.add = function () {
            console.log($scope.contact);
            $http.post('/parken', $scope.contact).then(function (res) {
                getData();
                $scope.contact = {};
            }).catch(function (err) {
                console.log('error while inserting data into the db');
            });
        }
        $scope.delete = function (id) {
            console.log(id);
            $http.delete('/parken/' + id)
                .then(function (res) {
                    getData();
                })
        }
        $scope.edit = function (id) {
            $http.get('/parken/' + id).then(function (res) {
                $scope.contact = res.data;
            })

        }
        $scope.update = function () {
            $http.put('/parken/' + $scope.contact._id,$scope.contact).then(function (res) {
                $scope.contact ={};
                getData();
            })

        }
    });
