<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/views/include/taglib.jsp" %>
<%@page isELIgnored="false" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>火拼俄罗斯</title>
    <link rel="stylesheet" href="${ctxStatic}/socket-io/css/style.css" type="text/css">
    <script src="${ctxStatic}/socket-io/socket.io.js" type="text/javascript"></script>
    <script src="${ctxStatic}/socket-io/js/square.js" type="text/javascript"></script>
    <script src="${ctxStatic}/socket-io/js/squareFactory.js" type="text/javascript"></script>
    <script src="${ctxStatic}/socket-io/js/game.js" type="text/javascript"></script>
    <script src="${ctxStatic}/socket-io/js/local.js" type="text/javascript"></script>
    <script src="${ctxStatic}/socket-io/js/remote.js" type="text/javascript"></script>
    <script src="${ctxStatic}/socket-io/js/script.js" type="text/javascript"></script>
</head>
<body>
<div>请用方向键和F进行操作，上->旋转 F->坠落</div>
<div id="waiting"></div>
<div class="square" id="local">
    <div class="title">我的游戏区域</div>
    <div class="game" id="local_game"></div>
    <div class="next" id="local_next"></div>
    <div class="info">
        <div>已用时： <span id="local_time">0</span>s</div>
        <div>已得分： <span id="local_score">0</span>分</div>
        <div class="gameover" id="local_gameover"></div>
    </div>
</div>
<div class="square" id="remote">
    <div class="title">对方游戏区域</div>
    <div class="game" id="remote_game"></div>
    <div class="next" id="remote_next"></div>
    <div class="info">
        <div>已用时： <span id="remote_time">0</span>s</div>
        <div>已得分： <span id="remote_score">0</span>分</div>
        <div class="gameover" id="remote_gameover"></div>
    </div>
</div>
</body>
</html>
