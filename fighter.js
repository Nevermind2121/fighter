let svg = Snap("#svg")

class Person {
  constructor(x,y,r, svg) {
    this.head = {x,y,r}
    this.neck = {x1: x, y1: y+r, x2: x, y2:y+r*2}
    this.leftHand = {x1: x, y1: y+r*2, x2: x-r*1.5, y2: y+r*3, x3: x-r*1.5, y3: y+r*4.5}
    this.rightHand = {x1: x, y1: y+r*2, x2: x+r*1.5, y2: y+r*3, x3: x+r*3, y3: y+r*3.5}
    this.body = {x1: x, y1: y+r*2, x2: x, y2:y+r*6}
    this.leftLeg = {x1: x, y1:y+r*6, x2: x-r*1.5, y2: y+r*9}
    this.rightLeg = {x1: x, y1:y+r*6, x2: x+r*1.5, y2: y+r*9}

    this.position = 0

    this.svg = svg.group(
      svg.circle(this.head.x, this.head.y, this.head.r).attr({'id': 'head'}),
      svg.line(this.neck.x1, this.neck.y1, this.neck.x2, this.neck.y2).attr({'stroke-width': 2, 'stroke': 'black', 'id': 'neck'}),
      svg.line(this.body.x1, this.body.y1, this.body.x2, this.body.y2).attr({'stroke-width': 2, 'stroke': 'black', 'id': 'body'}),
      svg.group(
        svg.line(this.leftHand.x1, this.leftHand.y1, this.leftHand.x2, this.leftHand.y2).attr({'stroke-width': 2, 'stroke': 'black'}),
        svg.line(this.leftHand.x2, this.leftHand.y2, this.leftHand.x3, this.leftHand.y3).attr({'stroke-width': 2, 'stroke': 'black'})).attr({'id': 'lefthand'}),
      svg.group(
        svg.line(this.rightHand.x1, this.rightHand.y1, this.rightHand.x2, this.rightHand.y2).attr({'stroke-width': 2, 'stroke': 'black'}),
        svg.line(this.rightHand.x2, this.rightHand.y2, this.rightHand.x3, this.rightHand.y3).attr({'stroke-width': 2, 'stroke': 'black'})).attr({'id': 'righthand'}),
      svg.line(this.leftLeg.x1, this.leftLeg.y1, this.leftLeg.x2, this.leftLeg.y2).attr({'stroke-width': 2, 'stroke': 'black', 'id': 'leftleg'}),
      svg.line(this.rightLeg.x1, this.rightLeg.y1, this.rightLeg.x2, this.rightLeg.y2).attr({'stroke-width': 2, 'stroke': 'black', 'id': 'rightleg'})
    )
  }

  // svgInit() {
  //   this.svg = 

  //   this.svg.step = (direction) => {
  //     return new Promise( function (resolve, reject) {
  //       console.log(aa)
  //       if (direction === 'right') aa = aa + 25
  //       else aa = aa - 25
  //       this.svg.animate({'transform': `t${aa} 0`}, 100, function () {
  //         resolve()
  //       })
        
  //       this.svg.select('#leftleg').animate({'x2': 80}, 125, function () {
  //         this.svg.select('#leftleg').animate({'x2': 30}, 50)
  //       })

  //       this.svg.select('#rightleg').animate({'x2': 50}, 125, function () {
  //         this.svg.select('#rightleg').animate({'x2': 90}, 50)
  //       })
  //     })
  //   }

  //   this.svg.jump = function () {
  //     console.log('JUMP')
  //   }

  //   return this.svg
  // }

  step(direction) {
    if (direction === 'right') this.position = this.position + 25
    else this.position = this.position - 25

    this.svg.animate({'transform': `t${aa} 0`}, 100)
      
    this.svg.select('#leftleg').animate({'x2': 80}, 125, function () {
      this.svg.select('#leftleg').animate({'x2': 30}, 50)
    })

    this.svg.select('#rightleg').animate({'x2': 50}, 125, function () {
      this.svg.select('#rightleg').animate({'x2': 90}, 50)
    })
  }
}

let player1 = new Person(60,100,20, svg)
console.log(player1)

function sit() {
  return new Promise(function (resolve, reject) {

  })
}

function jump() {

}


window.addEventListener('keydown', function (e) {
  const arrowRight = 39
  const dKey = 68
  const arrowLeft = 37
  const aKey = 65
  const upArrow = 38
  const downArrow = 40
  const wKey = 87
  const sKey = 83

  if (e.which === arrowRight || e.which === dKey) player1SVG.step('right')
  else if (e.which === arrowLeft || e.which === aKey) step('left')

  if (e.which === upArrow || e.which === wKey) jump()
  if (e.which === downArrow || e.which === sKey) sit()
})
