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

    this.svg = {
      head: null,
      neck: null,
      leftHand: null,
      rightHand: null,
      body: null,
      leftLeg: null,
      rightLeg: null
    }
  }

  svgInit() {
    this.svg.head = svg.circle(this.head.x, this.head.y, this.head.r)
    this.svg.neck = svg.line(this.neck.x1, this.neck.y1, this.neck.x2, this.neck.y2).attr({'stroke-width': 2, 'stroke': 'black'})
    this.svg.body = svg.line(this.body.x1, this.body.y1, this.body.x2, this.body.y2).attr({'stroke-width': 2, 'stroke': 'black'})
    this.svg.leftHand = svg.group(
      svg.line(this.leftHand.x1, this.leftHand.y1, this.leftHand.x2, this.leftHand.y2).attr({'stroke-width': 2, 'stroke': 'black'}),
      svg.line(this.leftHand.x2, this.leftHand.y2, this.leftHand.x3, this.leftHand.y3).attr({'stroke-width': 2, 'stroke': 'black'}))
    this.svg.rightHand = svg.group(
      svg.line(this.rightHand.x1, this.rightHand.y1, this.rightHand.x2, this.rightHand.y2).attr({'stroke-width': 2, 'stroke': 'black'}),
      svg.line(this.rightHand.x2, this.rightHand.y2, this.rightHand.x3, this.rightHand.y3).attr({'stroke-width': 2, 'stroke': 'black'}))
    this.svg.leftLeg = svg.line(this.leftLeg.x1, this.leftLeg.y1, this.leftLeg.x2, this.leftLeg.y2).attr({'stroke-width': 2, 'stroke': 'black'})
    this.svg.rightLeg = svg.line(this.rightLeg.x1, this.rightLeg.y1, this.rightLeg.x2, this.rightLeg.y2).attr({'stroke-width': 2, 'stroke': 'black'})
    return this.svg
  }

  step() {
    this.head.x += 1
    this.svg.head.x += 1
    console.log(this.head)
  }
}

let player1 = new Person(60,20,20, svg)
let player1SVG = player1.svgInit()
console.log(player1SVG)

setInterval(function () {
  player1.step()
},  1000)

// const head = player1.head
// const neck = player1.neck
// const body = player1.body
// const leftHand = player1.leftHand
// const rightHand = player1.rightHand
// const leftLeg = player1.leftLeg
// const rightLeg = player1.rightLeg

// var a = svg.circle(head.x, head.y, head.r)

// var b = svg.line(neck.x1, neck.y1, neck.x2, neck.y2).attr({'stroke-width': 2, 'stroke': 'black'})

// var c = svg.line(body.x1, body.y1, body.x2, body.y2).attr({'stroke-width': 2, 'stroke': 'black'})

// var d = svg.line(leftHand.x1, leftHand.y1, leftHand.x2, leftHand.y2).attr({'stroke-width': 2, 'stroke': 'black'})
// svg.line(leftHand.x2, leftHand.y2, leftHand.x3, leftHand.y3).attr({'stroke-width': 2, 'stroke': 'black'})

// svg.line(rightHand.x1, rightHand.y1, rightHand.x2, rightHand.y2).attr({'stroke-width': 2, 'stroke': 'black'})
// svg.line(rightHand.x2, rightHand.y2, rightHand.x3, rightHand.y3).attr({'stroke-width': 2, 'stroke': 'black'})

// svg.line(leftLeg.x1, leftLeg.y1, leftLeg.x2, leftLeg.y2).attr({'stroke-width': 2, 'stroke': 'black'})
// svg.line(rightLeg.x1, rightLeg.y1, rightLeg.x2, rightLeg.y2).attr({'stroke-width': 2, 'stroke': 'black'})

