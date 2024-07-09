// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefab: {
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
        rows: 0,
        columns: 0,
        spacingX: 0,
        spacingY: 0,
        startY: 0,
        enemySpawnInterval: 0,
        fireInterval: 0,
        currentStage: 1,
        remainingEnemies: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.schedule(this.spawnEnemy, this.enemySpawnInterval);
        this.spawnEnemyRowsStage1();
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    // spawnEnemy() {
    //     let enemy = cc.instantiate(this.enemyPrefab);
    //     let randomX = (Math.random() - 0.5) * cc.winSize.width;
    //     enemy.setPosition(cc.v2(randomX, cc.winSize.height / 2));
    //     this.node.addChild(enemy);
    //     enemy.getComponent("Enemy").game = this;
    //     enemy.getComponent("Enemy").startMoving();
    // },

    spawnEnemyRow(y, isMoving) {
        let startX = -((this.columns - 1) * this.spacingX) / 2;
        for (let i = 0; i < this.columns; ++i) {
            let enemy = cc.instantiate(this.enemyPrefab);
            enemy.setPosition(cc.v2(startX + i * this.spacingX, y));
            this.node.addChild(enemy);
            if (isMoving) {
                enemy.getComponent("Enemy").startMoving();
            }
            enemy.getComponent("Enemy").game = this;
            this.remainingEnemies++;
        }
    },

    spawnEnemyRowsStage1() {
        console.log("Stage 1");
        for (let i = 0; i < this.rows; ++i) {
            this.spawnEnemyRow(this.startY - i * this.spacingY, false);
        }
    },

    spawnEnemyRowsStage2() {
        for (let i = 0; i < this.rows; ++i) {
            this.spawnEnemyRow(this.startY - i * this.spacingY, true);
        }
    },

    checkStageCompletion() {
        if (this.currentStage === 1 && this.remainingEnemies === 0) {
            this.currentStage = 2;
            this.spawnEnemyRowsStage2();
        }
    },

    // setSpawnInterval(newInterval) {
    //     this.unschedule(this.spawnEnemy);
    //     this.spawnInterval = newInterval;
    //     this.schedule(this.spawnEnemy, this.spawnInterval);
    // },

    start() {

    },

    // update (dt) {},
});
