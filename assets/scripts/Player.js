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
        isMouseTouch: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
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
        console.log(this.node.parent);
        let newPos = cc.v2(event.getLocation().x - this.node.parent.width / 2, event.getLocation().y - this.node.parent.height / 2);
        this.node.setPosition(newPos);
        this.node.getComponent("Player").shoot();
    },

    shoot() {
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(this.node.position.x, this.node.position.y + 60);
        this.node.parent.addChild(bullet);
        bullet.getComponent("Bullet").startMoving();
    },

    // update(dt) {

    // }

});
