const arrowRight = 39
const dKey = 68
const arrowLeft = 37
const aKey = 65
const upArrow = 38
const downArrow = 40
const wKey = 87
const sKey = 83

class Game {
  constructor(svg) {
    this.svg = document.getElementById(svg)
  }
}

class Person {
  constructor(x,y,r,svg,enemy=false) {
    this.x = x
    this.y = y
    this.r = r
    this.head = {x,y,r}
    this.neck = {x1: x, y1: y+r, x2: x, y2:y+r*2}
    this.leftHand = {x1: x, y1: y+r*2, x2: x-r*1.5, y2: y+r*3, x3: x-r*1.5, y3: y+r*4.5}
    this.rightHand = {x1: x, y1: y+r*2, x2: x+r*1.5, y2: y+r*3, x3: x+r*3, y3: y+r*3.5}
    this.body = {x1: x, y1: y+r*2, x2: x, y2:y+r*6}
    this.leftLeg = {x1: x, y1:y+r*6, x2: x-r*0.75, y2: y+r*7.5, x3: x-r*1.5, y3: y+r*9, groupX: x-r*1.5, groupY: y+r*6}
    this.rightLeg = {x1: x, y1:y+r*6, x2: x+r*0.75, y2: y+r*7.5, x3: x+r*1.5, y3: y+r*9}
    this.svgCanvas = document.getElementById(svg)
    this.enemy = enemy
  }

  changeAllXAxis(value) {
    this.x = this.x + value
    this.head = Object.assign(this.head, {x: this.x})
    this.neck = Object.assign(this.neck, {x1: this.x, x2: this.x})
    this.leftHand = Object.assign(this.leftHand, {x1: this.x, x2: this.x-this.r*1.5, x3: this.x-this.r*1.5})
    this.rightHand = Object.assign(this.rightHand, {x1: this.x, x2: this.x+this.r*1.5, x3: this.x+this.r*3})
    this.body = Object.assign(this.body, {x1: this.x, x2: this.x})
    this.leftLeg = Object.assign(this.leftLeg, {groupX: this.x-this.r*1.5})
    this.rightLeg = Object.assign(this.rightLeg, {x1: this.x, x2: this.x+this.r*0.75, x3: this.x+this.r*1.5})
  }

  // animation(value, animationDuration, animatedMovement) {
  //   let progress = 0;
  //   let progressIncrement = animationDuration/value;
  //   if (progressIncrement < 0) progressIncrement = progressIncrement * -1;
  //   let iterationValueChange = value/progressIncrement;

  //   let interv = setInterval(()=> {
  //     debugger;
  //     console.log(this)
  //     var a = animatedMovement(iterationValueChange)
  //     console.log(a)
  //     this.render()
  //     progress += progressIncrement
  //     if (progress === animationDuration) clearInterval(interv)
  //   }, progressIncrement)
  // }
  recountCoords(minX, minY, object) {
    if (object['counted']) return
    object['counted'] = true 
    object.minX = minX
    object.minY = minY
    for(let i = 1; i < 10; i ++) {
      let propValueX = object['x'+i]
      let propValueY = object['y'+i]
      object['x'+i] = minX - propValueX
      object['y'+i] = minY - propValueY
      if (object['x'+i] < 0) object['x'+i] = object['x'+i] * -1
      if (object['y'+i] < 0) object['y'+i] = object['y'+i] * -1
    }
  }

  move(direction) {
    const currX = this.x
    if (direction === 'left') {
      const targetX = this.x - 10

      let interv = setInterval(()=> {
        this.changeAllXAxis(-1)
        this.render()
        if (this.x === targetX) clearInterval(interv)
      }, 10)
    }
    else if (direction === 'right') {
      const targetX = this.x + 10

      let interv = setInterval(()=> {
        this.changeAllXAxis(1)
        this.step()
        this.render()
        if (this.x === targetX) clearInterval(interv)
      }, 10)
    }
  }

  step() {
    let back = false

    const diffBetweenStartAndEndRightLeg = this.rightLeg.x1 - this.rightLeg.x2
    const diffBetweenStartAndEnd2RightLeg = this.rightLeg.x1 - this.rightLeg.x3

    const diffBetweenStartAndEndLeftLeg = this.leftLeg.x2 - this.rightLeg.x2
    const diffBetweenStartAndEnd2LeftLeg = this.leftLeg.x3 - this.rightLeg.x3
      
    if (back) {
      this.leftLeg.x2 = this.leftLeg.x2 + diffBetweenStartAndEndLeftLeg/5
      this.leftLeg.x3 = this.leftLeg.x3 + diffBetweenStartAndEnd2LeftLeg/5

      this.rightLeg.x2 = this.rightLeg.x2 - diffBetweenStartAndEndRightLeg/5
      this.rightLeg.x3 = this.rightLeg.x3 - diffBetweenStartAndEnd2RightLeg/5
      if (this.rightLeg.x2 === this.x+this.r*0.75 && this.rightLeg.x3 === this.x+this.r*1.5) clearInterval(interv)
    }
    else {
      this.leftLeg.x2 = this.leftLeg.x2 - diffBetweenStartAndEndLeftLeg/5
      this.leftLeg.x3 = this.leftLeg.x3 - diffBetweenStartAndEnd2LeftLeg/5

      this.rightLeg.x2 = this.rightLeg.x2 + diffBetweenStartAndEndRightLeg/5
      this.rightLeg.x3 = this.rightLeg.x3 + diffBetweenStartAndEnd2RightLeg/5
      if (this.rightLeg.x2 === this.rightLeg.x1 && this.rightLeg.x3 === this.rightLeg.x1) back = true
    }
  }

  render() {
    this.recountCoords(this.leftLeg.x1, this.leftLeg.y1, this.rightHand)
    this.recountCoords(this.leftLeg.x3, this.leftLeg.y1, this.leftLeg)
    this.recountCoords(this.rightLeg.x1, this.rightLeg.y1, this.rightLeg)
    console.log('render fn')
    const svg = this.svgCanvas
    const person = []
    const head = `<circle cx="${this.head.x}" cy="${this.head.y}" r="${this.head.r}" class="head"/>`
    const neck = `<line x1="${this.neck.x1}" y1="${this.neck.y1}" x2="${this.neck.x2}" y2="${this.neck.y2}" stroke="black" stroke-width="2" class="neck"/>`
    const body = `<line x1="${this.body.x1}" y1="${this.body.y1}" x2="${this.body.x2}" y2="${this.body.y2}" stroke="black" stroke-width="2" class="body"/>`
    const leftHand = `
    <line x1="${this.leftHand.x1}" y1="${this.leftHand.y1}" x2="${this.leftHand.x2}" y2="${this.leftHand.y2}" stroke="black" stroke-width="2"/>
    <line x1="${this.leftHand.x2}" y1="${this.leftHand.y2}" x2="${this.leftHand.x3}" y2="${this.leftHand.y3}" stroke="black" stroke-width="2"/>
    `
    const rightHand = ` <g class="rightHand" transform="translate(${this.rightHand.minX}, ${this.rightHand.minY})">
      <line x1="${this.rightHand.x1}" y1="${this.rightHand.y1}" x2="${this.rightHand.x2}" y2="${this.rightHand.y2}" stroke="black" stroke-width="2"/>
      <line x1="${this.rightHand.x2}" y1="${this.rightHand.y2}" x2="${this.rightHand.x3}" y2="${this.rightHand.y3}" stroke="black" stroke-width="2"/>
    </g>`
    
    const leftLeg = `<g class="leftleg" transform="translate(${this.leftLeg.minX}, ${this.leftLeg.minY})" >
      <line x1="${this.leftLeg.x1}" y1="${this.leftLeg.y1}" x2="${this.leftLeg.x2}" y2="${this.leftLeg.y2}" stroke="black" stroke-width="2"/>
      <line x1="${this.leftLeg.x2}" y1="${this.leftLeg.y2}" x2="${this.leftLeg.x3}" y2="${this.leftLeg.y3}" stroke="black" stroke-width="2"/>
    <g/>`

    let rightLeg = `<g class="rightLeg" transform="translate(${this.rightLeg.minX}, ${this.rightLeg.minY})">
      <line x1="${this.rightLeg.x1}" y1="${this.rightLeg.y1}" x2="${this.rightLeg.x2}" y2="${this.rightLeg.y2}" stroke="black" stroke-width="2"/>
      <line x1="${this.rightLeg.x2}" y1="${this.rightLeg.y2}" x2="${this.rightLeg.x3}" y2="${this.rightLeg.y3}" stroke="black" stroke-width="2"/>
    </g>`
    const legs = `${leftLeg}${rightLeg}`
    person.push(head, neck, body, leftHand, rightHand, legs)



    let isEnemy = ''
    if (this.enemy) isEnemy = 'enemy'

    const svgPerson = `<g class="person ${isEnemy}">` + person.join('') + '</g>'
    console.log(svgPerson)
    svg.innerHTML = svgPerson

    const allGroupElems = document.getElementsByTagName('g')
    console.log('allGroupElems')
    console.log(allGroupElems)
  }
}

window.onload = function () {
  const person = new Person(50,20,15, 'svg')
  const game = new Game('svg')
  person.render()

  window.onkeydown = function (e) {

    if (e.which === arrowRight || e.which === dKey) person.move('right')
    else if (e.which === arrowLeft || e.which === aKey) person.move('left')

    if (e.which === upArrow || e.which === wKey) jump()
    if (e.which === downArrow || e.which === sKey) sit()
  }

  console.log(game.svg)
}

document.addEventListener('DOMContentLoaded', function () {

    // Our hawaiian greeting is displayed as soon as the page loads,

    console.log('Aloha');
});