 myapp.controller("planningCtrl", function($scope, $state, $cordovaGeolocation, $http, $ionicPopup) {

     $scope.activityId = $state.params.activityId;
     //  console.log("hi "+$scope.activityId );
     $scope.toggle = localStorage.getItem("planning_toggle");
     console.log($scope.toggle);
     $scope.activities = JSON.parse(window.localStorage['activities'] || '[]');

     for (var i = 0; i < $scope.activities.length; i++) {
         if ($scope.activities[i].activityId == $scope.activityId) {

           $scope.planningDetails = $scope.activities[i];
       }

   }
   console.log($scope.planningDetails);
   console.log($scope.planningDetails.activityDetails);     
   $scope.planningDetails = JSON.parse($scope.planningDetails.activityDetails || {});
   $scope.planningsummaryDetails = {

     "comment": ""
 };

 var hasplanningSummDetails = checkLocalStorage('planningsummaryDetails');
 console.log(hasplanningSummDetails);
 if(hasplanningSummDetails) {
    $scope.planningsummaryDetails=JSON.parse(localStorage.getItem("planningsummaryDetails") || {});
    console.log($scope.planningsummaryDetails);
}

console.log($scope.planningsummaryDetails);

$scope.change = function() {
    console.log($scope.planningsummaryDetails);
    localStorage.setItem('planningsummaryDetails', JSON.stringify($scope.planningsummaryDetails));

}
    //
    $scope.save = function() {
      console.log("saving summary");

      $http({
        method: "GET",
        url: 'http://139.162.43.74/UpdateActivityPlanner',
        params: {
          actId: $scope.activityId,
          activitySummary: JSON.stringify($scope.planningsummaryDetails)
      }
  }).then(function successCallback(response) {

     console.log(response);
                       // can save
                       if(response.data.StatusCode==200)
                       {
                        $ionicPopup.alert({
                          title: 'Data updated !!',
                          template: 'You can end the ativity now. :)'
                      });

                    }
                           //activity is not started
                           else if(response.data.StatusCode==300)
                           {
                               $ionicPopup.alert({
                                  title: 'Cannot update !!',
                                  template: 'You cannot update until the activity is started !!'
                              });

                           }
                          //activity is completed
                          else if(response.data.StatusCode==400)
                          {
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
                //some other activity running
                if (response.data.Message == "Other Activity Present") {
                  $ionicPopup.alert({
                    title: 'Cannot start the activity !!',
                    template: 'Some other activity may be running!! '
                });
                } else {  //can start this activity so started
                    //change the button now to end button
                    localStorage.setItem("planning_toggle", "End activity"); 
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
                //ended
                if(response.data.StatusCode==200)
                {
                   $ionicPopup.alert({
                      title: 'Ended !!',
                      template: 'Running activity ended!! '
                  });
                   localStorage.setItem("planning_toggle", "Completed !!"); 
                   $scope.toggle = "Completed !!";
               }
                //activity has already been ended (not needed)
                else if(response.data.StatusCode==300)
                {
                   $ionicPopup.alert({
                      title: 'Cannot end !!',
                      template: 'Activity already ended!! '
                  });

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
});

