myapp.config( function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('login',{
    url:'/login',
    templateUrl:"templates/login.html",
    controller: "loginCtrl"
 })
   .state('welcome', {
      url: '/welcome/:adminId',
      templateUrl: 'templates/welcome.html',
      controller:'welCtrl'
    })

    .state('start_my_day', {
      url: '/start_my_day/:adminId',
      templateUrl: 'templates/start_my_day.html',
      controller:'startCtrl'
    })
    .state('tasks', {
      url: '/tasks/:adminId',
      templateUrl: 'templates/tasks.html',
      controller:'tasksCtrl'
    })
     .state('timeline1', {
      url: '/timeline1',
      templateUrl: 'templates/timeline1.html',
      controller:'timeline1Ctrl'
    })
      .state('appointment', {
      url: '/appointment/:activityId',
      templateUrl: 'templates/appointment.html',
      controller:'appointCtrl'
    })
      .state('appointmentp', {
      url: '/appointmentp/:activityId',
      templateUrl: 'templates/appointmentp.html',
      controller:'appointCtrl'
    })
       .state('travel_local', {
      url: '/travel_local/:activityId',
      templateUrl: 'templates/travel_local.html',
      controller:'travel_localCtrl'
    })
       .state('travel_localp', {
      url: '/travel_localp/:activityId',
      templateUrl: 'templates/travel_localp.html',
      controller:'travel_localCtrl'
    })
        .state('travel_outstation', {
      url: '/travel_outstation/:activityId',
      templateUrl: 'templates/travel_outstation.html',
      controller:'travel_outstationCtrl'
    })
        .state('travel_outstationp', {
      url: '/travel_outstationp/:activityId',
      templateUrl: 'templates/travel_outstationp.html',
      controller:'travel_outstationCtrl'
    })
          .state('phone_calls', {
      url: '/phone_calls/:activityId',
      templateUrl: 'templates/phone_calls.html',
      controller:'phone_callsCtrl'
    })
           .state('phone_callsp', {
      url: '/phone_callsp/:activityId',
      templateUrl: 'templates/phone_callsp.html',
      controller:'phone_callsCtrl'
    })
           .state('email', {
      url: '/email/:activityId',
      templateUrl: 'templates/email.html',
      controller:'emailCtrl'
    })
            .state('emailp', {
      url: '/emailp/:activityId',
      templateUrl: 'templates/emailp.html',
      controller:'emailCtrl'
    })
            .state('leave', {
      url: '/leave/:activityId',
      templateUrl: 'templates/leave.html',
      controller:'leaveCtrl'
    })
              .state('leavep', {
      url: '/leavep/:activityId',
      templateUrl: 'templates/leavep.html',
      controller:'leaveCtrl'
    })
              .state('online_research', {
      url: '/online_research/:activityId',
      templateUrl: 'templates/online_research.html',
      controller:'online_researchCtrl'
    })
               .state('online_researchp', {
      url: '/online_researchp/:activityId',
      templateUrl: 'templates/online_researchp.html',
      controller:'online_researchCtrl'
    })
                  .state('data_entry', {
      url: '/data_entry/:activityId',
      templateUrl: 'templates/data_entry.html',
      controller:'data_entryCtrl'
    })
                    .state('data_entryp', {
      url: '/data_entryp/:activityId',
      templateUrl: 'templates/data_entryp.html',
      controller:'data_entryCtrl'
    })
                      .state('training', {
      url: '/training/:activityId',
      templateUrl: 'templates/training.html',
      controller:'trainingCtrl'
    })
                      .state('trainingp', {
      url: '/trainingp/:activityId',
      templateUrl: 'templates/trainingp.html',
      controller:'trainingCtrl'
    })
                       .state('planning', {
      url: '/planning/:activityId',
      templateUrl: 'templates/planning.html',
      controller:'planningCtrl'
    })
                      .state('planningp', {
      url: '/planningp/:activityId',
      templateUrl: 'templates/planningp.html',
      controller:'planningCtrl'
    })
                       .state('others', {
      url: '/others/:activityId',
      templateUrl: 'templates/others.html',
      controller:'othersCtrl'
    })
                      .state('othersp', {
      url: '/othersp/:activityId',
      templateUrl: 'templates/othersp.html',
      controller:'othersCtrl'
    })
                       .state('break', {
      url: '/break/:activityId',
      templateUrl: 'templates/break.html',
      controller:'breakCtrl'
    })
                      .state('breakp', {
      url: '/breakp/:activityId',
      templateUrl: 'templates/breakp.html',
      controller:'breakCtrl'
    })
                      .state('meeting', {
      url: '/meeting/:activityId',
      templateUrl: 'templates/meeting.html',
      controller:'meetingCtrl'
    })
                      .state('meetingp', {
      url: '/meetingp/:activityId',
      templateUrl: 'templates/meetingp.html',
      controller:'meetingCtrl'
    })
  $urlRouterProvider.otherwise('/login');
});


