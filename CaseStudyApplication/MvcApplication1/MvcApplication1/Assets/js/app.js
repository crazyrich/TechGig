


app.controller("loginController", ['$scope', '$location', 'userService', function ($scope, $location, userService) {

    $scope.userType = function () {
        var listofUsers = [];
        userService.getAllUsers().then(function (response) {
            var collection = response.data;

            $.each(collection, function (i, item) {
                listofUsers.push({ "userid": item.userid, "password": item.password, "usertype": item.usertype });
            });
            var inputUserID = angular.element(document.querySelector('#inputUserID'))[0].value;
            var inputPassword = angular.element(document.querySelector('#inputPassword'))[0].value;
            var valueUserType = angular.element(document.querySelector('#selectUserType'))[0].value;
            var flag = true;

            $.each(listofUsers, function (i, item) {
                if (item.userid.trim() == inputUserID.trim()) {
                    if (item.password.trim() == inputPassword.trim()) {
                        if(item.usertype.trim() == valueUserType.trim()){
                        
                            if (valueUserType.trim() == "Client") {
                                $location.path('/client');
                                flag = true;
                                return false;//exits the foreach
                            }
                            else {
                                $location.path('/admin');
                                flag = true;
                                return false;
                            }
                        
                        }
                        else
                        {
                            flag = false
                            return false;
                        }
                    }
                    else {
                        flag = false
                        return false;
                    }

                }
                else {
                    flag = false;
                }
            });//ends Foreach
            if (flag == false)
                alert("Invalid UserID / Password !!");
        });//ends Service hit success       
    }

}]);

app.controller("adminController", ['$scope', 'productService', function ($scope, productService) {
    $scope.listOfProducts = [];
    $scope.listProducts = function () {

        productService.getAllProducts().then(function (response) {
            var collection = response.data;
            var list = [];

            $.each(collection, function (i, item) {
                $scope.listOfProducts.push({ "sno": item.sno, "productid": item.productid, "name": item.name, "unitprice": item.unitprice, "quantity": item.quantity });
                list.push({ "sno": item.sno, "productid": item.productid, "name": item.name, "unitprice": item.unitprice, "quantity": item.quantity });

            });
        });
    }
    $scope.listProducts();

    $scope.addProduct = function ()
    {
        
            var inputProductID = angular.element(document.querySelector('#inputProductID'))[0].value.trim();
            var inputProductName = angular.element(document.querySelector('#inputProductName'))[0].value.trim();
            var inputUnitPrice = angular.element(document.querySelector('#inputUnitPrice'))[0].value.trim();
            var inputQuantity = angular.element(document.querySelector('#inputQuantity'))[0].value.trim();

            var jsonList = {
                productid: inputProductID,
                name : inputProductName,
                unitprice:inputUnitPrice,
                quantity:inputQuantity
            }
            var stringList = JSON.stringify(jsonList);
            var URL = "api/Product/AddProduct";
            $.ajax({

                url: URL,
                data: stringList,
                type: "PUT",
                dataType: 'json',
                async: false,
                contentType: "application/json;charset=utf-8",
                success: function (result) {

                },
                error: function (error) {

                }

            });
      
    }

    $scope.deleteProduct = function () {

       
        var inputProductID= angular.element(document.querySelector('#selectProductToDelete'))[0].value.trim();
       

        var jsonList = {
            productid: inputProductID,
           
        }
        var stringList = JSON.stringify(jsonList);
        var URL = "api/Product/DeleteProduct";
        $.ajax({

            url: URL,
            data: stringList,
            type: "DELETE",
            dataType: 'json',
            async: false,
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                alert("Product has been deleted!!!!");
                $scope.listProducts();
            },
            error: function (error) {

            }

        });

    }

}]);
