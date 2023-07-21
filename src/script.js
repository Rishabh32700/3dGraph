import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import data from "./data.json";

/**
 * Creates a box mesh
 * @param {number} x - the position on the x-axis
 * @param {number} z - the position on the z-axis
 * @param {number} height - the height of the geometry
 * @param {number} width - the width of the geometry
 * @param {number} color - the color in hex
 * @return {THREE.Mesh} the mesh
 */
const createBox = (x, z, height, width, color) => {
  const geometry = new THREE.BoxGeometry(width, height, 1);
  const material = new THREE.MeshLambertMaterial({ color: color });
  const box = new THREE.Mesh(geometry, material);
  box.position.set(x, box.geometry.parameters.height / 2, z);
  return box;
};

/**
 * Creates a line
 * @param {THREE.Vector3} endPosition - ending position to create a line
 * @return {THREE.Line} the mesh
 */
const createLine = (endPosition) => {
  const geometry = new THREE.Geometry();
  const material = new THREE.LineBasicMaterial({ color: "black" });
  geometry.vertices.push(new THREE.Vector3(-1, 0, -1), endPosition);
  return new THREE.Line(geometry, material);
};

// Setup ------------------------------------------------ /
// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, 10, 10);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2 - 0.1;
controls.minDistance = 10;
controls.maxDistance = 64;
controls.target = new THREE.Vector3(3, 0, 3);
controls.update();


const loader = new THREE.FontLoader()
loader.load('./Roboto_Regular.json', function (font) {
  const geometry = new THREE.TextGeometry('three.js', {
      font: font,
      size: 5,
      height: 1,
      curveSegments: 10,
      bevelEnabled: false,
      bevelOffset: 0,
      bevelSegments: 1,
      bevelSize: 0.3,
      bevelThickness: 1
  });
  const materials = [
      new THREE.MeshPhongMaterial({ color: 0xff6600 }), // front
      new THREE.MeshPhongMaterial({ color: 0x0000ff }) // side
  ];
  const textMesh1 = new THREE.Mesh(geometry, materials);
  textMesh1.castShadow = true
  textMesh1.position.y += 10
  textMesh1.position.x -= 6
  textMesh1.rotation.y = 0.25
  scene.add(textMesh1)
});

function createDot(name, x, y, z) {
  const geo = new THREE.SphereBufferGeometry(0.1);
  const mat = new THREE.MeshBasicMaterial({ color: "red" });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  mesh.name = name;
  return mesh;
}

const group = new THREE.Group();

const sphr0 = createDot(`sphr1`, -1, 0, -1);
group.add(sphr0);

const sphr1 = createDot(`sphr1`, 0, 0, -1);
group.add(sphr1);

const sphr2 = createDot(`sphr1`, 2, 0, -1);
group.add(sphr2);

const sphr3 = createDot(`sphr1`, 4, 0, -1);
group.add(sphr3);

const sphr4 = createDot(`sphr1`, 6, 0, -1);
group.add(sphr4);

const sphr5 = createDot(`sphr1`, -1, 0, 0);
group.add(sphr5);

const sphr6 = createDot(`sphr1`, -1, 0, 2);
group.add(sphr6);

const sphr7 = createDot(`sphr1`, -1, 0, 4);
group.add(sphr7);

const sphr8 = createDot(`sphr1`, -1, 0, 6);
group.add(sphr8);

const sphr9 = createDot(`sphr1`, -1, 0, 8);
group.add(sphr9);

const sphr10 = createDot(`sphr1`, -1, 0, 10);
group.add(sphr10);

// z dots
const sphr11 = createDot(`sphr1`, -1, 1, -1);
group.add(sphr11);

const sphr12 = createDot(`sphr1`, -1, 2, -1);
group.add(sphr12);

const sphr13 = createDot(`sphr1`, -1, 3, -1);
group.add(sphr13);

const sphr14 = createDot(`sphr1`, -1, 4, -1);
group.add(sphr14);

const sphr15 = createDot(`sphr1`, -1, 5, -1);
group.add(sphr15);

const sphr16 = createDot(`sphr1`, -1, 6, -1);
group.add(sphr16);

const sphr17 = createDot(`sphr1`, -1, 7, -1);
group.add(sphr17);

scene.add(group);

// Meshes
let box, colorValue;
let count = 0;
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 6; j++) {
    if (i === 0) colorValue = 0xff6b6b;
    if (i === 1) colorValue = 0x845ef7;
    if (i === 2) colorValue = 0x339af0;
    if (i === 3) colorValue = 0x51cf66;
    box = createBox(
      i * 2,
      j * 2,
      data[count]["age"] / 10,
      data[count]["race"] / 10,
      colorValue
    );

    scene.add(box);
    count++;
  }
}

// Circle
const disk = new THREE.Mesh(
  new THREE.CircleGeometry(10, 64),
  new THREE.MeshBasicMaterial({ color: 0xdee2e6 })
);
disk.position.set(3, 0, 3);
disk.lookAt(new THREE.Vector3(3, 3, 3));
// scene.add(disk);

// Line
const yAxis = createLine(new THREE.Vector3(-1, 10, -1));
const xAxis = createLine(new THREE.Vector3(10, 0, -1));
const zAxis = createLine(new THREE.Vector3(-1, 0, 15));
scene.add(yAxis);
scene.add(xAxis);
scene.add(zAxis);

// Light
const light1 = new THREE.PointLight(0xffffff, 1, 500);
const light2 = new THREE.PointLight(0xffffff, 1, 500);
light1.position.set(25, 10, 25);
light2.position.set(-25, 10, -25);
scene.add(light1);
scene.add(light2);

// Animate ---------------------------------------------- /
const animate = () => {
  requestAnimationFrame(animate);
  // controls.update();
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.02;
  renderer.render(scene, camera);
};

animate();

// Resize ----------------------------------------------- /
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});
