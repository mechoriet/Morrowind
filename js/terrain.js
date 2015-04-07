// Generated by CoffeeScript 1.9.1
(function() {
  mw.Terrain = (function() {
    function Terrain(x1, y1) {
      var b, g, h, i, j, mx, my, p, px, py, r, ref, x, y;
      this.x = x1;
      this.y = y1;
      this.maps();
      this.geometry = new THREE.PlaneGeometry(4096 * 2, 4096 * 2, 64, 64);
      this.mx = mx = (this.x * 8192) + 4096;
      this.my = my = (this.y * 8192) + 4096;
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
      this.ground = new THREE.Mesh(this.geometry, this.splat());
      this.ground.position.set(this.mx, this.my, 0);
      return mw.scene.add(this.ground);
    };

    Terrain.prototype.maps = function() {
      var canvas, context, x, y;
      canvas = document.createElement('canvas');
      canvas.width = 65;
      canvas.height = 65;
      context = canvas.getContext('2d');
      context.save();
      context.translate(0, 65);
      context.scale(1, -1);
      x = -(18 + this.x) * 64;
      y = -(27 - this.y) * 64;
      context.drawImage(mw.vvardenfell, x, y);
      context.getImageData(0, 0, 65, 65);
      this.heights = context.getImageData(0, 0, 65, 65).data;
      context.drawImage(mw.vclr, x, y);
      this.vclr = new THREE.Texture(canvas);
      this.vclr.needsUpdate = true;
      this.vclr.magFilter = THREE.NearestFilter;
      this.vclr.minFilter = THREE.LinearMipMapLinearFilter;
      canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
      canvas.width = 16;
      canvas.height = 16;
      context = canvas.getContext('2d');
      context.drawImage(mw.vtex, x / 4, y / 4);
      this.vtex = new THREE.Texture(canvas);
      this.vtex.needsUpdate = true;
      this.vtex.magFilter = THREE.NearestFilter;
      this.vtex.minFilter = THREE.LinearMipMapLinearFilter;
      return true;
    };

    Terrain.prototype.splat = function() {
      var a, b, material;
      a = new THREE.ImageUtils.loadTexture('cloud.png');
      a.wrapS = a.wrapT = THREE.RepeatWrapping;
      a.repeat.set(64, 64);
      b = new THREE.ImageUtils.loadTexture('water.jpg');
      b.wrapS = b.wrapT = THREE.RepeatWrapping;
      b.repeat.set(64, 64);
      material = new THREE.ShaderMaterial({
        uniforms: {
          texturePlacement: {
            type: "t",
            value: this.vtex
          },
          vertexColour: {
            type: "t",
            value: this.vclr
          },
          mossTexture: {
            type: "t",
            value: mw.textures['models/tx_bc_moss.tga']
          },
          dirtTexture: {
            type: "t",
            value: mw.textures['models/tx_bc_dirt.tga']
          }
        },
        vertexShader: document.getElementById('splatVertexShader').textContent,
        fragmentShader: document.getElementById('splatFragmentShader').textContent,
        transparent: true
      });
      return material;
      return true;
    };

    return Terrain;

  })();

}).call(this);
