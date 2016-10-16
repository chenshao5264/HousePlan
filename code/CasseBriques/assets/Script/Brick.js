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
        this.isEnd = false;
    },

    init: function(brickType, areaTag) {
       this.brickType = brickType;
       this.areaTag = areaTag
       this.parent = this.node.getParent();
       this.isCheckEmit = false;
    },

    moveTop: function(dt) {
       
        this.node.y += dt * dataMgr.getInstance().getTopSpeed();

        this.checkCollision();
    },

    moveDown: function(dt) {
        //cc.log("this.node.y = %d", this.node.y);

        if (!this.isCheckEmit && this.node.y <= 400) {
            if (this.parent) {
                 this.parent.emit("newgroup");
                 this.isCheckEmit = true;
            }
        }

        if (this.node.y <= -200) {
            //dataMgr.getInstance().setDownSpeed(0);
            gameFSM.getInstance().GameOver();
            return;
        } 

        var tmpFlag = dataMgr.getInstance().isFirstGroup(this.node);
       if (tmpFlag >= 0){
            this.node.y -= dt * dataMgr.getInstance().getDownSpeed();
            for (var i = 4; i < 100000; i += 4) {
                var sp = dataMgr.getInstance().getFirstBrickSpriteByIndex(i + tmpFlag);
                if (sp) {
                     sp.y = this.node.y + sp.height * (Math.floor(i / 4));
                } else {
                    break;
                }
            }
       } 
    },

    checkCollision: function() {
        var curAreaTag = this.areaTag;
        var spBrick = dataMgr.getInstance().getFirstBrickSpriteByIndex(curAreaTag);
        var curTargetPosY = this.node.y;
        var goalTargetPosY = spBrick.y;

        if (spBrick.opacity !== 0) {
            if (goalTargetPosY - curTargetPosY <= spBrick.height) {
                this.brickType = 1;
                return true;
            }
        } else {
            if (goalTargetPosY - curTargetPosY <= 0) {
                this.brickType = 1;
                 return true;
            }
        }
        return false;
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         if ( gameFSM.getInstance().state === 0){
            // cc.log("this.areaTag = " + this.areaTag);
             return;
         }
         if (this.brickType === 0) {
            this.moveTop(dt);
         } else {
            this.moveDown(dt);
         } 
     },
});
