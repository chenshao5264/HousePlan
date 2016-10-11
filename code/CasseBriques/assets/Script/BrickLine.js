var dataMgr = require('DataMgr');

cc.Class({
    extends: cc.Component,

    properties: {
        spAchors: {
            type: cc.Node,
            default: []
        },
        brickPrefab: cc.Prefab,
        parent: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        this.vec2AchorPos = new Array();
        for (var i = 0; i < this.spAchors.length; ++i){
            this.vec2AchorPos[i] = this.spAchors[i].getPosition();
        }

        this.brickcount = 0;
        this.parent.on('brickcount', function() {
            self.brickcount += 1;
            if (self.brickcount == 3) {
                self.brickcount = 0
                self.createtLine();
            }
        });
    },

    createBrick: function(areaTag) {
        var spBrick = cc.instantiate(this.brickPrefab);
        spBrick.setPosition(this.vec2AchorPos[areaTag]);
        this.parent.addChild(spBrick);
        spBrick.getComponent("Brick").init(1, 10);
    },

    setBrickDownSpeed: function() {

    },

    onGameStart: function(event) {
        var target = event.target;
        target.active = false;
        //dataMgr.getInstance().isGameOver = false;
        this.parent.removeAllChildren();
        //this.createtLine();  
    },

    createtLine: function() {
        var tmp = Math.floor(Math.random() * 4);
        for (var i = 0; i < 4; ++i){
            if (i != tmp) {
                this.createBrick(i);
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
});
