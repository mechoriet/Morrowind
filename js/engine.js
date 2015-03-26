// Generated by CoffeeScript 1.9.1
(function() {
  var animate, onDocumentMouseMove, render;

  mw.boot = function() {
    var container;
    container = document.createElement('div');
    document.body.appendChild(container);
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.z = 100;
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(0x444444));
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader);
    this.renderer = new THREE.WebGLRenderer;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    animate.call(this);
    return true;
  };

  onDocumentMouseMove = function(event) {
    var windowHalfX, windowHalfY;
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    mw.mouseX = (event.clientX - windowHalfX) / 2;
    mw.mouseY = (event.clientY - windowHalfY) / 2;
    return true;
  };

  animate = function() {
    requestAnimationFrame(animate);
    render.call(mw);
    return true;
  };

  render = function() {
    this.camera.position.x += (this.mouseX - this.camera.position.x) * .05;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * .05;
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
    return true;
  };

}).call(this);
