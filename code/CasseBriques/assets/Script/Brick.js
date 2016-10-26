var dataMgr = require('DataMgr');
var gameFSM = require('GameFSM');
// var BrickType = cc.Enum({
//    Down2Top: 0,
//    Top2Down: 1,
// });


cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        this.brickType = 0;
    },

    init: function(brickType, areaTag) {
       this.brickType = brickType;
       this.areaTag = areaTag
    },

    moveTop: function(dt) {
        this.node.y += dt * dataMgr.getInstance().getTopSpeed();

        this.checkCollision();
    },

    checkCollision: function() {
        var curTarget = this.node;
        var areaTag = this.areaTag;
        var length = dataMgr.getInstance().getBrickListLength() / 4;
        var spBrick = null;
        var row = -1;
        for (var i = 0; i < length; ++i){
            spBrick = dataMgr.getInstance().getBrickSpriteByIndex(areaTag + i * 4);
            if (spBrick) {
                row = i;
                break;
            }
        }

       
        if(spBrick) {
            if (spBrick.y - curTarget.y <= curTarget.height) {
                this.brickType = 1;
                curTarget.y = spBrick.y - curTarget.height;
                
                row = row - 1;
                //cc.log("row = %d", row);
                var isFull = dataMgr.getInstance().checkFullGroup(row, areaTag, curTarget);
                //cc.log("isFull = ", isFull);

                if (isFull) {
                    var parent = curTarget.getParent();
                    parent.emit("evt_eliminate", {msg: row});
                }
            }
        }
    },


    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
          if (this.brickType === 0) {
            this.moveTop(dt);
         }
     },
});
