AFRAME.registerSystem('duck-hunt', {
    schema: {
        startButton: {
            type: 'selector',
            default: null
        },
        startScreenElements: {
            type: 'selectorAll',
        },
        titleScreenMusic : {
            type: 'audio'
        }
    },
    init: function () {

        var self = this;

        var sceneEl = this.sceneEl;


        (function(){
            var soundEl = document.createElement("a-entity");


            soundEl.setAttribute("sound", AFRAME.utils.styleParser.stringify({
                positional: false,
                autoplay: false
            }));

            sceneEl.appendChild(soundEl);

            self.sound = soundEl.components.sound;
        })();


        self.utils = {
            show: function (el) {
                el.setAttribute("visible", "true");
            },
            hide: function (el) {
                el.setAttribute("visible", "false");
            }
        };

        function getComponent(el, componentName){
            if (el && el.components && el.components[componentName]){
                return el.components[componentName]
            }
            return null;
        }

        function playSound(path){
            if (self.sound && path){
                AFRAME.utils.entity.setComponentProperty(self.sound.el, 'sound.src', "url(" + path + ")");
                //self.sound.src = path;
                self.sound.playSound();
            }
        }

        self.startScreen = {
            handleStartButtonClick: function () {
                console.log("you clicked start!");

                self.startScreen.end();
            },
            start: function () {
                
                playSound(self.data.titleScreenMusic);

                self.data.startButton.addEventListener("click", self.startScreen.handleStartButtonClick);

                if (self.data.startScreenElements) {
                    for (var i = 0; i < self.data.startScreenElements.length; ++i) {
                        self.utils.show(self.data.startScreenElements[i]);
                    }
                }
            },
            end: function () {

                self.data.startButton.removeEventListener("click", self.startScreen.handleStartButtonClick);

                if (self.data.startScreenElements) {
                    for (var i = 0; i < self.data.startScreenElements.length; ++i) {
                        self.utils.hide(self.data.startScreenElements[i]);
                    }
                }
            }
        }

        self.levelIntroScreen = {
            start: function(){
                // show the animation of the dog jumping into the grass

                setTimeout(self.levelIntroScreen.end, 5000);
            },
            end: function(){
                // hide the dog


            }
        }

        self.duckHuntScreen = {
            start : function(){

            },
            end: function(){

            }
        }

        


        this.startScreen.start();
    },
    pause: function () {
        
    },
    play: function () {
        // show start screen, wait for user to choose start
        
        // show dog animation (jump into field) with round number
        
        // spawn a duck, give the user 3 shots (or XXX second timeout --> duck flies away)

        // dog retrieves duck or dog laughs at you

        // spawn another duck..  (repeat)

    },
    tick: function () {

    },


});