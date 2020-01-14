

//父类

/**
 * 矩形类，可移动
 * 属性：宽度、高度、横坐标、纵坐标、横向速度、纵向速速、对应的dom
 */
class Parents{
    constructor(width, height, left, top, xSpeed, ySpeed, dom){
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();
    }
    //渲染页面
    render(){
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }
    //移动dom
    /**
     * 按照矩形的速度和指定的事件、移动矩形
     * @param {} time  时间、单位秒
     */
    move(time){
        const xDis = this.xSpeed * time;//横向的距离
        const yDis = this.ySpeed * time;//纵向的距离
        this.left = this.left + xDis;//更新left的值
        this.top = this.top + yDis;//更新top的值

        if(this.onMove){//判断是否存在onMove方法
            this.onMove();//更新值后 重新渲染
        }
        this.render();
    }

}