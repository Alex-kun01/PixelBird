const oBird = document.getElementsByClassName('bird')[0];
const birdStyles = getComputedStyle(oBird);
const birdHeight = parseFloat(birdStyles.height);
const birdWidth = parseFloat(birdStyles.width);
const birdTop = parseFloat(birdStyles.top);
const birdLeft = parseFloat(birdStyles.left);
const gameDom = document.getElementsByClassName('game')[0];
const gameHeight = gameDom.clientHeight;//game的高度

//小鸟 子类
class Bird extends Parents{
    constructor(){
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, oBird);
        this.g = 1500;//向下的加速度
        this.maxY = gameHeight - landHeight -birdHeight;
        this.wingNum = 1;
        this.timer = null;
        this.render();
    }
    move(time){//重写move方法
        super.move(time);//调用父类方法
        //根据加速度改变速度
        this.ySpeed += this.g * time; //加速度*时间 = 速度 
    }
    onMove(){
        if(this.top < 0){
            this.top = 0;
        }
        else if(this.top > this.maxY){
            this.top = this.maxY;
        }
    }
    //向上弹跳的功能
    Jump(){
        this.ySpeed = -400; 
    }
    //煽动翅膀
    startWings(){
        if(this.timer){
            return;
        }
        this.timer = setInterval(()=>{
            this.wingNum++;
            if(this.wingNum == 4){
                this.wingNum = 1;
            }
            this.render();
        },200)
    }
    //停止煽动翅膀
    stopWings(){
        clearInterval(this.timer)
        this.timer = null;
    }
    render(){
        super.render();
        this.dom.className = `bird swing${this.wingNum}`;
    }

    

}
