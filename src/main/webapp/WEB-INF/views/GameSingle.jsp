<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/views/include/taglib.jsp" %>
<%@page isELIgnored="false" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>火拼俄罗斯（single）</title>
    <link rel="stylesheet" href="${ctxStatic}/single/css/style.css" type="text/css">
</head>
<body>
<div>请用方向键和F进行操作，上->旋转 F->坠落</div>
<div class="square" id="local">
    <div class="title">我的游戏区域</div>
    <div class="game" id="local_game"></div>
    <div class="next" id="local_next"></div>
    <div class="info">
        <div>已用时： <span id="local_time">0</span>s</div>
        <div>已得分： <span id="local_score">0</span>分</div>
        <div><input id="local_start" type="button" value="开始" /></div>
        <div><input id="local_pause" type="button" value="暂停" /></div>
        <div class="gameover" id="local_gameover"></div>
    </div>
</div>
<!-- <div class="square" id="remote">
    <div class="title">对方游戏区域</div>
    <div class="game" id="remote_game"></div>
    <div class="next" id="remote_next"></div>
    <div class="info">
        <div>已用时： <span id="remote_time">0</span>s</div>
        <div>已得分： <span id="remote_score">0</span>分</div>
        <div class="gameover" id="remote_gameover"></div>
    </div>
</div> -->
<script src="${ctxStatic}/single/js/square.js" type="text/javascript"></script>
<script src="${ctxStatic}/single/js/squareFactory.js" type="text/javascript"></script>
<script src="${ctxStatic}/single/js/game.js" type="text/javascript"></script>
<script src="${ctxStatic}/single/js/local.js" type="text/javascript"></script>
<script src="${ctxStatic}/single/js/remote.js" type="text/javascript"></script>
<script src="${ctxStatic}/single/js/script.js" type="text/javascript"></script>
</body>
</html>
