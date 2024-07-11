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
        bulletPrefab: {
            default: null,
            type: cc.Prefab,
        },
        currentLevel: 1,
        numBullets: 2,
        fireInterval: 0.1,
        isMouseTouch: false,
        itemCount: 0,
        coneAngle: 30, // Góc hình nón
        coneBulletCount: 5, // Số lượng đạn trong hình nón
        bulletSpeed: 300, // Tốc độ đạn
        splitDelay: 0.5, // Thời gian để đạn chia thành n tia
        splitAngle: 30, // Góc giữa các tia sau khi chia
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.group = "player";
        this.isMouseTouch = false;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.setTouchEnd, this);
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },


    onTouchMove(event) {
        this.isMouseTouch = true;
        let newPos = cc.v2(event.getLocation().x - this.node.parent.width / 2, event.getLocation().y - this.node.parent.height / 2);
        this.node.setPosition(newPos);
        this.schedule(this.node.getComponent("Player").shoot, this.fireInterval);
    },

    setTouchEnd(event) {
        this.isMouseTouch = false;
        this.unschedule(this.node.getComponent("Player").shoot);
    },

    checkLevel() {
        this.itemCount++;
        if (this.itemCount >= 2) {
            this.currentLevel = 2;
        }
        if (this.itemCount >= 4) {
            this.currentLevel = 3;
        }
        console.log(this.currentLevel);
    },

    shoot() {
        // let bullet = cc.instantiate(this.bulletPrefab);
        // bullet.setPosition(this.node.position.x, this.node.position.y + 60);
        // this.node.parent.addChild(bullet);
        // bullet.getComponent("Bullet").startMoving();
        const coneAngle = 30;
        if (this.currentLevel === 1) {
            let bulletOffsetX = 23;
            let bulletOffsetY = 60;
            let positions = [
                cc.v2(this.node.x - bulletOffsetX, this.node.y + bulletOffsetY),
                cc.v2(this.node.x - 1.4 * bulletOffsetX, this.node.y + bulletOffsetY),
                cc.v2(this.node.x + bulletOffsetX, this.node.y + bulletOffsetY),
                cc.v2(this.node.x + 1.4 * bulletOffsetX, this.node.y + bulletOffsetY),
            ];
            for (let pos of positions) {
                let bullet = cc.instantiate(this.bulletPrefab);
                bullet.setPosition(pos);
                this.node.parent.addChild(bullet);
            }
            // const angleStep = coneAngle / (this.numBullets - 1);
            // const startAngle = -coneAngle / 2;

            // for (let i = 0; i < this.numBullets; ++i) {
            //     const bullet = cc.instantiate(this.bulletPrefab);
            //     const angle = startAngle + i * angleStep;
            //     let rad = cc.misc.degreesToRadians(angle);
            //     let direction = cc.v2(Math.sin(rad), Math.cos(rad));
            //     bullet.setPosition(this.node.position);
            //     this.node.parent.addChild(bullet);

            //     let bulletScript = bullet.getComponent('Bullet');
            //     if (bulletScript) {
            //         bulletScript.init(direction, this.bulletSpeed, this.splitDelay, this.numBullets, this.splitAngle);
            //     }
            // }
        }

        if (this.currentLevel === 2) {
            let bulletOffsetX = 23;
            let bulletOffsetY = 60;
            let positions = [
                cc.v2(this.node.x - bulletOffsetX, this.node.y + bulletOffsetY),
                cc.v2(this.node.x - 1.4 * bulletOffsetX, this.node.y + bulletOffsetY),
                cc.v2(this.node.x + bulletOffsetX, this.node.y + bulletOffsetY),
                cc.v2(this.node.x + 1.4 * bulletOffsetX, this.node.y + bulletOffsetY),
            ];
            for (let pos of positions) {
                let bullet = cc.instantiate(this.bulletPrefab);
                bullet.setPosition(pos);
                this.node.parent.addChild(bullet);
                bullet.getComponent("Bullet").speed = 1300;
                bullet.getComponent("Bullet").health = 2;
            }
        }

        if (this.currentLevel === 3) {
            let bulletOffsetX = 23;
            let bulletOffsetY = 60;
            let positions = [
                cc.v2(this.node.x - bulletOffsetX, this.node.y + bulletOffsetY),
                cc.v2(this.node.x - 1.4 * bulletOffsetX, this.node.y + bulletOffsetY),
                cc.v2(this.node.x + bulletOffsetX, this.node.y + bulletOffsetY),
                cc.v2(this.node.x + 1.4 * bulletOffsetX, this.node.y + bulletOffsetY),
            ];
            for (let pos of positions) {
                let bullet = cc.instantiate(this.bulletPrefab);
                bullet.setPosition(pos);
                this.node.parent.addChild(bullet);
                bullet.getComponent("Bullet").speed = 1600;
                bullet.getComponent("Bullet").health = 3;
            }
        }

    },

    warn() {
        this.game.getComponent("Game").warning();
    },

    onCollisionEnter(other, self) {
        if (other.node.group === "enemy") {
            this.warn();
        }
        if (other.node.group === "item") {
            this.checkLevel();
        }
    },


    // update(dt) {

    // }

});
