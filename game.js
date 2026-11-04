import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

const $ = (id) => document.getElementById(id);
const loading = $("loading");
const errorBox = $("error");
const startScreen = $("start-screen");
const controlsEl = $("controls");
const speedEl = $("speed");
const lapEl = $("lap");
const messageEl = $("message");
const driveStatus = $("drive-status");

let scene, camera, renderer, car;
let started = false;
let speed = 0;
let yaw = Math.PI / 2;
let lap = 1;
let lastAngle = 0;
let lapArmed = false;
let steerInput = 0;
let throttleInput = false;
let brakeInput = false;
let lastTime = 0;
let elapsed = 0;

const carPosition = new THREE.Vector3(0, 0, 65);
const trackRX = 95;
const trackRZ = 65;
const maxSpeed = 92;
const keys = Object.create(null);

function material(color, roughness = 0.75, metalness = 0) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function makeRibbon(curve, width, color, y = 0.08) {
  const points = curve.getPoints(320);
  const vertices = [];
  const indices = [];
  for (let i = 0; i < points.length; i++) {
    const tangent = curve.getTangentAt(i / (points.length - 1)).normalize();
    const side = new THREE.Vector3(tangent.z, 0, -tangent.x).normalize();
    const a = points[i].clone().addScaledVector(side, width / 2);
    const b = points[i].clone().addScaledVector(side, -width / 2);
    vertices.push(a.x, y, a.z, b.x, y, b.z);
    if (i < points.length - 1) {
      const n = i * 2;
      indices.push(n, n + 1, n + 2, n + 1, n + 3, n + 2);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, material(color, 0.95));
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

function buildTrack() {
  const points = [];
  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    points.push(new THREE.Vector3(trackRX * Math.sin(a), 0, trackRZ * Math.cos(a)));
  }
  const curve = new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.12);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(1200, 1200),
    material(0x26382f, 1)
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.12;
  ground.receiveShadow = true;
  scene.add(ground);

  makeRibbon(curve, 20, 0x343a43, 0.02);
  makeRibbon(curve, 1.2, 0xe5e8eb, 0.045);
  makeRibbon(curve, 0.35, 0xe52b36, 0.055);

  const linePoints = curve.getPoints(320);
  const centerLine = new THREE.BufferGeometry().setFromPoints(
    linePoints.map(p => new THREE.Vector3(p.x, 0.075, p.z))
  );
  const dashed = new THREE.Line(
    centerLine,
    new THREE.LineDashedMaterial({ color: 0x9ca4ad, dashSize: 3, gapSize: 4, transparent: true, opacity: 0.5 })
  );
  dashed.computeLineDistances();
  scene.add(dashed);

  // Start/finish stripe.
  const stripe = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const tile = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.045, 1.5),
      material(i % 2 ? 0xffffff : 0x15171b, 0.8)
    );
    tile.position.set(-8.25 + i * 1.5, 0.09, 65);
    stripe.add(tile);
  }
  scene.add(stripe);

  // Simple trackside markers.
  for (let i = 0; i < 32; i++) {
    const p = curve.getPointAt(i / 32);
    const tangent = curve.getTangentAt(i / 32);
    const side = new THREE.Vector3(tangent.z, 0, -tangent.x).normalize();
    for (const sign of [-1, 1]) {
      const post = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 1.8, 0.45),
        material(0xd9dde2, 0.8)
      );
      post.position.copy(p).addScaledVector(side, sign * 15);
      post.position.y = 0.9;
      scene.add(post);
    }
  }
}

function buildCar() {
  car = new THREE.Group();
  const red = material(0xd71928, 0.38, 0.35);
  const dark = material(0x10151d, 0.5, 0.25);
  const carbon = material(0x080a0e, 0.7, 0.15);
  const rubber = material(0x090a0c, 0.95);
  const white = material(0xe8e9ed, 0.35, 0.2);

  const body = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.48, 4.2), red);
  body.position.y = 0.62;
  car.add(body);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.72, 2.6, 4), red);
  nose.rotation.x = Math.PI / 2;
  nose.position.set(0, 0.61, 2.55);
  car.add(nose);

  const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.64, 20, 12), dark);
  cockpit.scale.set(0.75, 0.58, 1.05);
  cockpit.position.set(0, 1.02, -0.15);
  car.add(cockpit);

  const halo = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.055, 8, 24, Math.PI), white);
  halo.rotation.z = Math.PI;
  halo.position.set(0, 1.34, 0.05);
  car.add(halo);

  const frontWing = new THREE.Mesh(new THREE.BoxGeometry(4.1, 0.12, 0.48), carbon);
  frontWing.position.set(0, 0.35, 3.35);
  car.add(frontWing);
  const rearWing = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.16, 0.5), carbon);
  rearWing.position.set(0, 1.12, -2.15);
  car.add(rearWing);
  const rearPillar = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.65, 0.16), dark);
  rearPillar.position.set(0, 0.8, -2.1);
  car.add(rearPillar);

  for (const x of [-1.18, 1.18]) {
    for (const z of [-1.48, 1.55]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.53, 0.53, 0.38, 20), rubber);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, 0.53, z);
      car.add(wheel);
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.395, 16), white);
      hub.rotation.z = Math.PI / 2;
      hub.position.set(x, 0.53, z);
      car.add(hub);
    }
  }

  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.025, 3.5), white);
  stripe.position.set(0, 0.88, 0);
  car.add(stripe);

  car.position.copy(carPosition);
  car.rotation.y = yaw;
  scene.add(car);
}

function setup() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x91a9bc);
  scene.fog = new THREE.Fog(0x91a9bc, 180, 480);

  camera = new THREE.PerspectiveCamera(66, innerWidth / innerHeight, 0.1, 1000);
  camera.position.set(0, 8, 80);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = false;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  $("game-root").prepend(renderer.domElement);

  const hemi = new THREE.HemisphereLight(0xddeeff, 0x35412e, 2.1);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 2.0);
  sun.position.set(-80, 120, 60);
  scene.add(sun);

  buildTrack();
  buildCar();
  updateCamera(1);
  window.addEventListener("resize", onResize);
  bindControls();
  loading.classList.add("hidden");
  animate(0);
}

function onResize() {
  if (!camera || !renderer) return;
  camera.aspect = innerWidth / innerHeight;
  camera.fov = innerWidth < innerHeight ? 75 : 64;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
}

function bindControls() {
  document.querySelectorAll("[data-control]").forEach(button => {
    const control = button.dataset.control;
    const down = (event) => {
      event.preventDefault();
      button.classList.add("pressed");
      if (control === "left") steerInput = -1;
      if (control === "right") steerInput = 1;
      if (control === "throttle") throttleInput = true;
      if (control === "brake") brakeInput = true;
      try { button.setPointerCapture(event.pointerId); } catch (_) {}
    };
    const up = (event) => {
      event.preventDefault();
      button.classList.remove("pressed");
      if (control === "left" || control === "right") steerInput = 0;
      if (control === "throttle") throttleInput = false;
      if (control === "brake") brakeInput = false;
    };
    button.addEventListener("pointerdown", down);
    button.addEventListener("pointerup", up);
    button.addEventListener("pointercancel", up);
    button.addEventListener("lostpointercapture", up);
  });

  window.addEventListener("keydown", e => {
    keys[e.code] = true;
    if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].includes(e.code)) e.preventDefault();
  });
  window.addEventListener("keyup", e => { keys[e.code] = false; });
  $("start-button").addEventListener("click", startRace);
}

function startRace() {
  if (started) return;
  started = true;
  startScreen.style.display = "none";
  controlsEl.classList.add("active");
  messageEl.textContent = "GREEN FLAG · GO GO GO";
  driveStatus.textContent = "RACING";
  setTimeout(() => { if (messageEl) messageEl.textContent = "FREE PRACTICE"; }, 2200);
}

function updateCar(dt) {
  if (!started) {
    speed = Math.max(0, speed - 18 * dt);
    return;
  }
  const throttle = throttleInput || keys.ArrowUp || keys.KeyW;
  const brake = brakeInput || keys.ArrowDown || keys.KeyS;
  let steer = steerInput;
  if (keys.ArrowLeft || keys.KeyA) steer = -1;
  if (keys.ArrowRight || keys.KeyD) steer = 1;

  if (throttle) speed += 30 * dt;
  else speed -= 5.5 * dt;
  if (brake) speed -= 52 * dt;
  speed = THREE.MathUtils.clamp(speed, 0, maxSpeed);

  const steeringScale = THREE.MathUtils.clamp(speed / 24, 0.25, 1);
  yaw += steer * steeringScale * 1.05 * dt * (speed > 1 ? 1 : 0);

  carPosition.x += Math.sin(yaw) * speed * dt;
  carPosition.z += Math.cos(yaw) * speed * dt;
  car.position.copy(carPosition);
  car.rotation.y = yaw;

  const angle = Math.atan2(carPosition.x / trackRX, carPosition.z / trackRZ);
  const normalized = angle < 0 ? angle + Math.PI * 2 : angle;
  if (normalized > 5.7) lapArmed = true;
  if (lapArmed && lastAngle > 5.7 && normalized < 0.55) {
    lap++;
    lapArmed = false;
    lapEl.textContent = Math.min(lap, 3) + " / 3";
    messageEl.textContent = lap > 3 ? "SESSION COMPLETE" : "NEW LAP";
    if (lap > 3) {
      started = false;
      driveStatus.textContent = "FINISHED";
    }
  }
  lastAngle = normalized;

  const normalizedTrack = (carPosition.x * carPosition.x) / (trackRX * trackRX) +
    (carPosition.z * carPosition.z) / (trackRZ * trackRZ);
  if (normalizedTrack > 1.23) {
    speed *= Math.max(0, 1 - 0.7 * dt);
    driveStatus.textContent = "OFF TRACK";
  } else {
    driveStatus.textContent = brake ? "BRAKING" : throttle ? "FULL THROTTLE" : "RACING";
  }
  speedEl.textContent = Math.round(speed * 3.6).toString();
}

function updateCamera(dt) {
  if (!car || !camera) return;
  const offset = new THREE.Vector3(0, 6.4, -13.5).applyAxisAngle(new THREE.Vector3(0,1,0), yaw);
  const desired = carPosition.clone().add(offset);
  desired.y += 1.0;
  camera.position.lerp(desired, Math.min(1, dt * 4.5));
  const lookAt = carPosition.clone().add(new THREE.Vector3(0, 1.1, 0));
  camera.lookAt(lookAt);
}

function animate(timestamp) {
  requestAnimationFrame(animate);
  const dt = Math.min((timestamp - (lastTime || timestamp)) / 1000, 0.04);
  lastTime = timestamp;
  elapsed += dt;
  updateCar(dt);
  updateCamera(dt);
  if (renderer && scene && camera) renderer.render(scene, camera);
}

try {
  setup();
} catch (error) {
  loading.classList.add("hidden");
  errorBox.hidden = false;
  errorBox.textContent = "FDC tidak dapat memulai WebGL: " + error.message;
  console.error(error);
}
