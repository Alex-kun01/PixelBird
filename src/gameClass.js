class Game {
    constructor(){
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        //柱子对生成器
        this.PipeProducer = new PipeProducer(-100);
        this.timer = null;
        this.tick = 16; //移动时间间隔 、毫秒
        this.gameOver = false;
        this.number = 0;
    }


    start(){
        if(this.timer){
            return;
        }
        if(this.gameOver){
            //重新开始游戏
            window.location.reload();
        }
        this.PipeProducer.startProduce();//开始生成柱子
        this.timer = setInterval(()=>{
            const duration = this.tick / 1000;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.bird.startWings();
            this.PipeProducer.pairs.forEach(pair =>{
                pair.move(duration);
            })
            if(this.isGameOver()){
                this.stop();
                this.gameOver = true;
                alert(`GAME OVER!!! 【得分】:${this.number}`);
                this.number = 0;
            }
        },this.tick)
    }
    isHit(rec1, rec2){
        //横向：两个矩形的中心点的距离、是否小于矩形宽度之和的一半
        //纵向：两个矩形的中心的纵向距离、是否小于矩形高度之和的一半
        var centerX1 = rec1.left + rec1.width / 2;
        var centerY1 = rec1.top + rec1.height / 2;
        var centerX2 = rec2.left + rec2.width / 2;
        var centerY2 = rec2.top + rec2.height / 2;
        var disX = Math.abs( centerX1 - centerX2 );//中心点横向距离
        var disY = Math.abs( centerY1 - centerY2 );//中心点纵向距离
        if(disX < (rec1.width + rec2.width)/2 && disY < (rec1.height + rec2.height)/2){
            return true;
        }
        return false;
    }

    isGameOver(){
        //鸟碰到大地
        if(this.bird.top === this.bird.maxY){
            return true;
        }
        //鸟碰到柱子对
        for(let i = 0;i < this.PipeProducer.pairs.length;i++){
            const pair = this.PipeProducer.pairs[i];
            console.log(pair);
            //看柱子对pair是都跟bird进行了碰撞
            if( this.isHit( this.bird, pair.upPipe) || this.isHit( this.bird, pair.downPipe)  ){
                return true;
            }
        }
        return false;
    }

    stop(){
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopWings();
        this.PipeProducer.stopProduce();
    }
    /**
     * 关联键盘事件
     */
    regEvent(){
        window.onkeydown = e =>{
            if(e.key === "Enter"){
                if(this.timer){
                    this.stop();
                }
                else{
                    this.start();
                }
            }
            else if(e.key === " "){
                this.bird.Jump();
                this.number++;
            }
        }
    }
}

var game = new Game();
game.regEvent();