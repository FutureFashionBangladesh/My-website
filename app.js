/* =====================================================
   FUTURE FASHION BANGLADESH
   COLLECTION + DEPARTMENT + CATEGORY SYSTEM
===================================================== */


/* =====================================================
   THREE.JS
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


/* LIGHTS */

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


/* MAIN 3D OBJECT */

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


/* WIREFRAME */

const wireGeometry =
    new THREE.IcosahedronGeometry(
        1.78,
        2
    );

const wireMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.45
    });

const wire =
    new THREE.Mesh(
        wireGeometry,
        wireMaterial
    );

object.add(wire);


/* SECOND NEON WIREFRAME */

const wireGeometry2 =
    new THREE.IcosahedronGeometry(
        1.86,
        1
    );

const wireMaterial2 =
    new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });

const wire2 =
    new THREE.Mesh(
        wireGeometry2,
        wireMaterial2
    );

object.add(wire2);


/* RINGS */

const ringGeometry =
    new THREE.TorusGeometry(
        2.3,
        0.015,
        16,
        100
    );

const ringMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.25
    });

const ring1 =
    new THREE.Mesh(
        ringGeometry,
        ringMaterial
    );

ring1.rotation.x =
    Math.PI / 2;

scene.add(ring1);


const ring2 =
    new THREE.Mesh(
        ringGeometry,
        new THREE.MeshBasicMaterial({
            color: 0xff00ff,
            transparent: true,
            opacity: 0.2
        })
    );

ring2.rotation.y =
    Math.PI / 2;

scene.add(ring2);


/* MOUSE */

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


/* TOUCH */

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
    { passive: true }
);


/* ANIMATION */

function animate() {

    requestAnimationFrame(
        animate
    );

    object.rotation.x += 0.002;
    object.rotation.y += 0.004;

    wire.rotation.x -= 0.001;
    wire.rotation.y -= 0.002;

    wire2.rotation.x += 0.001;
    wire2.rotation.y += 0.0015;

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


/* RESPONSIVE 3D */

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
   COLLECTION SYSTEM
===================================================== */


/* CATEGORY LIST */

const categories = {

    men: [
        ["all", "ALL MEN"],
        ["hoodie", "HOODIE"],
        ["shirt", "SHIRT"],
        ["tshirt", "T-SHIRT"],
        ["panjabi", "PANJABI"],
        ["caps", "CAPS"],
        ["bags", "BAGS"],
        ["pants", "PANTS / CARGO"]
    ],

    women: [
        ["all", "ALL WOMEN"],
        ["dress", "DRESS"],
        ["top", "TOP"],
        ["tshirt", "T-SHIRT"],
        ["hoodie", "HOODIE"],
        ["kurti", "KURTI"],
        ["pants", "PANTS"],
        ["bags", "BAGS"],
        ["caps", "CAPS"]
    ],

    kids: [
        ["all", "ALL KIDS"],
        ["tshirt", "T-SHIRT"],
        ["shirt", "SHIRT"],
        ["hoodie", "HOODIE"],
        ["panjabi", "PANJABI"],
        ["dress", "DRESS"],
        ["pants", "PANTS"],
        ["caps", "CAPS"],
        ["bags", "BAGS"]
    ]

};


/* DEPARTMENT NAMES */

const departmentInfo = {

    men: {
        number: "01 / MEN",
        title: "MEN",
        description: "FUTURE MENSWEAR"
    },

    women: {
        number: "02 / WOMEN",
        title: "WOMEN",
        description: "FUTURE WOMENSWEAR"
    },

    kids: {
        number: "03 / KIDS",
        title: "KIDS",
        description: "FUTURE KIDSWEAR"
    }

};


/* OPEN DEPARTMENT */

function openDepartment(
    department
) {

    const allView =
        document.getElementById(
            "allProductsView"
        );

    const departmentView =
        document.getElementById(
            "departmentView"
        );

    allView.style.display =
        "none";

    departmentView.style.display =
        "block";


    /* TITLE */

    document.getElementById(
        "departmentNumber"
    ).textContent =
        departmentInfo[department].number;

    document.getElementById(
        "departmentName"
    ).textContent =
        departmentInfo[department].title;

    document.getElementById(
        "departmentDescription"
    ).textContent =
        departmentInfo[department].description;


    /* CATEGORY NAV */

    const nav =
        document.getElementById(
            "categoryNav"
        );

    nav.innerHTML = "";


    categories[department].forEach(
        function(category, index) {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "category-btn";

            if (index === 0) {
                button.classList.add(
                    "active"
                );
            }

            button.textContent =
                category[1];

            button.onclick =
                function() {

                    filterProducts(
                        department,
                        category[0],
                        button
                    );

                };

            nav.appendChild(
                button
            );

        }
    );


    /* SHOW ALL DEPARTMENT PRODUCTS */

    filterProducts(
        department,
        "all",
        nav.querySelector(
            ".category-btn"
        )
    );


    /* SCROLL */

    setTimeout(
        function() {

            departmentView.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        100
    );

}


/* FILTER PRODUCTS */

function filterProducts(
    department,
    category,
    clickedButton
) {

    const sourceProducts =
        document.querySelectorAll(
            "#productGrid .product-card"
        );

    const destination =
        document.getElementById(
            "departmentProducts"
        );

    destination.innerHTML = "";


    sourceProducts.forEach(
        function(card) {

            const cardDepartment =
                card.dataset.department;

            const cardCategory =
                card.dataset.category;


            if (
                cardDepartment === department &&
                (
                    category === "all" ||
                    cardCategory === category
                )
            ) {

                const clone =
                    card.cloneNode(true);

                destination.appendChild(
                    clone
                );

            }

        }
    );


    /* ACTIVE CATEGORY */

    document.querySelectorAll(
        ".category-btn"
    ).forEach(
        function(button) {

            button.classList.remove(
                "active"
            );

        }
    );

    if (clickedButton) {

        clickedButton.classList.add(
            "active"
        );

    }


    /* EMPTY MESSAGE */

    if (
        destination.children.length === 0
    ) {

        destination.innerHTML = `
            <div style="
                grid-column: 1 / -1;
                padding: 80px 20px;
                text-align: center;
                color: #555;
                letter-spacing: 3px;
                border: 1px solid #222;
            ">
                NO PRODUCTS AVAILABLE YET
            </div>
        `;

    }

}


/* SHOW ALL PRODUCTS */

function showAllProducts() {

    document.getElementById(
        "departmentView"
    ).style.display =
        "none";

    document.getElementById(
        "allProductsView"
    ).style.display =
        "block";

    document.getElementById(
        "allProductsView"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


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

    cart.textContent =
        cartCount;

}


/* =====================================================
   LOADING
===================================================== */

window.addEventListener(
    "load",
    function() {

        setTimeout(
            function() {

                const loading =
                    document.getElementById(
                        "loading"
                    );

                if (loading) {
                    loading.style.display =
                        "none";
                }

            },
            1800
        );

    }
);
