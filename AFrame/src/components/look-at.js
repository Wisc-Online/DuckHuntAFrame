AFRAME.registerComponent('look-at', {
    'schema': {
        'target': {
            default: "[camera], a-camera",
            type: 'selector'
        }
    },
    'tick': function (time, timeDelta) {
        if (this.data.target){
            var targetPosition = new THREE.Vector3();

            this.data.target.object3D.getWorldPosition(targetPosition);

            this.el.object3D.lookAt(targetPosition);
        }
    }
});

