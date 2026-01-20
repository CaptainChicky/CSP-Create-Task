//some drawing tests

// Get the canvas and context
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Function to draw all static elements
function drawStaticElements() {
  //outline test
  ctx.beginPath()
  ctx.strokeStyle = "blue"
  ctx.strokeRect(50, 35, 50, 50)

  //fill test1
  ctx.beginPath()
  ctx.fillStyle = "black"
  ctx.fillRect(125, 35, 50, 50)

  //fill test2
  ctx.fillStyle = 'green';
  ctx.fillRect(100, 100, 240, 190);

  //test3
  ctx.beginPath()
  ctx.strokeStyle = 'red'
  ctx.fillStyle = 'blue'
  ctx.lineWidth = 5
  ctx.rect(200, 35, 50, 50)
  ctx.fill()
  ctx.stroke()

  //test4
  ctx.beginPath()
  ctx.rect(275, 35, 50, 50)
  ctx.fill()
  ctx.stroke()

  //===========================
  //===========================
  //coordinate system drawing
  // draws a grid
  function createGrid() {
    // draw a line every *step* pixels
    const step = 50

    // our end points
    const width = canvas.width
    const height = canvas.height

    // set our styles
    ctx.save()
    ctx.strokeStyle = 'gray' // line colors
    ctx.fillStyle = 'black' // text color
    ctx.font = '14px Monospace'
    ctx.lineWidth = 0.35

    // draw vertical from X to Height
    for (let x = 0; x < width; x += step) {
      // draw vertical line
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()

      // draw text
      ctx.fillText(x, x, 12)
    }

    // draw horizontal from Y to Width
    for (let y = 0; y < height; y += step) {
      // draw horizontal line
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()

      // draw text
      ctx.fillText(y, 0, y)
    }

    // restore the styles from before this function was called
    ctx.restore()
  }
  //invokes function
  createGrid();

  //======================
  //======================
  //drawing squares
  //class for future calling reference
  class DrawRectangle {
    //arguments to pass into class
    //values to stop null input and errors
    constructor(
      x = 0,
      y = 0,
      width = 0,
      height = 0,
      fillColor = "",
      strokeColor = "",
      strokeWidth = 2
    ) { //put inputs into constructor
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.fillColor = fillColor;
      this.strokeColor = strokeColor;
      this.strokeWidth = strokeWidth;
    }

    //prep funcs for fun ig
    get area() {
      return this.width * this.height;
    }

    // gets the X position of the left side
    get left() {
      // origin is at top left so just return x
      return this.x;
    }

    // get X position of right side
    get right() {
      // x is left position + the width to get end point
      return this.x + this.width;
    }

    // get the Y position of top side
    get top() {
      // origin is at top left so just return y
      return this.y;
    }

    // get Y position at bottom
    get bottom() {
      return this.y + this.height;
    }

    // draw rectangle to screen
    draw() {
      // destructuring
      const { x, y, width, height, fillColor, strokeColor, strokeWidth } = this;

      // saves the current styles set elsewhere
      // to avoid overwriting them
      ctx.save();

      // set the styles for this shape
      ctx.fillStyle = fillColor;
      ctx.lineWidth = strokeWidth;

      // create the *path*
      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.rect(x, y, width, height);

      // draw the path to screen
      ctx.fill();
      ctx.stroke();

      // restores the styles from earlier
      // preventing the colors used here
      // from polluting other drawings
      ctx.restore();
    }
  }

  //insert constant for square
  const mySquare = new DrawRectangle(400, 85, 50, 50, "gold");
  //log square properties
  console.log(mySquare);
  //draw it
  mySquare.draw();

  //===============================
  //===============================
  // lets use the helper methods to
  // draw shapes on the sides of mySquare
  const childrenSquares = [
    // top side square - align x with mySquare's left side
    // align bottom with top of mySquare
    new DrawRectangle(mySquare.left, mySquare.top - 50, 50, 50, 'red'),

    // right side square - align x with right side of mySquare
    // align top with mySquare top
    new DrawRectangle(mySquare.right, mySquare.top, 50, 50, 'green'),

    // bottom square
    new DrawRectangle(mySquare.left, mySquare.bottom, 50, 50, 'blue'),

    // left square
    new DrawRectangle(mySquare.left - 50, mySquare.top, 50, 50, 'magenta')
  ]

  // draw all of the child squares by looping over them
  childrenSquares.forEach(square => square.draw())

  //==============================
  //==============================
  // Quadratic Bézier curve
  ctx.beginPath();
  ctx.moveTo(50, 20);
  ctx.quadraticCurveTo(230, 30, 50, 100);
  ctx.stroke();

  // Start and end points
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(50, 20, 5, 0, 2 * Math.PI);   // Start point
  ctx.arc(50, 100, 5, 0, 2 * Math.PI);  // End point
  ctx.fill();

  // Control point
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(230, 30, 5, 0, 2 * Math.PI);
  ctx.fill();


  //circles
  // usual setup
  ctx.save()
  ctx.strokeStyle = 'red'
  ctx.fillStyle = 'black'

  // text specific styles
  ctx.font = 'bold 16px Monospace'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'

  // draw stroked text to screen
  ctx.strokeText('Stroked Text', 50, 250)

  // calculate the width of this text using current font/styles
  const textWidth = ctx.measureText('Stroked Text').width

  // X = previous X position + width + 25px margin
  ctx.fillText('Filled Text', 50 + textWidth + 25, 250)

  ctx.restore()



  // TRIANGLES
  // usual setup
  ctx.save()
  ctx.strokeStyle = 'black'
  ctx.fillStyle = 'orangered'

  // Filled Triangle
  ctx.beginPath()
  ctx.moveTo(50, 400) // starting point
  ctx.lineTo(50, 350) // left side
  ctx.lineTo(100, 400) // hypotenuse / long side
  ctx.fill() // closes the bottom side & fills

  // stroked triangle
  ctx.beginPath()
  ctx.moveTo(150, 400) // starting point
  ctx.lineTo(200, 400) // bottom side
  ctx.lineTo(200, 350) // right side
  ctx.closePath() // hypotenuse/long side (remember to close path for strokes!)
  ctx.stroke()

  ctx.restore()



  //==========================
  // Draw dino image
  const base_image = new Image();
  base_image.src = './sprites/dino1.png';
  base_image.onload = function () {
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.drawImage(base_image, 500, 500, 44 * 2, 24 * 2);
  }
}

// Initial draw of all static elements
drawStaticElements();

//=============================
// SPACESHIP MOVEMENT CONTROLS
//=============================

// Spaceship state variables
let angle = 0;
let position = {
  x: canvas.width / 2,
  y: canvas.height / 2
};
const moveRate = 8;
const turnRate = 5;
const shipSize = 25; // triangle size (increased for visibility)

// Draw the spaceship as a triangle
function drawSpaceship() {
  ctx.save();

  // Translate to ship position and rotate
  ctx.translate(position.x, position.y);
  ctx.rotate((angle * Math.PI) / 180);

  // Draw triangle pointing up
  ctx.beginPath();
  ctx.fillStyle = 'yellow';
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 3;
  ctx.moveTo(0, -shipSize);        // tip
  ctx.lineTo(-shipSize / 2, shipSize / 2);  // bottom left
  ctx.lineTo(shipSize / 2, shipSize / 2);   // bottom right
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function updatePosition(offset) {
  let rad = angle * (Math.PI / 180);
  position.x += (Math.sin(rad) * offset);
  position.y -= (Math.cos(rad) * offset);

  // Wrap around screen edges
  if (position.x < 0) {
    position.x = canvas.width;
  } else if (position.x > canvas.width) {
    position.x = 0;
  }

  if (position.y < 0) {
    position.y = canvas.height;
  } else if (position.y > canvas.height) {
    position.y = 0;
  }
}

function refresh() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Redraw all static elements
  drawStaticElements();

  // Draw spaceship at new position
  drawSpaceship();
}

// Initial draw
drawSpaceship();

// Keyboard controls
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if event already handled
  }

  switch (event.code) {
    case "KeyS":
    case "ArrowDown":
      // Move backward
      updatePosition(-moveRate);
      break;
    case "KeyW":
    case "ArrowUp":
      // Move forward
      updatePosition(moveRate);
      break;
    case "KeyA":
    case "ArrowLeft":
      // Turn left
      angle -= turnRate;
      break;
    case "KeyD":
    case "ArrowRight":
      // Turn right
      angle += turnRate;
      break;
  }

  refresh();

  // Consume the event so it doesn't get handled twice
  event.preventDefault();
}, true);