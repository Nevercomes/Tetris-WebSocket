var Game = function () {
    //dom元素
    var gameDiv;
    var nextDiv;
    var timeDiv;
    var scoreDiv;
    var resultDiv;
    //分数变量
    var score = 0;
    //游戏矩阵
    var nextData = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    var gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    //当前方块
    var cur;
    //下一个方块
    var next;
    //divs
    var nextDivs = [];
    var gameDivs = [];
    //初始化Div
    var initDiv = function (container, data, divs) {
        for (var i = 0; i < data.length; i++) {
            var div = [];
            for (var j = 0; j < data[0].length; j++) {
                var newNode = document.createElement('div');
                newNode.className = "none";
                newNode.style.top = (i * 20) + "px";//用'none'平铺了gameDivs与nextDivs两个container
                newNode.style.left = (j * 20) + "px";
                container.appendChild(newNode);
                div.push(newNode);//一个存放div(newNode)的中间量的数组
            }
            divs.push(div);
        }
    };
    //刷新Div，控制了每一个小方格（div）的状态
    var refreshDiv = function (data, divs) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] == 0) {
                    divs[i][j].className = "none";
                } else if (data[i][j] == 1) {
                    divs[i][j].className = "done";
                } else if (data[i][j] == 2) {
                    divs[i][j].className = "current";
                }
            }
        }
    };
    //检测点是否合法
    var check = function (pos, x, y) {
        if (pos.x + x < 0) {
            return 0;
        } else if (pos.x + x >= gameData.length) {
            return 0;
        } else if (pos.y + y < 0) {
            return 0;
        } else if (pos.y + y >= gameData[0].length) {
            return 0;
        } else if (gameData[pos.x + x][pos.y + y] == 1) {
            return 0;
        } else {
            return 1;
        }
    };
    //检测数据是否合法
    var isValid = function (pos, data) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] != 0) {
                    if (!check(pos, i, j)) {
                        return 0;
                    }
                }
            }
        }
        return 1;
    };
    //设置数据
    var setData = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.location, i, j)) {
                    gameData[cur.location.x + i][cur.location.y + j] = cur.data[i][j];
                }
            }
        }
    };
    //清除数据
    var clearData = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.location, i, j)) {
                    gameData[cur.location.x + i][cur.location.y + j] = 0
                }
            }
        }
    };
    //下移
    var down = function () {
        if (cur.canDown(isValid)) {
            clearData();
            cur.down();
            setData();
            refreshDiv(gameData, gameDivs);
            return true;
        }
        else {
            return false;
        }
    };
    // 左移
    var left = function () {
        if (cur.canLeft(isValid)) {
            clearData();
            cur.left();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };

    // 右移
    var right = function () {
        if (cur.canRight(isValid)) {
            clearData();
            cur.right();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };

    // 旋转
    var rotate = function () {
        if (cur.canRotate(isValid)) {
            clearData();
            cur.rotate();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
    //方块移动到底部，给它固定
    var fixed = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.location, i, j)) {
                    if (gameData[cur.location.x + i][cur.location.y + j] == 2) {
                        gameData[cur.location.x + i][cur.location.y + j] = 1;
                    }
                }
            }
        }
        refreshDiv(gameData, gameDivs);
    };
    //消行
    var checkClear = function () {
        var lineCount = 0;
        for (var i = gameData.length - 1; i >= 0; i--) {
            var clear = true;
            for (var j = 0; j < gameData[0].length; j++) {
                if (gameData[i][j] != 1) {
                    clear = false;
                    break;
                }
            }
            if (clear) {
                lineCount += 1;
                for (var m = i; m > 0; m--) {
                    for (var n = 0; n < gameData[0].length; n++) {
                        gameData[m][n] = gameData[m - 1][n];

                    }
                }
                for (var n = 0; n < gameData[0].length; n++) {
                    gameData[0][n] = 0;
                }
                i++;
            }
        }
        return lineCount;
    };
    //检查游戏结束
    var checkGameOver = function () {
        var gameOver = false;
        for (var i = 0; i < gameData[0].length; i++) {
            if (gameData[1][i] == 1) {
                gameOver = true;
            }
        }
        return gameOver;
    };
    //使用下一个方块
    var performNext = function (type, dir) {
        cur = next;
        setData();
        next = SquareFactory.prototype.make(type, dir);
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    };
    //设置时间
    var setTime = function (time) {
        timeDiv.innerHTML = time;
    };
    //增加分数
    var addScore = function (lineCount) {
        var s = 0;
        switch (lineCount) {
            case 1:
                s = 100;
                break;
            case 2:
                s = 300;
                break;
            case 3:
                s = 500;
                break;
            case 4:
                s = 700;
                break;
            default:
                break;
        }
        score = score + s;
        scoreDiv.innerHTML = score;
    };
    //游戏结束
    var gameOver = function (win) {
        if (win) {
            resultDiv.innerHTML = "YOU WIN!";
        } else {
            resultDiv.innerHTML = "TOU LOSE!"
        }
    };
    //干扰因素： 底部增加干扰行
    var addTailLines = function (lines) {
        for (var i = 0; i < gameData.length - lines.length; i++) {
            gameData[i] = gameData[i + lines.length];//整行整行地上移
        }
        for (var j = 0; j < lines.length; j++) {
            gameData[gameData.length - lines.length + j] = lines[j];
        }
        cur.location.x = cur.location.x - lines.length;
        if (cur.location.x < 0) {
            cur.location.x = 0;
        }
        refreshDiv(gameData, gameDivs);
    };
    //初始化
    var init = function (doms, type, dir) {
        gameDiv = doms.gameDiv;//从data到html上的div显示的链接
        nextDiv = doms.nextDiv;
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        resultDiv = doms.resultDiv;
        setTime(0);
        scoreDiv.innerHTML = 0;
        score = 0;
        resultDiv.innerHTML = "";
        next = SquareFactory.prototype.make(type, dir);
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);
        refreshDiv(next.data, nextDivs);
    };
    //导出API
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fall = function () {
        while (down()) {
        }
    };
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameOver = checkGameOver;
    this.setTime = setTime;
    this.addScore = addScore;
    this.gameOver = gameOver;
    this.addTailLines = addTailLines;
};