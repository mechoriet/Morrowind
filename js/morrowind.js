// Generated by CoffeeScript 1.9.1
(function() {
  var mw, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  mw = root.mw = {
    gots: 0,
    gets: 2,
    keys: [],
    world: null,
    circle: [
      {
        x: 1,
        y: -1
      }, {
        x: 0,
        y: -1
      }, {
        x: -1,
        y: -1
      }, {
        x: 1,
        y: 0
      }, {
        x: 0,
        y: 0
      }, {
        x: -1,
        y: 0
      }, {
        x: 1,
        y: 1
      }, {
        x: 0,
        y: 1
      }, {
        x: -1,
        y: 1
      }
    ],
    preloads: ['models/tx_bc_dirt.tga', 'models/tx_bc_moss.tga', 'models/tx_bc_mud.tga'],
    textures: []
  };

  $(document).ready(function() {
    $.ajaxSetup({
      'async': false
    });
    mw.boot.call(mw);
    mw.resources.call(mw);
    return true;
  });

  document.onkeydown = document.onkeyup = function(event) {
    var k;
    k = event.keyCode;
    if (event.type === 'keydown' && mw.keys[k] !== 2) {
      mw.keys[k] = 1;
    } else if (event.type === 'keyup') {
      mw.keys[k] = 0;
    }
    if (!mw.keys[k]) {
      delete mw.keys[k];
    }
    if (k === 114) {
      event.preventDefault();
    }
    if (mw.lightbox) {
      mw.lightbox.key();
    }
    return true;
  };

  mw.resources = function() {
    var f, go, i, j, l, len, n, ref;
    this.vvardenfell = new Image(2688, 2816);
    this.vvardenfell.src = 'vvardenfell.bmp';
    this.vclr = new Image(2688, 2816);
    this.vclr.src = 'vvardenfell-vclr.bmp';
    this.vtex = new Image(672, 704);
    this.vtex.src = 'vvardenfell-vtex3.bmp';
    for (n = j = 0; j <= 31; n = ++j) {
      this.preloads.push("models/water" + n + ".tga");
    }
    this.gets += this.preloads.length;
    ref = this.preloads;
    for (i = l = 0, len = ref.length; l < len; i = ++l) {
      f = ref[i];
      go = function() {
        var a, loader;
        a = f;
        loader = new THREE.TGALoader;
        return loader.load(a, function(asd) {
          asd.wrapS = asd.wrapT = THREE.RepeatWrapping;
          asd.repeat.set(64, 64);
          mw.textures[a] = asd;
          console.log("got " + a);
          return mw.got.call(mw);
        });
      };
      go();
    }
    this.vvardenfell.onload = this.vclr.onload = this.vtex.onload = function() {
      return mw.got.call(mw);
    };
    return true;
  };

  mw.got = function() {
    if (++this.gots === this.gets) {
      console.log('got all preloads');
      this.after();
    }
    return true;
  };

  mw.after = function() {
    $.getJSON("seydaneen.json", function(data) {
      return mw.world = new mw.World(data);
    });
    mw.animate();
    return true;
  };

  mw.texture = function(file) {
    var go, p;
    p = file;
    THREE.ImageUtils.loadTexture(p);
    if (mw.textures[p]) {
      return mw.textures[p];
    } else {
      go = function() {
        var i, loader;
        loader = new THREE.TGALoader;
        console.log(loader);
        i = p;
        return loader.load(p, function(asd) {
          mw.textures[i] = asd;
        });
      };
      go();
    }
    return true;
  };

}).call(this);
