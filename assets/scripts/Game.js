// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Bolatoa: {
            default: null,
            type: cc.Prefab,
        },
        BoMuoiDo: {
            default: null,
            type: cc.Prefab,
        },
        BoMuoiXanh: {
            default: null,
            type: cc.Prefab,
        },
        BoMuoiXanhLa: {
            default: null,
            type: cc.Prefab,
        },
        BoOngVang: {
            default: null,
            type: cc.Prefab,
        },
        BoOngXanhDuong: {
            default: null,
            type: cc.Prefab,
        },
        BoOngXanhLa: {
            default: null,
            type: cc.Prefab,
        },
        RuoiGiamVang: {
            default: null,
            type: cc.Prefab,
        },
        RuoiOngDo: {
            default: null,
            type: cc.Prefab,
        },
        RuoiOngXanhLa: {
            default: null,
            type: cc.Prefab,
        },
        player: {
            default: null,
            type: cc.Node,
        },
        bulletPrefab: {
            default: null,
            type: cc.Prefab,
        },
        warnPrefab: {
            default: null,
            type: cc.Prefab,
        },
        rows: 0,
        columns: 0,
        spacingX: 0,
        spacingY: 0,
        startY: 0,
        targetY: 0,
        fireInterval: 0,
        currentStage: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.player.getComponent("Player").game = this;
        this.spawnEnemyStage1();
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    spawnEnemyDiagonal(y, prefab, columnNumber, angle) {
        let gapX = 162;
        let halfColumns = Math.floor(columnNumber / 2);
        let angleRad = 40 * Math.PI / 180;
        let leftStartX = -gapX / 2;
        let rightStartX = gapX / 2;

        for (let i = 0; i < halfColumns; ++i) {
            let offsetX = i * this.spacingX;
            let offSetY = offsetX * Math.tan(-angleRad);

            let left = cc.instantiate(prefab);
            let right = cc.instantiate(prefab);

            left.angle = angle;
            right.angle = -angle;

            left.setPosition(cc.v2(leftStartX - offsetX, y - offSetY - 110));
            right.setPosition(cc.v2(rightStartX + offsetX, y - offSetY - 110));

            this.node.getChildByName("Enemy").addChild(left);
            this.node.getChildByName("Enemy").addChild(right);


            left.getComponent("Enemy").game = this;
            right.getComponent("Enemy").game = this;

            left.getComponent("Enemy").speed = 0;
            right.getComponent("Enemy").speed = 0;
        }
    },

    spawnEnemyCurve(prefab, rowIndex) {
        let halfColumn = Math.floor(this.columns / 2);
        const offset = 280;

        for (let i = 0; i < halfColumn; ++i) {
            let left = cc.instantiate(prefab);
            let right = cc.instantiate(prefab);

            left.x = -i * (40 + rowIndex * 3) - 35 - i * 5;
            right.x = i * (40 + rowIndex * 3) + 35 + i * 5;


            left.y = right.y = this.height / 2 + 100;

            left.angle = 90;
            right.angle = -90;

            left.setPosition(cc.v2(left.x, 500));
            right.setPosition(cc.v2(right.x, 500));

            cc.tween(left)
                .to(0.4 + 0.15 * i, { position: cc.v2(left.x, - (rowIndex * 45 - i * i * 3) - 40 + offset) },)
                .start();

            cc.tween(right)
                .to(0.4 + 0.15 * i, { position: cc.v2(right.x, - (rowIndex * 45 - i * i * 3) - 40 + offset) },)
                .start();


            this.node.getChildByName("Enemy").addChild(left);
            this.node.getChildByName("Enemy").addChild(right);


            left.getComponent("Enemy").game = this;
            right.getComponent("Enemy").game = this;

            left.getComponent("Enemy").speed = 0;
            right.getComponent("Enemy").speed = 0;
        }
    },

    spawnEnemyStage1() {
        this.spawnEnemyDiagonal(this.startY, this.RuoiOngDo, 8, -45);
        this.spawnEnemyDiagonal(this.startY - this.spacingY, this.RuoiOngXanhLa, 6, 0);

        let bolatoa = cc.instantiate(this.Bolatoa);
        bolatoa.setPosition(cc.v2(0, 300));
        this.node.getChildByName("Enemy").addChild(bolatoa);
        this.remainingEnemies++;
        bolatoa.getComponent("Enemy").game = this;
        bolatoa.getComponent("Enemy").speed=0;

        this.spawnEnemyCurve(this.BoOngVang, 1);
        this.spawnEnemyCurve(this.BoOngXanhDuong, 2);
        this.spawnEnemyCurve(this.BoOngXanhLa, 3);
    },

    spawnEnemyStage2() {
        this.currentStage = 2;
        const enemyTypes = [
            this.BoMuoiDo,
            this.BoMuoiXanh,
            this.BoMuoiXanhLa,
            this.BoOngVang,
            this.BoOngXanhDuong,
            this.BoOngXanhLa,
            this.RuoiGiamVang,
            this.RuoiOngDo,
            this.RuoiOngXanhLa,
        ];
        const startX = -((this.columns - 1) * this.spacingX) / 2
        for (let i = 0; i < enemyTypes.length; ++i) {
            const enemyPrefab = enemyTypes[i];
            for (let row = 0; row < 5; ++row) {
                for (let col = 0; col < 7; ++col) {
                    let enemy = cc.instantiate(enemyPrefab);
                    let posX = startX + col * this.spacingX;
                    let posY = 400 - (i * 5 + row) * this.spacingY;
                    enemy.setPosition(cc.v2(posX, posY));
                    this.node.getChildByName("Enemy").addChild(enemy);
                }
            }
        }

    },



    checkStageCompletion() {
        if (this.currentStage === 1 && this.node.getChildByName("Enemy").children.length <= 1) {
            this.spawnEnemyStage2();
        }
    },


    warning() {
        let warn = cc.instantiate(this.warnPrefab);
        this.node.addChild(warn);
        let screenW = cc.view.getVisibleSize().width;
        let screenH = cc.view.getVisibleSize().height;
        warn.width = screenW;
        warn.height = screenH;
        warn.setPosition(cc.v2(0, 0));
    },

    start() {

    },

    // update (dt) {},
});
