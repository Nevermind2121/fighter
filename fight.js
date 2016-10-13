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
    this.leftLeg = {x1: x, y1:y+r*6, x2: x-r*0.75, y2: y+r*7.5, x3: x-r*1.5, y3: y+r*9}
    this.rightLeg = {x1: x, y1:y+r*6, x2: x+r*0.75, y2: y+r*7.5, x3: x+r*1.5, y3: y+r*9}
    this.svgCanvas = document.getElementById(svg)
    this.enemy = enemy
  }

  render() {
    const svg = this.svgCanvas
    const person = []
    const head = `<circle cx="${this.head.x}" cy="${this.head.y}" r="${this.head.r}" class="head"/>`
    const neck = `<line x1="${this.neck.x1}" y1="${this.neck.y1}" x2="${this.neck.x2}" y2="${this.neck.y2}" stroke="black" stroke-width="2" class="neck"/>`
    const body = `<line x1="${this.body.x1}" y1="${this.body.y1}" x2="${this.body.x2}" y2="${this.body.y2}" stroke="black" stroke-width="2" class="body"/>`
    const leftHand = `<g class="lefthand">
    <line x1="${this.leftHand.x1}" y1="${this.leftHand.y1}" x2="${this.leftHand.x2}" y2="${this.leftHand.y2}" stroke="black" stroke-width="2"/>
    <line x1="${this.leftHand.x2}" y1="${this.leftHand.y2}" x2="${this.leftHand.x3}" y2="${this.leftHand.y3}" stroke="black" stroke-width="2"/>
    <g />`
    const rightHand = `<g class="righthand">
      <line x1="${this.rightHand.x1}" y1="${this.rightHand.y1}" x2="${this.rightHand.x2}" y2="${this.rightHand.y2}" stroke="black" stroke-width="2"/>
      <line x1="${this.rightHand.x2}" y1="${this.rightHand.y2}" x2="${this.rightHand.x3}" y2="${this.rightHand.y3}" stroke="black" stroke-width="2"/>
    <g/>`
    const leftLeg = `<g class="leftleg" >
      <line x1="${this.leftLeg.x1}" y1="${this.leftLeg.y1}" x2="${this.leftLeg.x2}" y2="${this.leftLeg.y2}" stroke="black" stroke-width="2"/>
      <line x1="${this.leftLeg.x2}" y1="${this.leftLeg.y2}" x2="${this.leftLeg.x3}" y2="${this.leftLeg.y3}" stroke="black" stroke-width="2"/>
    <g/>`
    const rightLeg = `<g class="rightLeg">
      <line x1="${this.rightLeg.x1}" y1="${this.rightLeg.y1}" x2="${this.rightLeg.x2}" y2="${this.rightLeg.y2}" stroke="black" stroke-width="2"/>
      <line x1="${this.rightLeg.x2}" y1="${this.rightLeg.y2}" x2="${this.rightLeg.x3}" y2="${this.rightLeg.y3}" stroke="black" stroke-width="2"/>
    <g/>`
    person.push(head, neck, body, leftHand, rightHand, leftLeg, rightLeg)

    let isEnemy = ''
    if (this.enemy) isEnemy = 'enemy'

    const svgPerson = `<g class="person ${isEnemy}">` + person.join('')
    svg.innerHTML = svgPerson
    
  }
}

window.onload = function () {
  let person = new Person(50,20,15, 'svg')
  let game = new Game('svg')

  console.log(game.svg)
}

document.addEventListener('DOMContentLoaded', function () {

    // Our hawaiian greeting is displayed as soon as the page loads,

    console.log('Aloha');

});