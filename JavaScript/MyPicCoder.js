/* This part is just for visuals (adding line numbers, adjusting textarea height, ...) */
// add line numbers to our editor
document.addEventListener("DOMContentLoaded", function(){
    const mpc_editor = document.querySelector('.mpc-editor');
    const textarea = document.querySelector('.mpc-code');
    const lineNumbers = document.querySelector('.mpc-lineNumbers');

    textarea.addEventListener('keyup', event => {
        const numberOfLines = event.target.value.split('\n').length;
        lineNumbers.innerHTML = Array(numberOfLines).fill('<span></span>').join('');
        let newHeight = calcHeight(textarea.value) + "px";
        textarea.style.height = newHeight;
        mpc_editor.style.minHeight = newHeight;
    });
});

// Dealing with Textarea Height
function calcHeight(value) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // min-height + lines x line-height + padding + border
    let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    return newHeight;
}

/* This part deals with the main functions of the 'MyPicCoder' tool */
function savePicture() {
    console.log('ToDo')
}
   
function loadPicture() {
    console.log('ToDo')
}