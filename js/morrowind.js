// Generated by CoffeeScript 1.9.1
(function() {
  var mw, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  mw = root.mw = {
    gots: 0,
    gets: 3,
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
    tgas: []
  };

  $(document).ready(function() {
    $.ajaxSetup({
      'async': false
    });
    mw.boot.call(mw);
    mw.resources.call(mw);
    return true;
  });

  mw.resources = function() {
    var loader;
    this.vvardenfell = new Image(2688, 2816);
    this.vvardenfell.src = 'vvardenfell.bmp';
    this.vclr = new Image(2688, 2816);
    this.vclr.src = 'vvardenfell-vclr.bmp';
    loader = new THREE.TGALoader;
    loader.load('models/water00.tga', function(asd) {
      mw.watertga = asd;
      console.log(asd);
      return mw.got.call(mw);
    });
    this.vvardenfell.onload = this.vclr.onload = function() {
      return mw.got.call(mw);
    };
    return true;
  };

  mw.got = function() {
    if (++this.gots === this.gets) {
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

}).call(this);
