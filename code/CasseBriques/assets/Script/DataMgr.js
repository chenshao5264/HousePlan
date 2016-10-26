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
    var _downBrickSpeed = 50; // 砖块下降速度
    var _spBricks = []; //

    that.setGameStart = function() {
        _spBricks = [];
        _isGameOver = false;
    };
    that.setGameOver = function() {
        _isGameOver = true;
    };

    that.addDownBrickSpeed = function(value) {
       _downBrickSpeed += 5;
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
    that.getBrickSpriteByIndex = function(index) {
        if (_spBricks.length > 0) {
            return  _spBricks[index];
        }
        return null;
    };

    that.removeGroupByRowIndex = function(row) {
         var bIndex = row * 3 + row;
         _spBricks.splice(bIndex, 4);
    };

    //< 检测是否为完整的一行
    that.checkFullGroup = function(row, areaTag, spBrick) {
       var isFull = true;
       if (row == -1) {
            for (var i = 0; i < 4; ++i) {
                _spBricks.unshift(null);
            }
            _spBricks[areaTag] = spBrick;
            isFull = false;
       } else {
            var fillIndex = row * 4 + areaTag;
            _spBricks[fillIndex] = spBrick;

            //< 具体检测
            var bIndex = row * 3 + row;
            for (var i = bIndex; i < 4 + bIndex; ++i) {
               if (_spBricks[i] === null) {
                   isFull = false;
               }
            }
       }

       return isFull;
    };


    that.getFirstBrick = function() {
        var spBrick 
        for (var i = 0; i < 4; ++i){
            if (_spBricks[i]) {
                spBrick = _spBricks[i];
                break;
            }
        }
        return spBrick;
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