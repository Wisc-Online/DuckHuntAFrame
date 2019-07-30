AFRAME.registerComponent('duck', {
    'schema' : {

    },
    'init' : function(){
        

        this.el.addEventListener('click', function(evt){
            console.log('You clicked me!')
        });

    }
});