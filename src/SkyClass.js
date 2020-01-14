
const oSky = document.getElementsByClassName('sky')[0];
const skyStyles = getComputedStyle(oSky);
const skyHeight = parseFloat(skyStyles.height);
const skyWidth = parseFloat(skyStyles.width);

//天空 子类
class Sky extends Parents{
    constructor(){
        super(skyWidth, skyHeight, 0, 0, -100, 0, oSky);
    }
    onMove(){
        if(this.left <= -skyWidth / 2){
            this.left = 0;
        }
    }
}
