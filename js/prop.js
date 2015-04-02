// Generated by CoffeeScript 1.9.1
(function() {
  mw.Prop = (function() {
    function Prop(raw) {
      this.raw = raw;
      this.model = this.raw.model;
      this.x = this.raw.x;
      this.y = this.raw.y;
      this.z = this.raw.z;
      this.r = this.raw.r - 360;
      this.scale = this.raw.scale || 0;
      this.mesh = mw.models[this.model].clone();
      this.mesh.position.set(this.x, this.y, this.z);
      if (this.scale) {
        this.mesh.scale.set(this.scale, this.scale, this.scale);
      }

      /*rotWorldMatrix = new THREE.Matrix4()
      		rotWorldMatrix.makeRotationAxis new THREE.Vector3(0,0,1).normalize(), 0 * Math.PI / 180
      		rotWorldMatrix.multiply @mesh.matrix
      		@mesh.matrix = rotWorldMatrix
      		@mesh.rotation.setFromRotationMatrix @mesh.matrix
       */
      this.mesh.rotation.z = this.r * Math.PI / 180;
      mw.scene.add(this.mesh);
    }

    return Prop;

  })();

}).call(this);
