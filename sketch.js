const cols = 100;
const rows = 100;

let angleX = 0;
let angleY = 0;

function setup() {
  frameRate(144);

  createCanvas(500, 500, WEBGL);
}

function draw() {
  background(100, 200, 250);

  // Rotate the scene based on mouse movement
  angleX = map(mouseY, 0, height, -PI, PI);
  angleY = map(mouseX, 0, width, -PI, PI);

  rotateX(angleX);
  rotateY(angleY);

  translate(-width / 2, -height / 2);

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
  if (h < -70) {
    // Ocean
    return color(0, 0, 255);
  } else if (h < -40) {
    // Beach
    return color(230, 210, 170);
  } else if (h < 20) {
    // Grass
    return color(50, 205, 50);
  } else {
    // Mountain
    return color(100, 100, 100);
  }
}
