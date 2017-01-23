"use strict";

angular.module("AppModule").component("searchCountry", {
    templateUrl: 'components/search/search.html',
    bindings: {
        element: '='
    },
    controller: SearchController,
    controllerAs: 'srcCtrl'
});
