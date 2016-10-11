var dataMgr = (function(){
    var unique = null;

    function getInstance(){
        if (unique === null) {
            unique = new Construct();
        }
        return unique;
    }

    function Construct() {
        cc.log("new dataMgr");

        this.isGameOver = false;
    }

    return {
        getInstance: getInstance
    }
})();

module.exports = dataMgr;