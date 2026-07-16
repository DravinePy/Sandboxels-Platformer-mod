// Sandboxels Controllable Jump Powder
// A/D = move
// W = jump

let platformerKeys = {};

document.addEventListener("keydown", function(e) {
    platformerKeys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function(e) {
    platformerKeys[e.key.toLowerCase()] = false;
});


elements.jump_powder = {
    color: "#ffffff",
    category: "special",
    state: "powder",
    behavior: behaviors.POWDER,
    density: 1000,

    tick: function(pixel) {

        // Move left
        if (platformerKeys["a"]) {
            if (isEmpty(pixel.x - 1, pixel.y)) {
                movePixel(pixel, pixel.x - 1, pixel.y);
            }
        }

        // Move right
        if (platformerKeys["d"]) {
            if (isEmpty(pixel.x + 1, pixel.y)) {
                movePixel(pixel, pixel.x + 1, pixel.y);
            }
        }


        // Jump
        if (platformerKeys["w"]) {

            let canJump = false;

            // Bottom border counts as ground
            if (pixel.y + 1 >= height) {
                canJump = true;
            }
            else {
                let below = pixelMap[pixel.x][pixel.y + 1];

                // Anything below allows jumping
                if (below) {
                    canJump = true;
                }
            }


            if (canJump) {

                let jumpY = pixel.y - 10;

                // Space above must be empty
                if (jumpY >= 0 && isEmpty(pixel.x, jumpY)) {
                    movePixel(pixel, pixel.x, jumpY);
                }
            }
        }
    }
};
