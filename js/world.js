// Generated by CoffeeScript 1.9.1
(function() {
  mw.World = (function() {
    function World(data) {
      var i, j, len, len1, p;
      console.log('new world');
      if (mw.models) {
        true;
      }
      this.props = [];
      for (i = 0, len = data.length; i < len; i++) {
        p = data[i];
        this.cache(p.model);
      }
      for (j = 0, len1 = data.length; j < len1; j++) {
        p = data[j];
        this.props.push(new mw.Prop(p));
      }
    }

    World.prototype.cached = function() {
      return true;
    };

    World.prototype.cache = function(model) {
      var cb;
      cb = function(object) {
        mw.models[model] = object;
        return mw.world.cached();
      };
      console.log(loader);
      loader.load("models/" + model + ".obj", "models/" + model + ".mtl", cb);
      return true;
    };

    World.prototype.fuckoff = function() {
      return true;
    };

    return World;

  })();

}).call(this);
