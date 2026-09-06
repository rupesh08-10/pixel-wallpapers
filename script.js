let allLoadedImages = [];


// =====================================
// LOAD IMAGES
// =====================================

function loadImages(folder, name) {

    const gallery = document.getElementById("gallery");

    let i = 1;

    return new Promise(function (resolve) {

        function loadNextImage() {

            const img = document.createElement("img");

            img.src = `image/${folder}/${name} (${i}).jpg`;

            img.alt = `${name} Wallpaper ${i}`;


            // Image loaded successfully
            img.onload = function () {

                gallery.appendChild(img);

                // Save image for Featured section
                allLoadedImages.push(img.src);


                // Full-screen viewer
                img.addEventListener("click", function () {

                    openViewer(img.src, img.alt);

                });


                i++;

                loadNextImage();
            };


            // No more images in this folder
            img.onerror = function () {

                console.log(`${name} wallpapers finished.`);

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


    // Click outside image to close
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

        console.log("ERROR: featured-gallery not found.");

        return;

    }


    console.log("Total loaded images:", allLoadedImages.length);


    // Make a copy of all loaded images
    let availableImages = [...allLoadedImages];


    // We want 6 Featured images
    for (let i = 0; i < 6; i++) {

        if (availableImages.length === 0) {
            break;
        }


        // Pick random image
        const randomIndex =
            Math.floor(Math.random() * availableImages.length);


        const imageSrc = availableImages[randomIndex];


        // Remove it so there are no duplicates
        availableImages.splice(randomIndex, 1);


        // Create image
        const img = document.createElement("img");

        img.src = imageSrc;

        img.alt = "Featured Wallpaper";


        // Add to Featured gallery
        gallery.appendChild(img);


        // Full-screen viewer
        img.addEventListener("click", function () {

            openViewer(img.src, img.alt);

        });

    }


    console.log("Featured wallpapers loaded.");

}