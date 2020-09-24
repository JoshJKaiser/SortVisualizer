const canvas = document.getElementById("canvas");

const defaultArraySize = 10;
const minArraySize = 10;
const maxArraySize = 200;
const defaultSortSpeed = 100;
const minSortSpeed = 2000;
const maxSortSpeed = 50;

let sortSpeed = defaultSortSpeed;

let stopSignal = false;

let array = [];
randomizeValues(defaultArraySize);


function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

//
// Alter array
//

function getRandomIntInRange(low=5, high=100){
    let result = Math.floor(Math.random() * (high - low));
    return result + 5;
}

function shuffle(){
    let indexSeen = new Set();
    let result = [...array];
    for (let i = 0; i < array.length; i++){
        let index = Math.floor(Math.random() * array.length);
        while (indexSeen.has(index)){
            index = Math.floor(Math.random() * array.length);
        }
        console.log(index);
        result[i] = array[index];
        indexSeen.add(index);
    }
    array = result;
}

function randomizeSize(){
    let size = getRandomIntInRange(minArraySize, maxArraySize);
    resizeArray(size);
}

function randomizeValues(size=array.length){
    array = [];
    for (i = 0; i < size; i++){
        array.push(getRandomIntInRange());
    }
}

function resizeArray(newSize){
    if (array.length < newSize){
        while (array.length < newSize){
            array.push(getRandomIntInRange());
        }
    } else {
        while (array.length > newSize){
            array.pop();
        }
    }
}

//
// Canvas Methods
//

function solidifyCanvasSize(){
    if (canvas.clientWidth != canvas.width && canvas.clientHeight != canvas.height){
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
}

function clearCanvas(){
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawLine(index, length, height){
    // split up canvas into length segments

    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let lineWidth = canvasWidth / length;
    let lineHeight = canvasHeight / 100 * height;
    let x = lineWidth * index;
    let y = 0
    
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = 'black'
    ctx.fillRect(x,canvasHeight-lineHeight,lineWidth/2, lineHeight)
}

function drawArray(){
    solidifyCanvasSize();
    clearCanvas();
    for (i = 0; i < array.length; i++){
        drawLine(i, array.length, array[i]);
    }
}

//
// Usability
//

function unsupportedBrowser(){
    // canvas-unsupported code here
    console.log("unsupported browser");
    const dashboard = document.getElementById("dashboard");
    const warning = document.createElement("h2");
    warning.innerText = "Your browser in not supported. Try using Chrome.";
    dashboard.appendChild(warning);
}

//
// Dashboard Inputs
//

function arraySizeInput(){
    let size = document.createElement("input");
    size.type = "range";
    size.min = minArraySize;
    size.max = maxArraySize;
    size.step = 1;
    size.id = "arraySizeSlider";
    size.value = array.length;
    size.addEventListener("input", (event)=>{
        resizeArray(size.value);
        drawArray();
    })
    let sizeLabel = document.createElement("label");
    sizeLabel.innerText = "Size:";
    document.getElementById("dashboard").append(sizeLabel);
    document.getElementById("dashboard").appendChild(size);
}

function randomSizeButton(){
    let randomSizeButton = document.createElement("button");
    randomSizeButton.innerText = "Random Size"
    randomSizeButton.addEventListener("click", ()=>{
        randomizeSize();
        // Have the slider reflect the change
        let slider = document.getElementById("arraySizeSlider");
        slider.value = array.length;
        drawArray();
    });
    document.getElementById("dashboard").appendChild(randomSizeButton);
}

function makeShuffleButton(){
    let shuffleButton = document.createElement("button");
    shuffleButton.innerText = "Shuffle";
    shuffleButton.addEventListener("click", ()=>{
        shuffle();
        drawArray();
    });
    document.getElementById("dashboard").appendChild(shuffleButton);
}

function sortChoice(){
    let sortDropDown = document.createElement("select");
    let sortChoice = document.createElement("option");
    sortChoice.value = "Insertion Sort";
    sortChoice.innerText = "Insertion Sort"
    sortDropDown.appendChild(sortChoice);
    document.getElementById("dashboard").appendChild(sortDropDown);
}

function randomValueButton(){
    let randomValue = document.createElement("button");
    randomValue.innerText = "Random Values";
    randomValue.addEventListener("click", ()=>{
        randomizeValues();
        drawArray();
    });
    document.getElementById("dashboard").appendChild(randomValue);
}

function sortSpeedSlider(){
    let speedSlider = document.createElement("input");
    speedSlider.type = "range";
    speedSlider.max = 2050 - maxSortSpeed;
    speedSlider.min = 2050 - minSortSpeed;
    speedSlider.value = defaultSortSpeed;
    speedSlider.addEventListener("input", ()=> {
        sortSpeed = speedSlider.value;
    });
    let sortSpeedLabel = document.createElement("label");
    sortSpeedLabel.innerText = "Speed";
    document.getElementById("dashboard").appendChild(sortSpeedLabel);
    document.getElementById("dashboard").appendChild(speedSlider);
}

function createStopButton(){
    let stopButton = document.createElement("button");
    stopButton.innerText = "Stop";
    stopButton.addEventListener("click", ()=>{
        stopSignal = true;
    });
    document.getElementById("dashboard").appendChild(stopButton);
}

function createAnimateButton(){
    let animateButton = document.createElement("button");
    animateButton.innerText = "Sort";
    animateButton.addEventListener("click", ()=>{
        animate();
        // Replace sort button with pause button
    });
    document.getElementById("dashboard").appendChild(animateButton);
}

function createDashboard(){
    // Slider for array size
    console.log("creating dashboard");
    // Size of array

    // Choice of sort
    sortChoice();
    // Speed of sort
    sortSpeedSlider();
    // Sort button
    arraySizeInput();
    makeShuffleButton();
    randomSizeButton();
    randomValueButton();
    createAnimateButton();
    createStopButton();
}

function createCanvas(){
    drawArray();
}

function animate(){
    insertionSort(array);
}
//
// SORTS
//

async function insertionSort(arr){
    for(let i = 0; i < arr.length; i++){
        let curIndex = i;
        while (arr[curIndex-1] > arr[curIndex] && curIndex-1 >= 0){
            
            // swap
            let tmp = arr[curIndex];
            arr[curIndex] = arr[curIndex-1];
            arr[curIndex-1] = tmp;
            //
            curIndex -= 1;
            if (stopSignal){
                stopSignal = false;
                return arr;
            }
            await sleep(sortSpeed);
            drawArray();
        }
    }
    return arr;
}

// Check for browser compatibility
// Run the main program
if (canvas){
    // Drawing code
    createDashboard();
    createCanvas();
} else {
    unsupportedBrowser();
}
