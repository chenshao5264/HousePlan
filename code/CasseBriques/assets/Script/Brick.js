var dataMgr = require('DataMgr');

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

    init: function(brickType, speed) {
        this.brickType = brickType;
        if (brickType == 0) {
            this.moveSpeed = TOPSPEED;
        } else {
            this.moveSpeed = -speed;
        }
    },

    onCollisionEnter: function (other, self) {
        if (this.brickType == 0) {
          
        } else {
            if (other.node.group === "BottomWall") {
               
            }
        }
        
    },

    //  onCollisionStay: function (other, self) {
    //      cc.log("onCollisionStay");
    //  },

     onCollisionExit: function (other) {
         if (this.brickType == 0) {
            if (other.node.group === "Wall") {
                cc.log("top onCollisionExit");
                this.node.destroy();
               
            }
         } else {
             if (other.node.group === "Wall") {
                var parent = this.node.getParent();
                parent.emit("brickcount");
                //this.moveSpeed = 0;
            } else if (other.node.group === "BottomWall") {
                 this.node.destroy();
            }
         }
     },

    moveTop: function(dt) {
        this.node.y += dt * dataMgr.getInstance().getTopSpeed();
    },

    moveDown: function(dt) {
        this.node.y -= dt * dataMgr.getInstance().getDownSpeed();
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {

         if (this.brickType == 0) {
            this.moveTop(dt);
         } else {
            this.moveDown(dt);
         } 
     },
});
