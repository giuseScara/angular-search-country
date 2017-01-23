"use strict";

angular.module("AppModule").controller("SearchController", SearchController);

SearchController.$inject = ["SearchFactory"];

function SearchController(SearchFactory) {
    var vm = this;
    vm.itemToSearch = null;
    vm.listItems = null;
    vm.selectedItems = [];
    vm.searchItems = function () {
        SearchFactory.search(vm.itemToSearch).success(function (data) {
        vm.listItems = data;
        }).error(function (data) {
            vm.listItems = null;
        });
    }; //searchItem
    vm.saveItems = function () {
        SearchFactory.save(vm.selectedItems).success(function (data) {
            vm.selectedItems = [];
        }).error(function (data) {
            console.log(data);
        });
    };

}; //SearchController