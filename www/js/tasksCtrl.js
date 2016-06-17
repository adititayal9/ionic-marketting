myapp.controller("tasksCtrl",function($scope, $state,$http, $firebaseArray, $filter) {
  
    $scope.adminId=$state.params.adminId; 
    console.log($scope.adminId);
    
     function getActivities() {
        var ref = firebase.database().ref('/' + $scope.adminId + '/16-06-16');
       
        return $firebaseArray(ref);
    };

    $scope.activities = getActivities();
    console.log($scope.activities);

    var tasks=[
    {time:"10:00 am" , task:"Appointment at xyz" , id:1,     type:"Appointment", checked:false},
    {time:"11:00 am" , task:"local travel",        id:2,     type:"Travel local", checked:false},
    {time:"12:00 pm" , task:"Outstation travel",   id:3,     type:"Travel outstation", checked:false},
    {time:"1:00 pm" ,  task:"Leave",               id:4,     type:"Leave", checked:false},
    {time:"2:30 pm" ,  task:"Lunch",               id:5,     type:"Lunch", checked:false},
    {time:"3:00 pm" ,  task:"Searching",           id:6,     type:"Online research", checked:false},
    {time:"4:00 pm" ,  task:"Data entry",          id:7,     type:"Data entry", checked:false},
    {time:"5:00 pm" ,  task:"Making phone calls",  id:8,     type:"Making phone calls", checked:false},
    {time:"5:30 pm" ,  task:"Emails",              id:9,     type:"Emails", checked:false},
    {time:"6:00 pm" ,  task:"Training",            id:10,    type:"Training", checked:false},
    {time:"6:30 pm" ,  task:"Break",               id:11,    type:"Break", checked:false},
    {time:"7:00 pm" ,  task:"Meeting",             id:12,    type:"Meeting", checked:false},
    {time:"7:30 pm" ,  task:"Data collection",     id:13,    type:"Data collection", checked:false},
    {time:"8:00 pm" ,  task:"Marketting activities",id:14,   type:"Markettig activities", checked:false},
    {time:"8:30 pm" ,  task:"End my day",          id:15,    type:"End day", checked:false},
    ];
    $scope.tasks=tasks;

    var selectedTasks;  //an array of selected activities
    //get selectedTasks from the localStorage
    selectedTasks=angular.fromJson(window.localStorage['selectedTasks'] || '[]');
    for(var i=0;i<selectedTasks.length;i++)
    {
       for(var j=0;j<tasks.length;j++)
       {
        if(selectedTasks[i].activityId==activities[j].activityId)
          activities[j].activity_flag=true;
       }

    }
    
    function persist(){
       window.localStorage['selectedTasks']=angular.toJson(selectedTasks);
    }


    function getLocation(x) {
         console.log(x);

         console.log("fetching location");
         var posOptions = {
             timeout: 10000,
             enableHighAccuracy: false
         };
         $cordovaGeolocation
             .getCurrentPosition(posOptions)
             .then(function(position) {
              if(x==0)
              {
                $scope.travel_localsummaryDetails.start.lat = position.coords.latitude;
                console.log($scope.travel_localsummaryDetails.start.lat);
                $scope.travel_localsummaryDetails.start.lng = position.coords.longitude;
                console.log($scope.travel_localsummaryDetails.start.lng);
              }
              else 
              {
                $scope.travel_localsummaryDetails.end.lat = position.coords.latitude;
                console.log($scope.travel_localsummaryDetails.end.lat);
                $scope.travel_localsummaryDetails.end.lng = position.coords.longitude;
                console.log($scope.travel_localsummaryDetails.end.lng);

   
              }
            localStorage.setItem('travel_localsummaryDetails', JSON.stringify($scope.travel_localsummaryDetails));
             }, function(err) {

             });

     };



    $scope.onClick=function(index){
      if($scope.tasks[index].checked == true){
        selectedTasks.push($scope.activities[index]);
      } else {
        selectedTasks.splice(index, 1);
        console.log("spliced");
      }

      console.log(selectedTasks);
      persist();
    };
    //toggle in localstorage values
    localStorage.setItem("emailtoggle","start Activity");


    //x is an integer ie activityType
    $scope.goToActivityDetails=function(x,y){
    //x is activity's type
    //x is activity's id
    


    console.log(x);
    console.log(y);

    if(x==1)
    $state.go('appointment',{activityId:y});
    else if(x=="localTravel")
    $state.go('travel_local',{activityId:y});
    else if(x==3)
    $state.go('travel_outstation',{activityId:y});
    else if(x==4)
    $state.go('phone_calls',{activityId:y});
    else if(x==5)
     $state.go('email',{activityId:y});
    else if( x==6)
     $state.go('online_research',{activityId:y});
    else if(x==7)
    $state.go('leave',{activityId:y});
    else if(x==8)
     $state.go('data_entry',{activityId:y});
    else if(x==9)
     $state.go('meeting',{activityId:y});
    else if(x==10)
     $state.go('training',{activityId:y});
    else if(x==11)
     $state.go('planning',{activityId:y});
    else if(x==12)
     $state.go('break',{activityId:y});
    else if(x==13)
     $state.go('others',{activityId:y});
    else if(x==14)  //end day
    $state.go('timeline1',{activityId:y});
  };
  });