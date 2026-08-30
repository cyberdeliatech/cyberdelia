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

const neonColors = [
  0x00e5ff,
  0xb19cd9,
  0x00ff88
];

const backgroundWorld = new THREE.Group();
scene.add(backgroundWorld);

const gridGroup = new THREE.Group();
const glowGridGroup = new THREE.Group();

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
      x, -5, -gridSize / 2,
      x, -5, gridSize / 2
    ], 3)
  );

  const colorIndex = Math.floor(Math.random() * neonColors.length);

  gridGroup.add(
    new THREE.Line(geometry, gridMaterials[colorIndex])
  );

  const glowGeometry = new THREE.BufferGeometry();
  glowGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
      x, -4.98, -gridSize / 2,
      x, -4.98, gridSize / 2
    ], 3)
  );

  glowGridGroup.add(
    new THREE.Line(glowGeometry, glowMaterials[colorIndex])
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

  const glowGeometry = new THREE.BufferGeometry();
  glowGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
      -gridSize / 2, -4.98, z,
      gridSize / 2, -4.98, z
    ], 3)
  );

  glowGridGroup.add(
    new THREE.Line(glowGeometry, glowMaterials[colorIndex])
  );
}

backgroundWorld.add(gridGroup, glowGridGroup);

const towersGroup = new THREE.Group();
backgroundWorld.add(towersGroup);

function createServerRack() {
  const rack = new THREE.Group();

  const colorHex =
    neonColors[Math.floor(Math.random() * neonColors.length)];

  const rackWidth = 3.8 + Math.random() * 0.9;
  const rackHeight = 14 + Math.random() * 28;
  const rackDepth = 3 + Math.random() * 1.5;

  // Main translucent rack enclosure
  const enclosureGeometry = new THREE.BoxGeometry(
    rackWidth,
    rackHeight,
    rackDepth
  );

  const enclosureMaterial = new THREE.MeshBasicMaterial({
    color: 0x101820,
    transparent: true,
    opacity: 0.20,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const enclosure = new THREE.Mesh(
    enclosureGeometry,
    enclosureMaterial
  );

  rack.add(enclosure);

  // Subtle inner glass tint
  const innerGeometry = new THREE.BoxGeometry(
    rackWidth * 0.92,
    rackHeight * 0.92,
    rackDepth * 0.90
  );

  const innerMaterial = new THREE.MeshBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.025,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const innerGlow = new THREE.Mesh(
    innerGeometry,
    innerMaterial
  );

  rack.add(innerGlow);

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
    opacity: 0.28
  });

  const frame = new THREE.Mesh(
    frameGeometry,
    frameMaterial
  );

  rack.add(frame);

  // Server units
  const unitCount = Math.max(
    6,
    Math.floor(rackHeight / 2.2)
  );

  const unitHeight = rackHeight / (unitCount + 2);

  for (let j = 0; j < unitCount; j++) {
    const serverColor =
      neonColors[
        (j + Math.floor(Math.random() * 3)) % 3
      ];

    // Server chassis
    const unitGeometry = new THREE.BoxGeometry(
      rackWidth * 0.82,
      unitHeight * 0.68,
      rackDepth * 0.76
    );

    const unitMaterial = new THREE.MeshBasicMaterial({
      color: 0x171b21,
      transparent: true,
      opacity: 0.72
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

    // Server front panel
    const frontGeometry = new THREE.BoxGeometry(
      rackWidth * 0.78,
      unitHeight * 0.56,
      0.035
    );

    const frontMaterial = new THREE.MeshBasicMaterial({
      color: 0x090c10,
      transparent: true,
      opacity: 0.88
    });

    const frontPanel = new THREE.Mesh(
      frontGeometry,
      frontMaterial
    );

    frontPanel.position.set(
      0,
      unit.position.y,
      rackDepth * 0.39
    );

    rack.add(frontPanel);

    // Server panel accent
    const accentGeometry = new THREE.BoxGeometry(
      rackWidth * 0.48,
      0.025,
      0.04
    );

    const accentMaterial = new THREE.MeshBasicMaterial({
      color: serverColor,
      transparent: true,
      opacity: 0.28
    });

    const accent = new THREE.Mesh(
      accentGeometry,
      accentMaterial
    );

    accent.position.set(
      -rackWidth * 0.08,
      unit.position.y,
      rackDepth * 0.415
    );

    rack.add(accent);

    // Server ventilation lines
    for (let vent = 0; vent < 5; vent++) {
      const ventGeometry = new THREE.BoxGeometry(
        0.025,
        unitHeight * 0.30,
        0.045
      );

      const ventMaterial = new THREE.MeshBasicMaterial({
        color: 0x3b4652,
        transparent: true,
        opacity: 0.45
      });

      const ventLine = new THREE.Mesh(
        ventGeometry,
        ventMaterial
      );

      ventLine.position.set(
        -rackWidth * 0.25 + vent * 0.09,
        unit.position.y,
        rackDepth * 0.425
      );

      rack.add(ventLine);
    }

    // Primary LED
    const ledGeometry = new THREE.SphereGeometry(
      0.055,
      8,
      8
    );

    const led = new THREE.Mesh(
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

    led.position.set(
      rackWidth * 0.31,
      unit.position.y,
      rackDepth * 0.43
    );

    led.userData.blinkOffset =
      Math.random() * Math.PI * 2;

    led.userData.blinkSpeed =
      0.8 + Math.random() * 2;

    led.userData.isServerLed = true;

    rack.add(led);

    // Secondary LED
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
      rackWidth * 0.27,
      unit.position.y,
      rackDepth * 0.43
    );

    led2.userData.blinkOffset =
      Math.random() * Math.PI * 2;

    led2.userData.blinkSpeed =
      0.8 + Math.random() * 2;

    led2.userData.isServerLed = true;

    rack.add(led2);
  }

  // Front vertical rails
  const railGeometry = new THREE.BoxGeometry(
    0.065,
    rackHeight,
    0.065
  );

  const railMaterial = new THREE.MeshBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.9
  });

  const leftRail = new THREE.Mesh(
    railGeometry,
    railMaterial
  );

  leftRail.position.set(
    -rackWidth * 0.45,
    0,
    rackDepth * 0.43
  );

  const rightRail = leftRail.clone();

  rightRail.position.x =
    rackWidth * 0.45;

  rack.add(leftRail, rightRail);

  // Rear vertical rails
  const rearLeftRail = leftRail.clone();
  rearLeftRail.position.z = -rackDepth * 0.43;

  const rearRightRail = rightRail.clone();
  rearRightRail.position.z = -rackDepth * 0.43;

  rack.add(
    rearLeftRail,
    rearRightRail
  );

  // Top cap
  const topCapGeometry = new THREE.BoxGeometry(
    rackWidth * 0.84,
    0.10,
    rackDepth * 0.80
  );

  const topCapMaterial = new THREE.MeshBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.38
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

  // Bottom cap
  const bottomCap = topCap.clone();

  bottomCap.position.y =
    -rackHeight / 2 + 0.35;

  rack.add(bottomCap);

  // Horizontal rack edges
  const horizontalEdgeMaterial =
    new THREE.MeshBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.42
    });

  const edgePositions = [
    rackHeight / 2 - 0.65,
    -rackHeight / 2 + 0.65
  ];

  edgePositions.forEach(y => {
    const edgeGeometry = new THREE.BoxGeometry(
      rackWidth * 0.90,
      0.035,
      0.035
    );

    const edge = new THREE.Mesh(
      edgeGeometry,
      horizontalEdgeMaterial
    );

    edge.position.set(
      0,
      y,
      rackDepth * 0.44
    );

    rack.add(edge);
  });

  // Subtle rack glow
  const glowGeometry = new THREE.BoxGeometry(
    rackWidth * 0.94,
    rackHeight * 0.94,
    rackDepth * 0.94
  );

  const glowMaterial = new THREE.MeshBasicMaterial({
    color: colorHex,
    wireframe: true,
    transparent: true,
    opacity: 0.035
  });

  const glow = new THREE.Mesh(
    glowGeometry,
    glowMaterial
  );

  rack.add(glow);

  // Interior light
  const interiorGeometry = new THREE.BoxGeometry(
    rackWidth * 0.70,
    rackHeight * 0.88,
    0.025
  );

  const interiorMaterial = new THREE.MeshBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.055
  });

  const interiorLight = new THREE.Mesh(
    interiorGeometry,
    interiorMaterial
  );

  interiorLight.position.set(
    0,
    0,
    -rackDepth * 0.40
  );

  rack.add(interiorLight);

  rack.position.y =
    rackHeight / 2 - 5;

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

const particleCount = 180;
const particleGroups = [];

neonColors.forEach((color, colorIndex) => {
  const particlesGeo =
    new THREE.BufferGeometry();

  const posArray =
    new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] =
      (Math.random() - 0.5) * 280;
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

  particlesMesh.userData.colorIndex =
    colorIndex;

  backgroundWorld.add(particlesMesh);
  particleGroups.push(particlesMesh);
});

let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

window.addEventListener(
  "mousemove",
  e => {
    targetMouseX =
      e.clientX /
      window.innerWidth *
      2 - 1;

    targetMouseY =
      -(e.clientY /
      window.innerHeight) *
      2 + 1;
  },
  { passive: true }
);

window.addEventListener(
  "touchmove",
  e => {
    if (!e.touches.length) return;

    const touch = e.touches[0];

    targetMouseX =
      touch.clientX /
      window.innerWidth *
      2 - 1;

    targetMouseY =
      -(touch.clientY /
      window.innerHeight) *
      2 + 1;
  },
  { passive: true }
);

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
    typeof DeviceOrientationEvent !==
      "undefined" &&
    typeof DeviceOrientationEvent.requestPermission ===
      "function"
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
    (targetMouseX - mouseX) *
    0.08;

  mouseY +=
    (targetMouseY - mouseY) *
    0.08;

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
    (targetCamX -
      camera.position.x) *
    0.055;

  camera.position.y +=
    (targetCamY -
      camera.position.y) *
    0.055;

  camera.position.z +=
    (targetCamZ -
      camera.position.z) *
    0.055;

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
    Math.sin(
      elapsedTime * 0.08
    ) * 0.025 +
    mouseX * 0.08;

  towersGroup.rotation.x =
    Math.cos(
      elapsedTime * 0.07
    ) * 0.012 -
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

      rack.children.forEach(
        child => {
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
              0.72 +
              blink * 0.55;

            child.scale.setScalar(
              ledScale
            );

            child.material.opacity =
              0.25 +
              blink * 0.75;
          }
        }
      );
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

  renderer.render(
    scene,
    camera
  );
}

animate();
