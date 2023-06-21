let picture_width = 5;
let picture_height = 10;


for (let x = 0; x < picture_width; x++) {
    putPixel(x, 0);
}



for (let y = 0; y < picture_height; y++) {
    for (let x = 0; x < picture_width; x++) {
        putPixel(x, y);
    }
}


for (let y = 0; y < picture_height; y++) {
    for (let x = 0; x < picture_width; x++) {
        if (x == y) {
            putPixel(x, y);
        }
    }
}


function putPixel(x, y, rgb = null) {
    console.log('do something');
}