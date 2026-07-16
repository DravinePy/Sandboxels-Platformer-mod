// Sandboxels Platformer Mod
// W = jump

var platformerKeys = {};

document.addEventListener("keydown", function(e) {
    platformerKeys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function(e) {
    platformerKeys[e.key.toLowerCase()] = false;
});


elements.platform_player = {
    color: "#00ffff",
    category: "powders",
    state: "powder",
    behavior: behaviors.POWDER,
    density: 500,

    tick: function(pixel) {

        // Check block below
        if (pixel.y + 1 < height) {

            var below = pixelMap[pixel.x][pixel.y + 1];

            // Something solid is below = can jump
            if (below && elements[below.element].state === "solid") {

                if (platformerKeys["w"]) {

                    // Move upward like a jump
                    if (pixel.y - 3 >= 0) {
                        tryMove(
                            pixel,
                            pixel.x,
                            pixel.y - 3
                        );
                    }
                }
            }
        }
    }
};
