var dataMgr = (function(){
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
    var _isGameOver =  false;
    var _downBrickSpeed = 200; // 砖块下降速度
    var _spBricks = []; //

    that.setGameStart = function() {
        _spBricks = [];
        _isGameOver = false;
    };
    that.setGameOver = function() {
        _isGameOver = true;
    };

    that.addDownBrickSpeed = function(value) {
       _downBrickSpeed += 10;
       cc.log("_downBrickSpeed = " + _downBrickSpeed);
    };
    that.getDownSpeed = function() {
        return _downBrickSpeed;
    };
    that.setDownSpeed = function(speed) {
        _downBrickSpeed = speed;
    };
    that.getTopSpeed = function() {
        return 500;
    };

    that.newGroupBrickBornTime = function() {
        return 
    };

    that.pushBackBrick2List = function (spBrick) {
        _spBricks.push(spBrick);
       // cc.log("_spBricks.length = %d", _spBricks.length);
    };

    that.getBrickListLength = function() {
        return _spBricks.length;
    };
    that.getLastBrickSprite = function() {
        if (_spBricks.length > 0) {
            return  _spBricks[_spBricks.length - 1];
        }
        return null;
    };
    that.getFirstBrickSpriteByIndex = function(index) {
        if (_spBricks.length > 0) {
            return  _spBricks[index];
        }
        return null;
    };

    that.isFirstGroup = function(spBrick) {
        if (_spBricks.length > 3) {
            for (var i = 0; i < 4; ++i) {
                if (_spBricks[i] === spBrick) {
                    return i;
                } 
            } 
         } else {
             return 0;
         } 
         return -1;
    };

    function removeFirstBrickGroupFromList() {
        _spBricks.shift();
    }

    that.removeFirstBrockGroup = function() {
        removeFirstBrickGroupFromList();
    };  

    
    cls.prototype = that;

    return {
        getInstance: getInstance
    }
})();

module.exports = dataMgr;