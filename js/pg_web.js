const container = document.getElementById('canvas-container');

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050508, 0.012);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 10, 42);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance'
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

container.appendChild(renderer.domElement);

const colors = [
  0x00E5FF,
  0xB19CD9,
  0x00FF88
];

const world = new THREE.Group();
scene.add(world);


/* =========================
   GRID
========================= */

const grid = new THREE.Group();
const glowGrid = new THREE.Group();

const gridSize = 280;
const divisions = 56;
const step = gridSize / divisions;

const gridMaterials = colors.map(
  color =>
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.24
    })
);

const glowMaterials = colors.map(
  color =>
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.045
    })
);


/* Vertical grid lines */

for (let i = 0; i <= divisions; i++) {

  const x = -gridSize / 2 + i * step;

  const colorIndex = Math.floor(
    Math.random() * colors.length
  );

  let geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      [
        x, -4, -gridSize / 2,
        x, -4, gridSize / 2
      ],
      3
    )
  );

  grid.add(
    new THREE.Line(
      geometry,
      gridMaterials[colorIndex]
    )
  );


  /* Glow version */

  geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      [
        x, -3.98, -gridSize / 2,
        x, -3.98, gridSize / 2
      ],
      3
    )
  );

  glowGrid.add(
    new THREE.Line(
      geometry,
      glowMaterials[colorIndex]
    )
  );
}


/* Horizontal grid lines */

for (let i = 0; i <= divisions; i++) {

  const z = -gridSize / 2 + i * step;

  const colorIndex = Math.floor(
    Math.random() * colors.length
  );

  let geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      [
        -gridSize / 2, -4, z,
        gridSize / 2, -4, z
      ],
      3
    )
  );

  grid.add(
    new THREE.Line(
      geometry,
      gridMaterials[colorIndex]
    )
  );


  /* Glow version */

  geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      [
        -gridSize / 2, -3.98, z,
        gridSize / 2, -3.98, z
      ],
      3
    )
  );

  glowGrid.add(
    new THREE.Line(
      geometry,
      glowMaterials[colorIndex]
    )
  );
}

world.add(grid, glowGrid);


/* =========================
   PARTICLES
========================= */

const particleGroups = [];
const particleCount = 160;

colors.forEach((color, index) => {

  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(
    particleCount * 3
  );

  for (let i = 0; i < positions.length; i++) {
    positions[i] = (Math.random() - 0.5) * 260;
  }

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(
      positions,
      3
    )
  );

  const particles = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color,
      size: 0.7,
      transparent: true,
      opacity: 0.5,
      depthWrite: false
    })
  );

  particles.userData.offset = index * 0.8;

  world.add(particles);

  particleGroups.push(particles);
});


/* =========================
   MOUSE / TOUCH
========================= */

let mouseX = 0;
let mouseY = 0;

let targetMouseX = 0;
let targetMouseY = 0;


window.addEventListener(
  'mousemove',
  event => {

    targetMouseX =
      event.clientX / window.innerWidth * 2 - 1;

    targetMouseY =
      -(event.clientY / window.innerHeight) * 2 + 1;

  },
  { passive: true }
);


window.addEventListener(
  'touchmove',
  event => {

    if (!event.touches.length) return;

    const touch = event.touches[0];

    targetMouseX =
      touch.clientX / window.innerWidth * 2 - 1;

    targetMouseY =
      -(touch.clientY / window.innerHeight) * 2 + 1;

  },
  { passive: true }
);


/* =========================
   GYROSCOPE
========================= */

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
    Math.min(
      1,
      event.gamma / 25
    )
  );

  gyroY = Math.max(
    -1,
    Math.min(
      1,
      (event.beta - 45) / 25
    )
  );

  gyroEnabled = true;
}


async function enableGyro() {

  if (
    typeof DeviceOrientationEvent ===
    'undefined'
  ) {
    return;
  }


  if (
    typeof DeviceOrientationEvent.requestPermission ===
    'function'
  ) {

    try {

      const permission =
        await DeviceOrientationEvent.requestPermission();

      if (permission === 'granted') {

        window.addEventListener(
          'deviceorientation',
          handleOrientation,
          true
        );

      }

    } catch (error) {

      /* Permission denied */

    }

  } else {

    window.addEventListener(
      'deviceorientation',
      handleOrientation,
      true
    );

  }
}


window.addEventListener(
  'click',
  enableGyro,
  { once: true }
);


window.addEventListener(
  'touchstart',
  enableGyro,
  {
    once: true,
    passive: true
  }
);


/* =========================
   SCROLL
========================= */

let scrollProgress = 0;

window.addEventListener(
  'scroll',
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


/* =========================
   RESIZE
========================= */

window.addEventListener(
  'resize',
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


/* =========================
   ANIMATION
========================= */

const clock = new THREE.Clock();


function animate() {

  requestAnimationFrame(animate);

  const time =
    clock.getElapsedTime();


  /* Gyroscope */

  if (gyroEnabled) {

    targetMouseX = gyroX;
    targetMouseY = -gyroY;

  }


  /* Smooth mouse movement */

  mouseX +=
    (targetMouseX - mouseX) * 0.06;

  mouseY +=
    (targetMouseY - mouseY) * 0.06;


  /* Camera */

  const targetCameraX =
    mouseX * 8;

  const targetCameraY =
    9 -
    scrollProgress * 5 +
    mouseY * 4;

  const targetCameraZ =
    42 -
    scrollProgress * 12;


  camera.position.x +=
    (targetCameraX - camera.position.x) *
    0.04;

  camera.position.y +=
    (targetCameraY - camera.position.y) *
    0.04;

  camera.position.z +=
    (targetCameraZ - camera.position.z) *
    0.04;


  camera.lookAt(
    mouseX * 10,
    -2 +
      scrollProgress * 4 -
      mouseY * 3,
    camera.position.z - 45
  );


  /* World movement */

  world.rotation.y +=
    (mouseX * 0.16 - world.rotation.y) *
    0.025;

  world.rotation.x +=
    (-mouseY * 0.08 - world.rotation.x) *
    0.025;


  /* Moving grid */

  const gridMovement =
    (time * 7) % step;

  grid.position.z =
    gridMovement;

  glowGrid.position.z =
    gridMovement;


  grid.rotation.y =
    mouseX * 0.02;

  grid.rotation.x =
    -mouseY * 0.012;

  glowGrid.rotation.y =
    mouseX * 0.02;

  glowGrid.rotation.x =
    -mouseY * 0.012;


  /* Particles */

  particleGroups.forEach(
    (particles, index) => {

      particles.rotation.y =
        time * 0.025 +
        mouseX * 0.1 +
        particles.userData.offset;

      particles.rotation.x =
        Math.sin(
          time * 0.12 + index
        ) * 0.02 +
        mouseY * 0.05;

    }
  );


  /* Render */

  renderer.render(
    scene,
    camera
  );
}


animate();
