AFRAME.registerSystem('duck-hunt', {
    schema: {
        startButton: {
            type: 'selector',
            default: null
        },
        startScreenElements: {
            type: 'selectorAll',
        }
    },
    init: function () {

        var self = this;

        self.sound = this.sceneEl.components['sound'];

        self.utils = {
            show: function (el) {
                el.setAttribute("visible", "true");
            },
            hide: function (el) {
                el.setAttribute("visible", "false");
            }
        };

        self.startScreen = {
            handleStartButtonClick: function () {
                console.log("you clicked start!");

                self.startScreen.end();
            },
            start: function () {
                
                self.sound.playSound();
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