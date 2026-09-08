/* =====================================================
   FUTURE FASHION BANGLADESH
   ORIGINAL 3D + NEON TRIANGLE CATEGORY VERSION
===================================================== */


/* =====================================================
   THREE.JS SETUP
===================================================== */

const container =
    document.getElementById("canvas-container");

const scene =
    new THREE.Scene();

const camera =
    new THREE.PerspectiveCamera(
        60,
        container.clientWidth /
        container.clientHeight,
        0.1,
        1000
    );

camera.position.z = 6;


const renderer =
    new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

container.appendChild(
    renderer.domElement
);


/* =====================================================
   LIGHTS
===================================================== */

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.5
    );

scene.add(ambientLight);


const light1 =
    new THREE.PointLight(
        0xffffff,
        8,
        20
    );

light1.position.set(
    4,
    3,
    5
);

scene.add(light1);


const light2 =
    new THREE.PointLight(
        0xffffff,
        5,
        20
    );

light2.position.set(
    -4,
    -2,
    4
);

scene.add(light2);


/* =====================================================
   MAIN FUTURISTIC 3D OBJECT
===================================================== */

const geometry =
    new THREE.IcosahedronGeometry(
        1.7,
        2
    );

const material =
    new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.95
    });

const object =
    new THREE.Mesh(
        geometry,
        material
    );

object.position.set(
    2,
    0,
    0
);

scene.add(object);


/* =====================================================
   COLORFUL NEON EDGES
===================================================== */

const edgesGeometry =
    new THREE.EdgesGeometry(
        geometry
    );

const edgesMaterial =
    new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.9
    });

const edges =
    new THREE.LineSegments(
        edgesGeometry,
        edgesMaterial
    );

object.add(edges);


/* SECOND NEON EDGE */

const edgesGeometry2 =
    new THREE.EdgesGeometry(
        new THREE.IcosahedronGeometry(
            1.73,
            2
        )
    );

const edgesMaterial2 =
    new THREE.LineBasicMaterial({
        color: 0xff00ff,
        transparent: true,
        opacity: 0.35
    });

const edges2 =
    new THREE.LineSegments(
        edgesGeometry2,
        edgesMaterial2
    );

object.add(edges2);


/* =====================================================
   NEON RINGS
===================================================== */

const ringGeometry =
    new THREE.TorusGeometry(
        2.3,
        0.015,
        16,
        100
    );


const ring1 =
    new THREE.Mesh(
        ringGeometry,
        new THREE.MeshBasicMaterial({
            color: 0xff00ff,
            transparent: true,
            opacity: 0.30
        })
    );

ring1.rotation.x =
    Math.PI / 2;

scene.add(ring1);


const ring2 =
    new THREE.Mesh(
        ringGeometry,
        new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.25
        })
    );

ring2.rotation.y =
    Math.PI / 2;

scene.add(ring2);


/* =====================================================
   TRIANGLE CATEGORY SYSTEM
===================================================== */

const triangleCategories = [
    "HOODIE",
    "SHIRT",
    "T-SHIRT",
    "PANJABI",
    "CAPS",
    "BAGS"
];


/*
   IMPORTANT:
   These are HTML triangles over the 3D scene.
   NO WHITE DOTS.
*/

const triangleContainer =
    document.createElement("div");

triangleContainer.id =
    "triangle-category-container";

triangleContainer.style.position =
    "absolute";

triangleContainer.style.inset =
    "0";

triangleContainer.style.pointerEvents =
    "none";

triangleContainer.style.zIndex =
    "5";

container.appendChild(
    triangleContainer
);


/* =====================================================
   CREATE SIX TRIANGLES
===================================================== */

const trianglePositions = [

    {
        left: "61%",
        top: "18%"
    },

    {
        left: "76%",
        top: "32%"
    },

    {
        left: "70%",
        top: "64%"
    },

    {
        left: "51%",
        top: "70%"
    },

    {
        left: "43%",
        top: "39%"
    },

    {
        left: "54%",
        top: "14%"
    }

];


triangleCategories.forEach(
    function(category, index) {

        const triangle =
            document.createElement("div");

        triangle.className =
            "neon-category-triangle";


        triangle.dataset.category =
            category.toLowerCase();


        triangle.innerHTML = `
            <div class="triangle-shape"></div>

            <div class="triangle-label">
                ${category}
            </div>
        `;


        triangle.style.position =
            "absolute";

        triangle.style.left =
            trianglePositions[index].left;

        triangle.style.top =
            trianglePositions[index].top;

        triangle.style.transform =
            "translate(-50%, -50%)";


        triangle.style.width =
            "120px";

        triangle.style.height =
            "105px";


        triangle.style.pointerEvents =
            "auto";

        triangle.style.cursor =
            "pointer";


        triangleContainer.appendChild(
            triangle
        );


        /* CLICK */

        triangle.addEventListener(
            "click",
            function() {

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
        );

    }
);


/* =====================================================
   TRIANGLE CSS
===================================================== */

const triangleStyle =
    document.createElement("style");

triangleStyle.textContent = `

    .neon-category-triangle {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.35s ease;
    }

    .neon-category-triangle:hover {
        transform:
            translate(-50%, -50%)
            scale(1.12);
    }

    .triangle-shape {
        position: absolute;
        inset: 0;

        clip-path:
            polygon(
                50% 0%,
                100% 100%,
                0% 100%
            );

        background:
            linear-gradient(
                135deg,
                rgba(0,255,255,0.18),
                rgba(255,0,255,0.12)
            );

        border: none;

        filter:
            drop-shadow(
                0 0 8px
                rgba(0,255,255,0.65)
            );
    }

    .triangle-shape::after {
        content: "";

        position: absolute;

        inset: 3px;

        clip-path:
            polygon(
                50% 0%,
                100% 100%,
                0% 100%
            );

        background: #080808;
    }

    .triangle-label {
        position: relative;

        z-index: 3;

        margin-top: 25px;

        color: #ffffff;

        font-size: 9px;

        font-weight: 700;

        letter-spacing: 2px;

        text-align: center;

        text-shadow:
            0 0 6px #00ffff,
            0 0 12px #ff00ff;

        white-space: nowrap;
    }

    @media (max-width: 800px) {

        #triangle-category-container {
            transform: scale(0.72);
            transform-origin: center;
        }

        .neon-category-triangle {
            width: 105px !important;
            height: 92px !important;
        }

    }

`;

document.head.appendChild(
    triangleStyle
);


/* =====================================================
   MOUSE MOVEMENT
===================================================== */

let mouseX = 0;
let mouseY = 0;


document.addEventListener(
    "mousemove",
    function(event) {

        mouseX =
            (event.clientX /
            window.innerWidth) * 2 - 1;

        mouseY =
            (event.clientY /
            window.innerHeight) * 2 - 1;

    }
);


/* =====================================================
   TOUCH MOVEMENT
===================================================== */

document.addEventListener(
    "touchmove",
    function(event) {

        if (!event.touches.length)
            return;

        mouseX =
            (event.touches[0].clientX /
            window.innerWidth) * 2 - 1;

        mouseY =
            (event.touches[0].clientY /
            window.innerHeight) * 2 - 1;

    },
    {
        passive: true
    }
);


/* =====================================================
   ANIMATION
===================================================== */

function animate() {

    requestAnimationFrame(
        animate
    );


    /* MAIN OBJECT */

    object.rotation.x += 0.002;

    object.rotation.y += 0.004;


    /* NEON EDGES */

    edges.rotation.x -= 0.001;

    edges.rotation.y -= 0.002;


    edges2.rotation.x += 0.001;

    edges2.rotation.y += 0.0015;


    /* RINGS */

    ring1.rotation.z += 0.003;

    ring2.rotation.x += 0.002;


    /* MOUSE / TOUCH */

    object.position.x =
        2 + mouseX * 0.35;

    object.position.y =
        -mouseY * 0.35;


    /* COLOR ANIMATION */

    const time =
        Date.now() * 0.0002;


    edgesMaterial.color.setHSL(
        (time * 0.35) % 1,
        1,
        0.55
    );


    edgesMaterial2.color.setHSL(
        (time * 0.35 + 0.5) % 1,
        1,
        0.55
    );


    renderer.render(
        scene,
        camera
    );

}

animate();


/* =====================================================
   RESPONSIVE
===================================================== */

window.addEventListener(
    "resize",
    function() {

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


/* =====================================================
   CART
===================================================== */

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
