// Generated by CoffeeScript 1.9.1
(function() {
  mw.Terrain = (function() {
    function Terrain(x1, y1) {
      var b, g, h, i, j, mx, my, p, px, py, r, ref, x, y;
      this.x = x1;
      this.y = y1;
      this.maps();
      this.makemasks();
      this.geometry = new THREE.PlaneGeometry(8192, 8192, 64, 64);
      console.log(this.geometry.vertices.length);
      this.mx = mx = (this.x * 8192) + 4096;
      this.my = my = (this.y * 8192) + 4096;
      this.patches = mw.patches.clone();
      if (this.x === -2 && this.y === -9) {
        this.geometry = this.patches;

        /*mesh = new THREE.Mesh @geometry, new THREE.MeshBasicMaterial
        				wireframe: true#, map: mw.textures['tx_bc_mud.dds']
        			mesh.position.set mx, my, 0
        			mw.scene.add mesh
         */
      }

      /*else
      
      			mS = (new THREE.Matrix4()).identity()
      			mS.elements[0] = -1
      			mS.elements[10] = -1
      			@geometry.applyMatrix mS
      
      			mesh = new THREE.Mesh @geometry, mw.wireframe
      			mesh.position.set mx, my, 0
      			mw.scene.add mesh
       */
      for (i = j = 0, ref = this.geometry.vertices.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        x = this.geometry.vertices[i].x;
        y = this.geometry.vertices[i].y;
        px = (4096 + x) / 64;
        px /= 2;
        py = (4096 + y) / 64;
        py /= 2;
        p = ((py * 65) + px) * 4;
        r = this.heights[p];
        g = this.heights[p + 1];
        b = this.heights[p + 2];
        if (r === 255) {
          this.geometry.vertices[i].z = h;
          h = -(255 - b) + (255 * ((g - 255) / 8));
        } else if (g) {
          h = (255 * (g / 8)) + b;
        } else {
          h = b;
        }
        this.geometry.vertices[i].z = h;
      }
      this.mkground();
      true;
    }

    Terrain.prototype.mkground = function() {
      var m;
      m = new THREE.MeshBasicMaterial({
        map: mw.textures['tx_bc_mud.dds']
      });
      this.ground = new THREE.Mesh(this.geometry, this.splat());
      this.ground.position.set(this.mx, this.my, 0);
      mw.scene.add(this.ground);
      return true;
    };

    Terrain.prototype.maps = function() {
      var canvas, context, x, y;
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
      canvas.width = 65;
      canvas.height = 65;
      context.save();
      context.translate(1, 65);
      context.scale(1, -1);
      x = -(18 + this.x) * 64;
      y = -(27 - this.y) * 64;
      context.drawImage(mw.vvardenfell, x, y);
      context.getImageData(0, 0, 65, 65);
      this.heights = context.getImageData(0, 0, 65, 65).data;
      context.restore();
      context.drawImage(mw.vvardenfell, x, y);
      this.height = new THREE.Texture(canvas);
      this.height.needsUpdate = true;
      this.height.magFilter = THREE.NearestFilter;
      this.height.minFilter = THREE.LinearMipMapLinearFilter;
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
      canvas.width = 65;
      canvas.height = 65;
      context.restore();
      context.translate(1, 0);
      context.drawImage(mw.vclr, x, y);
      this.vclr = new THREE.Texture(canvas);
      this.vclr.needsUpdate = true;
      canvas = document.createElement('canvas');
      canvas.width = 18;
      canvas.height = 18;
      context = canvas.getContext('2d');
      context.translate(1, 1);
      context.drawImage(mw.vtex, x / 4, y / 4);
      this.blues = context.getImageData(0, 0, 18, 18).data;
      return true;
    };

    Terrain.prototype.makemasks = function() {
      var b, blues, canvas, color, context, data, i, j, k, l, len, len1, m, n, ref, ref1, ref2, t, v;
      this.masks = [];
      this.textures = [];
      blues = [];
      for (i = j = 0, ref = this.blues.length / 4; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        b = this.blues[(i * 4) + 2];
        if (blues.indexOf(b) === -1) {
          blues.push(b);
        }
      }
      color = 3;
      for (k = 0, len = blues.length; k < len; k++) {
        b = blues[k];
        this.textures.push(mw.textures[mw.blues[b] || 'cat.dds']);
        if (++color === 4) {
          canvas = document.createElement('canvas');
          $(canvas).attr('mw', "cell " + this.x + ", " + this.y);
          context = canvas.getContext('2d');
          canvas.width = 18;
          canvas.height = 18;
          color = 0;
          data = context.createImageData(18, 18);
          this.masks.push(canvas);
        }
        for (i = l = 0, ref1 = this.blues.length / 4; 0 <= ref1 ? l <= ref1 : l >= ref1; i = 0 <= ref1 ? ++l : --l) {
          v = this.blues[(i * 4) + 2];
          data.data[(i * 4) + color] = v === b ? 255 : 1;
        }
        context.putImageData(data, 0, 0);
      }
      ref2 = this.masks;
      for (i = n = 0, len1 = ref2.length; n < len1; i = ++n) {
        m = ref2[i];
        t = new THREE.Texture(m);
        t.needsUpdate = true;
        this.masks[i] = t;
      }
      console.log(blues.length + " blues for " + this.x + ", " + this.y);
      while (this.textures.length > 9) {
        this.textures.pop();
      }
      console.log(this.textures.length + " t length");
      return true;
    };

    Terrain.prototype.splat = function() {
      var material;
      material = new THREE.ShaderMaterial({
        uniforms: {
          vertexColour: {
            type: "t",
            value: this.vclr
          },
          uTextures: {
            type: "tv",
            value: this.textures
          },
          amount: {
            type: "i",
            value: this.textures.length
          },
          uMasks: {
            type: "tv",
            value: this.masks
          },
          fogColor: {
            type: "c",
            value: mw.scene.fog.color
          },
          fogDensity: {
            type: "f",
            value: mw.scene.fog.density
          },
          fogNear: {
            type: "f",
            value: mw.scene.fog.near
          },
          fogFar: {
            type: "f",
            value: mw.scene.fog.far
          }
        },
        vertexShader: document.getElementById('splatVertexShader').textContent,
        fragmentShader: document.getElementById('splatFragmentShader').textContent,
        fog: true,
        transparent: true,
        side: THREE.DoubleSide
      });
      return material;
    };

    return Terrain;

  })();

}).call(this);
