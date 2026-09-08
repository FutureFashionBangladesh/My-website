/* =====================================================
   FUTURE FASHION BANGLADESH
   FINAL 3D HERO + TRIANGLES + DEPARTMENTS
===================================================== */


/* =====================================================
   BASIC VARIABLES
===================================================== */

const container =
    document.getElementById("canvas-container");

let mouseX = 0;
let mouseY = 0;

let cartCount = 0;


/* =====================================================
   THREE.JS
===================================================== */

if (!container) {

    console.error(
        "FFB: canvas-container not found"
    );

} else {

    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            60,
            container.clientWidth /
            Math.max(container.clientHeight, 1),
            0.1,
            1000
        );


    const renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            2
        )
    );


    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );


    renderer.setClearColor(
        0x000000,
        0
    );


    renderer.domElement.style.display =
        "block";

    renderer.domElement.style.width =
        "100%";

    renderer.domElement.style.height =
        "100%";

    renderer.domElement.style.pointerEvents =
        "none";


    container.appendChild(
        renderer.domElement
    );


    /* =================================================
       LIGHTS
    ================================================= */

    scene.add(
        new THREE.AmbientLight(
            0xffffff,
            1.5
        )
    );


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



    /* =================================================
       MAIN 3D MODEL
    ================================================= */

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


    scene.add(object);



    /* =================================================
       NEON EDGES
    ================================================= */

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



    /* =================================================
       SECOND NEON EDGE
    ================================================= */

    const secondGeometry =
        new THREE.IcosahedronGeometry(
            1.73,
            2
        );


    const edgesGeometry2 =
        new THREE.EdgesGeometry(
            secondGeometry
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



    /* =================================================
       NEON RINGS
    ================================================= */

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



    /* =================================================
       REMOVE ANY OLD WHITE PARTICLES
       
       No THREE.Points are created in this version.
       This also removes accidental old particle
       objects if they exist in the scene.
    ================================================= */

    scene.traverse(
        function(child) {

            if (child.isPoints) {

                child.visible =
                    false;

                if (child.parent) {

                    child.parent.remove(
                        child
                    );

                }

            }

        }
    );



    /* =================================================
       RESPONSIVE MODEL POSITION
    ================================================= */

    function updateModelPosition() {

        const mobile =
            window.innerWidth <= 800;


        if (mobile) {

            camera.position.z =
                7.4;


            object.position.x =
                0;

            object.position.y =
                0;


            ring1.position.x =
                0;

            ring1.position.y =
                0;


            ring2.position.x =
                0;

            ring2.position.y =
                0;


        } else {

            camera.position.z =
                6;


            object.position.x =
                2 +
                mouseX * 0.35;


            object.position.y =
                -mouseY * 0.35;


            ring1.position.x =
                2;


            ring1.position.y =
                0;


            ring2.position.x =
                2;


            ring2.position.y =
                0;

        }

    }



    /* =================================================
       TRIANGLE CATEGORY SYSTEM
    ================================================= */

    const categories = [

        "HOODIE",

        "SHIRT",

        "T-SHIRT",

        "PANJABI",

        "CAPS",

        "BAGS"

    ];



    /* =================================================
       TRIANGLE CONTAINER
    ================================================= */

    const triangleContainer =
        document.createElement("div");


    triangleContainer.id =
        "triangle-category-container";


    container.appendChild(
        triangleContainer
    );



    /* =================================================
       TRIANGLE CSS
    ================================================= */

    const triangleStyle =
        document.createElement("style");


    triangleStyle.textContent = `

        #triangle-category-container {

            position: absolute;

            inset: 0;

            width: 100%;

            height: 100%;

            z-index: 8;

            pointer-events: none;

            overflow: hidden;

        }


        .ffb-triangle {

            position: absolute;

            width: clamp(
                58px,
                7vw,
                105px
            );

            height: clamp(
                51px,
                6.1vw,
                92px
            );

            display: flex;

            align-items: center;

            justify-content: center;

            pointer-events: auto;

            cursor: pointer;

            transform:
                translate(-50%, -50%);

            transition:
                transform 0.3s ease,
                filter 0.3s ease;

        }


        .ffb-triangle:hover {

            transform:
                translate(-50%, -50%)
                scale(1.10);

            filter:
                brightness(1.35);

        }


        .ffb-triangle-shape {

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
                    0 0 6px #00ffff
                )
                drop-shadow(
                    0 0 12px #ff00ff
                );

        }


        .ffb-triangle-shape::after {

            content: "";

            position: absolute;

            inset: 3px;

            clip-path:
                polygon(
                    50% 0%,
                    100% 100%,
                    0% 100%
                );

            background:
                rgba(
                    5,
                    5,
                    5,
                    0.94
                );

        }


        .ffb-triangle-name {

            position: relative;

            z-index: 5;

            margin-top: 20px;

            color: #ffffff;

            font-size: clamp(
                6px,
                0.62vw,
                9px
            );

            font-weight: 800;

            letter-spacing: 1.3px;

            text-align: center;

            white-space: nowrap;

            text-shadow:
                0 0 5px #00ffff,
                0 0 10px #ff00ff;

        }



        /* =============================================
           DESKTOP
           
           Triangles stay around the model,
           INSIDE the ring area.
        ============================================= */

        .ffb-t1 {

            left: 67%;

            top: 31%;

        }


        .ffb-t2 {

            left: 75%;

            top: 42%;

        }


        .ffb-t3 {

            left: 74%;

            top: 59%;

        }


        .ffb-t4 {

            left: 67%;

            top: 69%;

        }


        .ffb-t5 {

            left: 59%;

            top: 59%;

        }


        .ffb-t6 {

            left: 59%;

            top: 42%;

        }



        /* =============================================
           MOBILE
        ============================================= */

        @media (max-width: 800px) {

            #triangle-category-container {

                transform:
                    scale(0.78);

                transform-origin:
                    center center;

            }


            .ffb-triangle {

                width: 72px;

                height: 63px;

            }


            .ffb-t1 {

                left: 50%;

                top: 27%;

            }


            .ffb-t2 {

                left: 66%;

                top: 39%;

            }


            .ffb-t3 {

                left: 64%;

                top: 59%;

            }


            .ffb-t4 {

                left: 50%;

                top: 70%;

            }


            .ffb-t5 {

                left: 36%;

                top: 59%;

            }


            .ffb-t6 {

                left: 34%;

                top: 39%;

            }

        }



        /* =============================================
           SMALL PHONES
        ============================================= */

        @media (max-width: 420px) {

            #triangle-category-container {

                transform:
                    scale(0.68);

            }

            .ffb-triangle {

                width: 68px;

                height: 59px;

            }

            .ffb-triangle-name {

                font-size: 6px;

                letter-spacing: 1px;

            }

        }

    `;


    document.head.appendChild(
        triangleStyle
    );



    /* =================================================
       CREATE TRIANGLES
    ================================================= */

    categories.forEach(
        function(category, index) {

            const triangle =
                document.createElement("div");


            triangle.className =
                "ffb-triangle ffb-t" +
                (index + 1);


            triangle.innerHTML = `

                <div
                    class="ffb-triangle-shape">
                </div>

                <div
                    class="ffb-triangle-name">
                    ${category}
                </div>

            `;


            triangleContainer.appendChild(
                triangle
            );


            triangle.addEventListener(
                "click",
                function() {

                    /*
                       Triangle click opens
                       MEN collection because
                       current products are mainly
                       men's categories.
                    */

                    if (
                        typeof window.openDepartment ===
                        "function"
                    ) {

                        window.openDepartment(
                            "men"
                        );

                    }

                }
            );

        }
    );



    /* =================================================
       MOUSE MOVEMENT
    ================================================= */

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



    /* =================================================
       TOUCH MOVEMENT
    ================================================= */

    document.addEventListener(
        "touchmove",
        function(event) {

            if (
                !event.touches ||
                !event.touches.length
            ) {

                return;

            }


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



    /* =================================================
       ANIMATION
    ================================================= */

    function animate() {

        requestAnimationFrame(
            animate
        );


        /* MODEL ROTATION */

        object.rotation.x +=
            0.002;


        object.rotation.y +=
            0.004;



        /* EDGE ROTATION */

        edges.rotation.x -=
            0.001;


        edges.rotation.y -=
            0.002;


        edges2.rotation.x +=
            0.001;


        edges2.rotation.y +=
            0.0015;



        /* RING ROTATION */

        ring1.rotation.z +=
            0.003;


        ring2.rotation.x +=
            0.002;



        /* MODEL MOVEMENT */

        if (
            window.innerWidth > 800
        ) {

            object.position.x =
                2 +
                mouseX * 0.35;


            object.position.y =
                -mouseY * 0.35;

        } else {

            object.position.x =
                mouseX * 0.12;


            object.position.y =
                -mouseY * 0.12;

        }



        /* COLOR ANIMATION */

        const time =
            Date.now() *
            0.0002;


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



    /* =================================================
       RESPONSIVE RESIZE
    ================================================= */

    function resize() {

        const width =
            Math.max(
                container.clientWidth,
                1
            );


        const height =
            Math.max(
                container.clientHeight,
                1
            );


        camera.aspect =
            width / height;


        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            height
        );


        updateModelPosition();

    }


    window.addEventListener(
        "resize",
        resize
    );



    /* =================================================
       INITIALIZE
    ================================================= */

    updateModelPosition();

    resize();

    animate();

}



/* =====================================================
   CART
===================================================== */

window.addToCart =
    function() {

        cartCount++;


        const cart =
            document.getElementById(
                "cartCount"
            );


        if (cart) {

            cart.textContent =
                cartCount;

        }

    };



/* =====================================================
   DEPARTMENT DATA
===================================================== */

const departmentData = {

    men: {

        number: "01 / MEN",

        name: "MEN",

        description:
            "FUTURE MENSWEAR",

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

        description:
            "FUTURE WOMENSWEAR",

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

        description:
            "FUTURE KIDSWEAR",

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
   CATEGORY NORMALIZATION
===================================================== */

function normalizeCategory(
    category
) {

    const value =
        String(category)
        .trim()
        .toUpperCase();


    const map = {

        "T-SHIRT": "tshirt",

        "TSHIRT": "tshirt",

        "HOODIE": "hoodie",

        "SHIRT": "shirt",

        "PANJABI": "panjabi",

        "CAPS": "caps",

        "CAP": "caps",

        "BAGS": "bags",

        "BAG": "bags",

        "PANTS": "pants",

        "PANTS / CARGO": "pants",

        "CARGO": "pants",

        "DRESS": "dress",

        "TOP": "top",

        "KURTI": "kurti"

    };


    return map[value] ||
        value.toLowerCase();

}



/* =====================================================
   OPEN DEPARTMENT
===================================================== */

window.openDepartment =
    function(department) {

        const data =
            departmentData[
                department
            ];


        if (!data) {

            return;

        }


        const all =
            document.getElementById(
                "allProductsView"
            );


        const view =
            document.getElementById(
                "departmentView"
            );


        if (all) {

            all.style.display =
                "none";

        }


        if (view) {

            view.style.display =
                "block";

        }


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


        if (number) {

            number.textContent =
                data.number;

        }


        if (name) {

            name.textContent =
                data.name;

        }


        if (description) {

            description.textContent =
                data.description;

        }


        createCategoryNav(
            department,
            data.categories
        );


        showDepartmentProducts(
            department
        );


        if (view) {

            setTimeout(
                function() {

                    view.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                },
                80
            );

        }

    };



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


    if (!nav) {

        return;

    }


    nav.innerHTML = "";



    const allButton =
        document.createElement(
            "button"
        );


    allButton.textContent =
        "ALL";


    allButton.className =
        "category-button active";


    allButton.onclick =
        function() {

            setActiveCategory(
                nav,
                allButton
            );


            showDepartmentProducts(
                department
            );

        };


    nav.appendChild(
        allButton
    );



    categories.forEach(
        function(category) {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                category;


            button.className =
                "category-button";


            button.onclick =
                function() {

                    setActiveCategory(
                        nav,
                        button
                    );


                    showCategoryProducts(
                        department,
                        category
                    );

                };


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
    active
) {

    nav.querySelectorAll(
        ".category-button"
    ).forEach(
        function(button) {

            button.classList.remove(
                "active"
            );

        }
    );


    active.classList.add(
        "active"
    );

}



/* =====================================================
   GET ORIGINAL PRODUCTS
===================================================== */

function getProducts() {

    return Array.from(
        document.querySelectorAll(
            "#productGrid .product-card"
        )
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


    if (!target) {

        return;

    }


    target.innerHTML = "";


    let found = 0;


    getProducts().forEach(
        function(product) {

            if (
                product.dataset.department ===
                department
            ) {

                const clone =
                    product.cloneNode(
                        true
                    );


                target.appendChild(
                    clone
                );


                found++;

            }

        }
    );


    if (!found) {

        showComingSoon(
            target,
            department
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


    if (!target) {

        return;

    }


    target.innerHTML = "";


    let found = 0;


    const wanted =
        normalizeCategory(
            category
        );


    getProducts().forEach(
        function(product) {

            const productDepartment =
                product.dataset.department;


            const productCategory =
                normalizeCategory(
                    product.dataset.category
                );


            if (

                productDepartment ===
                department

                &&

                productCategory ===
                wanted

            ) {

                const clone =
                    product.cloneNode(
                        true
                    );


                target.appendChild(
                    clone
                );


                found++;

            }

        }
    );


    if (!found) {

        showComingSoon(
            target,
            category
        );

    }

}



/* =====================================================
   COMING SOON
===================================================== */

function showComingSoon(
    target,
    name
) {

    target.innerHTML = `

        <div class="ffb-coming-soon">

            <span>
                COMING SOON
            </span>

            <h3>
                ${String(name).toUpperCase()}
            </h3>

            <p>
                FUTURE COLLECTION
                IS BEING PREPARED.
            </p>

        </div>

    `;

}



/* =====================================================
   SHOW ALL PRODUCTS
===================================================== */

window.showAllProducts =
    function() {

        const all =
            document.getElementById(
                "allProductsView"
            );


        const view =
            document.getElementById(
                "departmentView"
            );


        if (view) {

            view.style.display =
                "none";

        }


        if (all) {

            all.style.display =
                "block";

        }


        const collection =
            document.getElementById(
                "collection"
            );


        if (collection) {

            collection.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "start"

            });

        }

    };



/* =====================================================
   FORCE COMING SOON ON DEPARTMENT CARDS
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        document
            .querySelectorAll(
                ".department-card"
            )
            .forEach(
                function(card) {

                    if (
                        !card.querySelector(
                            ".department-coming-soon"
                        )
                    ) {

                        const text =
                            document.createElement(
                                "strong"
                            );


                        text.className =
                            "department-coming-soon";


                        text.textContent =
                            "COMING SOON";


                        card.insertBefore(
                            text,
                            card.querySelector(
                                "em"
                            )
                        );

                    }

                }
            );

    }
);
