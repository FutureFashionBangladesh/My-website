const container = document.getElementById("canvas-container");

if (!container) {
    console.error("canvas-container not found");
} else {

    // ==============================
    // SCENE
    // ==============================

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.z = 6;


    // ==============================
    // RENDERER
    // ==============================

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


    // ==============================
    // LIGHTS
    // ==============================

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            1.4
        );

    scene.add(ambientLight);


    const pinkLight =
        new THREE.PointLight(
            0xff00ff,
            7,
            20
        );

    pinkLight.position.set(
        4,
        3,
        5
    );

    scene.add(pinkLight);


    const cyanLight =
        new THREE.PointLight(
            0x00ffff,
            7,
            20
        );

    cyanLight.position.set(
        -4,
        -2,
        5
    );

    scene.add(cyanLight);


    const orangeLight =
        new THREE.PointLight(
            0xff6600,
            5,
            20
        );

    orangeLight.position.set(
        0,
        4,
        3
    );

    scene.add(orangeLight);


    // ==============================
    // MAIN 3D OBJECT
    // ==============================

    const object =
        new THREE.Group();

    object.position.set(
        2,
        0,
        0
    );

    scene.add(object);


    // ==============================
    // DARK FACETED CORE
    // ==============================

    const geometry =
        new THREE.IcosahedronGeometry(
            1.7,
            2
        );

    const material =
        new THREE.MeshPhysicalMaterial({
            color: 0x090909,
            metalness: 0.85,
            roughness: 0.22,
            transparent: true,
            opacity: 0.96,
            flatShading: true
        });

    const core =
        new THREE.Mesh(
            geometry,
            material
        );

    object.add(core);


    // ==============================
    // COLORFUL TRIANGLE EDGES
    // ==============================

    const edges =
        new THREE.EdgesGeometry(
            geometry
        );

    const neonMaterial =
        new THREE.LineBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.9
        });

    const neonWire =
        new THREE.LineSegments(
            edges,
            neonMaterial
        );

    object.add(neonWire);


    // ==============================
    // CATEGORY LABELS
    // ==============================

    const categoryData = [
        {
            name: "HOODIE",
            color: "#ff00ff",
            position: [0.0, 1.05, 1.35]
        },
        {
            name: "SHIRT",
            color: "#00ffff",
            position: [1.15, 0.45, 1.15]
        },
        {
            name: "T-SHIRT",
            color: "#ff6600",
            position: [-1.15, 0.45, 1.15]
        },
        {
            name: "PANJABI",
            color: "#66ff00",
            position: [0, -0.75, 1.45]
        },
        {
            name: "CAPS",
            color: "#ffff00",
            position: [-1.05, -0.85, 1.05]
        },
        {
            name: "BAGS",
            color: "#0099ff",
            position: [1.05, -0.85, 1.05]
        }
    ];


    const labels = [];


    categoryData.forEach((item) => {

        // --------------------------
        // Triangle background
        // --------------------------

        const triangleGeometry =
            new THREE.CircleGeometry(
                0.43,
                3
            );

        const triangleMaterial =
            new THREE.MeshBasicMaterial({
                color: item.color,
                transparent: true,
                opacity: 0.20,
                side: THREE.DoubleSide
            });

        const triangle =
            new THREE.Mesh(
                triangleGeometry,
                triangleMaterial
            );

        triangle.position.set(
            item.position[0],
            item.position[1],
            item.position[2]
        );

        triangle.rotation.z =
            Math.PI / 2;

        object.add(triangle);


        // --------------------------
        // Triangle neon border
        // --------------------------

        const triangleEdges =
            new THREE.EdgesGeometry(
                triangleGeometry
            );

        const triangleLine =
            new THREE.LineSegments(
                triangleEdges,
                new THREE.LineBasicMaterial({
                    color: item.color,
                    transparent: true,
                    opacity: 1
                })
            );

        triangle.add(triangleLine);


        // --------------------------
        // Text canvas
        // --------------------------

        const canvas =
            document.createElement("canvas");

        canvas.width = 512;
        canvas.height = 256;

        const ctx =
            canvas.getContext("2d");

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // glow
        ctx.shadowColor =
            item.color;

        ctx.shadowBlur = 25;


        ctx.font =
            "bold 46px Arial";

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";

        ctx.fillStyle =
            item.color;

        ctx.fillText(
            item.name,
            256,
            128
        );


        const texture =
            new THREE.CanvasTexture(
                canvas
            );


        const textMaterial =
            new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                depthTest: false
            });


        const text =
            new THREE.Sprite(
                textMaterial
            );


        text.scale.set(
            0.95,
            0.48,
            1
        );


        text.position.set(
            0,
            0,
            0.08
        );


        triangle.add(text);

        labels.push(text);

    });


    // ==============================
    // OUTER NEON RINGS
    // ==============================

    const ringGeometry =
        new THREE.TorusGeometry(
            2.3,
            0.018,
            16,
            100
        );


    const ring1 =
        new THREE.Mesh(
            ringGeometry,
            new THREE.MeshBasicMaterial({
                color: 0xff00ff,
                transparent: true,
                opacity: 0.55
            })
        );

    ring1.rotation.x =
        Math.PI / 2;

    ring1.position.x =
        2;

    scene.add(ring1);


    const ring2 =
        new THREE.Mesh(
            ringGeometry,
            new THREE.MeshBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.55
            })
        );

    ring2.rotation.y =
        Math.PI / 2;

    ring2.position.x =
        2;

    scene.add(ring2);


    // ==============================
    // MOUSE
    // ==============================

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


    // ==============================
    // TOUCH
    // ==============================

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


    // ==============================
    // ANIMATION
    // ==============================

    function animate() {

        requestAnimationFrame(
            animate
        );


        // Main model rotation
        object.rotation.y += 0.0035;

        object.rotation.x += 0.001;


        // Mouse movement
        object.position.x =
            2 + mouseX * 0.25;

        object.position.y =
            -mouseY * 0.25;


        // Rings
        ring1.rotation.z += 0.003;

        ring2.rotation.x += 0.002;


        // Neon color cycle
        const time =
            Date.now() * 0.001;


        neonMaterial.color.setHSL(
            (time * 0.08) % 1,
            1,
            0.55
        );


        // Small floating animation
        labels.forEach(
            function(label, index) {

                label.position.z =
                    0.08 +
                    Math.sin(
                        time * 2 + index
                    ) * 0.025;

            }
        );


        renderer.render(
            scene,
            camera
        );

    }

    animate();


    // ==============================
    // RESPONSIVE
    // ==============================

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

}


// ==============================
// CART
// ==============================

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
