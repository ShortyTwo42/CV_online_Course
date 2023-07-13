// initialize everything
document.addEventListener('DOMContentLoaded', function() {
    initDrawingApp();
});


/////////////////////////////////////////////////////////////////// Drawing App ///////////////////////////////////////////////////////////////////
let heightmap = null;
let ctx = null;
let myTerrainMenu = null;
let heightmapContainer = null;

// Set up initial variables
let lastheightmapX = 0;
let lastheightmapY = 0;
let isDrawing = false;
let brushSize = 25;
let history = [];

// for zooming and panning
const minZoom = 0.1;
const maxZoom = 5;
let isPanning = false;
let currentZoom = 1;
let lastMouseX = 0;
let lastMouseY = 0;

// UI Elements
let menuButton = null;
let heightColorInput = null;
let heightColorPreview = null;
let opacityInput = null;
let brushSizeInput = null;
let falloffCheckbox = null;
let undoButton = null;
let redoButton = null;
let eraserButton = null;


function initDrawingApp() {
    // Set the heightmap and its context
    heightmap = document.getElementById('heightmap');
    ctx = heightmap.getContext('2d');

    // set width and height display
    document.getElementById('ict-fileWidth').value = heightmap.width;
    document.getElementById('ict-fileHeight').value = heightmap.height;
    
    // make the background black initially
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, heightmap.width, heightmap.height);

    // init brush parameters
    ctx.strokeStyle = '#ffffff'; // init as white
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // set some additional parameters
    ctx.imageSmoothingEnabled = true;

    // Get view elemets
    myTerrainMenu = document.querySelector('.my_terrain_menu');
    heightmapContainer = document.querySelector('.heightmap_container');

    // Set up event listeners
    heightmap.addEventListener('mousedown', startDrawing);
    heightmap.addEventListener('mousemove', draw);
    heightmap.addEventListener('mouseup', stopDrawing);
    heightmap.addEventListener('mouseout', stopDrawingOnLeave);
    heightmap.addEventListener('mouseover', startDrawingOnEnter);
    
    // Set up zooming and panning
    heightmapContainer.addEventListener('mousedown', startPanning);
    heightmapContainer.addEventListener('mousemove', handlePanning);
    heightmapContainer.addEventListener('mouseup', stopPanning);
    heightmapContainer.addEventListener('mouseleave', stopPanningOnLeave);
    heightmapContainer.addEventListener('wheel', handleZoom);
    
    // Get UI elements
    menuButton = document.getElementById('menuButton');
    heightColorInput = document.getElementById('height_color');
    heightColorPreview = document.getElementById('height_color_preview');
    opacityInput = document.getElementById('opacity');
    brushSizeInput = document.getElementById('brushSize');
    falloffCheckbox = document.getElementById('falloff');
    undoButton = document.getElementById('undoButton');
    redoButton = document.getElementById('redoButton');
    eraserButton = document.getElementById('eraserButton');

    // Set up event listeners for UI elements
    menuButton.addEventListener('click', toggleSidebar);
    heightColorInput.addEventListener('input', updateColor);
    opacityInput.addEventListener('input', updateOpacity);
    brushSizeInput.addEventListener('input', updateBrushSize);
    falloffCheckbox.addEventListener('change', updateFalloff);
    undoButton.addEventListener('click', undo);
    redoButton.addEventListener('click', redo);
    eraserButton.addEventListener('click', toggleEraser);
}

// drawing functions
function startDrawing(e) {
    // Left mouse button
    if (e.button === 0) {
        e.preventDefault();
        isDrawing = true;

        const mousePos = getMousePosition(e);

        lastheightmapX = mousePos.x;
        lastheightmapY = mousePos.y;

        ctx.beginPath();
        ctx.moveTo(lastheightmapX, lastheightmapY);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
    }
    
    // history.push(ctx.getImageData(0, 0, heightmap.width, heightmap.height));
}

function draw(e) {
    if (isDrawing) {
        e.preventDefault();

        const mousePos = getMousePosition(e);

        ctx.beginPath();
        ctx.moveTo(lastheightmapX, lastheightmapY);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();

        lastheightmapX = mousePos.x;
        lastheightmapY = mousePos.y;
    }
}

function stopDrawing(e) {
    // Left mouse button
    if (e.button === 0) {
        e.preventDefault();
        isDrawing = false;
    }
}

function stopDrawingOnLeave(e) {
    if (isDrawing) {
        e.preventDefault(); 
        isDrawing = false;
    }
}

function startDrawingOnEnter(e) {
    // Left mouse button
    if (e.buttons === 1) {
        e.preventDefault();
        isDrawing = true;

        const mousePos = getMousePosition(e);

        lastheightmapX = mousePos.x;
        lastheightmapY = mousePos.y;

        ctx.beginPath();
        ctx.moveTo(lastheightmapX, lastheightmapY);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
    }
}

function getMousePosition(e) {
    const rect = heightmap.getBoundingClientRect();
    const scaleX = heightmap.width / rect.width;
    const scaleY = heightmap.height / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

// functions to handle zooming and panning
function handleZoom(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.1 : -0.1;
    const oldZoom = currentZoom;
    // makes sure our zoom stays inside its bounds
    currentZoom = Math.min(Math.max(currentZoom + delta, minZoom), maxZoom); 
    const zoomFactor = currentZoom / oldZoom;
    const containerRect = heightmapContainer.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    const heightmapX = x + heightmapContainer.scrollLeft;
    const heightmapY = y + heightmapContainer.scrollTop;
    const offsetX = heightmapX * zoomFactor - heightmapX;
    const offsetY = heightmapY * zoomFactor - heightmapY;
    heightmapContainer.scrollLeft += offsetX;
    heightmapContainer.scrollTop += offsetY;
    heightmap.style.width = `${heightmap.width * currentZoom}px`;
    heightmap.style.height = `${heightmap.height * currentZoom}px`;
}

function startPanning(e) {
    // Right mouse button
    if (e.button === 2) {
        e.preventDefault();
        isPanning = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    }
}

function handlePanning(e) {
    if (isPanning) {
        e.preventDefault();
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        heightmapContainer.scrollLeft -= deltaX;
        heightmapContainer.scrollTop -= deltaY;
    }
}

function stopPanning(e) {
    // Right mouse button
    if (e.button === 2) {
        e.preventDefault();
        isPanning = false;
    }
}

function stopPanningOnLeave(e) {
    if (isPanning) {
        e.preventDefault();
        isPanning = false;
    }
}

/////////////////////////////////////////////////////////////////////// UI ////////////////////////////////////////////////////////////////////////
function toggleSidebar() {
    let display = myTerrainMenu.style.display;

    switch(display) {
        case 'none':
            myTerrainMenu.style.display = '';
            heightmapContainer.style.display = 'none';
            undoButton.disabled = true;
            redoButton.disabled = true;
            break;
        case '':
            myTerrainMenu.style.display = 'none';
            heightmapContainer.style.display = '';
            undoButton.disabled = false;
            redoButton.disabled = false;
            break;
    }
}

function updateColor() {
    const decVal = isNaN(parseInt(heightColorInput.value)) ? 0 : parseInt(heightColorInput.value);
    const hexVal = (decVal.toString(16).length == 1) ? '0' + decVal.toString(16) : decVal.toString(16);
    const col = '#' + hexVal + hexVal + hexVal;
    
    heightColorPreview.value = col;

    let active = eraserButton.classList.contains('eraser_active');
    if (!active) {
        ctx.strokeStyle = col;
        updateFalloff();
    }
}

function updateOpacity() {
    const x = isNaN(parseFloat(opacityInput.value)) ? 0 : parseFloat(opacityInput.value) / 100;
    const y = Math.exp(6 * x - 6);

    let active = eraserButton.classList.contains('eraser_active');
    if (!active) {
        ctx.globalAlpha = y;
    }
}

function updateBrushSize() {
    const brushSize = isNaN(parseFloat(brushSizeInput.value)) ? 0 : parseFloat(brushSizeInput.value);
    ctx.lineWidth = brushSize;
}

// Function to update the color falloff
function updateFalloff() {
    if (falloffCheckbox.checked) {
        let active = eraserButton.classList.contains('eraser_active');
        if (!active) {
            ctx.shadowColor = heightColorPreview.value;
            ctx.shadowBlur = brushSizeInput.value / 2;
            ctx.lineWidth = 0;
        }
    } else {
        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.shadowBlur = 0;
        updateBrushSize();
    }
}

// Function to undo
function undo() {
    if (history.length > 1) {
        history.pop();
        ctx.putImageData(history[history.length - 1], 0, 0);
    }
}

// Function to redo
function redo() {
    if (history.length < 2) return;
    ctx.putImageData(history.pop(), 0, 0);
}

function toggleEraser() {
    let active = eraserButton.classList.contains('eraser_active');

    if (active) {
        eraserButton.classList.remove('eraser_active');
        
        // set brush parameters to current values
        updateColor();
        updateOpacity();
        updateFalloff();
    }
    else {
        eraserButton.classList.add('eraser_active');

        // set brush parameters to current values
        ctx.strokeStyle = '#000000';
        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }
}

function handleDecrease(id) {  
    switch (id) {
        case 'opacity':
            updateOpacity();
            break;
        case 'brushSize':
            updateBrushSize();
            break;
        case 'height_color':
            updateColor();
            break;
    }
}

function handleIncrease(id) {
    switch (id) {
        case 'opacity':
            updateOpacity();
            break;
        case 'brushSize':
            updateBrushSize();
            break;
        case 'height_color':
            updateColor();
            break;
    }
}

function createNewHeightmap() {
    // get information
    const filename = document.getElementById('new_heightmap_name').value;
    const heightmap_width = document.getElementById('new_heightmap_width').value;
    const heightmap_height = document.getElementById('new_heightmap_height').value;

    let heightmap = document.getElementById('heightmap');
    heightmap.width = heightmap_width;
    heightmap.height = heightmap_height;

    // set width, height and filename display
    document.getElementById('ict-fileWidth').value = heightmap.width;
    document.getElementById('ict-fileHeight').value = heightmap.height;
    document.getElementById('ict-fileName').value = filename;

    // make the background black initially
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, heightmap.width, heightmap.height);   

    // set brush parameters to current values
    updateColor();
    updateOpacity();
    updateBrushSize();
    updateFalloff();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
}

