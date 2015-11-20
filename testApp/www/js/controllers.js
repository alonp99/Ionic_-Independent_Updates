  angular.module('starter.controllers', [])

  .controller('DashCtrl', function($scope) {})

  .controller('ChatsCtrl', function($scope, Chats) {


    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })


  .controller('updateCtrl', function($scope,$http,$ionicPopup) { // #recheck (ionic add ionic loading?)

    if (window.localStorage['CurrentVersion'] == null )
           window.localStorage['CurrentVersion'] = 1000;

    $scope.someString = "Newest Version: ";
    $scope.curVersion = window.localStorage['CurrentVersion'];
    $scope.update_info;


  
   
      $scope.update = function() {
        alert("Getting a JSON object from the server with the available updates info...");
      $http.get('http://localhost:3000/update').then(function(resp) {
      console.log('Success', resp);
      $scope.update_info = resp.data;
      var update_count = $scope.update_info.length;
      $scope.newUpdates = "Avilalble Updates:"
    }, function(err) {
      console.error('ERR', err);
      alert("error downlading manifest"+err.status);
    })
      }

      $scope.restoreVerVar = function() {
        window.localStorage['CurrentVersion'] = 1000;

                alert("Uncomment #removedir section in AppDelegte.m to restore app files to original version.");
        window.location.reload(true);  
      }

      
      $scope.downloadUpdate = function(upObj) {
        alert("files to download: "+upObj.files[0]);

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) { 
        console.log("requesting local file system...");
          fs.root.getDirectory(
              "www",
              {
                  create: true
              },
              function(dirEntry) {
                  dirEntry.getFile(
                      upObj.files[0], 
                      {
                          create: true, 
                          exclusive: false
                      }, 
                      function gotFileEntry(fe) {
                       
                          var p = fe.toURL();
                          alert("Downloading to sandbox: "+p);
                          fe.remove();
                          ft = new FileTransfer();
                          ft.download(
                              encodeURI("http://localhost:3000/"+upObj.ver+"/"+upObj.files[0]),
                              p,
                              function(entry) {
                                  
                                  $scope.imgFile = entry.toURL();
                                  console.log("updating ver global var...");
                                  window.localStorage['CurrentVersion'] = upObj.ver;
                                  alert("Updated to: v"+upObj.ver+".\nUpdate Description: "+upObj.desc+".\nApp will refresh now.");
                                  $scope.curVersion = window.localStorage['CurrentVersion'];

                                  window.location.reload(true);  
                              },
                              function(error) {
                                  
                                  alert("Download Error Source -> " + error.source);
                              },
                              false,
                              null
                          );
                      }, 
                      function() {
                        alert("Get file failed");
                         
                          console.log("Get file failed");
                      }
                  );
              }
          );
      },
      function() {
        alert("Request for filesystem failed");
          //$ionicLoading.hide();
          console.log("Request for filesystem failed");
      });
 
      }
  }

  )


  ;


