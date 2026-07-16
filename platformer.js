// Sandboxels Jump Powder
// W = jump

let jumpPressed = false;

document.addEventListener("keydown", function(e) {
    if (e.key.toLowerCase() === "w") {
        jumpPressed = true;
    }
});

document.addEventListener("keyup", function(e) {
    if (e.key.toLowerCase() === "w") {
        jumpPressed = false;
    }
});


elements.jump_powder = {
    color: "#ffffff",
    category: "special",
    state: "powder",
    behavior: behaviors.POWDER,
    density: 1000,

    tick: function(pixel) {

        // Check if something is below
        let canJump = false;

        if (pixel.y + 1 >= height) {
            // Bottom border counts as ground
            canJump = true;
        } 
        else {
            let below = pixelMap[pixel.x][pixel.y + 1];

            if (below) {
                // Anything below counts
                canJump = true;
            }
        }

        // Jump
        if (canJump && jumpPressed) {

            let jumpY = pixel.y - 10;

            if (jumpY >= 0 && isEmpty(pixel.x, jumpY)) {
                movePixel(pixel, pixel.x, jumpY);
            }
        }
    }
};
