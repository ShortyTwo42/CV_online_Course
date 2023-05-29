// resize iframes to fit tools
function initTools() {
    let iframes = document.querySelectorAll('.include-tool');
    iframes.forEach(resizeFrames);
}

function resizeFrames (iframe) {
    iframe.addEventListener('load', function () {
    
        let height = iframe.contentDocument.body.scrollHeight * 1.1;
        
        iframe.style.height = height + 'px';
    });
}