// Sandboxels Controllable Powder
// A/D = move
// W = jump

let keys = {};

document.addEventListener("keydown", function(e) {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function(e) {
    keys[e.key.toLowerCase()] = false;
});


elements.controllable_powder = {
    color: "#ffffff",
    category: "powders",
    state: "powder",
    behavior: behaviors.POWDER,
    density: 1000,

    tick: function(pixel) {

        // Move left
        if (keys["a"]) {
            if (isEmpty(pixel.x - 1, pixel.y)) {
                movePixel(pixel, pixel.x - 1, pixel.y);
            }
        }

        // Move right
        if (keys["d"]) {
            if (isEmpty(pixel.x + 1, pixel.y)) {
                movePixel(pixel, pixel.x + 1, pixel.y);
            }
        }

        // Jump
        if (keys["w"]) {

            let below = pixelMap[pixel.x][pixel.y + 1];

            // Check if standing on a solid pixel
            if (below && elements[below.element].state === "solid") {

                let jumpTo = pixel.y - 4;

                // Check the destination is empty
                if (jumpTo >= 0 && isEmpty(pixel.x, jumpTo)) {
                    movePixel(pixel, pixel.x, jumpTo);
                }
            }
        }
    }
};
