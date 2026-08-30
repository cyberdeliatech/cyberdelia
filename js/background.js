// ========================================
// THREE.JS BACKGROUND
// ========================================

const container = document.getElementById("canvas-container");

const scene = new THREE.Scene();

scene.fog = new THREE.FogExp2(0x050508, 0.010);

// ========================================
// CAMERA
// ========================================

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.set(0, 15, 50);

// ========================================
// RENDERER
// ========================================

const renderer = new THREE.WebGLRenderer({
antialias: true,
alpha: false,
powerPreference: "high-performance"
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
Math.min(window.devicePixelRatio, 2)
);

renderer.outputColorSpace = THREE.SRGBColorSpace;

container.appendChild(renderer.domElement);

// ========================================
// COLORS
// ========================================

const neonColors = [
0x00E5FF,
0xB19CD9,
0x00FF88
];

// ========================================
// BACKGROUND WORLD
// ========================================

const backgroundWorld = new THREE.Group();

scene.add(backgroundWorld);

// ========================================
// NEON GRID
// ========================================

const gridGroup = new THREE.Group();

const gridSize = 300;
const gridDivisions = 60;
const gridStep = gridSize / gridDivisions;

const gridMaterials = neonColors.map((color) => {

return new THREE.LineBasicMaterial({
color,
transparent: true,
opacity: 0.30
});

});

// Vertical grid lines

for (let i = 0; i <= gridDivisions; i++) {

const x = -gridSize / 2 + i * gridStep;

const geometry = new THREE.BufferGeometry();

geometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(
[
x, -5, -gridSize / 2,
x, -5, gridSize / 2
],
3
)
);

const colorIndex =
Math.floor(Math.random() * neonColors.length);

gridGroup.add(
new THREE.Line(
geometry,
gridMaterials[colorIndex]
)
);

}

// Horizontal grid lines

for (let i = 0; i <= gridDivisions; i++) {

const z = -gridSize / 2 + i * gridStep;

const geometry = new THREE.BufferGeometry();

geometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(
[
-gridSize / 2, -5, z,
gridSize / 2, -5, z
],
3
)
);

const colorIndex =
Math.floor(Math.random() * neonColors.length);

gridGroup.add(
new THREE.Line(
geometry,
gridMaterials[colorIndex]
)
);

}

backgroundWorld.add(gridGroup);

// ========================================
// GRID GLOW
// ========================================

const glowGridGroup = new THREE.Group();

const glowMaterials = neonColors.map((color) => {

return new THREE.LineBasicMaterial({
color,
transparent: true,
opacity: 0.065
});

});

// Vertical glow lines

for (let i = 0; i <= gridDivisions; i++) {

const x = -gridSize / 2 + i * gridStep;

const geometry = new THREE.BufferGeometry();

geometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(
[
x, -4.98, -gridSize / 2,
x, -4.98, gridSize / 2
],
3
)
);

const colorIndex =
Math.floor(Math.random() * neonColors.length);

glowGridGroup.add(
new THREE.Line(
geometry,
glowMaterials[colorIndex]
)
);

}

// Horizontal glow lines

for (let i = 0; i <= gridDivisions; i++) {

const z = -gridSize / 2 + i * gridStep;

const geometry = new THREE.BufferGeometry();

geometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(
[
-gridSize / 2, -4.98, z,
gridSize / 2, -4.98, z
],
3
)
);

const colorIndex =
Math.floor(Math.random() * neonColors.length);

glowGridGroup.add(
new THREE.Line(
geometry,
glowMaterials[colorIndex]
)
);

}

backgroundWorld.add(glowGridGroup);

// ========================================
// SERVER RACKS
// ========================================

const towersGroup = new THREE.Group();

backgroundWorld.add(towersGroup);

function createServerRack() {

const rack = new THREE.Group();

const colorHex =
neonColors[
Math.floor(Math.random() * neonColors.length)
];

const rackWidth =
3.8 + Math.random() * 0.9;

const rackHeight =
14 + Math.random() * 28;

const rackDepth =
3 + Math.random() * 1.5;

// Rack frame

const frameGeometry = new THREE.BoxGeometry(
rackWidth,
rackHeight,
rackDepth
);

const frameMaterial = new THREE.MeshBasicMaterial({
color: colorHex,
wireframe: true,
transparent: true,
opacity: 0.48
});

const frame = new THREE.Mesh(
frameGeometry,
frameMaterial
);

frame.position.set(0, 0, 0);

rack.add(frame);

// Server units

const unitCount =
Math.max(
6,
Math.floor(rackHeight / 2.2)
);

const unitHeight =
rackHeight / (unitCount + 2);

for (let j = 0; j < unitCount; j++) {

const unitGeometry = new THREE.BoxGeometry(
  rackWidth * 0.82,
  unitHeight * 0.52,
  rackDepth * 0.76
);

const unitMaterial = new THREE.MeshBasicMaterial({
  color:
    neonColors[
      (j + Math.floor(Math.random() * 3)) % 3
    ],
  wireframe: true,
  transparent: true,
  opacity: 0.32
});

const unit = new THREE.Mesh(
  unitGeometry,
  unitMaterial
);

unit.position.set(
  0,
  -rackHeight / 2 +
    unitHeight * (j + 1.25),
  0
);

rack.add(unit);


// LED

const ledGeometry =
  new THREE.SphereGeometry(
    0.045,
    6,
    6
  );

const ledColor =
  neonColors[
    Math.floor(
      Math.random() * neonColors.length
    )
  ];

const ledMaterial =
  new THREE.MeshBasicMaterial({
    color: ledColor,
    transparent: true,
    opacity: 1
  });

const led = new THREE.Mesh(
  ledGeometry,
  ledMaterial
);

led.position.set(
  rackWidth * 0.31,
  unit.position.y,
  rackDepth * 0.41
);

led.userData.blinkOffset =
  Math.random() * Math.PI * 2;

led.userData.blinkSpeed =
  0.8 + Math.random() * 2;

led.userData.isServerLed = true;

rack.add(led);


// Second LED

const led2 = new THREE.Mesh(
  ledGeometry,
  new THREE.MeshBasicMaterial({
    color:
      neonColors[
        Math.floor(
          Math.random() *
          neonColors.length
        )
      ],
    transparent: true,
    opacity: 1
  })
);

led2.position.set(
  rackWidth * 0.27,
  unit.position.y,
  rackDepth * 0.41
);

led2.userData.blinkOffset =
  Math.random() * Math.PI * 2;

led2.userData.blinkSpeed =
  0.8 + Math.random() * 2;

led2.userData.isServerLed = true;

rack.add(led2);


}

// Rack rails

const railGeometry =
new THREE.BoxGeometry(
0.06,
rackHeight,
0.06
);

const railMaterial =
new THREE.MeshBasicMaterial({
color: colorHex,
transparent: true,
opacity: 0.9
});

const leftRail =
new THREE.Mesh(
railGeometry,
railMaterial
);

leftRail.position.set(
-rackWidth * 0.45,
0,
rackDepth * 0.43
);

const rightRail =
leftRail.clone();

rightRail.position.x =
rackWidth * 0.45;

rack.add(
leftRail,
rightRail
);

// Top cap

const topCapGeometry =
new THREE.BoxGeometry(
rackWidth * 0.82,
0.12,
rackDepth * 0.78
);

const topCapMaterial =
new THREE.MeshBasicMaterial({
color: colorHex,
transparent: true,
opacity: 0.35
});

const topCap =
new THREE.Mesh(
topCapGeometry,
topCapMaterial
);

topCap.position.set(
0,
rackHeight / 2 - 0.4,
0
);

rack.add(topCap);

// Bottom cap

const bottomCap =
topCap.clone();

bottomCap.position.y =
-rackHeight / 2 + 0.4;

rack.add(bottomCap);

// Glow

const glowGeometry =
new THREE.BoxGeometry(
rackWidth * 0.94,
rackHeight * 0.94,
rackDepth * 0.94
);

const glowMaterial =
new THREE.MeshBasicMaterial({
color: colorHex,
wireframe: true,
transparent: true,
opacity: 0.035
});
