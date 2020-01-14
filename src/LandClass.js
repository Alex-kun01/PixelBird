
const oLand = document.getElementsByClassName('land')[0];
const landStyles = getComputedStyle(oLand);
const landHeight = parseFloat(landStyles.height);
const landWidth = parseFloat(landStyles.width);
const landTop = parseFloat(landStyles.top);

//大地 子类
class Land extends Parents{
    constructor(speed){
        super(landWidth, landHeight, 0, landTop, speed, 0, oLand);
    }
    onMove(){
        if(this.left <= -landWidth / 2){
            this.left = 0;
        }
    }
}
