// 定义计分牌
export default class ScorePanel{
  score = 0;
  level = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  // 限制等级上限
  maxLevel: number;
  // 设置升级分数
  upScore: number;

  constructor(maxLevel: number = 10, upScore: number = 10){
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 设置加分方法
  addScore(){
    this.scoreEle.innerHTML = ++this.score + '';

    if (this.score % this.upScore === 0){
      this.levelUp(); //每10分将升级
    }
  }

  // 提升等级
  levelUp(){
    // 等级上限
    if (this.level < this.maxLevel){
      this.levelEle.innerHTML = ++this.level + '';
    }
  }
}

// 测试代码
// const sp = new ScorePanel(100, 2);
// for (let i = 0; i<200; i++)
//   sp.addScore();