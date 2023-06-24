let currentPicture = null;

function uploadFile() {

    let file = document.getElementById('file-upload').files[0];
    
    if(file) {
        let reader = new FileReader();

        // define what should be done with the raw text once it is read
        reader.onload = function(e) {
            let content = e.target.result;

            let fileInfo = prepareFile(content);

            if (fileInfo.image == -1) {
                console.log('Format wurde nicht erkannt');
                return;
            }

            currentPicture = fileInfo;

            // set pixel values of canvas element
            let canvas = document.getElementById('original_img');
        
            if (fileInfo.type == 'pgm') {
                pgmToCanvas(canvas, currentPicture);
            }
            else if (fileInfo.type == 'ppm') {
                ppmToCanvas(canvas, currentPicture);
            }
        }
        reader.readAsText(file);
    }
}

function prepareFile(file) {
    fileInfo = {};
    
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
                
        if (fileInfo.type == 'pgm') {
            pgmToCanvas(canvas, currentPicture);
        }
        else if (fileInfo.type == 'ppm') {
            ppmToCanvas(canvas, currentPicture);
        }
    }
    else {
        console.log('no pic uploaded yet');
    }
}