var gameFSM = require('GameFSM');

cc.Class({
    extends: cc.Component,

    properties: {
       btnStart: cc.Button,
       brickFactory: cc.Node,
       brickLayer: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        //var self = this;
        gameFSM.getInstance().setEventDispatchNode(this.brickLayer);

        this.brickLayer.on("evt_game_over", this.evtGameOver.bind(this));
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
        var brickFactory = this.brickFactory.getComponent("BrickFactory");
        brickFactory.createBrickGroup();
        this.btnStart.node.active = false;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
