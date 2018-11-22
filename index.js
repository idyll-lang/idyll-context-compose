
module.exports = function() {
  var args = Array.prototype.slice.call(arguments);

  var _initializers = [];
  var _mounters = [];
  var _updaters = [];
  var contextOverrides = {
    onInitialize: cb => {
      _initializers.push(cb);
    },
    onMount: cb => {
      _mounters.push(cb);
    },
    onUpdate: cb => {
      _updaters.push(cb);
    }
  }

  return function(context) {
    var virtualContext = Object.assign({}, context, contextOverrides);
    args.forEach(function(arg) {
      arg(virtualContext);
    })
  }
}
