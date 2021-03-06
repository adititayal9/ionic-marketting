var myapp = angular.module('starter', ['ionic', 'angularMoment', 'ngCordova', 'firebase']);

myapp.controller("loginCtrl", function($scope,  $ionicPopup, $http, $state, $ionicLoading, $firebaseArray, $firebaseObject) {
    localStorage.clear();
    $scope.data = {};

    function getUsers() {
        console.log("hello");
        var ref = firebase.database().ref('/' + $scope.data.username);
        return $firebaseArray(ref);
    };

    $scope.todos = getUsers();

    $scope.submit = function() {
        firebase.auth().signInWithEmailAndPassword($scope.data.username, $scope.data.password).then(function(user) {
            // Handle Errors here.
            console.log(user.uid);

            if (user.uid) {
                //valid
                console.log("hello");
                $ionicPopup.alert({
                   title: 'Hello '+ $scope.data.username+"!!",
                   template: 'Have a nice day  :)'
                 });
                
                 localStorage.setItem("userid", user.uid);
                 localStorage.setItem("any_activity_started",false);
               
                $state.go('start_my_day', {
                    adminId: user.uid
                });
            } else {
                alert("Invalid user !! ");

            }
        },function(err){
            $ionicPopup.alert({
                   title: 'Invalid user!! ',
                   template: 'Please try later :)'
                 });
        });


    }
});

myapp.controller("startCtrl", function($scope, $state, $stateParams, $http,$firebaseArray) {

    console.log($stateParams.adminId);
    $scope.adminId = $stateParams.adminId;
   
    $scope.date = new Date();
     var userid =  localStorage.getItem("userid");
    firebase.database().ref('/users/' + userid + '/name').on('value', function(snapshot) {
            $scope.name = snapshot.val();
            console.log($scope.name);
             
        });
   
    $scope.goToTasks = function() {
         $state.go('tasks', {
                adminId: $scope.adminId
            });

        


        // $http({
        //     method: "GET",
        //     url: 'http://139.162.43.74/CheckActivityPresence',
        //     params: {
        //         adminId: $scope.adminId,
        //         opt: "aa"
        //     }
        // }).then(function successCallback(response) {
        //     console.log(response);
        //     // console.log(response.data.Status);
        //     if (response.data.Status == 2)
        //         alert("No activity for today!!");
        //     else if (response.data.Status == 1) //repeated login
        //         $state.go('tasks', {
        //         adminId: $scope.adminId
        //     });
        //     else {
        //         console.log($scope.adminId);
        //         $state.go('welcome', {
        //             adminId: $scope.adminId
        //         });
        //     }

        // }, function errorCallback(response) {
        //     alert("Server error!!");
        // });

    };
});

myapp.controller("timeline1Ctrl", function($scope, $state) {

    var data = [{
            time: "9:00 am",
            task: "Start my day"
        }, {
            task: "Appointment at xyz"
        }, {
            task: "local travel "
        }, {
            task: "Outstation travel"
        }, {
            task: "Leave"
        }, {
            task: "Data entry"
        }, {
            task: "Making phone calls"
        }, {
            task: "Training"
        }, {
            task: "Break"
        }, {
            task: "Meeting"
        }, {
            task: "Data collection"
        },

    ];
    $scope.data = data;

});

myapp.controller("welCtrl", function($scope, $state) {

    $scope.adminId = $state.params.adminId;
    console.log($scope.adminId);
    $scope.goToTasks = function() {
        $state.go('tasks', {
            adminId: $scope.adminId
        });
    }

});

myapp.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});


myapp.controller('testCtrl', function($scope){

    console.log('called');
    $scope.change = function(c){
        console.log(c);
        console.log($scope.choice);
    }

})