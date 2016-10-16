var dataMgr = require('DataMgr');

cc.Class({
    extends: cc.Component,

    properties: {
        btnBrick: {
            default: [],
            type: cc.Button
        },
        spDownAchors: {
            type: cc.Node,
            default: []
        },
         spTopAchors: {
            type: cc.Node,
            default: []
        },
        brickPrefab: cc.Prefab,
        parent: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;

        // 上升砖块起始坐标
        this.posTopBrickOris = new Array();
        for (var i = 0; i < this.spTopAchors.length; ++i){
            this.posTopBrickOris[i] = this.spTopAchors[i].getPosition();
        }

        // 下降砖块起始坐标
        this.posDownBrickOris = new Array();
        for (var i = 0; i < this.spDownAchors.length; ++i){
            this.posDownBrickOris[i] = this.spDownAchors[i].getPosition();
        }

        this.brickcount = 0;
        this.parent.on('newgroup', function() {
            self.brickcount += 1; 
            if (self.brickcount == 3) {
                self.brickcount = 0
                self.createBrickGroup();
            }
        });
    },

    // 创建一行砖块
    createBrickGroup: function() {
        var tmpDefault = Math.floor(Math.random() * 4);
        var  tmpArray = []
         for (var i = 0; i < 4; ++i){
            var spBrick = this.createBrick(1, i);
            tmpArray.push(spBrick);
            if (i == tmpDefault) {
                spBrick.opacity  = 0;
            }
        }

        for (i in tmpArray) {
            dataMgr.getInstance().pushBackBrick2List(tmpArray[i]);
        }
    },

    //< 创建一个砖块
    createBrick: function(brickType, areaTag) {
        var spBrick = cc.instantiate(this.brickPrefab);
        this.parent.addChild(spBrick); 
        spBrick.getComponent("Brick").init(brickType, areaTag);

        if (brickType === 0) {
            spBrick.setPosition(this.posTopBrickOris[areaTag]);
        } else {
            var lastBrickSprite = dataMgr.getInstance().getLastBrickSprite();
            if (lastBrickSprite === null) {
                spBrick.setPosition(this.posDownBrickOris[areaTag]);
            } else {
                var posX = this.posTopBrickOris[areaTag].x;
                var posY = lastBrickSprite.y + lastBrickSprite.height; 
                spBrick.setPosition(posX, posY);
            }
        }
        return spBrick;
    },

    // //< btnStart click
    // onGameStart: function(event) {
    //     //dataMgr.getInstance().addDownBrickSpeed();
    //     this.createBrickGroup();
    // },
    
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
       this.createBrick(0, selectedIndex);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
