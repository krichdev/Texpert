angular
.module('TexpertApp')
.factory('AlertsFactory', [
  function() {
    var alerts = [];

    return {
      add: add,
      clear: clear,
      get: get,
      remove: remove
    }

    function add(type, message) {
      alerts.push({
        type: type,
        message: message
      })
    }
    function clear() {
      alerts = [];
    }
    function get() {
      return alerts;
    }
    function remove(index) {
      alerts.splice(index, 1);
    }
  }])
