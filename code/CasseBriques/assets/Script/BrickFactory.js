//var dataMgr = require('DataMgr');


cc.Class({
    extends: cc.Component,

    properties: {
        btnBrick: {
            default: [],
            type: cc.Button
        },
        brickPrefab: cc.Prefab,
        parent: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;

        this.spBrickOris = new Array();
        for (var i = 0; i < this.btnBrick.length; ++i){
            this.spBrickOris[i] = this.btnBrick[i].node.getPosition();
        }
    },


    createBrick: function(areaTag) {
        var spBrick = cc.instantiate(this.brickPrefab);
        spBrick.setPosition(this.spBrickOris[areaTag]);
        this.parent.addChild(spBrick);
        spBrick.getComponent("Brick").init(0);
    },

    onClickBrick: function(event) {
        var node = event.target;
        var btn = node.getComponent(cc.Button);
        var selectedIndex = 0;
        if (btn == this.btnBrick[0]) {
            selectedIndex = 0;            
        } else if(btn == this.btnBrick[1]) {
            selectedIndex = 1;
        } else if(btn == this.btnBrick[2]) {
            selectedIndex = 2;
        } else {
            selectedIndex = 3;
        }
       this.createBrick(selectedIndex);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
