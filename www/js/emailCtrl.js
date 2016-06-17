myapp.controller("emailCtrl", function($scope, $state, $cordovaGeolocation, $http, $ionicPopup){
    $scope.activityId = $state.params.activityId;
  //console.log("hi " + $scope.activityId);
  //localStorage.removeItem('emailsummaryDetails');
  $scope.activities = JSON.parse(window.localStorage['activities'] || '[]');
  $scope.toggle=localStorage.getItem("e_toggle");
  console.log($scope.toggle);
  
  for (var i = 0; i < $scope.activities.length; i++) {
    if ($scope.activities[i].activityId == $scope.activityId) {

        $scope.planningDetails = $scope.activities[i];
    }

}
console.log($scope.planningDetails);
console.log($scope.planningDetails.activityDetails);
$scope.planningDetails = JSON.parse($scope.planningDetails.activityDetails || {});
$scope.latitude;
$scope.longitude;

$scope.emailsummaryDetails={
  "to_email":"",
  "cc_email": "",
  "contact_person":"",
  "designation":"",
  "department": "",
  "subject": "",
  "content": "",
  "attachment_link": "",
  "comments": ""
};

var hasEmailSummDetails = checkLocalStorage('emailsummaryDetails');
console.log(hasEmailSummDetails);
if(hasEmailSummDetails) {
    $scope.emailsummaryDetails=JSON.parse(localStorage.getItem("emailsummaryDetails") || {});
    console.log($scope.emailsummaryDetails);
}

console.log($scope.emailsummaryDetails);

$scope.change=function(){
    console.log("done");
    console.log($scope.emailsummaryDetails);
    localStorage.setItem('emailsummaryDetails',JSON.stringify($scope.emailsummaryDetails));

}
    //this data is to be sent to the api 
    $scope.save = function() {
        console.log("saving summary");

        $http({
            method: "GET",
            url: 'http://139.162.43.74/UpdateActivityPlanner',
            params: {
                actId: $scope.activityId,
                activitySummary: JSON.stringify($scope.emailsummaryDetails)
            }
        }).then(function successCallback(response) {

            console.log(response);
            console.log(response);
            if(response.data.StatusCode==200)
            {
                $ionicPopup.alert({
                    title: 'Data updated !!',
                    template: 'You can end the ativity now. :)'
                });

            }
            else if(response.data.StatusCode==300)
            {
               $ionicPopup.alert({
                title: 'Cannot update !!',
                template: 'You cannot update until the activity is started !!'
            });

           }
           else
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
    $scope.getLocation=function(){
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

   };
    $scope.start_stop = function() {


        if ($scope.toggle == "Start Activity") {

            // call start api and send activity id , latitude n longitude 
            console.log("started");
            $scope.getLocation();

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

                    localStorage.setItem("e_toggle", "End activity"); 
                    $scope.toggle = "End activity";

                }

            }, function errorCallback(response) {
                alert("Server error!!");
            });

        } else if ($scope.toggle == "End activity") //to end activity
        {
            console.log("ended");
            $scope.getLocation();
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
                if(response.data.StatusCode==200)
                {
                 $ionicPopup.alert({
                  title: 'Ended !!',
                  template: 'Running activity ended!! '
              });
                 localStorage.setItem("e_toggle", "Completed !!"); 
                 $scope.toggle = "Completed !!";
             }
             else if(response.data.StatusCode==300)
             {
                 $ionicPopup.alert({
                  title: 'Cannot end !!',
                  template: 'Activity already ended!! '
              });

             }
             else
             {    


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

function checkLocalStorage(item){

   if (localStorage.getItem(item) === null ||  typeof window.localStorage[item] === 'undefined') {

      return false

  }
  else{
    return true
}

}


