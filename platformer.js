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

        // Check if there is something below the pixel
        var below = pixel.y + 1;

        if (below < height) {
            var belowPixel = pixelMap[pixel.x][below];

            // Ground detected
            if (belowPixel && belowPixel.element !== "platform_player") {

                // Jump only with W
                if (platformerKeys["w"]) {
                    tryMove(pixel, pixel.x, pixel.y - 5);
                }
            }
        }
    }
};


// Spawner
elements.platform_spawner = {
    color: "#ffff00",
    category: "tools",

    onSelect: function() {
        createPixel("platform_player", mousePos.x, mousePos.y);
    }
};
