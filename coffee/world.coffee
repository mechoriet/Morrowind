class mw.World
	constructor: (@data) ->

		@x = -2
		@y = -9

		@cells = []

		#for i in [0..8]
			#@cells.push new mw.Cell @x + mw.circle[i].x, @y + mw.circle[i].y
		new mw.Cell @x, @y

		#if mw.models
		#	true
		
		#@doskybox()

		@props = []
		@cached = 0
		@queue = 0

		for p in @data
			if typeof p is "object"
				@cache p.model

		@watershed()

	doskybox: ->

		#imagePrefix = "models/dawnmountain-";
		#directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
		#imageSuffix = ".png";
		geometry = new THREE.CubeGeometry 8192*2, 8192*2, 8192*2
		
		loader = new THREE.TGALoader
		loader.load 'models/tx_sky_clear.tga', (asd) ->
			asd.wrapS = asd.wrapT = THREE.RepeatWrapping
			#asd.repeat.set 1, 1

			array = []
			for i in [0..5]
				array.push new THREE.MeshBasicMaterial
					map: asd
					side: THREE.BackSide

			material = new THREE.MeshFaceMaterial array
			@skybox = new THREE.Mesh geometry, material
			@skybox.position.set mw.terrain.mx, mw.terrain.my, -500
			mw.scene.add @skybox
	
		true

	cachcb: () ->
		@cached++
		if @cached >= @queue
			@ransack()

		true

	ransack: () ->
		for p in @data
			if typeof p is "object"
				@props.push new mw.Prop p

		true

	cache: (model) ->
		@queue++
		cb = (object) ->
			mw.models[model] = object
			for c, i in object.children
				if c.material.map
					c.material.map.needsUpdate = true
					c.material.map.onUpdate = ->
						if @wrapS isnt THREE.RepeatWrapping or @wrapT isnt THREE.RepeatWrapping
							@wrapS = THREE.RepeatWrapping
							@wrapT = THREE.RepeatWrapping
							@needsUpdate = true
			mw.world.cachcb()

		# console.log loader
		loader = new THREE.OBJMTLLoader
		loader.load "models/#{model}.obj", "models/#{model}.mtl", cb

		true

	watershed: ->
		@mirror = new THREE.Mirror mw.renderer, mw.camera, clipBias: 0.003, textureWidth: 1024, textureHeight: 1024, color: 0x777777

		geometry = new THREE.PlaneBufferGeometry 8192*6, 8192*6, 64, 64
		
		@water = new THREE.Mesh geometry, @mirror.material
		@water.add @mirror

		x = (@x * 8192) + 4096 - 128
		y = (@y * 8192) + 4096 + 128

		@water.position.set x, y, 0

		mw.scene.add @water

		console.log 'added water'

		true