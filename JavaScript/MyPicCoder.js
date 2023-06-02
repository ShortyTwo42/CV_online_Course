function uploadFile() {
    console.log('ToDo');
}
   
function downloadFile() {

    // get the input of our editor
    let rawFile = document.querySelector('.ict-code').value.trim();

    let fileInfo = getFileInfo(rawFile);

    if(fileInfo == -1) {
        console.log('wrong format');
        return;
    }

    let fileType = fileInfo.type;
    let fileExtension = fileInfo.extension;

    // add necessary tags to make it a valid SVG file
    if(fileType == 'image/svg+xml') {
        if (!rawFile.includes('xmlns')) {
            rawFile = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg xmlns="http://www.w3.org/2000/svg">\n${rawFile}\n</svg>`
        }
        else {
            rawFile = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n${rawFile}`
        }
    }

    let blob = new Blob([rawFile], {type: fileType});

    let url = window.URL.createObjectURL(blob);

    let link = document.createElement('a');
    link.href = url;
    link.download = 'file.' + fileExtension;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

}

function getFileInfo(rawFile) {
    
    let fileInfo = {}

    if(rawFile.startsWith('P1')) {
        fileInfo.type = 'image/x-portable-bitmap';
        fileInfo.extension = 'pbm';
    }
    else if(rawFile.startsWith('P2')) {
        fileInfo.type = 'image/x-portable-graymap';
        fileInfo.extension = 'pgm';
    }  
    else if(rawFile.startsWith('P3')) {
        fileInfo.type = 'image/x-portable-pixmap';
        fileInfo.extension = 'ppm';
    }  
    else if(rawFile.startsWith('<svg')) {
        fileInfo.type = 'image/svg+xml';
        fileInfo.extension = 'svg';
    }
    else {
        fileInfo = -1;
    }  

    return fileInfo;
    
}