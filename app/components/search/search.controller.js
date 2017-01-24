"use strict";

angular.module("AppModule").controller("SearchController", SearchController);

SearchController.$inject = ["SearchFactory"];

function SearchController(SearchFactory) {
    var vm = this,
        mapItemSelected = [];
    vm.itemToSearch = [];
    vm.listItems = null;
    vm.selectedItems = [];
    vm.showMenu = true;
    vm.searchItems = function () {
        vm.listItems = [];
        vm.showMenu = true;
        if (vm.itemToSearch != null && vm.itemToSearch.trim().length > 0) {
            SearchFactory.search(vm.itemToSearch).then(function (response) {
                vm.listItems = response.data;
            }, function (response) {
                vm.listItems = [];
            });
        }
    }; //searchItem
    vm.saveItems = function () {
        var itemToSave = [];
        for (var key in mapItemSelected) {
            if (mapItemSelected[key] != null) {
                itemToSave.push(key);
            }
        }
        SearchFactory.save(itemToSave).then(function (response) {
            vm.selectedItems = [];
            mapItemSelected = [];
        }, function (response) {});
    }; //saveItems
    vm.addItem = function (item) {
        vm.showMenu = false;
        if (mapItemSelected[item.isoCode] == null) {
            vm.selectedItems.push(item);
            mapItemSelected[item.isoCode] = vm.selectedItems.length - 1;
        }
    }; //addItem
    vm.removeItem = function (item) {
        var index = mapItemSelected[item.isoCode];
        vm.selectedItems[index] = null;
        mapItemSelected[item.isoCode] = null;
    }; //addItem

}; //SearchController