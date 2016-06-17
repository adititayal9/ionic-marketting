myapp.controller("travel_outstationCtrl", function($scope, $state, $cordovaGeolocation, $http, $ionicPopup) {
    
    $scope.activityId = $state.params.activityId;
    console.log($state.params.activityId);
    console.log("hi " + $scope.activityId);
    //localStorage.removeItem('travel_outstationsummaryDetails');
    $scope.activities = JSON.parse(window.localStorage['activities'] || '[]');
    $scope.toggle = localStorage.getItem("travel_outstation_toggle");
    console.log($scope.toggle);

    for (var i = 0; i < $scope.activities.length; i++) {
        if ($scope.activities[i].activityId == $scope.activityId) {

            $scope.planningDetails = $scope.activities[i];
        }

    }

    console.log($scope.planningDetails);
    console.log($scope.planningDetails.activityDetails);
    $scope.planningDetails = JSON.parse($scope.planningDetails.activityDetails || {});

    $scope.travel_outstationsummaryDetails = {
        "start": {
            "lat": "",
            "lng": "",
            "google_id": "",
            "date": ""
        },
        "end": {
            "lat": "",
            "lng": "",
            "google_id": "",
            "date": "6"
        },
        "mode": "",
        "comments": ""
    };

    var hasOutstationSumDetails = checkLocalStorage('travel_outstationsummaryDetails');
    console.log(hasOutstationSumDetails);
    if (hasOutstationSumDetails) {
        $scope.travel_outstationsummaryDetails = JSON.parse(localStorage.getItem("travel_outstationsummaryDetails") || {});
        console.log($scope.travel_outstationsummaryDetails);
    }

    $scope.change = function() {
            console.log("done");
            console.log($scope.travel_outstationsummaryDetails);
            localStorage.setItem('travel_outstationsummaryDetails', JSON.stringify($scope.travel_outstationsummaryDetails));

        }
        //this data is to be sent to the api 
    $scope.save = function() {
        console.log("saving summary");

        $http({
            method: "GET",
            url: 'http://139.162.43.74/UpdateActivityPlanner',
            params: {
                actId: $scope.activityId,
                activitySummary: JSON.stringify($scope.travel_outstationsummaryDetails)
            }
        }).then(function successCallback(response) {

            console.log(response);
            //update 
            if (response.data.StatusCode == 200) {
                $ionicPopup.alert({
                    title: 'Data updated !!',
                    template: 'You can end the ativity now. :)'
                });

            } else if (response.data.StatusCode == 300) {
                $ionicPopup.alert({
                    title: 'Cannot update !!',
                    template: 'You cannot update until the activity is started !!'
                });

            } else {
                $ionicPopup.alert({
                    title: 'Cannot update !!',
                    template: 'You cannot update since activity is already completed!!'
                });
            }
        }, function errorCallback(response) {
            alert("Server error!!");
        });
    };

    $scope.start_stop = function() {

        var posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function(position) {
                $scope.latitude = position.coords.latitude;
                $scope.longitude = position.coords.longitude;
                console.log($scope.latitude);
                console.log($scope.longitude);
                console.log($scope.activities[0].adminId);
                console.log($scope.activityId);

            }, function(err) {
                // error
            });
        if ($scope.toggle == "Start Activity") {

            // call start api and send activity id , latitude n longitude 
            console.log("started");

            $http({

                method: "GET",
                url: 'http://139.162.43.74/StartActivity',
                params: {
                    actId: $scope.activityId,
                    adminId: $scope.activities[0].adminId,
                    startLatitude: $scope.latitude,
                    startLongitude: $scope.longitude
                }
            }).then(function successCallback(response) {

                console.log(response);
                if (response.data.Message == "Other Activity Present") {
                    $ionicPopup.alert({
                        title: 'Cannot start the activity !!',
                        template: 'Some other activity may be running!! '
                    });
                } else {

                    localStorage.setItem("travel_outstation_toggle", "End activity");
                    $scope.toggle = "End activity";

                }

            }, function errorCallback(response) {
                alert("Server error!!");
            });

        } else if ($scope.toggle == "End activity") //to end activity
        {
            console.log("ended");

            $http({

                method: "GET",
                url: 'http://139.162.43.74/EndActivity',
                params: {
                    actId: $scope.activityId,
                    endLatitude: $scope.latitude,
                    endLongitude: $scope.longitude
                }
            }).then(function successCallback(response) {

                console.log(response);
                if (response.data.StatusCode == 200) {
                    $ionicPopup.alert({
                        title: 'Ended !!',
                        template: 'Running activity ended!! '
                    });
                    localStorage.setItem("travel_outstation_toggle", "Completed !!");
                    $scope.toggle = "Completed !!";
                } else if (response.data.StatusCode == 300) {
                    $ionicPopup.alert({
                        title: 'Cannot end !!',
                        template: 'Activity already ended!! '
                    });

                } else {


                }


            }, function errorCallback(response) {
                alert("Server error!!");
            });

        } else {
            $ionicPopup.alert({
                title: 'Already completed !!',
                template: 'You can go to another activity now!! '
            });

        }
    };

    //x can be start/end
    $scope.getLocation = function(x) {
        console.log(x);

        console.log("fetching location");
        var posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function(position) {
                if (x == 0) {
                    $scope.travel_outstationsummaryDetails.start.lat = position.coords.latitude;
                    console.log($scope.travel_outstationsummaryDetails.start.lat);
                    $scope.travel_outstationsummaryDetails.start.lng = position.coords.longitude;
                    console.log($scope.travel_outstationsummaryDetails.start.lng);
                } else {
                    $scope.travel_outstationsummaryDetails.end.lat = position.coords.latitude;
                    console.log($scope.travel_outstationsummaryDetails.end.lat);
                    $scope.travel_outstationsummaryDetails.end.lng = position.coords.longitude;
                    console.log($scope.travel_outstationsummaryDetails.end.lng);

                }
               localStorage.setItem('travel_outstationsummaryDetails', JSON.stringify($scope.travel_outstationsummaryDetails));
            }, function(err) {

            });

    };
});