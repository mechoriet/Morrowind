// Generated by CoffeeScript 1.10.0
(function() {
  mw.Prop = (function() {
    function Prop(raw) {
      this.raw = raw;
      this.model = this.raw.model;
      this.x = this.raw.x;
      this.y = this.raw.y;
      this.z = this.raw.z;
      this.r = Math.abs(this.raw.r - 360);
      this.scale = this.raw.scale || 0;
      this.transparent = this.raw.transparent || false;
      this.mesh = mw.models[this.model].clone();
      this.mesh.position.set(this.x, this.y, this.z);
      if (this.scale) {
        this.mesh.scale.set(this.scale, this.scale, this.scale);
      }
      this.mesh.rotation.z = this.r * Math.PI / 180;
      if (this.transparent) {
        console.log('TRANSPARENT');
        console.log(this.mesh);
      }
      if (this.model === 'ex_common_house_tall_02') {
        mw.target = this;
      }
      mw.scene.add(this.mesh);
    }

    Prop.prototype.step = function() {
      return true;
    };

    return Prop;

  })();

}).call(this);
