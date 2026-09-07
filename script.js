let allLoadedImages = [];


// =====================================
// LOAD IMAGES
// =====================================

function loadImages(folder, name) {

    const gallery = document.getElementById("gallery");

    let i = 1;
    const maxImages = 200;

    return new Promise(function (resolve) {

        function loadNextImage() {

            // Stop after maximum number
            if (i > maxImages) {
                resolve();
                return;
            }

            const img = document.createElement("img");

            img.src = `image/${folder}/${name} (${i}).jpg`;
            img.alt = `${name} Wallpaper ${i}`;


            // Image loaded successfully
            img.onload = function () {

                console.log("Loaded:", img.src);

                if (gallery) {

                    gallery.appendChild(img);

                    img.addEventListener("click", function () {

                        openViewer(img.src, img.alt);

                    });

                }

                // Save image for Featured Wallpapers
                allLoadedImages.push(img.src);

                i++;

                loadNextImage();

            };


            // Image not found
            img.onerror = function () {

                console.log("Finished loading:", folder);

                // Stop searching this folder
                resolve();

            };

        }

        loadNextImage();

    });

}


// =====================================
// FULL-SCREEN VIEWER
// =====================================

function openViewer(imageSrc, imageAlt) {

    const viewer = document.createElement("div");

    viewer.className = "image-viewer";


    viewer.innerHTML = `
        <span class="close-viewer">&times;</span>

        <img src="${imageSrc}" alt="${imageAlt}">

        <a href="${imageSrc}" download class="download-btn">
            ⬇ Download
        </a>
    `;


    document.body.appendChild(viewer);


    // Close button
    viewer.querySelector(".close-viewer")
        .addEventListener("click", function () {

            viewer.remove();

        });


    // Click outside image
    viewer.addEventListener("click", function (event) {

        if (event.target === viewer) {

            viewer.remove();

        }

    });

}


// =====================================
// FEATURED WALLPAPERS
// =====================================

function loadFeaturedImages() {

    const gallery = document.getElementById("featured-gallery");


    if (!gallery) {

        console.log("Featured gallery not found.");

        return;

    }


    console.log("Total loaded images:", allLoadedImages.length);


    let availableImages = [...allLoadedImages];


    // Show 30 random images
    for (let i = 0; i < 30; i++) {

        if (availableImages.length === 0) {

            break;

        }


        // Random image
        const randomIndex =
            Math.floor(Math.random() * availableImages.length);


        const imageSrc = availableImages[randomIndex];


        // Remove it to prevent duplicates
        availableImages.splice(randomIndex, 1);


        // Create image
        const img = document.createElement("img");

        img.src = imageSrc;

        img.alt = "Featured Wallpaper";


        // Add to Featured section
        gallery.appendChild(img);


        // Full-screen viewer
        img.addEventListener("click", function () {

            openViewer(img.src, img.alt);

        });

    }


    console.log("Featured wallpapers loaded.");

}