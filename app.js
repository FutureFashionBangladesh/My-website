/* =====================================================
   FUTURE FASHION BANGLADESH
   ORIGINAL 3D + NEON TRIANGLES
   MEN / WOMEN / KIDS COLLECTION SYSTEM
===================================================== */


/* =====================================================
   THREE.JS SETUP
===================================================== */

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

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

container.appendChild(renderer.domElement);


/* =====================================================
   LIGHTS
===================================================== */

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


/* =====================================================
   MAIN FUTURISTIC 3D OBJECT
===================================================== */

const geometry = new THREE.IcosahedronGeometry(
    1.7,
    2
);

const material = new THREE.MeshPhysicalMaterial({
    color: 0x111111,
    metalness: 0.8,
    roughness: 0.2,
    transparent: true,
    opacity: 0.95
});

const object = new THREE.Mesh(
    geometry,
    material
);

object.position.set(2, 0, 0);

scene.add(object);


/* =====================================================
   COLORFUL NEON EDGES
===================================================== */

const edgesGeometry =
    new THREE.EdgesGeometry(geometry);

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


/* =====================================================
   SECOND NEON EDGE
===================================================== */

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
   3D CATEGORY TRIANGLES
===================================================== */

const triangleCategories = [
    "HOODIE",
    "SHIRT",
    "T-SHIRT",
    "PANJABI",
    "CAPS",
    "BAGS"
];


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


/* =====================================================
   TRIANGLE CONTAINER
===================================================== */

const triangleContainer =
    document.createElement("div");

triangleContainer.id =
    "triangle-category-container";

triangleContainer.style.position =
    "absolute";

triangleContainer.style.inset =
    "0";

triangleContainer.style.zIndex =
    "4";

triangleContainer.style.pointerEvents =
    "none";

container.appendChild(
    triangleContainer
);


/* =====================================================
   TRIANGLE STYLE
===================================================== */

const triangleStyle =
    document.createElement("style");

triangleStyle.textContent = `

#triangle-category-container {
    pointer-events: none;
}

.neon-category-triangle {

    position: absolute;

    width: 120px;
    height: 105px;

    display: flex;

    align-items: center;
    justify-content: center;

    pointer-events: auto;

    cursor: pointer;

    transition:
        transform 0.3s ease,
        filter 0.3s ease;
}

.neon-category-triangle:hover {

    transform:
        translate(-50%, -50%)
        scale(1.12);

    filter:
        brightness(1.35);
}


/* OUTER TRIANGLE */

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
            #00ffff,
            #ff00ff,
            #00ffff
        );

    filter:
        drop-shadow(
            0 0 7px #00ffff
        )
        drop-shadow(
            0 0 13px #ff00ff
        );
}


/* INNER DARK TRIANGLE */

.triangle-shape::after {

    content: "";

    position: absolute;

    left: 3px;
    right: 3px;
    top: 3px;
    bottom: 3px;

    clip-path:
        polygon(
            50% 0%,
            100% 100%,
            0% 100%
        );

    background:
        #080808;
}


/* CATEGORY TEXT */

.triangle-label {

    position: relative;

    z-index: 5;

    margin-top: 25px;

    color: #ffffff;

    font-size: 9px;

    font-weight: 700;

    letter-spacing: 2px;

    text-align: center;

    white-space: nowrap;

    text-shadow:
        0 0 6px #00ffff,
        0 0 12px #ff00ff;
}


/* MOBILE */

@media (max-width: 800px) {

    #triangle-category-container {

        transform:
            scale(0.72);

        transform-origin:
            center;
    }

    .neon-category-triangle {

        width: 105px;
        height: 92px;
    }

}

`;

document.head.appendChild(
    triangleStyle
);


/* =====================================================
   CREATE TRIANGLES
===================================================== */

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


        triangle.style.left =
            trianglePositions[index].left;

        triangle.style.top =
            trianglePositions[index].top;

        triangle.style.transform =
            "translate(-50%, -50%)";


        triangleContainer.appendChild(
            triangle
        );


        /* CATEGORY CLICK */

        triangle.addEventListener(
            "click",
            function() {

                const category =
                    triangle.dataset.category;

                openCategoryFrom3D(
                    category
                );

            }
        );

    }
);


/* =====================================================
   DEPARTMENT DATA
===================================================== */

const departmentData = {

    men: {

        number: "01 / MEN",

        name: "MEN",

        description: "FUTURE MENSWEAR",

        categories: [
            "HOODIE",
            "SHIRT",
            "T-SHIRT",
            "PANJABI",
            "CAPS",
            "BAGS",
            "PANTS / CARGO"
        ]

    },

    women: {

        number: "02 / WOMEN",

        name: "WOMEN",

        description: "FUTURE WOMENSWEAR",

        categories: [
            "DRESS",
            "TOP",
            "T-SHIRT",
            "HOODIE",
            "KURTI",
            "PANTS",
            "BAGS",
            "CAPS"
        ]

    },

    kids: {

        number: "03 / KIDS",

        name: "KIDS",

        description: "FUTURE KIDSWEAR",

        categories: [
            "T-SHIRT",
            "SHIRT",
            "HOODIE",
            "PANJABI",
            "DRESS",
            "PANTS",
            "CAPS",
            "BAGS"
        ]

    }

};


/* =====================================================
   GET PRODUCT DATA
===================================================== */

function getProducts() {

    const cards =
        document.querySelectorAll(
            "#productGrid .product-card"
        );

    return Array.from(cards);

}


/* =====================================================
   OPEN DEPARTMENT
===================================================== */

function openDepartment(department) {

    const data =
        departmentData[department];

    if (!data) return;


    const allProductsView =
        document.getElementById(
            "allProductsView"
        );

    const departmentView =
        document.getElementById(
            "departmentView"
        );


    if (allProductsView)
        allProductsView.style.display =
            "none";


    if (departmentView)
        departmentView.style.display =
            "block";


    /* TITLE */

    const number =
        document.getElementById(
            "departmentNumber"
        );

    const name =
        document.getElementById(
            "departmentName"
        );

    const description =
        document.getElementById(
            "departmentDescription"
        );


    if (number)
        number.textContent =
            data.number;

    if (name)
        name.textContent =
            data.name;

    if (description)
        description.textContent =
            data.description;


    /* CATEGORY NAV */

    createCategoryNav(
        department,
        data.categories
    );


    /* SHOW PRODUCTS */

    showDepartmentProducts(
        department
    );


    /* SCROLL */

    if (departmentView) {

        setTimeout(
            function() {

                departmentView.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            },
            50
        );

    }

}


/* =====================================================
   CATEGORY NAVIGATION
===================================================== */

function createCategoryNav(
    department,
    categories
) {

    const nav =
        document.getElementById(
            "categoryNav"
        );

    if (!nav) return;


    nav.innerHTML = "";


    /* ALL BUTTON */

    const allButton =
        document.createElement("button");

    allButton.textContent =
        "ALL";

    allButton.className =
        "category-button active";


    allButton.addEventListener(
        "click",
        function() {

            setActiveCategory(
                nav,
                allButton
            );

            showDepartmentProducts(
                department
            );

        }
    );


    nav.appendChild(
        allButton
    );


    /* CATEGORY BUTTONS */

    categories.forEach(
        function(category) {

            const button =
                document.createElement("button");

            button.textContent =
                category;

            button.className =
                "category-button";


            button.addEventListener(
                "click",
                function() {

                    setActiveCategory(
                        nav,
                        button
                    );

                    showCategoryProducts(
                        department,
                        category
                    );

                }
            );


            nav.appendChild(
                button
            );

        }
    );

}


/* =====================================================
   ACTIVE CATEGORY
===================================================== */

function setActiveCategory(
    nav,
    activeButton
) {

    const buttons =
        nav.querySelectorAll(
            ".category-button"
        );


    buttons.forEach(
        function(button) {

            button.classList.remove(
                "active"
            );

        }
    );


    activeButton.classList.add(
        "active"
    );

}


/* =====================================================
   SHOW DEPARTMENT PRODUCTS
===================================================== */

function showDepartmentProducts(
    department
) {

    const target =
        document.getElementById(
            "departmentProducts"
        );

    if (!target) return;


    target.innerHTML = "";


    const products =
        getProducts();


    let found = 0;


    products.forEach(
        function(product) {

            const productDepartment =
                product.dataset.department;


            if (
                productDepartment ===
                department
            ) {

                const clone =
                    product.cloneNode(true);

                target.appendChild(
                    clone
                );

                found++;

            }

        }
    );


    if (found === 0) {

        showNoProducts(
            target
        );

    }

}


/* =====================================================
   SHOW CATEGORY PRODUCTS
===================================================== */

function showCategoryProducts(
    department,
    category
) {

    const target =
        document.getElementById(
            "departmentProducts"
        );

    if (!target) return;


    target.innerHTML = "";


    const products =
        getProducts();


    let found = 0;


    products.forEach(
        function(product) {

            const productDepartment =
                product.dataset.department;

            const productCategory =
                product.dataset.category;


            if (
                productDepartment ===
                department
                &&
                productCategory ===
                category.toLowerCase()
            ) {

                const clone =
                    product.cloneNode(true);

                target.appendChild(
                    clone
                );

                found++;

            }

        }
    );


    if (found === 0) {

        showNoProducts(
            target,
            category
        );

    }

}


/* =====================================================
   NO PRODUCT MESSAGE
===================================================== */

function showNoProducts(
    target,
    category
) {

    const message =
        document.createElement("div");

    message.className =
        "no-products";


    message.innerHTML = `

        <span>COMING SOON</span>

        <h3>
            ${category || "NEW"} COLLECTION
        </h3>

        <p>
            FUTURE PRODUCTS ARE BEING PREPARED.
        </p>

    `;


    target.appendChild(
        message
    );

}


/* =====================================================
   3D CATEGORY CLICK
===================================================== */

function openCategoryFrom3D(
    category
) {

    /* Open MEN because the original
       six 3D categories are MEN categories */

    openDepartment(
        "men"
    );


    setTimeout(
        function() {

            const nav =
                document.getElementById(
                    "categoryNav"
                );

            if (!nav) return;


            const buttons =
                nav.querySelectorAll(
                    ".category-button"
                );


            buttons.forEach(
                function(button) {

                    if (
                        button.textContent
                            .toLowerCase() ===
                        category
                    ) {

                        button.click();

                    }

                }
            );

        },
        100
    );

}


/* =====================================================
   SHOW ALL PRODUCTS
===================================================== */

function showAllProducts() {

    const allProductsView =
        document.getElementById(
            "allProductsView"
        );

    const departmentView =
        document.getElementById(
            "departmentView"
        );


    if (departmentView)
        departmentView.style.display =
            "none";


    if (allProductsView)
        allProductsView.style.display =
            "block";


    const collection =
        document.getElementById(
            "collection"
        );


    if (collection) {

        collection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =====================================================
   INITIAL DEPARTMENT STATE
===================================================== */

const initialDepartmentView =
    document.getElementById(
        "departmentView"
    );


if (initialDepartmentView) {

    initialDepartmentView.style.display =
        "none";

}


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


    /* MOUSE */

    object.position.x =
        2 + mouseX * 0.35;

    object.position.y =
        -mouseY * 0.35;


    /* COLOR */

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
