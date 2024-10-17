let colors; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); 
  colors = [
    color(214, 45, 0), // Rosso
    color(228, 118, 0), // Arancione
    color(230, 213, 0), // Giallo
    color(170, 170, 170) // Grigio
  ];
}

function draw() {
  let x = 100;
  let y = 100; 
  let margin = 100; 

  background(227, 226, 224);

  while (y < height - margin) { 
    let squareSize = random(23, 35); 
    let col = chooseColor(x, y); 
    // Quadrati 
    stroke(col.levels[0], col.levels[1], col.levels[2], 150); 
    strokeWeight(5.5);
    fill(255, 255, 255, 0); 
    push();
    translate(x + squareSize / 2, y + squareSize / 2); 
    rotate(random(TWO_PI)); 
    rect(-squareSize / 2, -squareSize / 2, squareSize, squareSize, 0.5); 
    // Puntino in angolo
    let dotX = -squareSize / 2; 
    let dotY = -squareSize / 2; 
    fill(col.levels[0], col.levels[1], col.levels[2]); 
    noStroke();
    circle(dotX, dotY, 6, 6);
    pop(); 

    x += squareSize + 5; // Margine extra tra quadrati
    if (x >= width - margin) { 
       x = 100; 
       y += random(25, 45); 
    }
  }

  fill(0); 
  noStroke();
  textAlign(CENTER); 
  textSize(12); 
  textFont("Trebuchet MS");
  text("OMAGGIO A ''NO TITLE'', 1967, FRIEDER NAKE", width / 2, height - 35); 
}

// Funzione per determinare colore in base a distanza dagli spigoli
function chooseColor(x, y) {
  let probabilita = random(0, 100); 
  let xNorm = x / width; // Normalizziamo x (valore tra 0 e 1)
  let yNorm = y / height; // Normalizziamo y (valore tra 0 e 1)

  // Se siamo molto vicini a uno spigolo, assegna colore dominante 
  let spigolino = windowWidth/2.8; // Dimensione zone angolari
  if (dist(x, y, 0, 0) < spigolino) { // alto sx - Rosso
    return colors[0]; 
  } else if (dist(x, y, width, 0) < spigolino) { // alto dx - Grigio
    return colors[3]; 
  } else if (dist(x, y, 0, height) < spigolino/1.3) { // basso sx - Giallo
    return colors[2]; 
  } else if (dist(x, y, width, height) < spigolino) { // basso dx - Rosso
    return colors[0]; 
  }

  // dimensioni 4 quadranti
  if (xNorm < 0.4 && yNorm < 0.6) { // Alto sx: 40% larghezza, 60% altezza
    if (probabilita < 50) {
      return colors[0]; // Rosso
    } else if (probabilita < 60){
      return colors[2]; // Giallo
    } else {
      return colors[1]; // Arancione
    }
  } else if (xNorm >= 0.4 && yNorm < 0.4) { // Alto dx: 60% larghezza, 40% altezza
    if (probabilita < 40) {
      return colors[3]; // Grigio
    } else {
      return colors[2]; // Giallo
    }
  } else if (xNorm < 0.6 && yNorm >= 0.4) { // Basso sx: 60% larghezza, 40% altezza
    if (probabilita < 70) {
      return colors[2]; // Giallo
    } else {
      return colors[1]; // Arancione
    }
  } else if (xNorm >= 0.6 && yNorm >= 0.4) { // Basso dx: 40% larghezza, 60% altezza
    if (probabilita < 50) {
      return colors[0]; // Rosso
    } else if (probabilita < 60){
      return colors[2]; // Giallo
    } else {
      return colors[1]; // Arancione
    }
  }
}
