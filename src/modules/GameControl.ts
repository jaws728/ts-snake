// 控制整个游戏 - 包括其他组件
import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';

export default class GameControl{
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;

  // 存储按键方向
  dir: string = '';
  // 控制游戏是否结束
  inGame: boolean = true;

  constructor(){
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 2);
    this.init();
  }

  // 游戏初始化
  init(){
    // 绑定键盘事件
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
    this.move();
  }

  // 键盘响应函数
  keyDownHandler(e: KeyboardEvent){
    // 检测键盘是否合法
    this.dir = e.key;
  }

  // 蛇移动的方法
  move(){
    /* 根据方向this.dir改变蛇的位置
    *   上：top减少
    *   下：top增加
    *   左：left减少
    *   右：left增加
    * */
    let x = this.snake.X;
    let y = this.snake.Y;

    // 判断蛇位置并对其进行更改
    switch(this.dir){
       case 'ArrowUp':
       case 'Up':
         y -= 10;
         break;
       case 'ArrowDown':
       case 'Down':
         y += 10;
         break;
       case 'ArrowLeft':
       case 'Left':
         x -= 10;
         break;
       case 'ArrowRight':
       case 'Right':
         x += 10;
         break;
    }

    // 检查蛇是否吃到食物
    this.checkEat(x,y);

    // 更新蛇位置
    try {
      this.snake.X = x;
      this.snake.Y = y;
    } catch (error) {
      alert(error + 'GAME OVER');
      this.inGame = false;
    }

    // 定时器：一直移动蛇的位置
    this.inGame && setTimeout(this.move.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  // 定义检测蛇吃到食物的方法
  checkEat(x: number, y: number){
    if (x === this.food.X && y === this.food.Y){
      // 1. 食物位置更换
      this.food.change();
      // 2. 增加分数
      this.scorePanel.addScore();
      // 3. 增加蛇身
      this.snake.addBody();
    }
  }
}