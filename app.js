/* =====================================================
   FUTURE FASHION BANGLADESH
   3D HERO + TRIANGLES + PRODUCT SYSTEM
===================================================== */


/* =====================================================
   3D HERO
===================================================== */

const container =
    document.getElementById(
        "canvas-container"
    );


let mouseX = 0;
let mouseY = 0;

let cartCount = 0;


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
            Math.max(
                container.clientHeight,
                1
            ),
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



    /* LIGHTS */

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



    /* MAIN MODEL */

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



    /* CYAN EDGE */

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



    /* MAGENTA EDGE */

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



    /* RINGS */

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



    /* NO PARTICLES */

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



    /* MODEL POSITION */

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



    /* TRIANGLE CATEGORIES */

    const categories = [

        "HOODIE",

        "SHIRT",

        "T-SHIRT",

        "PANJABI",

        "CAPS",

        "BAGS"

    ];



    const triangleContainer =
        document.createElement(
            "div"
        );


    triangleContainer.id =
        "triangle-category-container";


    container.appendChild(
        triangleContainer
    );



    /* TRIANGLE CSS */

    const triangleStyle =
        document.createElement(
            "style"
        );


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

            width:
                clamp(
                    58px,
                    7vw,
                    105px
                );

            height:
                clamp(
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
                translate(
                    -50%,
                    -50%
                );

            transition:
                transform
                0.3s ease,

                filter
                0.3s ease;

        }


        .ffb-triangle:hover {

            transform:
                translate(
                    -50%,
                    -50%
                )
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

            font-size:
                clamp(
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



    /* CREATE TRIANGLES */

    categories.forEach(
        function(
            category,
            index
        ) {

            const triangle =
                document.createElement(
                    "div"
                );


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

                    openDepartment(
                        "men"
                    );

                }
            );

        }
    );



    /* MOUSE */

    document.addEventListener(
        "mousemove",
        function(event) {

            mouseX =
                (
                    event.clientX /
                    window.innerWidth
                ) * 2 - 1;


            mouseY =
                (
                    event.clientY /
                    window.innerHeight
                ) * 2 - 1;

        }
    );



    /* TOUCH */

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
                (
                    event.touches[0].clientX /
                    window.innerWidth
                ) * 2 - 1;


            mouseY =
                (
                    event.touches[0].clientY /
                    window.innerHeight
                ) * 2 - 1;

        },
        {
            passive: true
        }
    );



    /* ANIMATION */

    function animate() {

        requestAnimationFrame(
            animate
        );


        object.rotation.x +=
            0.002;


        object.rotation.y +=
            0.004;


        edges.rotation.x -=
            0.001;


        edges.rotation.y -=
            0.002;


        edges2.rotation.x +=
            0.001;


        edges2.rotation.y +=
            0.0015;


        ring1.rotation.z +=
            0.003;


        ring2.rotation.x +=
            0.002;



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



    /* RESIZE */

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


        alert(
            "PRODUCT ADDED TO CART"
        );

    };



window.openCart =
    function() {

        if (cartCount === 0) {

            alert(
                "YOUR CART IS EMPTY"
            );

            return;

        }


        alert(
            "CART: " +
            cartCount +
            " ITEM(S)"
        );

    };



window.buyNow =
    function() {

        alert(
            "CHECKOUT SYSTEM COMING NEXT"
        );

    };



window.contactFFB =
    function() {

        alert(
            "CONTACT SYSTEM COMING NEXT"
        );

    };



/* =====================================================
   DEPARTMENT DATA
===================================================== */

const departmentData = {

    men: {

        number:
            "01 / MEN",

        name:
            "MEN",

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

        number:
            "02 / WOMEN",

        name:
            "WOMEN",

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

        number:
            "03 / KIDS",

        name:
            "KIDS",

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
   CATEGORY NORMALIZER
===================================================== */

function normalizeCategory(
    category
) {

    const value =
        String(category)
        .trim()
        .toUpperCase();


    const map = {

        "T-SHIRT":
            "tshirt",

        "TSHIRT":
            "tshirt",

        "HOODIE":
            "hoodie",

        "SHIRT":
            "shirt",

        "PANJABI":
            "panjabi",

        "CAPS":
            "caps",

        "CAP":
            "caps",

        "BAGS":
            "bags",

        "BAG":
            "bags",

        "PANTS":
            "pants",

        "PANTS / CARGO":
            "pants",

        "CARGO":
            "pants",

        "DRESS":
            "dress",

        "TOP":
            "top",

        "KURTI":
            "kurti"

    };


    return (
        map[value] ||
        value.toLowerCase()
    );

}



/* =====================================================
   STORE PRODUCTS
===================================================== */

function getProducts() {

    return Array.from(
        document.querySelectorAll(
            "#productGrid .product-card"
        )
    );

}



/* =====================================================
   FILTER CHECK
===================================================== */

function productMatchesFilters(
    product,
    prefix = ""
) {

    const colorElement =
        document.getElementById(
            prefix +
            "colorFilter"
        );


    const sizeElement =
        document.getElementById(
            prefix +
            "sizeFilter"
        );


    const priceElement =
        document.getElementById(
            prefix +
            "priceFilter"
        );


    const selectedColor =
        colorElement
        ? colorElement.value
        : "all";


    const selectedSize =
        sizeElement
        ? sizeElement.value
        : "all";


    const selectedPrice =
        priceElement
        ? priceElement.value
        : "all";



    /* COLOR */

    if (
        selectedColor !== "all"
    ) {

        const colors =
            String(
                product.dataset.colors ||
                ""
            )
            .toLowerCase()
            .split(",");


        if (
            !colors.includes(
                selectedColor
            )
        ) {

            return false;

        }

    }



    /* SIZE */

    if (
        selectedSize !== "all"
    ) {

        const sizes =
            String(
                product.dataset.sizes ||
                ""
            )
            .toLowerCase()
            .split(",");


        if (
            !sizes.includes(
                selectedSize
            )
        ) {

            return false;

        }

    }



    /* PRICE */

    const price =
        Number(
            product.dataset.price ||
            0
        );



    if (
        selectedPrice ===
        "0-1500"
        &&
        price > 1500
    ) {

        return false;

    }


    if (
        selectedPrice ===
        "1500-2500"
        &&
        (
            price <= 1500 ||
            price > 2500
        )
    ) {

        return false;

    }


    if (
        selectedPrice ===
        "2500-5000"
        &&
        (
            price <= 2500 ||
            price > 5000
        )
    ) {

        return false;

    }


    if (
        selectedPrice ===
        "5000+"
        &&
        price <= 5000
    ) {

        return false;

    }


    return true;

}



/* =====================================================
   SORT PRODUCTS
===================================================== */

function sortProducts(
    products,
    sortValue
) {

    if (
        sortValue === "low"
    ) {

        products.sort(
            function(a, b) {

                return (
                    Number(
                        a.dataset.price
                    ) -
                    Number(
                        b.dataset.price
                    )
                );

            }
        );

    }


    if (
        sortValue === "high"
    ) {

        products.sort(
            function(a, b) {

                return (
                    Number(
                        b.dataset.price
                    ) -
                    Number(
                        a.dataset.price
                    )
                );

            }
        );

    }


    return products;

}



/* =====================================================
   RESET DEPARTMENT FILTERS
===================================================== */

function resetDepartmentFilters() {

    const values = {

        colorFilter:
            "all",

        sizeFilter:
            "all",

        priceFilter:
            "all",

        sortProducts:
            "default"

    };


    Object.keys(values)
    .forEach(
        function(id) {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.value =
                    values[id];

            }

        }
    );

}



/* =====================================================
   RESET ALL PRODUCTS FILTERS
===================================================== */

function resetAllFilters() {

    const values = {

        allColorFilter:
            "all",

        allSizeFilter:
            "all",

        allPriceFilter:
            "all",

        allSortProducts:
            "default"

    };


    Object.keys(values)
    .forEach(
        function(id) {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.value =
                    values[id];

            }

        }
    );

}



/* =====================================================
   ALL PRODUCT LISTING
===================================================== */

function refreshAllProducts() {

    const grid =
        document.getElementById(
            "productGrid"
        );


    if (!grid) {
        return;
    }


    const originalProducts =
        getProducts();


    let products =
        originalProducts.filter(
            function(product) {

                return productMatchesFilters(
                    product,
                    "all"
                );

            }
        );


    const sort =
        document.getElementById(
            "allSortProducts"
        );


    const sortValue =
        sort
        ? sort.value
        : "default";


    products =
        sortProducts(
            products,
            sortValue
        );


    grid.innerHTML = "";


    products.forEach(
        function(product) {

            grid.appendChild(
                product.cloneNode(
                    true
                )
            );

        }
    );


    const count =
        document.getElementById(
            "allProductCount"
        );


    if (count) {

        count.textContent =
            products.length;

    }


    if (!products.length) {

        grid.innerHTML = `

            <div class="ffb-coming-soon">

                <span>
                    NO PRODUCTS FOUND
                </span>

                <h3>
                    TRY AGAIN
                </h3>

                <p>
                    CHANGE YOUR FILTERS
                    TO SEE MORE PRODUCTS.
                </p>

            </div>

        `;

    }

}



/* =====================================================
   CATEGORY NAV
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



    /* ALL */

    const allButton =
        document.createElement(
            "button"
        );


    allButton.textContent =
        "ALL";


    allButton.className =
        "category-btn active";


    allButton.onclick =
        function() {

            nav
                .querySelectorAll(
                    ".category-btn"
                )
                .forEach(
                    function(button) {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


            allButton.classList.add(
                "active"
            );


            currentCategory =
                "all";


            refreshDepartmentProducts();

        };


    nav.appendChild(
        allButton
    );



    /* CATEGORIES */

    categories.forEach(
        function(category) {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                category;


            button.className =
                "category-btn";


            button.onclick =
                function() {

                    nav
                        .querySelectorAll(
                            ".category-btn"
                        )
                        .forEach(
                            function(btn) {

                                btn.classList.remove(
                                    "active"
                                );

                            }
                        );


                    button.classList.add(
                        "active"
                    );


                    currentCategory =
                        category;


                    refreshDepartmentProducts();

                };


            nav.appendChild(
                button
            );

        }
    );

}



/* =====================================================
   CURRENT DEPARTMENT / CATEGORY
===================================================== */

let currentDepartment =
    "all";


let currentCategory =
    "all";



/* =====================================================
   REFRESH DEPARTMENT PRODUCTS
===================================================== */

function refreshDepartmentProducts() {

    const target =
        document.getElementById(
            "departmentProducts"
        );


    if (!target) {
        return;
    }


    let products =
        getProducts();


    /* DEPARTMENT */

    if (
        currentDepartment !==
        "all"
    ) {

        products =
            products.filter(
                function(product) {

                    return (
                        product.dataset.department ===
                        currentDepartment
                    );

                }
            );

    }



    /* CATEGORY */

    if (
        currentCategory !==
        "all"
    ) {

        const wanted =
            normalizeCategory(
                currentCategory
            );


        products =
            products.filter(
                function(product) {

                    return (
                        normalizeCategory(
                            product.dataset.category
                        ) ===
                        wanted
                    );

                }
            );

    }



    /* FILTER */

    products =
        products.filter(
            function(product) {

                return productMatchesFilters(
                    product
                );

            }
        );



    /* SORT */

    const sort =
        document.getElementById(
            "sortProducts"
        );


    const sortValue =
        sort
        ? sort.value
        : "default";


    products =
        sortProducts(
            products,
            sortValue
        );



    target.innerHTML =
        "";



    products.forEach(
        function(product) {

            target.appendChild(
                product.cloneNode(
                    true
                )
            );

        }
    );



    const count =
        document.getElementById(
            "productCount"
        );


    if (count) {

        count.textContent =
            products.length;

    }



    if (!products.length) {

        target.innerHTML = `

            <div class="ffb-coming-soon">

                <span>
                    COMING SOON
                </span>

                <h3>
                    ${String(
                        currentCategory === "all"
                        ? currentDepartment
                        : currentCategory
                    ).toUpperCase()}
                </h3>

                <p>
                    FUTURE COLLECTION
                    IS BEING PREPARED.
                </p>

            </div>

        `;

    }

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


        currentDepartment =
            department;


        currentCategory =
            "all";


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



        resetDepartmentFilters();


        createCategoryNav(
            department,
            data.categories
        );


        refreshDepartmentProducts();



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
   SHOW ALL PRODUCTS
===================================================== */

window.showAllProducts =
    function() {

        currentDepartment =
            "all";


        currentCategory =
            "all";


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


        resetAllFilters();


        refreshAllProducts();


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
   FILTER EVENTS
===================================================== */

function setupFilterEvents() {


    const allFilterIds = [

        "allColorFilter",

        "allSizeFilter",

        "allPriceFilter",

        "allSortProducts"

    ];


    allFilterIds.forEach(
        function(id) {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.addEventListener(
                    "change",
                    function() {

                        refreshAllProducts();

                    }
                );

            }

        }
    );



    const departmentFilterIds = [

        "colorFilter",

        "sizeFilter",

        "priceFilter",

        "sortProducts"

    ];


    departmentFilterIds.forEach(
        function(id) {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.addEventListener(
                    "change",
                    function() {

                        refreshDepartmentProducts();

                    }
                );

            }

        }
    );

}



/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupFilterEvents();

        refreshAllProducts();

    }
);
