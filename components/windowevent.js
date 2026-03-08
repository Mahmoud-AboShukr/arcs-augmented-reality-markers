import ARCS from '../build/arcs.js';        

let WindowEvent;

WindowEvent = ARCS.Component.create( 
    function () {
        let self= this;
                        
        window.onresize = function() { 
            self.emit("onResize",window.innerWidth, window.innerHeight);
        };
    },
    [],
    ["onResize"]
);
        

export default { WindowEvent: WindowEvent};
