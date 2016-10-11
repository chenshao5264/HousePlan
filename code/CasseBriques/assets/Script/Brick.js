var dataMgr = require('DataMgr');
var TOPSPEED = 500;
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
        this.moveSpeed = 0;
        this.isEnd = false;
    },

    init: function(brickType, speed) {
        this.brickType = brickType;
        if (brickType == 0) {
            this.moveSpeed = -speed;
        } else {
            this.moveSpeed = TOPSPEED;
        }
    },

    onCollisionEnter: function (other, self) {
        if (this.brickType == 0) {
            cc.log("onCollisionEnter0");
        } else {
            if (other.node.group === "BottomWall") {
                dataMgr.getInstance().isGameOver = true;
            }
        }
        
    },

    //  onCollisionStay: function (other, self) {
    //      cc.log("onCollisionStay");
    //  },

     onCollisionExit: function (other) {
         if (this.brickType == 0) {
            if (other.node.group === "Wall") {
                this.node.destroy();
            }
         } else {
             if (other.node.group === "Wall") {
                var parent = this.node.getParent();
                parent.emit("brickcount");
                //this.moveSpeed = 0;
            } 
         }
     },

    moveTop: function(dt) {
        this.node.y += dt * this.moveSpeed;
    },

    moveDown: function(dt) {
        this.node.y -= dt * this.moveSpeed;
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         if (dataMgr.getInstance().isGameOver) {
             return;
         }
         if (this.brickType == 0) {
            this.moveTop(dt);
         } else {
            this.moveDown(dt);
         } 
     },
});
