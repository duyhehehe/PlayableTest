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
        fireInterval: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.isMovingUp = false;
        this.isMovingDown = false;

        this.schedule(this.shoot, this.fireInterval);
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.isMovingLeft = true;
                break;
            case cc.macro.KEY.right:
                this.isMovingRight = true;
                break;
            case cc.macro.KEY.up:
                this.isMovingUp = true;
                break;
            case cc.macro.KEY.down:
                this.isMovingDown = true;
                break;
        }
    },

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.isMovingLeft = false;
                break;
            case cc.macro.KEY.right:
                this.isMovingRight = false;
                break;
            case cc.macro.KEY.up:
                this.isMovingUp = false;
                break;
            case cc.macro.KEY.down:
                this.isMovingDown = false;
                break;
        }
    },

    shoot() {
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(this.node.position.x, this.node.position.y + 60);
        this.node.parent.addChild(bullet);
        bullet.getComponent("Bullet").startMoving();
    },

    update(dt) {
        let pos = this.node.position;

        if (this.isMovingLeft) {
            pos.x -= this.speed * dt;
        }
        if (this.isMovingRight) {
            pos.x += this.speed * dt;
        }
        if (this.isMovingUp) {
            pos.y += this.speed * dt;
        }
        if (this.isMovingDown) {
            pos.y -= this.speed * dt;
        }

        this.node.position = pos;
    }

});
