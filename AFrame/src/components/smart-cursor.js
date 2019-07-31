AFRAME.registerComponent('smart-cursor', {
    'dependencies': ['cursor', 'tracked-controls'],
    'schema': {
        'retical': {
            default: null,
            type: 'selector'
        }
    },
    'init': function () {

        var data = this.data;

        var el = this.el;

        window.addEventListener("gamepadconnected", function (e) {
            updateCursor();
        });

        window.addEventListener("gamepaddisconnected", function (e) {
            updateCursor();
        });

        function showRetical(disableFuse) {
            var r = data.retical.components['cursor'];

            r.el.setAttribute('visible', true);
            r.play();

            el.setAttribute('cursor', 'rayOrigin', null);
            r.el.setAttribute("fuse", !disableFuse);
        }

        function hideRetical() {
            var r = data.retical.components['cursor'];

            r.el.setAttribute('visible', false);
            r.pause();

            el.setAttribute('cursor', 'rayOrigin', 'mouse');
        }

        var scene = this.el.sceneEl;

        function updateCursor() {
            var isVR = scene.is('vr-mode');

            if (isVR) {

                // see if the user has a pointing device (other than mouse)
                var hasPointer = false;

                var gamePads = navigator.getGamepads();

                for (var i = 0; i < gamePads.length; ++i) {
                    if (gamePads[i] && gamePads[i].pose && gamePads[i].pose.hasOrientation) {
                        hasPointer = true;
                        break;
                    }
                }

                if (hasPointer) {
                    // user has a "native" pointing device, hide the retical
                    hideRetical();
                }
                else {
                    // user does not have a pointing device, show the retical
                    showRetical();
                }
            }
            else {
                // assume the user has a pointing device (mouse), let the user use it and hide the retical

                // see if pointer-lock is enabled.  If so, then show the retical

                if (document.pointerLockElement || document.mozPointerLockElement) {
                    showRetical(true);
                }
                else {
                    hideRetical();
                }
            }
        }

        scene.addEventListener('enter-vr', function () {
            updateCursor();
        });

        scene.addEventListener('exit-vr', function () {
            updateCursor();
        });

        scene.addEventListener('loaded', function () {
            updateCursor();
        });

        if ("onpointerlockchange" in document) {
            document.addEventListener('pointerlockchange', updateCursor, false);
        } else if ("onmozpointerlockchange" in document) {
            document.addEventListener('mozpointerlockchange', updateCursor, false);
        }

        function lockChangeAlert() {
            if (document.pointerLockElement ||
                document.mozPointerLockElement) {
                console.log('The pointer lock status is now locked');
                // Do something useful in response
            } else {
                console.log('The pointer lock status is now unlocked');
                // Do something useful in response
            }
        }
    }
});