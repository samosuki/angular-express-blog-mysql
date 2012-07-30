function IndexCtrl($scope, $http) {
  $http.get('/api/posts').
    success(function(data) {
      $scope.posts = data;
      console.log(data);
    });
}
 
function AddPostCtrl($scope, $http, $location) {
  //$scope.form = {};
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
}
 
function ReadPostCtrl($scope, $http, $routeParams) {
  $http.get('/api/posts/' + $routeParams.pid).
    success(function(data, status) {
      $scope.status = status;
      $scope.posts = data;
      
    }).
    error(function(data, status) {
      $scope.data = data || "Request failed";
      $scope.status = status;
    });
    //return;
}
 
function EditPostCtrl($scope, $http, $location, $routeParams) {
 // $scope.form = {};
  $http.get('/api/posts/' + $routeParams.pid).
    success(function(data, status) {
      $scope.status = status;
      //$scope.form = data;
      editText = data[0];
      $scope.editForm = editText;
      $scope.posts = data;
      console.log(data);
    });
    
  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.pid, $scope.form).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.pid);
      });
  };
}
 
function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });
    
  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };
  
  $scope.home = function () {
    $location.url('/');
  };
}