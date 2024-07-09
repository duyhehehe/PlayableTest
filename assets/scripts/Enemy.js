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
        health: 0,
        explosionPrefab: {
            default: null,
            type: cc.Prefab,
        },
    },

    onLoad() {
        this.node.group = "enemy";
    },


    startMoving() {
        this.schedule(this.updatePosition, 0.01);
    },

    updatePosition() {
        this.node.y -= this.speed;
        if (this.node.y < -cc.winSize.height) {
            this.node.destroy();
            this.game.enemyDestroyed();
        }
    },

    takeDamage() {
        this.health -= 1;
        if (this.health <= 0) {
            this.explode();
            this.node.destroy();
            this.game.remainingEnemies--;
            this.game.checkStageCompletion();
            // Cập nhật điểm số.
        }
    },

    explode() {
        let explosion = cc.instantiate(this.explosionPrefab);
        this.node.parent.addChild(explosion);
        const pos = this.node.position;
        explosion.setPosition(pos);
    },

    onCollisionEnter(other, self) {
        if (other.node.group === "bullet") {
            this.takeDamage();
            other.node.destroy();
        }
    },


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
