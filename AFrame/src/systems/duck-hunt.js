AFRAME.registerSystem('duck-hunt', {
    schema: {
        startButton: {
            type: 'selector',
            default: null
        },
        startScreenElements: {
            type: 'selectorAll'
        }
    },
    init: function () {

        var self = this;

        self.utils = {
            show: function (el) {
                el.setAttribute("visible", "true");
            }
        };

        self.startScreen = {
            handleStartButtonClick: function () {
                console.log("you clicked start!");
            },
            show: function () {
                self.data.startButton.addEventListener("click", self.startScreen.handleStartButtonClick);

                if (self.data.startScreenElements) {
                    for (var i = 0; i < self.data.startScreenElements.length; ++i) {
                        self.utils.show(self.data.startScreenElements[i]);
                    }
                }
            },
            hide: function () {
                self.data.startButton.removeEventListener("click", this.startScreen.handleStartButtonClick);
            }
        }


        this.startScreen.show();
    },
    pause: function () {

    },
    play: function () {

    },
    tick: function () {

    },


});