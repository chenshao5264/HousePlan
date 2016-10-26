var gameFSM = require('GameFSM');
var dataMgr = require('DataMgr');

//var BRICK_HEIGHT = 53;
cc.Class({
    extends: cc.Component,

    properties: {
       labelScore: cc.Label,
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
        this.brickLayer.on("evt_eliminate", this.evtEeliminate.bind(this));

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
        this.socre = 0;
    },

    // evt 消除某一行
    evtEeliminate: function(event) {
        var row = event.detail.msg;
        var bIndex = row * 3 + row;
        for (var i = bIndex; i < 4 + bIndex; ++i) {
            var spBrick = dataMgr.getInstance().getBrickSpriteByIndex(i);
            spBrick.removeFromParent();
        }
        
        // 调整消除行前面的坐标
        function adjuestPos() {
            var eIndex = bIndex;
            for (var i = 0; i < eIndex; ++i) {
                var spBrick = dataMgr.getInstance().getBrickSpriteByIndex(i);
                if (spBrick) {
                    spBrick.y = spBrick.y + spBrick.height;
                }   
            }
        }
        adjuestPos();

        dataMgr.getInstance().removeGroupByRowIndex(row);

        this.afterEeliminate();
    },

    //< 消除一行后事件
    afterEeliminate: function(event) {
         this.socre += 1;
         this.labelScore.string = "Score: " + this.socre;

         if (this.socre % 10 == 0) {
              dataMgr.getInstance().addDownBrickSpeed();
         }
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
            if (i !== tmpDefault) {
                var spBrick = this.createBrick(1, i);
                tmpArray.push(spBrick);
             } else {
                  tmpArray.push(null);
             }
        }

        for (var i = 0; i < 4; ++i) {
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
         if (gameFSM.getInstance().state === 0){
             return;
         }
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
         if (gameFSM.getInstance().state === 0){
             return;
         }

        var firstBrick = dataMgr.getInstance().getFirstBrick();
        if (firstBrick.y <= -200) {
            gameFSM.getInstance().GameOver();
            return;
        }

        this.elapseTime += dt;
        if (this.elapseTime >= firstBrick.height / dataMgr.getInstance().getDownSpeed() - 0.1) {
            this.elapseTime = 0;
            this.createBrickGroup();
        }

        var length = dataMgr.getInstance().getBrickListLength();
        var h = 0;
        for (var i = 0; i < length; i += 4) {
            for (var k = 0; k < 4; ++k) {
                var spBrick = dataMgr.getInstance().getBrickSpriteByIndex(i + k);
                if(spBrick){
                    if (i < 4) {
                        spBrick.y -= dt * dataMgr.getInstance().getDownSpeed();
                    } else {
                        spBrick.y = firstBrick.y + firstBrick.height * h;
                    }
                }
            }
            ++h;
        }
     },
});
