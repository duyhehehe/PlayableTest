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
        health: 1,
        // splitSpeed: 0,
        // splitCount: 0,
        // splitAngle: 0,
    },

    // init(direction, speed, splitDelay, splitCount, splitAngle) {
    //     this.direction = direction;
    //     this.speed = speed;
    //     this.splitDelay = splitDelay;
    //     this.splitCount = splitCount;
    //     this.splitAngle = splitAngle;
    //     this.scheduleOnce(this.splitBullet, this.splitDelay);
    // },


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.group = "bullet";
    },

    takeDamage() {
        this.health -= 1;
        if (this.health <= 0) {
            this.node.destroy();
        }
    },

    onCollisionEnter(other, self) {
        if (other.node.group === "enemy") {
            this.takeDamage();
        }
    },
    start() {

    },

    // splitBullet() {
    //     let startAngle = -this.splitAngle * (this.splitCount - 1) / 2;

    //     for (let i = 0; i < this.splitCount; i++) {
    //         let angle = startAngle + i * this.splitAngle;
    //         let radian = cc.misc.degreesToRadians(angle);
    //         let direction = cc.v2(Math.sin(radian), Math.cos(radian));

    //         let newBullet = cc.instantiate(this.node);
    //         newBullet.setPosition(this.node.position);
    //         this.node.parent.addChild(newBullet);

    //         let newBulletScript = newBullet.getComponent('Bullet');
    //         if (newBulletScript) {
    //             newBulletScript.init(direction, this.splitSpeed, 0, this.splitCount, this.splitAngle);
    //         }
    //     }

    //     this.node.destroy();
    // },

    update(dt) {
        this.node.y += this.speed * dt;
        if (this.node.y > cc.winSize.height) {
            this.node.destroy();
        }
    },
});
