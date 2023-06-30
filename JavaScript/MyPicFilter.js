// used to store information
let currentPicture = null;
let filteredPicture = null;
let currentFilterType = 'none';

document.addEventListener('DOMContentLoaded', function(){
    // initialize filter previews
    setFilterPreview('median');
    setFilterPreview('mean');
    setFilterPreview('gaussian');
});

function uploadFile() {

    let file = document.getElementById('file-upload').files[0];
    
    if(file) {
        let reader = new FileReader();

        // define what should be done with the raw text once it is read
        reader.onload = function(e) {
            let content = e.target.result;

            let fileInfo = prepareFile(content);

            if (fileInfo.image == -1) {
                // wrong format or couldn't process data
                alert('Das Format wurde nicht erkannt oder es gab Probleme beim Auslesen der Daten, bitte versuchen Sie es mit einer anderen Datei vom Typen "pgm" oder "ppm"')
                return;
            }

            currentPicture = fileInfo;

            // set pixel values of canvas element
            let canvas = document.getElementById('original_img');
        
            if (currentPicture.type == 'pgm') {
                pgmToCanvas(canvas, currentPicture);
            }
            else if (currentPicture.type == 'ppm') {
                ppmToCanvas(canvas, currentPicture);
            }
        }
        reader.readAsText(file);
    }
}

function prepareFile(file) {
    let fileInfo = {};
    
    file = file.trim();

    let type = -1;

    if (file.startsWith('P2')) {
        type = 'pgm';
    } 
    else if (file.startsWith('P3')) {
        type = 'ppm';
    }

    fileInfo.type = type;

    let processedFile = [];

    switch (fileInfo.type) {
        case -1:
            processedFile = -1;
            break;
        case 'pgm':
            file = preprocessFile(file);

            var lines = file.split('\n');                       // split lines into array
            lines.shift();                                      // remove header (P2)
            var dimensions = lines.shift().split(' ');          // get the dimensions
            fileInfo.width = parseInt(dimensions[0]);           // get width from dimension
            fileInfo.height = parseInt(dimensions[1]);          // get height from dimension
            var maxValue = parseInt(lines.shift());             // get the brightness maxValue 
            var picInfo = lines.join(' ').trim().split(/\s+/);

            for (var y = 0; y < fileInfo.height; y++) {
                var newRow = [];
                for (var x = 0; x < fileInfo.width; x++) {
                    var currIndex = fileInfo.width * y + x;

                    // check if in range. If not, set default values
                    if(currIndex >= picInfo.length) {
                        var pixelVal = 255;
                    }
                    else {
                        var pixelVal = Math.round((parseInt(picInfo[currIndex]) / maxValue) * 255);
                    }
                    newRow.push(pixelVal);
                }
                processedFile.push(newRow);
            }
            break;
        case 'ppm':
            file = preprocessFile(file);

            var lines = file.split('\n');                       // split lines into array
            lines.shift();                                      // remove header (P2)
            var dimensions = lines.shift().split(' ');          // get the dimensions
            fileInfo.width = parseInt(dimensions[0]);           // get width from dimension
            fileInfo.height = parseInt(dimensions[1]);          // get height from dimension
            var maxValue = parseInt(lines.shift());             // get the brightness maxValue 
            var picInfo = lines.join(' ').trim().split(/\s+/);

            for (var y = 0; y < fileInfo.height; y++) {
                var newRow = [];
                for (var x = 0; x < fileInfo.width; x++) {
                    var currIndex = (fileInfo.width * y + x) * 3;

                    var rgb = [];

                    // check if in range. If not, set default values
                    if(currIndex >= picInfo.length) {
                        var pixelVal = 255;
                        rgb.push(pixelVal); //r
                        rgb.push(pixelVal); //g
                        rgb.push(pixelVal); //b
                    }
                    else {
                        rgb.push(Math.round((parseInt(picInfo[currIndex]) / maxValue) * 255));      //r
                        rgb.push(Math.round((parseInt(picInfo[currIndex + 1]) / maxValue) * 255));  //g
                        rgb.push(Math.round((parseInt(picInfo[currIndex + 2]) / maxValue) * 255));  //b
                    }
                    newRow.push(rgb);
                }
                processedFile.push(newRow);
            }
            break;
    }

    fileInfo.image = processedFile;

    return fileInfo;
}

function pgmToCanvas(canvas, picInfo) {
    canvas.width = picInfo.width;
    canvas.height = picInfo.height;
    let context = canvas.getContext('2d');

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            context.fillStyle = 'rgb(' + picInfo.image[y][x] + ', ' + picInfo.image[y][x] + ', ' + picInfo.image[y][x] + ')';
            context.fillRect(x, y, 1, 1);
        }
    }
}

function ppmToCanvas(canvas, picInfo) {
    canvas.width = picInfo.width;
    canvas.height = picInfo.height;
    let context = canvas.getContext('2d');

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            context.fillStyle = 'rgb(' + picInfo.image[y][x][0] + ', ' + picInfo.image[y][x][1] + ', ' + picInfo.image[y][x][2] + ')';
            context.fillRect(x, y, 1, 1);
        }
    } 
}

function preprocessFile(rawFile) {

    // this gets rid of comments after a '#'
    let processedFile = rawFile.replace(/#[^\n]*/g, '');
    
    // this removes all empty lines
    processedFile = processedFile.replace(/^\s*\n/gm, '');
    
    return processedFile;
}

function applyFilter() {
    if (currentPicture) {
        // set pixel values of canvas element
        let canvas = document.getElementById('filtered_img');
        
        switch(currentFilterType) {
            case 'none':
                applyNone(canvas);
                break;
            case 'median':
                applyMedian(canvas);
                break;
            case 'mean':
                applyMean(canvas);
                break;
            case 'gaussian':
                applyGaussian(canvas);
                break;
        }
    }
    else {
        // no pic uploaded yet
        alert('Es wurde noch kein Bild zum filtern hochgeladen');
    }
}

function applyNone(canvas) {
    if (currentPicture.type == 'pgm') {
        pgmToCanvas(canvas, currentPicture);
    }
    else if (currentPicture.type == 'ppm') {
        ppmToCanvas(canvas, currentPicture);
    }
}

function applyMedian(canvas) {
    filteredPicture = structuredClone(currentPicture);

    const radius = parseInt(document.getElementById('median_radius').value);
    const border_treatment = 'none'; //repeat, mirror

    for (let x = 0; x < currentPicture.width; x++) {
        for (let y = 0; y < currentPicture.height; y++) {

            let no_border_treatment = false;
            let median_array = [];
            if (currentPicture.type == 'ppm') {
                median_array = {};
                median_array.r = [];
                median_array.g = [];
                median_array.b = [];
            }

            for (let i = x - radius; i <= x + radius; i++) {
                for (let j = y - radius; j <= y + radius; j++) {
                    let x_index = get_x(i, border_treatment);
                    let y_index = get_y(j, border_treatment);

                    // early termination when no border treatment is applied
                    if (x_index == -1 || y_index == -1) {
                        i = x + radius
                        j = y + radius
                        no_border_treatment = true;
                    }
                    else {
                        switch (currentPicture.type) {
                            case 'pgm':
                                median_array.push(currentPicture.image[y_index][x_index]);
                                break;
                            case 'ppm':
                                median_array.r.push(currentPicture.image[y_index][x_index][0]);
                                median_array.g.push(currentPicture.image[y_index][x_index][1]);
                                median_array.b.push(currentPicture.image[y_index][x_index][2]);
                                break;
                        }
                    }
                }
            }

            if (no_border_treatment) {
                switch (currentPicture.type) {
                    case 'pgm':
                        filteredPicture.image[y][x] = 0;
                        break;
                    case 'ppm':
                        filteredPicture.image[y][x][0] = 0;
                        filteredPicture.image[y][x][1] = 0;
                        filteredPicture.image[y][x][2] = 0;
                        break;
                }
            } else {
                switch (currentPicture.type) {
                    case 'pgm':
                        // sort array
                        let col = quicksort(median_array);
                        col = col[(median_array.length - 1) / 2]
                        filteredPicture.image[y][x] = col;
                        break;
                    case 'ppm':
                        // sort arrays
                        let r = quicksort(median_array.r);
                        r = r[(median_array.r.length - 1) / 2]
                        let g = quicksort(median_array.g);
                        g = g[(median_array.g.length - 1) / 2]
                        let b = quicksort(median_array.b);
                        b = b[(median_array.b.length - 1) / 2]
                        filteredPicture.image[y][x][0] = r;
                        filteredPicture.image[y][x][1] = g;
                        filteredPicture.image[y][x][2] = b;
                        break;
                }
            }        
        }
    }
    
    if (currentPicture.type == 'pgm') {
        pgmToCanvas(canvas, filteredPicture);
    }
    else if (currentPicture.type == 'ppm') {
        ppmToCanvas(canvas, filteredPicture);
    }
}

function applyMean(canvas) {
    filteredPicture = structuredClone(currentPicture);
    alert('Not yet implemented');
}

function applyGaussian(canvas) {
    alert('Not yet implemented');
}

// get x index for current filter
function get_x(i, border_treatment) {
    let x;

    // border treatment for x
    if (i < 0) {
        switch (border_treatment) {
            case 'none':
                x = -1;
                break;
            case 'repeat':
                x = 0;
                break;
            case 'mirror':
                let tmp = i * -1;
                x = (i >= currentPicture.width) ? currentPicture.width - 1 : tmp;
                break;
        }
    }
    else if (i >= currentPicture.width) {
        switch (border_treatment) {
            case 'none':
                x = -1;
                break;
            case 'repeat':
                x = currentPicture.width - 1;
                break;
            case 'mirror':
                let tmp = currentPicture.width - (i - currentPicture.width);
                x = (i < 0) ? 0 : tmp;
                break;
        }
    }
    else {
        x = i;
    }

    return x;   
}

// get y index for current filter
function get_y(j, border_treatment) {
    let y;

    // border treatment for y
    if (j < 0) {
        switch (border_treatment) {
            case 'none':
                y = -1;
                break;
            case 'repeat':
                y = 0;
                break;
            case 'mirror':
                let tmp = j * -1;
                y = (j >= currentPicture.height) ? currentPicture.height - 1 : tmp;
                break;
        }
    }
    else if (j >= currentPicture.height) {
        switch (border_treatment) {
            case 'none':
                y = -1;
                break;
            case 'repeat':
                y = currentPicture.height - 1;
                break;
            case 'mirror':
                let tmp = currentPicture.height - (j - currentPicture.height);
                y = (j < 0) ? 0 : tmp;
                break;
        }
    }
    else {
        y = j;
    }

    return y;   
}

function toggleFilterMenu() {
    const filterMenu = document.querySelector('.filter_menu');
    const codingSpace = document.querySelector('.ict-codingSpace');
    const previewSpace = document.querySelector('.ict-previewSpace');
    const download_button = document.getElementById('download_button');

    const upload_button = document.getElementById('upload_button');
    const max_original_button = document.getElementById('max_original_button');
    const split_screen_button = document.getElementById('split_screen_button');
    const max_filtered_button = document.getElementById('max_filtered_button');
    const filter_button = document.getElementById('filter_button');
    const file_upload = document.getElementById('file-upload');
    
    let display = filterMenu.style.display;

    switch (display) {
        case 'none':
            codingSpace.style.display = display;
            previewSpace.style.display = display;
            filterMenu.style.display = '';
            download_button.disabled = true;
            upload_button.disabled = true;
            max_original_button.disabled = true;
            split_screen_button.disabled = true;
            max_filtered_button.disabled = true;
            filter_button.disabled = true;
            file_upload.disabled = true;
            break;
        case '':
            codingSpace.style.display = '';
            previewSpace.style.display = '';
            filterMenu.style.display = 'none';
            download_button.disabled = false;
            upload_button.disabled = false;
            max_original_button.disabled = false;
            split_screen_button.disabled = false;
            max_filtered_button.disabled = false;
            filter_button.disabled = false;
            file_upload.disabled = false;
            break;
    }
}

function selectNewFilter($this) {
    const none = document.getElementById('none_tab');
    const median = document.getElementById('median_tab');
    const mean = document.getElementById('mean_tab');
    const gaussian = document.getElementById('gaussian_tab');

    currentFilterType = $this.value;

    switch (currentFilterType) {
        case 'none':
            none.style.display = '';
            median.style.display = 'none';
            mean.style.display = 'none';
            gaussian.style.display = 'none';
            break;
        case 'median':
            none.style.display = 'none';
            median.style.display = '';
            mean.style.display = 'none';
            gaussian.style.display = 'none';
            break;
        case 'mean':
            none.style.display = 'none';
            median.style.display = 'none';
            mean.style.display = '';
            gaussian.style.display = 'none';
            break;
        case 'gaussian':
            none.style.display = 'none';
            median.style.display = 'none';
            mean.style.display = 'none';
            gaussian.style.display = '';
            break;
    }
}

function setFilterPreview(filter_type) {
    
    const middle_pixel = Number(document.getElementById(filter_type + '_radius').max);
    const max_filter_size = middle_pixel * 2 + 1;
    const current_radius = Number(document.getElementById(filter_type + '_radius').value);
    const display = document.getElementById(filter_type + '_filter_preview');
    const lower_limit = middle_pixel - current_radius;
    const upper_limit = middle_pixel + current_radius;

    let svg = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
    svg += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + max_filter_size + ' ' + max_filter_size + '" class="preview_svg">\n';

    for (let y = 0; y < max_filter_size; y++) { 
        for (let x = 0; x < max_filter_size; x++) {
            
            let pixelVal = 'white';
            if(x == middle_pixel && y == middle_pixel) {
                pixelVal = 'red';
            }
            else if (lower_limit <= x && x <= upper_limit && lower_limit <= y && y <= upper_limit ) {
                pixelVal = 'black';
            }

            let newRect = '<rect x="' + x +'" y="' + y + '" width="1" height="1" fill="'+ pixelVal +'" style="stroke-width: 0.05; stroke: var(--emperor)"/>\n'
            svg += newRect;
        }
    }

    svg += '</svg>';

    display.innerHTML = svg;
}

function handleDecrease(id) {
    let type = id.split('_')[0];
    setFilterPreview(type)
}

function handleIncrease(id) {
    let type = id.split('_')[0];
    setFilterPreview(type)
}

// recursive quicksort algorithm
function quicksort(array) {
    if (array.length <= 1) {
        return array;
    }
    
    let pivot = array[0];
    
    let left = []; 
    let right = [];
    
    for (let i = 1; i < array.length; i++) {
        array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }
    
    return quicksort(left).concat(pivot, quicksort(right));
};
