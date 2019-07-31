AFRAME.registerComponent('duck', {
    'schema': {
        'speed': {
            default: 0,
            type: 'number'
        },
        'minDistance': {
            default: 1,
            type: 'number'
        },
        'maxDistance': {
            default: 10,
            type: 'number'
        },
        'minHeight': {
            default: 0,
            type: 'number'
        },
        'camera': {
            default: null,
            type: 'selector'
        },

    },
    'init': function () {


    },
    'tick': function (time, timeDelta) {


        var oldPosition = this.el.object3D.position.clone();

        var deltaZ = timeDelta * this.data.speed;

        this.el.object3D.translateZ(deltaZ);

        var nextPosition = new THREE.Vector3();
        this.el.object3D.getWorldPosition(nextPosition);

        var cameraPosition = new THREE.Vector3();
        this.camera.el.object3D.getWorldPosition(cameraPosition);

        var distanceToCamera2 = cameraPosition.distanceToSquared(nextPosition);

        var maxDistance2 = Math.pow(this.data.maxDistance, 2);
        var minDistance2 = Math.pow(this.data.minDistance, 2);

        if (nextPosition.y < this.data.minHeight || distanceToCamera2 > maxDistance2 || distanceToCamera2 < minDistance2) {

            this.el.object3D.translateZ(-deltaZ);

            // rotate a random amount
            var halfPi = Math.PI / 2;
            this.el.object3D.rotateX(Math.random() * halfPi).rotateY(Math.random() * halfPi).rotateZ(Math.random() * halfPi);

        }
    },
    'play': function () {
        this.camera = this.data.camera || this.el.sceneEl.camera;


        this.el.addEventListener('click', this.eventHandlers.onClick);
    },
    'pause': function () {
        this.el.removeEventListener('click', this.eventHandlers.onClick);
    },
    'eventHandlers': {
        'onClick': function () {
            console.log("you clicked me");
        }
    }
});