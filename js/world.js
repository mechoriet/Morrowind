// Generated by CoffeeScript 1.9.1
(function() {
  mw.World = (function() {
    function World(data) {
      var j, len, p, ref;
      this.data = data;
      console.log('new world');
      this.props = [];
      this.cached = 0;
      this.queue = 0;
      ref = this.data;
      for (j = 0, len = ref.length; j < len; j++) {
        p = ref[j];
        if (typeof p === "object") {
          this.cache(p.model);
        }
      }
    }

    World.prototype.cachcb = function() {
      this.cached++;
      if (this.cached >= this.queue) {
        this.ransack();
      }
      return true;
    };

    World.prototype.ransack = function() {
      var j, len, p, ref;
      ref = this.data;
      for (j = 0, len = ref.length; j < len; j++) {
        p = ref[j];
        if (typeof p === "object") {
          this.props.push(new mw.Prop(p));
        }
      }
      return true;
    };

    World.prototype.cache = function(model) {
      var cb, loader;
      this.queue++;
      cb = function(object) {
        var c, i, j, len, ref;
        mw.models[model] = object;
        ref = object.children;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          c = ref[i];
          if (c.material.map) {
            c.material.map.needsUpdate = true;
            c.material.map.onUpdate = function() {
              if (this.wrapS !== THREE.RepeatWrapping || this.wrapT !== THREE.RepeatWrapping) {
                this.wrapS = THREE.RepeatWrapping;
                this.wrapT = THREE.RepeatWrapping;
                return this.needsUpdate = true;
              }
            };
          }
        }
        return mw.world.cachcb();
      };
      loader = new THREE.OBJMTLLoader;
      loader.load("models/" + model + ".obj", "models/" + model + ".mtl", cb);
      return true;
    };

    World.prototype.fuckoff = function() {
      return true;
    };

    return World;

  })();

}).call(this);
