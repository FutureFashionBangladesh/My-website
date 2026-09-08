/* =====================================================
   FUTURE FASHION BANGLADESH
   FINAL 3D HERO
   TRIANGLES INSIDE THE 3D MODEL AREA
===================================================== */

const container = document.getElementById("canvas-container");

if (!container) {
    console.error("canvas-container not found");
} else {

    /* =================================================
       THREE.JS
    ================================================= */

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

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

    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);


    /* =================================================
       LIGHTS
    ================================================= */

    scene.add(
        new THREE.AmbientLight(
            0xffffff,
            1.5
        )
    );

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


    /* SECOND EDGE */

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
       RESPONSIVE MODEL POSITION
    ================================================= */

    function updateModelPosition() {

        if (window.innerWidth <= 800) {

            camera.position.z = 6.8;

            object.position.x = 0;
            object.position.y = 0;

            ring1.position.x = 0;
            ring1.position.y = 0;

            ring2.position.x = 0;
            ring2.position.y = 0;

        } else {

            camera.position.z = 6;

            object.position.x =
                2 + mouseX * 0.35;

            object.position.y =
                -mouseY * 0.35;

            ring1.position.x = 2;
            ring2.position.x = 2;

        }

    }


    /* =================================================
       CATEGORY TRIANGLES
    ================================================= */

    const categories = [
        "HOODIE",
        "SHIRT",
        "T-SHIRT",
        "PANJABI",
        "CAPS",
        "BAGS"
    ];


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
            72px,
            8vw,
            120px
        );

        height: clamp(
            63px,
            7vw,
            105px
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
            scale(1.13);

        filter:
            brightness(1.4);

    }


    /* NEON TRIANGLE */

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


    /* DARK INSIDE */

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
            rgba(5,5,5,0.94);

    }


    /* PRODUCT NAME INSIDE */

    .ffb-triangle-name {

        position: relative;

        z-index: 5;

        margin-top: 23px;

        color: #ffffff;

        font-size: clamp(
            6px,
            0.65vw,
            9px
        );

        font-weight: 800;

        letter-spacing: 1.5px;

        text-align: center;

        white-space: nowrap;

        text-shadow:
            0 0 5px #00ffff,
            0 0 10px #ff00ff;

    }


    /* =========================
       DESKTOP POSITIONS
    ========================= */

    .ffb-t1 {
        left: 52%;
        top: 30%;
    }

    .ffb-t2 {
        left: 64%;
        top: 39%;
    }

    .ffb-t3 {
        left: 64%;
        top: 61%;
    }

    .ffb-t4 {
        left: 52%;
        top: 70%;
    }

    .ffb-t5 {
        left: 40%;
        top: 61%;
    }

    .ffb-t6 {
        left: 40%;
        top: 39%;
    }


    /* =========================
       MOBILE
    ========================= */

    @media (max-width: 800px) {

        #triangle-category-container {

            transform:
                scale(0.72);

            transform-origin:
                center center;

        }


        .ffb-t1 {
            left: 50%;
            top: 27%;
        }

        .ffb-t2 {
            left: 67%;
            top: 39%;
        }

        .ffb-t3 {
            left: 64%;
            top: 64%;
        }

        .ffb-t4 {
            left: 50%;
            top: 74%;
        }

        .ffb-t5 {
            left: 36%;
            top: 64%;
        }

        .ffb-t6 {
            left: 33%;
            top: 39%;
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

                <div class="ffb-triangle-shape"></div>

                <div class="ffb-triangle-name">
                    ${category}
                </div>

            `;


            triangleContainer.appendChild(
                triangle
            );


            triangle.addEventListener(
                "click",
                function() {

                    if (
                        typeof openDepartment ===
                        "function"
                    ) {

                        openDepartment("men");

                    }

                }
            );

        }
    );


    /* =================================================
       MOUSE
    ================================================= */

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


    /* =================================================
       TOUCH
    ================================================= */

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


    /* =================================================
       ANIMATION
    ================================================= */

    function animate() {

        requestAnimationFrame(
            animate
        );


        /* ROTATION */

        object.rotation.x += 0.002;

        object.rotation.y += 0.004;


        edges.rotation.x -= 0.001;
        edges.rotation.y -= 0.002;


        edges2.rotation.x += 0.001;
        edges2.rotation.y += 0.0015;


        ring1.rotation.z += 0.003;

        ring2.rotation.x += 0.002;


        /* POSITION */

        if (window.innerWidth > 800) {

            object.position.x =
                2 + mouseX * 0.35;

            object.position.y =
                -mouseY * 0.35;

        } else {

            object.position.x =
                mouseX * 0.12;

            object.position.y =
                -mouseY * 0.12;

        }


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


    /* =================================================
       RESIZE
    ================================================= */

    function resize() {

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


        updateModelPosition();

    }


    window.addEventListener(
        "resize",
        resize
    );


    /* =================================================
       INITIAL
    ================================================= */

    updateModelPosition();

    resize();

    animate();


    /* =================================================
       CART
    ================================================= */

    let cartCount = 0;


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


    /* =================================================
       DEPARTMENT SYSTEM
    ================================================= */

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


    window.openDepartment =
        function(department) {

            const data =
                departmentData[department];

            if (!data) return;


            const all =
                document.getElementById(
                    "allProductsView"
                );

            const view =
                document.getElementById(
                    "departmentView"
                );


            if (all)
                all.style.display =
                    "none";


            if (view)
                view.style.display =
                    "block";


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
                            behavior: "smooth",
                            block: "start"
                        });

                    },
                    80
                );

            }

        };


    /* =================================================
       CATEGORY NAV
    ================================================= */

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


        const allButton =
            document.createElement("button");

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
                    document.createElement("button");

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


    /* =================================================
       PRODUCTS
    ================================================= */

    function getProducts() {

        return Array.from(
            document.querySelectorAll(
                "#productGrid .product-card"
            )
        );

    }


    function showDepartmentProducts(
        department
    ) {

        const target =
            document.getElementById(
                "departmentProducts"
            );

        if (!target) return;


        target.innerHTML = "";


        let found = 0;


        getProducts().forEach(
            function(product) {

                if (
                    product.dataset.department ===
                    department
                ) {

                    target.appendChild(
                        product.cloneNode(true)
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


        let found = 0;


        getProducts().forEach(
            function(product) {

                if (
                    product.dataset.department ===
                    department
                    &&
                    product.dataset.category ===
                    category.toLowerCase()
                ) {

                    target.appendChild(
                        product.cloneNode(true)
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


    function showComingSoon(
        target,
        name
    ) {

        target.innerHTML = `

            <div class="ffb-coming-soon">

                <span>COMING SOON</span>

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


    /* =================================================
       SHOW ALL
    ================================================= */

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


            if (view)
                view.style.display =
                    "none";


            if (all)
                all.style.display =
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

        };


    /* =================================================
       REMOVE POSSIBLE OLD PARTICLES / DOTS
    ================================================= */

    document.querySelectorAll(
        "#canvas-container canvas"
    ).forEach(
        function(canvas) {

            canvas.style.pointerEvents =
                "none";

        }
    );

}
