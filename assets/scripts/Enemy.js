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
        dropChance: 1,
        explosionPrefab: {
            default: null,
            type: cc.Prefab,
        },
        item1Prefab: {
            default: null,
            type: cc.Prefab,
        },
        item2Prefab: {
            default: null,
            type: cc.Prefab,
        },
        item3Prefab: {
            default: null,
            type: cc.Prefab,
        },
        item4Prefab: {
            default: null,
            type: cc.Prefab,
        },
    },

    onLoad() {
        this.node.group = "enemy";
    },


    // startMoving() {
    //     this.schedule(this.updatePosition, 0.01);
    // },

    // updatePosition() {
    //     this.node.y -= this.speed;
    //     if (this.node.y < -cc.winSize.height) {
    //         this.node.destroy();
    //     }
    // },

    takeDamage() {
        this.health -= 1;
        if (this.health <= 0) {
            this.explode();
            this.node.destroy();
            if (this.game.getComponent("Game").currentStage === 1) {
                this.dropItem();
            }
            this.game.checkStageCompletion();
        }
    },

    explode() {
        let explosion = cc.instantiate(this.explosionPrefab);
        this.node.parent.parent.addChild(explosion);
        const pos = this.node.position;
        explosion.setPosition(pos);
    },


    dropItem() {
        const chance = Math.random();
        if (chance > 0.9) {
            const min = 1;
            const max = 4;
            let number = Math.floor(Math.random() * (max - min + 1) + min);
            let item;
            switch (number) {
                case 1:
                    item = cc.instantiate(this.item1Prefab);
                    break;
                case 2:
                    item = cc.instantiate(this.item2Prefab);
                    break;
                case 3:
                    item = cc.instantiate(this.item3Prefab);
                    break;
                case 4:
                    item = cc.instantiate(this.item4Prefab);
                    break;

            }
            item.setPosition(this.node.position);
            this.node.parent.parent.addChild(item)
        }
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

    update(dt) {
        this.node.y -= this.speed * dt;
        if (this.node.y < -cc.winSize.height) {
            this.node.destroy();
        }
    },
});
