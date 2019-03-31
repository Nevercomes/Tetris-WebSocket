var local = new Local();

var startBtn = document.getElementById("local_start");
var pauseBtn = document.getElementById("local_pause");

startBtn.onclick = function (ev) {
    local.start();
};
pauseBtn.onclick = function (ev) {
    var txt = pauseBtn.value;
    if (txt === "暂停") {
        local.pause();
        pauseBtn.value = "继续";
    } else if (txt === "继续") {
        local.goon();
        pauseBtn.value = "暂停";
    }
};

