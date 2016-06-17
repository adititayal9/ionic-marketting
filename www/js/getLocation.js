myApp.factory('getLocation', function () {

     var posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        };

    return {
        getUserName: function () {
             return userName;                   
        },
        setUserName: function (newName) {
            userName = newName;
        }
    }
});