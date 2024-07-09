// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.group = "bullet";
    },

    startMoving() {
        this.schedule(this.updatePosition, 0.01);
    },

    updatePosition() {
        this.node.y += this.speed * 0.01;
        if (this.node.y > cc.winSize.height) {
            this.node.destroy();
        }
    },

    onCollisionEnter(other, self) {
        if (other.node.group === "enemy") {
            this.node.destroy();
            // other.node.getComponent("Enemy").takeDamage();
        }
    },
    start() {

    },

    update(dt) {

    },
});
