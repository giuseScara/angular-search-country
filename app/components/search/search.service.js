"use strict";

angular.module("AppModule").factory("SearchFactory", SearchFactory);

SearchFactory.$inject = ["$http", "baseURL"];

function SearchFactory($http, baseURL) {
    var srcFactory = {};

    srcFactory.search = function (item) {
        var promise = $http.get(baseURL + "country", {
            params: {
                name_like: "^" + item
            }
        });

        promise.success(function (response) {
            return response;
        });

        promise.error(function (response) {
            return response;
        });

        return promise;
    }; //search

    srcFactory.save = function (items) {
        return $http.post(baseURL + "selectedCountries", items);
    };

    return srcFactory;

}; //SearchFactory