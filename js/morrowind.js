// Generated by CoffeeScript 1.10.0
(function() {
  var mw, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  mw = root.mw = {
    freeze: false,
    gots: 0,
    gets: 3,
    keys: [],
    models: {},
    world: null,
    ply: null,
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
    pretex: ['cat.dds', 'tx_sky_clear.dds', 'tx_bc_mud.dds', 'tx_bc_dirt.dds', 'tx_bc_moss.dds'],
    blues: {
      '230': 'tx_bc_moss.dds',
      '214': 'tx_bc_dirt.dds',
      '247': 'tx_bc_mud.dds'
    },
    textures: [],
    wireframe: new THREE.MeshBasicMaterial({
      wireframe: true,
      transparent: true,
      opacity: .5
    })
  };

  $(document).ready(function() {
    $.ajaxSetup({
      'async': false
    });
    mw.boot.call(mw);
    mw.produceterrain.call(mw);
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
    this.vvardenfell.src = 'textures/vvardenfell.bmp';
    this.vclr = new Image(2688, 2816);
    this.vclr.src = 'textures/vvardenfell-vclr.bmp';
    this.vtex = new Image(672, 704);
    this.vtex.src = 'textures/vvardenfell-vtex3.bmp';
    for (n = j = 0; j <= 31; n = ++j) {
      this.pretex.push("water/water" + n + ".dds");
    }
    this.gets += this.pretex.length;
    ref = this.pretex;
    for (i = l = 0, len = ref.length; l < len; i = ++l) {
      f = ref[i];
      go = function() {
        var a, loader;
        a = f;
        loader = new THREE.DDSLoader;
        return loader.load("textures/" + f, function(asd) {
          asd.wrapS = asd.wrapT = THREE.RepeatWrapping;
          asd.anisotropy = mw.maxAnisotropy;
          asd.repeat.set(64, 64);
          mw.textures[a] = asd;
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
    var go, loader, p;
    p = file;
    loader = new THREE.TextureLoader();
    loader.load(p);
    loader = null;
    if (mw.textures[p]) {
      return mw.textures[p];
    } else {
      go = function() {
        var i;
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
