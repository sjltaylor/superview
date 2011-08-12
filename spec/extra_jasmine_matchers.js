beforeEach(function() {
  this.addMatchers({
    toBeAFunction: function() { 
      return typeof this.actual === 'function'; 
    },
    toBeInstanceOf: function (ctor) {
      return this.actual instanceof ctor;
    },
    toContain: function (a) {
      return this.actual.contains(a);
    },
    toBeEmpty: function () {
      return this.actual.isEmpty();
    }
  });
});