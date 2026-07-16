// Sandboxels Platformer Mod
// A/D = move
// W/Space = jump

var platformerKeys = {};

document.addEventListener("keydown", function(e) {
    platformerKeys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function(e) {
    platformerKeys[e.key.toLowerCase()] = false;
});

elements.platform_player = {
    color: "#00ffff",
    category: "other",
    state: "solid",
    behavior: behaviors.WALL,
    density: 500,

    tick: function(pixel) {

        // Create velocity values
        if (pixel.vx === undefined) pixel.vx = 0;
        if (pixel.vy === undefined) pixel.vy = 0;

        // Movement
        if (platformerKeys["a"]) {
            pixel.vx = -2;
        }
        else if (platformerKeys["d"]) {
            pixel.vx = 2;
        }
        else {
            pixel.vx *= 0.8;
        }

        // Gravity
        pixel.vy += 0.25;

        // Jump
        if ((platformerKeys["w"] || platformerKeys[" "]) && pixel.grounded) {
            pixel.vy = -5;
            pixel.grounded = false;
        }

        // Horizontal movement
        if (!tryMove(pixel, pixel.x + pixel.vx, pixel.y)) {
            pixel.vx = 0;
        }

        // Vertical movement
        if (!tryMove(pixel, pixel.x, pixel.y + pixel.vy)) {
            if (pixel.vy > 0) {
                pixel.grounded = true;
            }
            pixel.vy = 0;
        }
        else {
            pixel.grounded = false;
        }
    }
};


// Spawn helper
elements.platform_spawner = {
    color: "#ffff00",
    category: "tools",

    onSelect: function() {
        createPixel("platform_player", mousePos.x, mousePos.y);
    }
};