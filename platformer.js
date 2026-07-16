// Simple Sandboxels Jump Powder
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
    category: "powders",
    state: "powder",
    behavior: behaviors.POWDER,
    density: 1000,

    tick: function(pixel) {

        // Check if something solid is below
        let below = pixelMap[pixel.x][pixel.y + 1];

        if (below && elements[below.element].state === "solid") {

            // Jump when W is pressed
            if (jumpPressed) {

                let jumpY = pixel.y - 5;

                if (jumpY >= 0 && isEmpty(pixel.x, jumpY)) {
                    movePixel(pixel, pixel.x, jumpY);
                }
            }
        }
    }
};
