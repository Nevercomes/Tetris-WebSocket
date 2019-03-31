var Square = function(){
	//方块数据
	this.data = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
	//坐标
	this.location = {
		x: 0,
		y: 0
	};
	//考虑到算法的复杂性以及旋转四种状态
	//方向
	this.dir = 0;
};

Square.prototype.canRotate = function(isValid){
	var d = (this.dir + 1) % 4;
	var test = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
	for(var i=0; i<this.data.length; i++){
		for(var j=0; j<this.data[0].length; j++){
			test[i][j] = this.rotates[d][i][j];
		}
	}
	return isValid(this.location, test);
};
Square.prototype.rotate = function(num){
	if(!num) num = 1;
	this.dir = (this.dir + num) % 4;
	for(var i=0; i<this.data.length; i++){
		for(var j=0; j<this.data[0].length; j++){
			this.data[i][j] = this.rotates[this.dir][i][j];
		}
	}
};

Square.prototype.canDown = function(isValid){
	var test = {};
	test.x = this.location.x + 1;
	test.y = this.location.y;
	return isValid(test, this.data);
};
Square.prototype.down = function(){
	this.location.x += 1;
};

Square.prototype.canLeft = function(isValid){
	var test = {};
	test.x = this.location.x;
	test.y = this.location.y - 1;
	return isValid(test, this.data);
};

Square.prototype.left = function(){
	this.location.y -= 1;
};

Square.prototype.canRight = function(isValid){
	var test = {};
	test.x = this.location.x;
	test.y = this.location.y + 1;
	return isValid(test, this.data);
};

Square.prototype.right = function(){
	this.location.y += 1;
};