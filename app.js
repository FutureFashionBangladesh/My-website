const container = document.getElementById("canvas-container");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

container.appendChild(renderer.domElement);


// LIGHTS

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.5
);

scene.add(ambientLight);

const light1 = new THREE.PointLight(
    0xffffff,
    8,
    20
);

light1.position.set(4, 3, 5);

scene.add(light1);

const light2 = new THREE.PointLight(
    0xffffff,
    5,
    20
);

light2.position.set(-4, -2, 4);

scene.add(light2);


// FUTURISTIC OBJECT

const geometry = new THREE.IcosahedronGeometry(
    1.7,
    2
);

const material = new THREE.MeshPhysicalMaterial({
    color: 0x111111,
    metalness: 0.8,
    roughness: 0.2,
    transparent: true,
    opacity: 0.95,
    wireframe: false
});

const object = new THREE.Mesh(
    geometry,
    material
);

object.position.set(2, 0, 0);

scene.add(object);


// WIREFRAME

const wireGeometry =
    new THREE.IcosahedronGeometry(1.78, 2);

const wireMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.12
    });

const wire =
    new THREE.Mesh(
        wireGeometry,
        wireMaterial
    );

object.add(wire);


// FLOATING RINGS

const ringGeometry =
    new THREE.TorusGeometry(
        2.3,
        0.015,
        16,
        100
    );

const ringMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.25
    });

const ring1 =
    new THREE.Mesh(
        ringGeometry,
        ringMaterial
    );

ring1.rotation.x = Math.PI / 2;

scene.add(ring1);


const ring2 =
    new THREE.Mesh(
        ringGeometry,
        ringMaterial
    );

ring2.rotation.y = Math.PI / 2;

scene.add(ring2);


// MOUSE MOVEMENT

let mouseX = 0;
let mouseY = 0;

document.addEventListener(
    "mousemove",
    (event) => {

        mouseX =
            (event.clientX / window.innerWidth) * 2 - 1;

        mouseY =
            (event.clientY / window.innerHeight) * 2 - 1;

    }
);


// TOUCH MOVEMENT

document.addEventListener(
    "touchmove",
    (event) => {

        if (!event.touches.length) return;

        mouseX =
            (event.touches[0].clientX /
                window.innerWidth) * 2 - 1;

        mouseY =
            (event.touches[0].clientY /
                window.innerHeight) * 2 - 1;

    },
    { passive: true }
);


// ANIMATION

function animate() {

    requestAnimationFrame(animate);

    object.rotation.x += 0.002;
    object.rotation.y += 0.004;

    wire.rotation.x -= 0.001;
    wire.rotation.y -= 0.002;

    ring1.rotation.z += 0.003;
    ring2.rotation.x += 0.002;

    object.position.x =
        2 + mouseX * 0.35;

    object.position.y =
        -mouseY * 0.35;

    renderer.render(
        scene,
        camera
    );
}

animate();


// RESPONSIVE

window.addEventListener(
    "resize",
    () => {

        const width =
            container.clientWidth;

        const height =
            container.clientHeight;

        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(
            width,
            height
        );

    }
);


// CART

let cartCount = 0;

function addToCart() {

    cartCount++;

    const cart =
        document.getElementById("cartCount");

    cart.textContent =
        cartCount;

}
