export default class Food{
  // 定义属性：表示食物所对应的元素
  element: HTMLElement;

  constructor(){
    // !表示这个元素不可能为空
    this.element = document.getElementById('food')!;
  }

  // 方法：获取食物X轴坐标
  get X(){
    return this.element.offsetLeft;
  }
  // 方法：获取食物Y轴坐标
  get Y(){
    return this.element.offsetTop;
  }

  // 方法：修改食物位置
  change() {
    // 宽高范围：0 - 290px
    // 移动一格 = 10px -> 食物坐标必须是10的倍数
    let left = Math.round(Math.random() * 29) * 10;
    let top = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }
}

// 测试代码
// const food = new Food();
// console.log(food.X, food.Y);
// food.change();
// console.log(food.X, food.Y);