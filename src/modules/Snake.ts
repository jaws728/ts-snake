export default class Snake{
  // 蛇头：蛇由多个子div组成
  head: HTMLElement;
  // 蛇体：包括头
  body: HTMLCollection;
  // 蛇的容器
  container: HTMLElement;

  constructor(){
    this.container = document.getElementById('snake')!;
    this.head = document.querySelector('#snake>div')!;
    // 不使用querySelectAll因为这种方式是永远固定的
    this.body = document.getElementById('snake')!.getElementsByTagName('div');
  }

  // 获取蛇的坐标 - 头
  public get X(){
    return this.head.offsetLeft;
  }
  public get Y(){
    return this.head.offsetTop;
  }

  // 设置蛇头坐标
  public set X(value){
    if (this.X === value) return;
    // 判断合法范围
    if (value < 0 || value > 290){
      throw new Error('蛇撞墙了！');
    }
    // 左右和上下不能同时移动：蛇头和第二节的位置是否一样
    if (this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value){
      if (value > this.X){
        // 若向左时出现掉头：继续向左
        value = this.X - 10;
      } else {
        // 若向右时出现掉头：继续向右
        value = this.X + 10;
      }
    }
    this.moveBody();
    this.head.style.left = value + 'px';
    this.checkCollision();
  }
  public set Y(value){
    if (this.Y === value) return;
    // 判断合法范围
    if (value < 0 || value > 290){
      throw new Error('蛇撞墙了！');
    }
    if (this.body[1] && (this.body[1] as HTMLElement).offsetTop === value){
      if (value > this.Y){
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    this.moveBody();
    this.head.style.top = value + 'px';
    this.checkCollision();
  }

  // 增加蛇体
  addBody(){
    this.container.insertAdjacentHTML('beforeend', '<div></div>');
  }

  // 移动蛇身体的方法
  moveBody(){
    // 将后位的蛇体设为前位蛇体的位置
    for (let i = this.body.length - 1; i>0; i--){
      let x = (this.body[i-1] as HTMLElement).offsetLeft;
      let y = (this.body[i-1] as HTMLElement).offsetTop;
      // (this.body[i] as HTMLElement).setAttribute('style', 'left:'+x+'px'+'top:'+y+'px');
      // (this.body[i] as HTMLElement).style.top = y + 'px';
      (this.body[i] as HTMLElement).style.left = x + 'px';
      (this.body[i] as HTMLElement).style.top = y + 'px';
    }
  }

  // 检查自身撞击
  checkCollision(){
    // 检查所有蛇体，是否与蛇头坐标重叠
    for (let i=1; i<this.body.length; i++){
      let bd = (this.body[i] as HTMLElement);
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop){
        throw new Error('撞到自己了！');
      }
    }
  }
}