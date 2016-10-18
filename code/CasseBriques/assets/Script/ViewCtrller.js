var gameFSM = require('GameFSM');
var dataMgr = require('DataMgr');

 var BRICK_HEIGHT = 53;
cc.Class({
    extends: cc.Component,

    properties: {
       btnStart: cc.Button,
       brickLayer: cc.Node,
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
        brickPrefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function () {
        //var self = this;
        gameFSM.getInstance().setEventDispatchNode(this.brickLayer);
        this.brickLayer.on("evt_game_over", this.evtGameOver.bind(this));

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

        this.elapseTime = 0;
    },

    // evt gameover
    evtGameOver: function(event) {
        cc.log("evt_game_over ");
        this.btnStart.node.active = true;
       
    },
     //< btnStart click
    onGameStart: function(event) {
        this.brickLayer.removeAllChildren();

        gameFSM.getInstance().GameStart();
        this.btnStart.node.active = false;

        this.createBrickGroup();
    },

     // 创建一行砖块
    createBrickGroup: function() {
        var tmpDefault = Math.floor(Math.random() * 4);
        var  tmpArray = []
         for (var i = 0; i < 4; ++i){
            // var spBrick = this.createBrick(1, i);
            // tmpArray.push(spBrick);
            // if (i == tmpDefault) {
            //     spBrick.opacity = 0;
            // }

            if (i !== tmpDefault) {
                var spBrick = this.createBrick(1, i);
                tmpArray.push(spBrick);
             } else {
                  tmpArray.push(null);
             }
        }

        for (i in tmpArray) {
            dataMgr.getInstance().pushBackBrick2List(tmpArray[i]);
        }
    },

    //< 创建一个砖块
    createBrick: function(brickType, areaTag) {
        var spBrick = cc.instantiate(this.brickPrefab);
        this.brickLayer.addChild(spBrick); 
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


    //<
     onCreateTopBrick: function(event) {
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
     update: function (dt) {
          if ( gameFSM.getInstance().state === 0){
            // cc.log("this.areaTag = " + this.areaTag);
             return;
         }

        this.elapseTime += dt;
        if (this.elapseTime >= BRICK_HEIGHT / dataMgr.getInstance().getDownSpeed() - 0.1) {
            this.elapseTime = 0;
            this.createBrickGroup();

        }
       
        var firstBrick = dataMgr.getInstance().getFirstBrickSpriteByIndex(0);
        if (firstBrick === null) {
            firstBrick = dataMgr.getInstance().getFirstBrickSpriteByIndex(1);
        }

        var length = dataMgr.getInstance().getBrickListLength() / 4;

        for (var k = 0; k < 4; ++k){
            var spBrick = dataMgr.getInstance().getFirstBrickSpriteByIndex(k);
            if (spBrick) {
                spBrick.y -= dt * dataMgr.getInstance().getDownSpeed();
            }
            
            for(var i = 1; i < length; ++i) {
                var sp = dataMgr.getInstance().getFirstBrickSpriteByIndex(k + 4 * i);
                if (sp) {
                    sp.y = firstBrick.y +  BRICK_HEIGHT * i;
                }
            }
        }
       
     },
});
