const container = document.getElementById("canvas-container");

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050508, 0.010);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 15, 50);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false,
  powerPreference: "high-performance"
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement);

const neonColors = [0x00E5FF, 0xB19CD9, 0x00FF88];

const ambientLight = new THREE.AmbientLight(0xffffff, 0.28);
scene.add(ambientLight);

const cyanLight = new THREE.PointLight(0x00E5FF, 4, 90);
cyanLight.position.set(-30, 18, 25);
scene.add(cyanLight);

const greenLight = new THREE.PointLight(0x00FF88, 3.5, 90);
greenLight.position.set(30, 12, -20);
scene.add(greenLight);

const lavenderLight = new THREE.PointLight(0xB19CD9, 3, 100);
lavenderLight.position.set(0, 28, -55);
scene.add(lavenderLight);

const backgroundWorld = new THREE.Group();
scene.add(backgroundWorld);

// Neon grid
const gridGroup = new THREE.Group();
const gridSize = 300;
const gridDivisions = 60;
const gridStep = gridSize / gridDivisions;

const gridMaterials = neonColors.map(color =>
  new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.30
  })
);

for (let i = 0; i <= gridDivisions; i++) {
  const x = -gridSize / 2 + i * gridStep;
  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
      x, -5, -gridSize / 2,
      x, -5, gridSize / 2
    ], 3)
  );

  const colorIndex = Math.floor(Math.random() * neonColors.length);

  gridGroup.add(
    new THREE.Line(geometry, gridMaterials[colorIndex])
  );
}

for (let i = 0; i <= gridDivisions; i++) {
  const z = -gridSize / 2 + i * gridStep;
  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
      -gridSize / 2, -5, z,
      gridSize / 2, -5, z
    ], 3)
  );

  const colorIndex = Math.floor(Math.random() * neonColors.length);

  gridGroup.add(
    new THREE.Line(geometry, gridMaterials[colorIndex])
  );
}

backgroundWorld.add(gridGroup);

// Grid glow
const glowGridGroup = new THREE.Group();

const glowMaterials = neonColors.map(color =>
  new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.065
  })
);

for (let i = 0; i <= gridDivisions; i++) {
  const x = -gridSize / 2 + i * gridStep;
  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
      x, -4.98, -gridSize / 2,
      x, -4.98, gridSize / 2
    ], 3)
  );

  const colorIndex = Math.floor(Math.random() * neonColors.length);

  glowGridGroup.add(
    new THREE.Line(geometry, glowMaterials[colorIndex])
  );
}

for (let i = 0; i <= gridDivisions; i++) {
  const z = -gridSize / 2 + i * gridStep;
  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
      -gridSize / 2, -4.98, z,
      gridSize / 2, -4.98, z
    ], 3)
  );

  const colorIndex = Math.floor(Math.random() * neonColors.length);

  glowGridGroup.add(
    new THREE.Line(geometry, glowMaterials[colorIndex])
  );
}

backgroundWorld.add(glowGridGroup);

// Server racks
const towersGroup = new THREE.Group();
backgroundWorld.add(towersGroup);

function createServerRack() {
  const rack = new THREE.Group();

  const colorHex =
    neonColors[Math.floor(Math.random() * neonColors.length)];

  const rackWidth = 3.8 + Math.random() * 0.9;
  const rackHeight = 14 + Math.random() * 28;
  const rackDepth = 3 + Math.random() * 1.5;

  const frameGeometry = new THREE.BoxGeometry(
    rackWidth,
    rackHeight,
    rackDepth
  );

  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x10151a,
    metalness: 0.88,
    roughness: 0.27,
    transparent: true,
    opacity: 0.96
  });

  rack.add(
    new THREE.Mesh(frameGeometry, frameMaterial)
  );

  const frontPanelGeometry = new THREE.BoxGeometry(
    rackWidth * 0.86,
    rackHeight * 0.94,
    0.10
  );

  const frontPanelMaterial = new THREE.MeshStandardMaterial({
    color: 0x080b0e,
    metalness: 0.75,
    roughness: 0.30
  });

  const frontPanel = new THREE.Mesh(
    frontPanelGeometry,
    frontPanelMaterial
  );

  frontPanel.position.z = rackDepth * 0.51;
  rack.add(frontPanel);

  const unitCount = Math.max(6, Math.floor(rackHeight / 2.2));
  const unitHeight = rackHeight / (unitCount + 2);

  for (let j = 0; j < unitCount; j++) {
    const unitGeometry = new THREE.BoxGeometry(
      rackWidth * 0.80,
      unitHeight * 0.56,
      rackDepth * 0.76
    );

    const unitMaterial = new THREE.MeshStandardMaterial({
      color: 0x151b21,
      metalness: 0.78,
      roughness: 0.30
    });

    const unit = new THREE.Mesh(unitGeometry, unitMaterial);

    unit.position.set(
      0,
      -rackHeight / 2 + unitHeight * (j + 1.25),
      rackDepth * 0.015
    );

    rack.add(unit);

    const faceGeometry = new THREE.BoxGeometry(
      rackWidth * 0.74,
      unitHeight * 0.40,
      0.075
    );

    const faceMaterial = new THREE.MeshStandardMaterial({
      color: 0x0b0f13,
      metalness: 0.85,
      roughness: 0.25
    });

    const face = new THREE.Mesh(faceGeometry, faceMaterial);

    face.position.set(
      0,
      unit.position.y,
      rackDepth * 0.405
    );

    rack.add(face);

    const ventMaterial = new THREE.MeshBasicMaterial({
      color: 0x26313a,
      transparent: true,
      opacity: 0.75
    });

    for (let v = 0; v < 5; v++) {
      const ventGeometry = new THREE.BoxGeometry(
        rackWidth * 0.075,
        unitHeight * 0.12,
        0.025
      );

      const vent = new THREE.Mesh(
        ventGeometry,
        ventMaterial
      );

      vent.position.set(
        -rackWidth * 0.19 + v * rackWidth * 0.095,
        unit.position.y,
        rackDepth * 0.445
      );

      rack.add(vent);
    }

    const ledGeometry = new THREE.SphereGeometry(0.045, 8, 8);

    const ledMaterial = new THREE.MeshBasicMaterial({
      color:
        neonColors[
          Math.floor(Math.random() * neonColors.length)
        ],
      transparent: true,
      opacity: 1
    });

    const led = new THREE.Mesh(ledGeometry, ledMaterial);

    led.position.set(
      rackWidth * 0.30,
      unit.position.y,
      rackDepth * 0.46
    );

    led.userData.blinkOffset = Math.random() * Math.PI * 2;
    led.userData.blinkSpeed = 0.8 + Math.random() * 2;
    led.userData.isServerLed = true;

    rack.add(led);

    const led2 = new THREE.Mesh(
      ledGeometry,
      new THREE.MeshBasicMaterial({
        color:
          neonColors[
            Math.floor(Math.random() * neonColors.length)
          ],
        transparent: true,
        opacity: 1
      })
    );

    led2.position.set(
      rackWidth * 0.26,
      unit.position.y,
      rackDepth * 0.46
    );

    led2.userData.blinkOffset = Math.random() * Math.PI * 2;
    led2.userData.blinkSpeed = 0.8 + Math.random() * 2;
    led2.userData.isServerLed = true;

    rack.add(led2);
  }

  const railGeometry = new THREE.BoxGeometry(
    0.07,
    rackHeight,
    0.07
  );

  const railMaterial = new THREE.MeshBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.95
  });

  const leftRail = new THREE.Mesh(
    railGeometry,
    railMaterial
  );

  leftRail.position.set(
    -rackWidth * 0.45,
    0,
    rackDepth * 0.52
  );

  const rightRail = leftRail.clone();
  rightRail.position.x = rackWidth * 0.45;

  rack.add(leftRail, rightRail);

  const topCapGeometry = new THREE.BoxGeometry(
    rackWidth * 0.84,
    0.14,
    rackDepth * 0.82
  );

  const topCapMaterial = new THREE.MeshStandardMaterial({
    color: 0x1b2229,
    metalness: 0.85,
    roughness: 0.25
  });

  const topCap = new THREE.Mesh(
    topCapGeometry,
    topCapMaterial
  );

  topCap.position.set(
    0,
    rackHeight / 2 - 0.35,
    0
  );

  rack.add(topCap);

  const bottomCap = topCap.clone();
  bottomCap.position.y = -rackHeight / 2 + 0.35;
  rack.add(bottomCap);

  const neonTopGeometry = new THREE.BoxGeometry(
    rackWidth * 0.80,
    0.045,
    0.045
  );

  const neonTop = new THREE.Mesh(
    neonTopGeometry,
    new THREE.MeshBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.85
    })
  );

  neonTop.position.set(
    0,
    rackHeight / 2,
    rackDepth * 0.50
  );

  rack.add(neonTop);

  const neonBottom = neonTop.clone();
  neonBottom.position.y = -rackHeight / 2;
  rack.add(neonBottom);

  const glowGeometry = new THREE.BoxGeometry(
    rackWidth * 0.96,
    rackHeight * 0.96,
    rackDepth * 0.96
  );

  const glowMaterial = new THREE.MeshBasicMaterial({
    color: colorHex,
    wireframe: true,
    transparent: true,
    opacity: 0.045
  });

  rack.add(
    new THREE.Mesh(glowGeometry, glowMaterial)
  );

  rack.position.y = rackHeight / 2 - 5;

  rack.userData.rackHeight = rackHeight;
  rack.userData.rackWidth = rackWidth;
  rack.userData.rackDepth = rackDepth;

  return rack;
}

for (let i = 0; i < 65; i++) {
  const rack = createServerRack();

  rack.position.x =
    (Math.random() - 0.5) * 220;

  rack.position.z =
    (Math.random() - 0.5) * 330 - 60;

  rack.rotation.y =
    (Math.random() - 0.5) * 0.06;

  rack.userData.baseRotationX =
    (Math.random() - 0.5) * 0.04;

  rack.userData.baseRotationY =
    rack.rotation.y;

  rack.userData.speed =
    0.2 + Math.random() * 0.4;

  towersGroup.add(rack);
}

// Floating particles
const particleCount = 180;
const particleGroups = [];

neonColors.forEach((color, colorIndex) => {
  const particlesGeo = new THREE.BufferGeometry();
  const posArray = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 280;
  }

  particlesGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particlesMesh = new THREE.Points(
    particlesGeo,
    new THREE.PointsMaterial({
      size: 0.8,
      color,
      transparent: true,
      opacity: 0.65,
      depthWrite: false
    })
  );

  particlesMesh.userData.colorIndex = colorIndex;
  backgroundWorld.add(particlesMesh);
  particleGroups.push(particlesMesh);
});

// Mouse / touch
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

window.addEventListener(
  "mousemove",
  e => {
    targetMouseX =
      (e.clientX / window.innerWidth) * 2 - 1;

    targetMouseY =
      -(e.clientY / window.innerHeight) * 2 + 1;
  },
  { passive: true }
);

window.addEventListener(
  "touchmove",
  e => {
    if (!e.touches.length) return;

    const touch = e.touches[0];

    targetMouseX =
      (touch.clientX / window.innerWidth) * 2 - 1;

    targetMouseY =
      -(touch.clientY / window.innerHeight) * 2 + 1;
  },
  { passive: true }
);

// Phone gyroscope
let gyroX = 0;
let gyroY = 0;
let gyroEnabled = false;

function handleOrientation(event) {
  if (
    event.gamma == null ||
    event.beta == null
  ) {
    return;
  }

  gyroX = Math.max(
    -1,
    Math.min(1, event.gamma / 25)
  );

  gyroY = Math.max(
    -1,
    Math.min(1, (event.beta - 45) / 25)
  );

  gyroEnabled = true;
}

async function enableGyro() {
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    try {
      const permission =
        await DeviceOrientationEvent.requestPermission();

      if (permission === "granted") {
        window.addEventListener(
          "deviceorientation",
          handleOrientation,
          true
        );
      }
    } catch (error) {
      console.log(
        "Gyro permission unavailable:",
        error
      );
    }
  } else {
    window.addEventListener(
      "deviceorientation",
      handleOrientation,
      true
    );
  }
}

window.addEventListener(
  "click",
  enableGyro,
  { once: true }
);

window.addEventListener(
  "touchstart",
  enableGyro,
  {
    once: true,
    passive: true
  }
);

// Scroll
let scrollProgress = 0;

window.addEventListener(
  "scroll",
  () => {
    const maxScroll =
      document.documentElement.scrollHeight -
      window.innerHeight;

    scrollProgress =
      maxScroll > 0
        ? window.scrollY / maxScroll
        : 0;
  },
  { passive: true }
);

// Resize
window.addEventListener(
  "resize",
  () => {
    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  },
  { passive: true }
);

// Animation
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime =
    clock.getElapsedTime();

  if (gyroEnabled) {
    targetMouseX = gyroX;
    targetMouseY = -gyroY;
  }

  mouseX +=
    (targetMouseX - mouseX) * 0.08;

  mouseY +=
    (targetMouseY - mouseY) * 0.08;

  const targetCamX =
    mouseX * 18;

  const targetCamY =
    15 -
    scrollProgress * 25 +
    mouseY * 8;

  const targetCamZ =
    50 -
    scrollProgress * 80;

  camera.position.x +=
    (targetCamX - camera.position.x) * 0.055;

  camera.position.y +=
    (targetCamY - camera.position.y) * 0.055;

  camera.position.z +=
    (targetCamZ - camera.position.z) * 0.055;

  const targetLookX =
    mouseX * 25;

  const targetLookY =
    -2 +
    scrollProgress * 15 -
    mouseY * 8;

  camera.lookAt(
    targetLookX,
    targetLookY,
    camera.position.z - 55
  );

  const targetWorldRotationY =
    mouseX * 0.28;

  const targetWorldRotationX =
    -mouseY * 0.16;

  backgroundWorld.rotation.y +=
    (
      targetWorldRotationY -
      backgroundWorld.rotation.y
    ) * 0.045;

  backgroundWorld.rotation.x +=
    (
      targetWorldRotationX -
      backgroundWorld.rotation.x
    ) * 0.045;

  gridGroup.position.z =
    (elapsedTime * 12) % 10;

  glowGridGroup.position.z =
    (elapsedTime * 12) % 10;

  gridGroup.rotation.y =
    mouseX * 0.035;

  gridGroup.rotation.x =
    -mouseY * 0.018;

  glowGridGroup.rotation.y =
    mouseX * 0.035;

  glowGridGroup.rotation.x =
    -mouseY * 0.018;

  towersGroup.rotation.y =
    Math.sin(elapsedTime * 0.08) *
    0.025 +
    mouseX * 0.08;

  towersGroup.rotation.x =
    Math.cos(elapsedTime * 0.07) *
    0.012 -
    mouseY * 0.035;

  towersGroup.children.forEach(
    (rack, index) => {
      rack.rotation.y =
        rack.userData.baseRotationY +
        Math.sin(
          elapsedTime *
          rack.userData.speed +
          index
        ) * 0.012 +
        mouseX * 0.045;

      rack.rotation.x =
        rack.userData.baseRotationX +
        mouseY * 0.025;

      rack.children.forEach(child => {
        if (
          child.userData &&
          child.userData.isServerLed
        ) {
          const blink =
            0.5 +
            0.5 *
            Math.sin(
              elapsedTime *
              child.userData.blinkSpeed +
              child.userData.blinkOffset
            );

          const ledScale =
            0.72 + blink * 0.55;

          child.scale.setScalar(
            ledScale
          );

          child.material.opacity =
            0.25 + blink * 0.75;
        }
      });
    }
  );

  particleGroups.forEach(
    (particles, index) => {
      particles.rotation.y =
        elapsedTime * 0.055 +
        mouseX * 0.18 +
        index * 0.15;

      particles.rotation.x =
        Math.sin(
          elapsedTime * 0.1 +
          index
        ) * 0.025 +
        mouseY * 0.08;
    }
  );

  cyanLight.position.x =
    -30 +
    Math.sin(elapsedTime * 0.25) * 10;

  cyanLight.position.z =
    25 +
    Math.cos(elapsedTime * 0.20) * 15;

  greenLight.position.x =
    30 +
    Math.cos(elapsedTime * 0.22) * 12;

  greenLight.position.z =
    -20 +
    Math.sin(elapsedTime * 0.18) * 18;

  lavenderLight.position.y =
    28 +
    Math.sin(elapsedTime * 0.15) * 8;

  renderer.render(
    scene,
    camera
  );
}

animate();
