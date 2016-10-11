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
        cc.log("new gamefsm");
    }

    var that = {};
    that.GameStart = function() {
        dataMgr.getInstance().setIsGameOver(false);
    };
    that.GameOver = function() {
        dataMgr.getInstance().setIsGameOver(true);
    };

    cls.prototype = that;
    return {
        getInstance: getInstance
    }
})();

module.exports = gamefsm;