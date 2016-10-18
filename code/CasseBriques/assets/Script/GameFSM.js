var dataMgr = require('DataMgr');

var gamefsm = (function(){
    var unique = null;

    function getInstance(){
        if (unique === null) {
            unique = new cls();
        }
        return unique;
    }

    function cls() {

    }

    var that = {};
    var _eventDispatchNode = null;

    that.state = 0;
    that.GameStart = function() {
        cc.log("game start");
        this.state = 1;
        dataMgr.getInstance().setGameStart(false);
    };
    that.GameOver = function() {
        if (this.state === 0) {
            return;
        }
        cc.log("game over");
        this.state = 0;
        dataMgr.getInstance().setGameOver(true);
        _eventDispatchNode.emit("evt_game_over");
    };
    
   
    that.setEventDispatchNode = function(node) {
        _eventDispatchNode = node;
    };

    cls.prototype = that;
    return {
        getInstance: getInstance
    }
})();

module.exports = gamefsm;