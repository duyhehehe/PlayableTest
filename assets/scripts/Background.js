// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        background1: cc.Node,
        background2: cc.Node,
        scrollSpeed: 300,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.backgroundHeight = this.background1.height;
    },

    start() {

    },
    update(dt) {
        this.background1.y -= this.scrollSpeed * dt;
        this.background2.y -= this.scrollSpeed * dt;

        if (this.background1.y <= -this.backgroundHeight) {
            this.background1.y = this.background2.y + this.backgroundHeight;
        }

        if (this.background2.y <= -this.backgroundHeight) {
            this.background2.y = this.background1.y + this.backgroundHeight;
        }
    },
});
