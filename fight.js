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
    this.begin = -100
    this.end = 1000
  }
}

class Person {
  constructor(x,y,r,svg,enemy=false) {
    this.x = x
    this.y = y
    this.r = r
    this.head = {x,y,r}
    this.neck = {x1: x, y1: y+r, x2: x, y2:y+r*2}
    this.leftHand = {x1: 22.5, y1: 0, x2: 0, y2: 15, x3: 0, y3: 47.5, groupX: x-r*1.5, groupY: y+r*2}
    this.rightHand = {x1: 0, y1: 0, x2: 22.5, y2: 15, x3: 45, y3: 22.5, groupX: x, groupY: y+r*2}
    this.body = {x1: x, y1: y+r*2, x2: x, y2:y+r*6}
    this.leftLeg = {x1: 22.5, y1:0, x2: 11.25, y2: 22.5, x3: 0, y3: 45, groupX: x-r*1.5, groupY: y+r*6}
    this.rightLeg = {x1: 0, y1:0, x2: 11.25, y2: 22.5, x3: 22.5, y3: 45, groupX: x, groupY: y+r*6}
    this.svgCanvas = document.getElementById(svg)
    this.enemy = enemy
    this.isMoving = false
    this.health = 100
  }

  decreaseHealth(value) {
    this.health = this.health - value
    document.querySelector('.health').setAttribute('width', this.health * 3)
  }

  move(direction) {
    this.isMoving = true
    const currX = this.x
    let targetX = null
    if (direction === 'left') targetX = currX - 10
    else if (direction === 'right') targetX = currX + 10

    const diffBetweenStartAndEndRightLeg = this.rightLeg.x1 - this.rightLeg.x2
    const diffBetweenStartAndEnd2RightLeg = this.rightLeg.x1 - this.rightLeg.x3

    const diffBetweenStartAndEndLeftLeg = this.leftLeg.x2 + this.rightLeg.x2
    const diffBetweenStartAndEnd2LeftLeg = this.leftLeg.x1 + this.rightLeg.x3

    let personElement = document.getElementsByClassName('person')[0]
    let changePosition = () => {
      if (direction === 'left') this.x = this.x - 1
      else if (direction === 'right') this.x = this.x + 1

      personElement.setAttribute('transform', `translate(${this.x})`)
      console.log(personElement.getAttribute('transform'))
      
      if (this.x === targetX) {
        this.isMoving = false
        clearInterval(interv)
      }
    }

    this.step(diffBetweenStartAndEndRightLeg, diffBetweenStartAndEnd2RightLeg, diffBetweenStartAndEndLeftLeg, diffBetweenStartAndEnd2LeftLeg)
    changePosition()
    let interv = setInterval(changePosition, 10)
  }

  step(diffBetweenStartAndEndRightLeg, diffBetweenStartAndEnd2RightLeg, diffBetweenStartAndEndLeftLeg, diffBetweenStartAndEnd2LeftLeg) {
    let back = false    
    const startPositionRightLegX2 = 11.25
    const startPositionRightLegX3 = 22.5

    let leftLegElement = document.querySelectorAll('.leftLeg line')
    let rightLegElement = document.querySelectorAll('.rightLeg line')

    let legsAnimation = ()=> {
      if (back) {
        this.leftLeg.x2 = this.leftLeg.x2 - diffBetweenStartAndEndLeftLeg/5
        this.leftLeg.x3 = this.leftLeg.x3 - diffBetweenStartAndEnd2LeftLeg/5

        this.rightLeg.x2 = this.rightLeg.x2 - diffBetweenStartAndEndRightLeg/5
        this.rightLeg.x3 = this.rightLeg.x3 - diffBetweenStartAndEnd2RightLeg/5
        if (this.rightLeg.x2 === startPositionRightLegX2 && this.rightLeg.x3 === startPositionRightLegX3) clearInterval(interv)
      }
      else {
        this.leftLeg.x2 = this.leftLeg.x2 + diffBetweenStartAndEndLeftLeg/5
        this.leftLeg.x3 = this.leftLeg.x3 + diffBetweenStartAndEnd2LeftLeg/5

        this.rightLeg.x2 = this.rightLeg.x2 + diffBetweenStartAndEndRightLeg/5
        this.rightLeg.x3 = this.rightLeg.x3 + diffBetweenStartAndEnd2RightLeg/5
        if (this.rightLeg.x2 === this.rightLeg.x1 && this.rightLeg.x3 === this.rightLeg.x1) back = true
      }

      leftLegElement[0].setAttribute('x2', this.leftLeg.x2)
      leftLegElement[1].setAttribute('x1', this.leftLeg.x2)
      leftLegElement[1].setAttribute('x2', this.leftLeg.x3)

      rightLegElement[0].setAttribute('x2', this.rightLeg.x2)
      rightLegElement[1].setAttribute('x1', this.rightLeg.x2)
      rightLegElement[1].setAttribute('x2', this.rightLeg.x3)

    }

    legsAnimation()
    let interv = setInterval(legsAnimation, 10)
  }

  handHit() {
    let back = false
    let rightHand = document.querySelectorAll('.rightHand line')
    let interv = setInterval(()=> {
      if (!back) {
        if (this.rightHand.y2 === 0 && this.rightHand.y3 === 0) {
        this.rightHand.x3 += 4.5
        }
        else {
          this.rightHand.y2 -= 3
          this.rightHand.y3 -= 4.5
        }
        if (this.rightHand.x3 === 67.5) back = true
      }
      
      if (back) {
        this.rightHand.y2 += 3
        this.rightHand.y3 += 4.5
        this.rightHand.x3 -= 4.5
        if (this.rightHand.y2 === 15 && this.rightHand.y3 === 22.5 && this.rightHand.x3 === 45) clearInterval(interv)
      }
      // this.render()
      rightHand[0].setAttribute('x2', this.rightHand.x2)
      rightHand[1].setAttribute('x1', this.rightHand.x2)
      rightHand[1].setAttribute('x2', this.rightHand.x3)

      rightHand[0].setAttribute('y2', this.rightHand.y2)
      rightHand[1].setAttribute('y1', this.rightHand.y2)
      rightHand[1].setAttribute('y2', this.rightHand.y3)
    }, 10)
    this.decreaseHealth(5)
  }

  render() {
    const svg = this.svgCanvas
    const head = `<circle cx="${this.head.x}" cy="${this.head.y}" r="${this.head.r}" class="head"/>`
    const neck = `<line x1="${this.neck.x1}" y1="${this.neck.y1}" x2="${this.neck.x2}" y2="${this.neck.y2}" stroke="black" stroke-width="2" class="neck"/>`
    const body = `<line x1="${this.body.x1}" y1="${this.body.y1}" x2="${this.body.x2}" y2="${this.body.y2}" stroke="black" stroke-width="2" class="body"/>`

    const leftHand = 
    `<g class="leftHand" transform="translate(${this.leftHand.groupX}, ${this.leftHand.groupY})">
      <line x1="${this.leftHand.x1}" y1="${this.leftHand.y1}" x2="${this.leftHand.x2}" y2="${this.leftHand.y2}" stroke="black" stroke-width="2"/>
      <line x1="${this.leftHand.x2}" y1="${this.leftHand.y2}" x2="${this.leftHand.x3}" y2="${this.leftHand.y3}" stroke="black" stroke-width="2"/>
    </g>`
    
    const rightHand = 
    `<g class="rightHand" transform="translate(${this.rightHand.groupX}, ${this.rightHand.groupY})">
      <line x1="${this.rightHand.x1}" y1="${this.rightHand.y1}" x2="${this.rightHand.x2}" y2="${this.rightHand.y2}" stroke="black" stroke-width="2"/>
      <line x1="${this.rightHand.x2}" y1="${this.rightHand.y2}" x2="${this.rightHand.x3}" y2="${this.rightHand.y3}" stroke="black" stroke-width="2"/>
    </g>`
    
    const leftLeg = 
    `<g class="leftLeg" transform="translate(${this.leftLeg.groupX}, ${this.leftLeg.groupY})" >
      <line x1="${this.leftLeg.x1}" y1="${this.leftLeg.y1}" x2="${this.leftLeg.x2}" y2="${this.leftLeg.y2}" stroke="black" stroke-width="2"/>
      <line x1="${this.leftLeg.x2}" y1="${this.leftLeg.y2}" x2="${this.leftLeg.x3}" y2="${this.leftLeg.y3}" stroke="black" stroke-width="2"/>
    </g>`

    const rightLeg = 
    `<g class="rightLeg" transform="translate(${this.rightLeg.groupX}, ${this.rightLeg.groupY})">
      <line x1="${this.rightLeg.x1}" y1="${this.rightLeg.y1}" x2="${this.rightLeg.x2}" y2="${this.rightLeg.y2}" stroke="black" stroke-width="2"/>
      <line x1="${this.rightLeg.x2}" y1="${this.rightLeg.y2}" x2="${this.rightLeg.x3}" y2="${this.rightLeg.y3}" stroke="black" stroke-width="2"/>
    </g>`

    const person = [head, neck, body, leftHand, rightHand, leftLeg, rightLeg]

    let isEnemy = ''
    if (this.enemy) isEnemy = 'enemy'

    const svgPerson = `<g transform="translate(${this.x})" class="person ${isEnemy}">` + person.join('') + '</g>'
    svg.innerHTML += svgPerson
  }
}


window.onload = function () {
  const person = new Person(50,100,15, 'svg')
  const game = new Game('svg')
  person.render()

  window.onkeyup = function (e) {
    if (e.which === arrowRight || e.which === dKey) {
      person.isMoving = false     
    }
    if (e.which === arrowLeft || e.which === aKey) {
       person.isMoving = false
    }
  }

  window.onkeydown = function (e) {

    if (e.which === 88) {
      person.handHit()
    }

    if (e.which === arrowRight || e.which === dKey) {
      if (person.isMoving !== true && game.end > person.x) person.move('right')
    }

    if (e.which === arrowLeft || e.which === aKey) {
      if (person.isMoving !== true && game.begin < person.x) person.move('left')
    }
    // else if (e.which === arrowLeft || e.which === aKey) person.move('left')

    if (e.which === upArrow || e.which === wKey) jump()
    if (e.which === downArrow || e.which === sKey) sit()
  }

  console.log(game.svg)
}

document.addEventListener('DOMContentLoaded', function () {

    // Our hawaiian greeting is displayed as soon as the page loads,

    console.log('Aloha');
});