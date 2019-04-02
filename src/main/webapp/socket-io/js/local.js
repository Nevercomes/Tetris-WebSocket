var Local = function (socket) {
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
                socket.emit('left');
            } else if (e.keyCode == 38) {// up
                game.rotate();
                socket.emit('rotate');
            } else if (e.keyCode == 39) {// right
                game.right();
                socket.emit('right');
            } else if (e.keyCode == 40) {// down
                game.down();
                socket.emit('down');
            } else if (e.keyCode == 70) {// space
                game.fall();
                socket.emit('fall');
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
        game.setTime(timeCount);
        if (time % 45 == 0 && timeCount < 1200) {
            var tailLines = generateBottomLine(1);
            game.addTailLines(tailLines);
            socket.emit("addTailLines", tailLines);
        }
        if (time % 45 == 0 && timeCount >= 1200) {
            var tailLines2 = generateBottomLine(2);
            game.addTailLines(tailLines2);
            socket.emit("addTailLines", tailLines2);
        }
        socket.emit('time', timeCount);
    };
    //移动
    var move = function () {
        if (!game.checkGameOver()) {
            timeFunc();
        }
        if (!game.down()) {
            game.fixed();
            socket.emit('fixed')
            var lineCount = game.checkClear();
            if (lineCount) {
                game.addScore(lineCount);
                socket.emit('line', lineCount);
                var bottomLines
                if (lineCount > 1) {
                    bottomLines = generateBottomLine(1);
                    socket.emit('bottomLines', bottomLines);
                }
            }
            var gameOver = game.checkGameOver();
            if (!gameOver) {
                var t = generateType();
                var d = generateDir();
                game.performNext(t, d);
                socket.emit('next', {type: t, dir: d});
            } else {
                socket.emit('lose');
                document.getElementById('remote_gameover').innerHTML = 'YOU WIN!'
                stop();
                game.gameOver(false);
            }

        } else {
            socket.emit('down')
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
        game = new Game();
        var type = generateType();
        var dir = generateDir();
        game.init(doms, type, dir);
        socket.emit('init', {type: type, dir: dir});
        var t = generateType();
        var d = generateDir();
        game.performNext(t, d);
        socket.emit('next', {type: t, dir: d});
        bindKeyEvent();
        timer = setInterval(move, INTERVAL);
    };

    //结束
    var stop = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    };

    socket.on('start', function () {
        document.getElementById('waiting').innerHTML = '';
        start();
    })

    socket.on('lose', function () {
        game.gameOver(true);
        stop();
    })

    socket.on('leave', function () {
        document.getElementById('local_gameover').innerHTML = 'OPPNENT LEFT！'
        document.getElementById('remote_gameover').innerHTML = 'LEFT ALREADY...'
        stop();
    })

    socket.on('bottomLines', function (data) {
        game.addTailLines(data);
        // console.log('bottomLines');
        socket.emit('addTailLines', data);
    })

};