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


// ===============================
// LIGHTS
// ===============================

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.2
);

scene.add(ambientLight);

const light1 = new THREE.PointLight(
    0xff00ff,
    8,
    20
);

light1.position.set(4, 3, 5);
scene.add(light1);

const light2 = new THREE.PointLight(
    0x00ffff,
    7,
    20
);

light2.position.set(-4, -2, 4);
scene.add(light2);

const light3 = new THREE.PointLight(
    0xff6600,
    6,
    20
);

light3.position.set(0, 4, 2);
scene.add(light3);


// ===============================
// MAIN 3D GROUP
// ===============================

const object = new THREE.Group();

object.position.set(2, 0, 0);

scene.add(object);


// ===============================
// FUTURISTIC CORE
// ===============================

const coreGeometry =
    new THREE.IcosahedronGeometry(1.65, 2);

const coreMaterial =
    new THREE.MeshPhysicalMaterial({
        color: 0x090909,
        metalness: 0.8,
        roughness: 0.18,
        transparent: true,
        opacity: 0.92
    });

const core =
    new THREE.Mesh(
        coreGeometry,
        coreMaterial
    );

object.add(core);


// ===============================
// COLORFUL TRIANGLE WIREFRAME
// ===============================

const wireGeometry =
    new THREE.IcosahedronGeometry(1.72, 2);

const wireMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.65
    });

const wire =
    new THREE.Mesh(
        wireGeometry,
        wireMaterial
    );

object.add(wire);


// ===============================
// CATEGORY DATA
// ===============================

const categories = [

    // MEN
    {
        name: "HOODIE",
        type: "MEN",
        color: 0xff00ff,
        position: [0, 1.45, 0.75]
    },

    {
        name: "SHIRT",
        type: "MEN",
        color: 0x00ffff,
        position: [1.35, 0.55, 0.95]
    },

    {
        name: "T-SHIRT",
        type: "MEN",
        color: 0xff6600,
        position: [-1.25, 0.55, 1.0]
    },

    {
        name: "PANJABI",
        type: "MEN",
        color: 0x66ff00,
        position: [0, -0.75, 1.45]
    },

    {
        name: "PANTS",
        type: "MEN",
        color: 0xffff00,
        position: [1.25, -0.9, 0.9]
    },

    {
        name: "CAPS",
        type: "MEN",
        color: 0xff0066,
        position: [-1.35, -0.75, 0.9]
    },

    {
        name: "BAGS",
        type: "MEN",
        color: 0x0099ff,
        position: [0, 0.2, 1.7]
    },


    // WOMEN
    {
        name: "DRESS",
        type: "WOMEN",
        color: 0xff1493,
        position: [0.8, 1.15, 1.1]
    },

    {
        name: "TOP",
        type: "WOMEN",
        color: 0xff66cc,
        position: [-0.8, 1.15, 1.1]
    },

    {
        name: "W-HOODIE",
        type: "WOMEN",
        color: 0x9933ff,
        position: [1.45, -0.1, 0.85]
    },

    {
        name: "W-T-SHIRT",
        type: "WOMEN",
        color: 0x00ffaa,
        position: [-1.45, -0.1, 0.85]
    },

    {
        name: "KURTI",
        type: "WOMEN",
        color: 0xff3399,
        position: [0, -1.25, 1.1]
    },

    {
        name: "W-PANTS",
        type: "WOMEN",
        color: 0x33ccff,
        position: [1.0, -1.15, 0.8]
    },

    {
        name: "W-BAGS",
        type: "WOMEN",
        color: 0xff9900,
        position: [-1.0, -1.15, 0.8]
    },

    {
        name: "W-CAPS",
        type: "WOMEN",
        color: 0xccff00,
        position: [0, 0.45, 1.65]
    }

];


// ===============================
// CATEGORY TRIANGLES
// ===============================

const categoryObjects = [];

categories.forEach((category, index) => {

    const geometry =
        new THREE.CircleGeometry(
            0.42,
            3
        );

    const material =
        new THREE.MeshBasicMaterial({
            color: category.color,
            transparent: true,
            opacity: 0.18,
            side: THREE.DoubleSide
        });

    const triangle =
        new THREE.Mesh(
            geometry,
            material
        );

    triangle.position.set(
        category.position[0],
        category.position[1],
        category.position[2]
    );

    triangle.userData = {
        category: category.name,
        type: category.type
    };

    object.add(triangle);

    categoryObjects.push(triangle);


    // Neon outline
    const outlineGeometry =
        new THREE.EdgesGeometry(
            geometry
        );

    const outlineMaterial =
        new THREE.LineBasicMaterial({
            color: category.color,
            transparent: true,
            opacity: 0.9
        });

    const outline =
        new THREE.LineSegments(
            outlineGeometry,
            outlineMaterial
        );

    triangle.add(outline);


    // Category label
    const canvas =
        document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 128;

    const ctx =
        canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.font =
        "bold 42px Arial";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.fillStyle =
        "#" + category.color.toString(16).padStart(6, "0");

    ctx.fillText(
        category.name,
        256,
        64
    );

    const texture =
        new THREE.CanvasTexture(canvas);

    const labelMaterial =
        new THREE.SpriteMaterial({
            map: texture,
            transparent: true
        });

    const label =
        new THREE.Sprite(
            labelMaterial
        );

    label.scale.set(
        1.15,
        0.29,
        1
    );

    label.position.set(
        0,
        -0.65,
        0.05
    );

    triangle.add(label);

});


// ===============================
// FLOATING NEON PARTICLES
// ===============================

const particleGeometry =
    new THREE.BufferGeometry();

const particleCount = 100;

const positions = [];

for (let i = 0; i < particleCount; i++) {

    positions.push(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 4
    );

}

particleGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        positions,
        3
    )
);

const particleMaterial =
    new THREE.PointsMaterial({
        color: 0x00ffff,
        size: 0.025,
        transparent: true,
        opacity: 0.7
    });

const particles =
    new THREE.Points(
        particleGeometry,
        particleMaterial
    );

scene.add(particles);


// ===============================
// NEON RINGS
// ===============================

const ringGeometry =
    new THREE.TorusGeometry(
        2.3,
        0.018,
        16,
        100
    );

const ringMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        transparent: true,
        opacity: 0.55
    });

const ring1 =
    new THREE.Mesh(
        ringGeometry,
        ringMaterial
    );

ring1.rotation.x =
    Math.PI / 2;

ring1.position.x = 2;

scene.add(ring1);


const ring2 =
    new THREE.Mesh(
        ringGeometry,
        new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.45
        })
    );

ring2.rotation.y =
    Math.PI / 2;

ring2.position.x = 2;

scene.add(ring2);


// ===============================
// MOUSE
// ===============================

let mouseX = 0;
let mouseY = 0;

document.addEventListener(
    "mousemove",
    (event) => {

        mouseX =
            (event.clientX /
                window.innerWidth) * 2 - 1;

        mouseY =
            (event.clientY /
                window.innerHeight) * 2 - 1;

    }
);


// ===============================
// TOUCH
// ===============================

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


// ===============================
// CLICK CATEGORY
// ===============================

const raycaster =
    new THREE.Raycaster();

const pointer =
    new THREE.Vector2();

renderer.domElement.addEventListener(
    "click",
    (event) => {

        const rect =
            renderer.domElement.getBoundingClientRect();

        pointer.x =
            ((event.clientX - rect.left) /
                rect.width) * 2 - 1;

        pointer.y =
            -((event.clientY - rect.top) /
                rect.height) * 2 + 1;

        raycaster.setFromCamera(
            pointer,
            camera
        );

        const hits =
            raycaster.intersectObjects(
                categoryObjects,
                true
            );

        if (hits.length > 0) {

            const selected =
                hits[0].object;

            const category =
                selected.userData.category;

            console.log(
                "Selected category:",
                category
            );

            const collection =
                document.getElementById(
                    "collection"
                );

            if (collection) {

                collection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

    }
);


// ===============================
// ANIMATION
// ===============================

function animate() {

    requestAnimationFrame(
        animate
    );


    // Main rotation
    object.rotation.y += 0.0035;

    object.rotation.x += 0.0015;


    // Mouse movement
    object.position.x =
        2 + mouseX * 0.35;

    object.position.y =
        -mouseY * 0.35;


    // Rings
    ring1.rotation.z += 0.003;

    ring2.rotation.x += 0.002;


    // Particles
    particles.rotation.y += 0.0005;


    // Color animation
    const time =
        Date.now() * 0.001;

    wireMaterial.color.setHSL(
        (time * 0.08) % 1,
        1,
        0.55
    );

    ringMaterial.color.setHSL(
        (time * 0.12 + 0.5) % 1,
        1,
        0.55
    );


    renderer.render(
        scene,
        camera
    );

}

animate();


// ===============================
// RESPONSIVE
// ===============================

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


// ===============================
// CART
// ===============================

let cartCount = 0;

function addToCart() {

    cartCount++;

    const cart =
        document.getElementById(
            "cartCount"
        );

    if (cart) {

        cart.textContent =
            cartCount;

    }

}
