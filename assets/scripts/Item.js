// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.group = "item";
    },

    start() {

    },

    update(dt) {
        this.node.y -= this.speed * dt;

        if (this.node.y < -cc.winSize.height / 2) {
            this.node.destroy();
        }
    },

    onCollisionEnter(other, self) {
        if (other.node.group === "player") {
            this.collectItem(other.node);
        }
    },

    collectItem(player) {
        this.node.destroy();
    }
});
