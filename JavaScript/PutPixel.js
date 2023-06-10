let width;
let height;

document.addEventListener('DOMContentLoaded', function() {
    resetToDefault();
}, false);

function resetToDefault() {
    
    width = 100;
    height = 100;

    document.getElementById('ict-fileWidth').value = width;
    document.getElementById('ict-fileHeight').value = height;

    let defaultCode = ''
    defaultCode += 'for (let y = 0; y < height; y++) {\n'
    defaultCode += '\tfor (let x = 0; x < width; x++) {\n'
    defaultCode += '\t\tconsole.log("hello World");\n'
    defaultCode += '\t}\n'
    defaultCode += '}'

    let textarea = document.querySelector('.ict-code');

    textarea.innerHTML = defaultCode;

    // trigger 'keyup' event to have code enumeration
    const event = new KeyboardEvent('keyup', {});
    textarea.dispatchEvent(event);
}

function execudeCode() {
    console.log('do something');
}

function updateOutput() {
    width = document.getElementById('ict-fileWidth').value;
    height = document.getElementById('ict-fileHeight').value;
    execudeCode();
}