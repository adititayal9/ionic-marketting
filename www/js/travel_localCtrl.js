myapp.controller("travel_localCtrl", function($scope, $state, $timeout, $cordovaGeolocation, $firebaseArray, $http, $ionicPopup) {
    $scope.activityId = $state.params.activityId; //userid
    var userid = 'xBQrVAgOhBeBXCSo4S0RFhYy5xf1';


    function getActivitydetails() {
        console.log('/' + userid + '/16-06-16/' + $scope.activityId);
        firebase.database().ref('/' + userid + '/16-06-16/' + $scope.activityId).on('value', function(snapshot) {
            $scope.actDetails = snapshot.val();
            console.log($scope.actDetails);
            checkIfActivityStarted();
        });
    };

    getActivitydetails();
    $scope.planningDetails = $scope.actDetails.planning;
    console.log($scope.planningDetails);
    console.log($scope.toggle);

    function checkIfActivityStarted() {
        //in execution
        if ($scope.actDetails.summary.active == false) {
            $scope.toggle = "Start Activity";
        } else {
            if ($scope.actDetails.summary.status == "started")
                $scope.toggle = "End Activity";
            else if ($scope.actDetails.summary.status == "completed")
                $scope.toggle = "Completed";
            else if ($scope.actDetails.summary.status == "cancelled")
                $scope.toggle = "Cancelled";
        }
    };

    $scope.startActivity = function(foo) {


        console.log("clicked");
        var posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function(position) {
                $scope.latitude = position.coords.latitude;
                $scope.longitude = position.coords.longitude;
                $scope.time = position.timestamp;

                console.log(position);
                console.log($scope.latitude);
                console.log($scope.longitude);
                console.log($scope.time);
                executionComp = {
                    "lat": $scope.latitude,
                    "lng": $scope.longitude,
                    "time": $scope.time
                };

                $scope.test = function(){
                    console.log($scope.mode1);
                };
                if ($scope.toggle == "Start Activity") {
                    // $scope.startLatitde

                    //send lat ,lang n time
                    $scope.startLatitude = $scope.latitude;
                    $scope.startLongitude = $scope.longitude;
                    $scope.startTime = $scope.time;

                    console.log(executionComp);
                    updates = {};
                    updates['/' + userid + '/16-06-16/' + $scope.activityId + '/summary/start'] = executionComp;
                    updates['/' + userid + '/16-06-16/' + $scope.activityId + '/summary/status'] = "started";
                    firebase.database().ref().update(updates);
                    // 
                    // upd['/'+userid+'/16-06-16/' + $scope.activityId + '/summary/status'] = "Started";
                    $scope.toggle = "End Activity";
                    console.log($scope.toggle);
                } else if ($scope.toggle == "End Activity") {
                    //send lat,long and time
                    console.log(foo);
                    console.log(executionComp);
                    $scope.endLatitude = $scope.latitude;
                    $scope.endLongitude = $scope.longitude;

                    $scope.endTime = $scope.time;
                    console.log($scope.mode);
                    updates = {};
                    updates['/' + userid + '/16-06-16/' + $scope.activityId + '/summary/end'] = executionComp;
                    updates['/' + userid + '/16-06-16/' + $scope.activityId + '/summary/status'] = "completed";
                    updates['/' + userid + '/16-06-16/' + $scope.activityId + '/summary/mode'] = foo.mode;
                    updates['/' + userid + '/16-06-16/' + $scope.activityId + '/summary/remark'] = foo.remark;
                    firebase.database().ref().update(updates);
                    $scope.toggle = "Completed";



                } else if ($scope.toggle == "Completed") {

                    alert("already completed !!");
                } else if ($scope.toggle == "Cancelled") {
                    alert("already cancelled");
                }

            }, function(err) {

            });

        if ($scope.actDetails.summary.active == false) {
            //update the planning active false
            //update the summary active true
            upd = {};
            upd['/' + userid + '/16-06-16/' + $scope.activityId + '/planning/active'] = false;
            upd['/' + userid + '/16-06-16/' + $scope.activityId + '/summary/active'] = true;
            firebase.database().ref().update(upd);


        }

    };

    $scope.cancel = function() {
        if ($scope.actDetails.summary.status == "cancelled") {
            alert("already cancelled !!");
        } else {
            upd = {};
            upd['/' + userid + '/16-06-16/' + $scope.activityId + '/summary/status'] = "cancelled";
            firebase.database().ref().update(upd);
            alert(" cancelled !!");
        }

    };


});