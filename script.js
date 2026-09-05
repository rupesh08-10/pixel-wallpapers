function loadImages(folder, name, count) {

    const gallery = document.getElementById("gallery");

    for (let i = 1; i <= count; i++) {

        const img = document.createElement("img");

        img.src = `image/${folder}/${name} (${i}).jpg`;

        img.alt = `${name} Wallpaper ${i}`;

        gallery.appendChild(img);
    }
}