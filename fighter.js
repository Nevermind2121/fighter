const arrowRight = 39
const dKey = 68
const arrowLeft = 37
const aKey = 65
const upArrow = 38
const downArrow = 40
const wKey = 87
const sKey = 83

class Person {
  constructor(x,y,r, svg) {
    this.x = x
    this.y = y
    this.r = r
    this.oneStep = r*1.5
    this.head = {x,y,r}
    this.neck = {x1: x, y1: y+r, x2: x, y2:y+r*2}
    this.leftHand = {x1: x, y1: y+r*2, x2: x-r*1.5, y2: y+r*3, x3: x-r*1.5, y3: y+r*4.5}
    this.rightHand = {x1: x, y1: y+r*2, x2: x+r*1.5, y2: y+r*3, x3: x+r*3, y3: y+r*3.5}
    this.body = {x1: x, y1: y+r*2, x2: x, y2:y+r*6}
    this.leftLeg = {x1: x, y1:y+r*6, x2: x-r*1.5, y2: y+r*9}
    this.rightLeg = {x1: x, y1:y+r*6, x2: x+r*1.5, y2: y+r*9}

    this.action = null

  //   this.svg = svg.group(
  //     svg.circle(this.head.x, this.head.y, this.head.r).attr({'id': 'head'}),
  //     svg.line(this.neck.x1, this.neck.y1, this.neck.x2, this.neck.y2).attr({'stroke-width': 2, 'stroke': 'black', 'id': 'neck'}),
  //     svg.line(this.body.x1, this.body.y1, this.body.x2, this.body.y2).attr({'stroke-width': 2, 'stroke': 'black', 'id': 'body'}),
  //     svg.group(
  //       svg.line(this.leftHand.x1, this.leftHand.y1, this.leftHand.x2, this.leftHand.y2).attr({'stroke-width': 2, 'stroke': 'black'}),
  //       svg.line(this.leftHand.x2, this.leftHand.y2, this.leftHand.x3, this.leftHand.y3).attr({'stroke-width': 2, 'stroke': 'black'})).attr({'id': 'lefthand'}),
  //     svg.group(
  //       svg.line(this.rightHand.x1, this.rightHand.y1, this.rightHand.x2, this.rightHand.y2).attr({'stroke-width': 2, 'stroke': 'black'}),
  //       svg.line(this.rightHand.x2, this.rightHand.y2, this.rightHand.x3, this.rightHand.y3).attr({'stroke-width': 2, 'stroke': 'black'})).attr({'id': 'righthand'}),
  //     svg.line(this.leftLeg.x1, this.leftLeg.y1, this.leftLeg.x2, this.leftLeg.y2).attr({'stroke-width': 2, 'stroke': 'black', 'id': 'leftleg'}),
  //     svg.line(this.rightLeg.x1, this.rightLeg.y1, this.rightLeg.x2, this.rightLeg.y2).attr({'stroke-width': 2, 'stroke': 'black', 'id': 'rightleg'})
  //   )
  // }

  // step(direction) {
  //   let that = this

  //   if (!direction) {
  //     clearInterval(this.action)
  //     this.action = null
  //     return
  //   }
    
  //   if (this.action) return
    
  //   function step () {
  //     const bBox = that.svg.getBBox()

  //     if ((bBox.x == that.oneStep && direction === 'left') || (bBox.x < that.oneStep && direction === 'left')) {
  //       clearInterval(that.action)
  //       that.action = null
  //       return
  //     }

  //     let move = bBox.x

  //     if (direction === 'left') move -= 2*that.oneStep

  //     that.svg.animate({'transform': 't'+move+ ' 0'}, 100, function () {
  //       console.log(that.svg.getBBox())
  //     })

  //     that.svg.select('#leftleg').animate({'x2': 80}, 80, () => {
  //       that.svg.select('#leftleg').animate({'x2': 30}, 20)
  //     })

  //     that.svg.select('#rightleg').animate({'x2': 50}, 80, () => {
  //       that.svg.select('#rightleg').animate({'x2': 90}, 20)
  //     })
  //   }
    
  //   step()

  //   let stepInterval = setInterval(() => {
  //     step()
  //   }, 101)
    
  //   this.action = stepInterval
    
  // }

  sit() {
    console.log('sit')
  }

  jump() {
    console.log('jump')
  }
}

let player1 = new Person(60,100,20, svg)

window.onkeydown = function (e) {
  if (e.repeat) return

  if (e.which === arrowRight || e.which === dKey) player1.step('right')
  else if (e.which === arrowLeft || e.which === aKey) player1.step('left')

  if (e.which === upArrow || e.which === wKey) jump()
  if (e.which === downArrow || e.which === sKey) sit()
}

window.onkeyup = function (e) {
  if (e.which === arrowRight || e.which === dKey || e.which === arrowLeft || e.which === aKey) player1.step()

  if (e.which === upArrow || e.which === wKey) jump()
  if (e.which === downArrow || e.which === sKey) sit()
}