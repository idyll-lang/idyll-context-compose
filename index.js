
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

    context.onInitialize && context.onInitialize(function() {
      _initializers.forEach(_initialize => _initialize.apply(this, arguments));
    })
    context.onMount && context.onMount(function() {
      _mounters.forEach(_mount => _mount.apply(this, arguments));
    })
    context.onUpdate && context.onUpdate(function() {
      _updaters.forEach(_update => _update.apply(this, arguments));
    })
  }
}
