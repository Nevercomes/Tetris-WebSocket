var Local = function () {
    //游戏对象
    var game;
    //时间间隔
    var INTERVAL = 300;
    //定时器
    var timer = null;
    //时间计数器
    var timeCount = 0;
    //时间
    var time = 0;
    //绑定键盘事件
    var bindKeyEvent = function () {
        document.onkeydown = function (e) {
            if (e.keyCode == 37) {// left
                game.left();
            } else if (e.keyCode == 38) {// up
                game.rotate();
            } else if (e.keyCode == 39) {// right
                game.right();
            } else if (e.keyCode == 40) {// down
                game.down();
            } else if (e.keyCode == 70) {// space
                game.fall();
            }
        }
    };
    //随机生成一个方块类
    var generateType = function () {
        return Math.ceil(Math.random() * 7) - 1;
    };
    //随机生成一个旋转次数
    var generateDir = function () {
        return Math.ceil(Math.random() * 4) - 1;
    };
    //随机生成干扰行
    var generateBottomLine = function (lineNum) {
        var lines = [];
        for (var i = 0; i < lineNum; i++) {
            var line = [];
            for (var j = 0; j < 10; j++) {
                line.push(Math.ceil(Math.random() * 2) - 1);
            }
            lines.push(line);
        }
        return lines;
    };
    //时间函数
    var timeFunc = function () {
        timeCount += 3;
        time += 1;
        // if (timeCount == 5) {
        //     time += 1;
        //     timeCount = 0;
            game.setTime(timeCount);
            if (time % 45 == 0) {
                game.addTailLines(generateBottomLine(1));
            }
        // }
    };
    //移动
    var move = function () {
        if (!game.checkGameOver()) {
            timeFunc();
        }
        if (!game.down()) {
            game.fixed();
            var lineCount = game.checkClear();
            if (lineCount) {
                game.addScore(lineCount);
            }
            var gameOver = game.checkGameOver();
            if (!gameOver) {
                game.performNext(generateType(), generateDir());
            } else {
                stop();
                game.gameOver(false);
            }

        }
    };
    //开始
    var start = function () {
        var doms = {
            gameDiv: document.getElementById('local_game'),
            nextDiv: document.getElementById('local_next'),
            timeDiv: document.getElementById('local_time'),
            scoreDiv: document.getElementById('local_score'),
            resultDiv: document.getElementById('local_gameover')
        };
        timeCount = time = 0;
        game = new Game();
        game.init(doms, generateType(), generateDir());
        game.performNext(generateType(), generateDir());
        stop();
        bindKeyEvent();
        timer = setInterval(move, INTERVAL);
    };

    //暂停
    var pause = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    };

    var goon = function () {
        timer = setInterval(move, INTERVAL);
        bindKeyEvent();
    };

    //结束
    var stop = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    };
    //导出API
    this.start = start;
    this.pause = pause;
    this.goon = goon;
};