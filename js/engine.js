// Generated by CoffeeScript 1.10.0
(function() {
  var clock, onDocumentMouseMove, onWindowResize, render, windowHalfX, windowHalfY;

  mw.mouseX = 0;

  mw.mouseY = 0;

  windowHalfX = window.innerWidth / 2;

  windowHalfY = window.innerHeight / 2;

  mw.boot = function() {
    var AmbientSunrise, SunDay, SunSunrise, container, cube, g, m, wisp;
    container = document.createElement('div');
    document.body.appendChild(container);
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 20, 100000);
    this.camera.position.set(-13088.357563362384, -70417.86172521245, 675.7888756651994);
    this.camera.up = new THREE.Vector3(0, 0, 1);
    this.controls = new THREE.FirstPersonControls(this.camera);
    this.controls.movementSpeed = 1000;
    this.controls.lookSpeed = 0.25;
    this.scene = new THREE.Scene;
    this.scene.fog = new THREE.Fog(0xefd1b5, 2500, 10000);
    AmbientSunrise = 0x424a57;
    this.AmbientDay = 0x8991a0;
    SunSunrise = 0xf1b163;
    SunDay = 0xffecdd;
    this.scene.add(new THREE.AmbientLight(this.AmbientDay));
    this.sun = new THREE.DirectionalLight(SunDay, 1);
    this.sun.name = 'Sun ^^';
    this.sun.position.set(-600, 300, 600);

    /*@sun.castShadow = true
    	@sun.shadow.darkness = 1;
    	@sun.shadow.camera.near = 45;
    	@sun.shadow.camera.far = 10000;
    	@sun.shadow.camera.right = 15;
    	@sun.shadow.camera.left = - 15;
    	@sun.shadow.camera.top	= 15;
    	@sun.shadow.camera.bottom = - 15;
    	@sun.shadow.mapSize.width = 1024;
    	@sun.shadow.mapSize.height = 1024;
    	@scene.add @sun
    	@scene.add new THREE.CameraHelper @sun.shadow.camera
     */
    wisp = new THREE.SpotLight(0x0000cc);
    wisp.name = 'Zrrvrbbr';
    wisp.penumbra = 0.3;
    wisp.position.set(-10894, -71081, 1760);
    wisp.target.position.set(-11374, -70615, 642);
    this.scene.add(wisp.target);
    wisp.castShadow = true;
    wisp.shadow.camera.near = 8;
    wisp.shadow.camera.far = 3000;
    wisp.shadow.mapSize.width = 1024;
    wisp.shadow.mapSize.height = 1024;
    this.scene.add(wisp);
    this.scene.add(new THREE.CameraHelper(wisp.shadow.camera));
    this.wisp = wisp;
    m = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      shininess: 150,
      specular: 0x222222,
      shading: THREE.SmoothShading
    });
    g = new THREE.BoxGeometry(100, 100, 100);
    cube = new THREE.Mesh(g, m);
    cube.position.set(-11224, -70869, 645);
    cube.castShadow = true;
    cube.receiveShadow = true;
    this.scene.add(cube);
    ({
      x: -11224.409544363627,
      y: -70869.48690196892,
      z: 645.6708242280615
    });
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader);
    this.renderer = new THREE.WebGLRenderer;
    this.maxAnisotropy = this.renderer.getMaxAnisotropy();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
    container.appendChild(this.stats.domElement);
    container.appendChild(this.renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
    this.clock = new THREE.Clock();
    return true;
  };

  onWindowResize = function() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    mw.camera.aspect = window.innerWidth / window.innerHeight;
    mw.camera.updateProjectionMatrix();
    mw.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  onDocumentMouseMove = function(event) {
    mw.mouseX = (event.clientX - windowHalfX) * 2;
    mw.mouseY = (event.clientY - windowHalfY) * 2;
  };

  mw.animate = function() {
    var i, j, k, len, ref;
    requestAnimationFrame(mw.animate);
    mw.delta = mw.clock.getDelta();
    if (!mw.freeze) {
      mw.controls.update(mw.delta);
    }
    if (mw.keys[77] === 1) {
      mw.freeze = !mw.freeze;
    }
    if (mw.world) {
      mw.world.step();
    }
    if (mw.water) {
      mw.water.material.uniforms.time.value += 1.0 / 60.0;
    }
    render.call(mw);
    mw.stats.update();
    ref = mw.keys;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      k = ref[i];
      if (k) {
        mw.keys[i] = 2;
      }
    }
  };

  clock = new THREE.Clock();

  render = function() {
    var angle;
    angle = Date.now() / 200 * Math.PI;
    if (mw.water) {
      mw.water.render();
    }
    THREE.AnimationHandler.update(clock.getDelta());
    this.renderer.render(this.scene, this.camera);
  };

}).call(this);
