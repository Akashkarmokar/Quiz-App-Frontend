import Vue from 'vue'

Vue.filter('to-upperCase-first-letter',function(value){
    return value.toUpperCase().slice(0,1)+value.slice(1);
});