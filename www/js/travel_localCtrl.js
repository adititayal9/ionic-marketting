myapp.controller("travel_localCtrl", function($scope, $state, $timeout,$filter, $cordovaGeolocation, $firebaseArray, $http, $ionicPopup) {
    $scope.activityId = $state.params.activityId; 
    console.log( $scope.activityId);
    var userid =  localStorage.getItem("userid");
    console.log(userid);

    $scope.date=new Date();
    var dates = $filter('date')($scope.date, 'dd-MM-yy');

    function getActivitydetails() {
       
        firebase.database().ref('/activity/' + userid + '/'+dates+'/' + $scope.activityId).on('value', function(snapshot) {
            $scope.actDetails = snapshot.val();
            console.log($scope.actDetails);
             $scope.planningDetails = $scope.actDetails.planning;
            checkIfActivityStarted();
        });
    };

    getActivitydetails();
   
    console.log($scope.planningDetails);
    console.log($scope.toggle);

    function checkIfActivityStarted() { 
        console.log("check");
        //in execution
        if ($scope.actDetails.planning.active == true) {
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



         if ($scope.actDetails.planning.active == true) {
            //update the planning active false
            //update the summary active true
            upd = {};
            upd['/' + userid + '/'+dates+'/' + $scope.activityId + '/planning/active'] = false;
           // upd['/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/active'] = true;
            firebase.database().ref().update(upd);


        }

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

                console.log($scope.latitude);
                console.log($scope.longitude);
                console.log($scope.time);
                executionComp = {
                    "lat": $scope.latitude,
                    "lng": $scope.longitude,
                    "time": $scope.time
                };

         if ($scope.toggle == "Start Activity") {

            var item=localStorage.getItem("any_activity_started");
            if(item==true)
            {
                alert("no");
            }
                  
                  else
                  {
                    //send lat ,lang n time
                    $scope.startLatitude = $scope.latitude;
                    $scope.startLongitude = $scope.longitude;
                    $scope.startTime = $scope.time;

                    console.log(executionComp);
                    updates = {};
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/start'] = executionComp;
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "started";
                    firebase.database().ref().update(updates);
                                      
                    $scope.toggle = "End Activity";
                }
                   
        } else if ($scope.toggle == "End Activity") {
                    //send lat,long and time
                    console.log(foo);
                    console.log(executionComp);
                    $scope.endLatitude = $scope.latitude;
                    $scope.endLongitude = $scope.longitude;
                    $scope.endTime = $scope.time;
                    console.log(foo.mode);
                    updates = {};
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/end'] = executionComp;
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "completed";
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/mode'] = foo.mode;
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/remark'] = foo.remark;
                    firebase.database().ref().update(updates);
                    $scope.toggle = "Completed";

                } else if ($scope.toggle == "Completed") {

                    alert("already completed !!");
                } 

            }, function(err) {

            });

       

    };

    $scope.cancel = function() {
        if ($scope.actDetails.summary.status == "cancelled") {
            alert("already cancelled !!");
        } else {
            upd = {};
            upd['/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "cancelled";
            firebase.database().ref().update(upd);
            alert(" cancelled !!");
        }

    };
   
});