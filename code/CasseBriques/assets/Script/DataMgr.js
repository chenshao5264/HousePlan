var dataMgr = (function(){
    var unique = null;
    function getInstance(){
        if (unique === null) {
            unique = new cls();
        }
        return unique;
    }
    function cls() {
        cc.log("new dataMgr");
    }

    var that = {};
    var _isGameOver =  false;
    var _downBrickSpeed = 100;

    that.getIsGameOver = function() {
        return _isGameOver;
    };
    that.setIsGameOver = function(value) {
       _isGameOver = value;
    };
    that.addDownBrickSpeed = function(value) {
       _downBrickSpeed += 10;
       cc.log("_downBrickSpeed = " + _downBrickSpeed);
    };
    that.getDownSpeed = function() {
        return _downBrickSpeed;
    };
     that.getTopSpeed = function() {
        return 500;
    };

    
    cls.prototype = that;

    return {
        getInstance: getInstance
    }
})();

module.exports = dataMgr;