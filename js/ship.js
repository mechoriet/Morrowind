// Generated by CoffeeScript 1.10.0
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  mw.Ship = (function(superClass) {
    extend(Ship, superClass);

    function Ship(data) {
      Ship.__super__.constructor.call(this, data);
      this.type = 'Ship';
      mw.ship = this;
      this.nodes = [
        {
          x: -8768.043459278077,
          y: -76317.46448975372,
          z: 214.69864753075956
        }, {
          x: -11008.29662446419,
          y: -77440.86070491183,
          z: 208.28192393984938
        }, {
          x: -15064.698398200067,
          y: -78235.1147036306,
          z: 311.9163745306073
        }, {
          x: -17700.894481160587,
          y: -72703.35435825039,
          z: 121.48177096281158
        }, {
          x: -21053.005749845994,
          y: -71397.26995136919,
          z: 155.7574808565444
        }
      ];
      this.nodes.unshift({
        x: this.x,
        y: this.y,
        z: this.z
      });
      this.boxes();
      this.node = 0;
      this.goal = 1;
      this.linear = {
        heave: 0,
        sway: 0,
        surge: 0
      };
      this.rotations = {
        pitch: {
          value: 0,
          period: 0
        },
        roll: {
          value: 0,
          period: 0
        },
        yaw: {
          value: 0,
          period: 0
        }
      };
      this.seakeeping = this.mesh.children[0].matrix;
      this.quo = this.seakeeping;
    }

    Ship.prototype.boxes = function() {
      var g, i, len, m, mesh, n, ref;
      ref = this.nodes;
      for (i = 0, len = ref.length; i < len; i++) {
        n = ref[i];
        g = new THREE.BoxGeometry(100, 100, 100);
        m = new THREE.MeshBasicMaterial({
          color: 0xcc0000
        });
        mesh = new THREE.Mesh(g, m);
        mesh.position.set(n.x, n.y, 0);
        mw.scene.add(mesh);
      }
      return 0;
    };

    Ship.prototype.wiggle = function() {
      var pitch, roll, yaw;
      roll = this.rotations.roll.value;
      pitch = this.rotations.pitch.value;
      yaw = this.rotations.yaw.value;
      this.mesh.rotation.x = roll + -pitch;
      this.mesh.rotation.y = roll + pitch;
    };

    Ship.prototype.step = function() {
      var r, x, y;
      Ship.__super__.step.apply(this, arguments);
      this.renode();
      x = this.x;
      y = this.y;
      r = this.r;
      this.rock();
      this.pose();
      this.wiggle();
      this.x = x;
      this.y = y;
      this.r = r;
    };

    Ship.prototype.rock = function() {
      var lin, rot;
      rot = this.rotations;
      lin = this.linear;
      this.pitch();
      this.roll();
      this.yaw();
      this.r += rot.yaw.value;
      return 0;
    };

    Ship.prototype.yaw = function() {
      var yaw;
      yaw = this.rotations.yaw;
      yaw.period += 0.01 * mw.timestep;
      if (yaw.period > Math.PI * 2) {
        yaw.period -= Math.PI * 2;
      }
      yaw.value = 0.1 * Math.cos(yaw.period);
      return 0;
    };

    Ship.prototype.pitch = function() {
      var pitch;
      pitch = this.rotations.pitch;
      pitch.period += 0.008 * mw.timestep;
      if (pitch.period > Math.PI * 2) {
        pitch.period -= Math.PI * 2;
      }
      pitch.value = 0.015 * Math.cos(pitch.period);
      return 0;
    };

    Ship.prototype.roll = function() {
      var roll;
      roll = this.rotations.roll;
      roll.period += 0.01 * mw.timestep;
      if (roll.period > Math.PI * 2) {
        roll.period -= Math.PI * 2;
      }
      roll.value = 0.025 * Math.cos(roll.period);
      return 0;
    };

    Ship.prototype.renode = function() {
      var buoy, diff, goal, knot, node, pitch, radians, range, x, y, yaw;
      if (this.node === this.goal) {
        return;
      }
      node = this.nodes[this.node];
      goal = this.nodes[this.goal];
      knot = 10 * mw.timestep;
      buoy = Math.atan2(goal.y - this.y, goal.x - this.x);
      radians = this.r * (Math.PI / 180) - Math.PI / 2;
      yaw = knot / 1000;
      pitch = Math.atan2(Math.sin(radians), Math.cos(radians));
      buoy = Math.atan2(Math.sin(buoy), Math.cos(buoy));
      console.log((pitch * 180 / Math.PI) + " and " + (buoy * 180 / Math.PI));
      diff = Math.atan2(Math.sin(pitch - buoy), Math.cos(pitch - buoy));
      if (diff > yaw) {
        this.r -= yaw * (180 / Math.PI);
      } else if (diff < yaw) {
        this.r += yaw * (180 / Math.PI);
      }
      this.x += knot * Math.cos(radians);
      this.y += knot * Math.sin(radians);
      x = Math.abs(goal.x - this.x);
      y = Math.abs(goal.y - this.y);
      range = Math.hypot(x, y);
      if (range <= 50) {
        console.log('next goal');
        this.node = this.goal;
        if (this.goal + 1 < this.nodes.length) {
          this.goal++;
        } else {
          this.goal = 0;
        }
      }
      return false;
    };

    return Ship;

  })(mw.Prop);

}).call(this);
