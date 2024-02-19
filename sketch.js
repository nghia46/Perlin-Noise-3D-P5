const cols = 140;
const rows = 140;

let angleX = 0;
let angleY = 0;

function setup() {
  createCanvas(700, 700, WEBGL);

  zoomLeverInput = document.getElementById('zoomLevel');
}

function draw() {
  background(100, 200, 250);

  // Rotate the scene based on mouse movement
  angleX = map(mouseY, 0, height, -PI, PI);
  angleY = map(mouseX, 0, width, -PI, PI);

  rotateX(angleX);
  rotateY(angleY);

  scale(parseFloat(zoomLeverInput.value));

  translate(-width / 2, -height / 2);

  noStroke();
  for (let y = 0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      // Get height
      let h = map(noise(x * 0.1, y * 0.1), 0, 1, -100, 100);

      // Get color
      let c = getTerrainColor(h);

      // Set vertex
      fill(c);
      vertex(x * 5, y * 5, h);

      // Repeat for strip
      h = map(noise(x * 0.1, (y + 1) * 0.1), 0, 1, -100, 100);
      c = getTerrainColor(h);
      fill(c);
      vertex(x * 5, (y + 1) * 5, h);
    }
    endShape();
  }
}

function getTerrainColor(h) {
  if (h < -40) {
    //Deep Ocean
    return color(75, 91, 171);
  } 
  else if (h < -30) 
  {
    //
    return color(77, 166, 255);

  } 
  else if (h < -10) 
  {
    //
    return color(120, 255, 227);
  } 
  else if (h < 0) 
  {
    // Beach
    return color(230, 210, 170);
  } 
  else if (h < 40) 
  {
    // Grass
    return color(124, 184, 57);
  } 
  else if(h < 50)
  {
    // Mountain
    return color(100, 100, 100);
  }
  else 
  {
    //Snow
    return color(255, 255, 237);
  }
}
