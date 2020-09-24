
// Insertion Sort is O(N^2)
function insertionSort(arr){
    for(let i = 0; i < arr.length; i++){
        let curIndex = i;
        while (arr[curIndex-1] > arr[curIndex] && curIndex-1 >= 0){
            // swap with number before it
            let tmp = arr[curIndex];
            arr[curIndex] = arr[curIndex-1];
            arr[curIndex-1] = tmp;
            // Move back in the array
            curIndex -= 1;
        }
    }
    return arr;
}

function bubbleSort(arr){
    sorted = false;
    while (sorted === false){
        sorted = true;
        for (let i = 0; i < arr.length-1; i++){
            if (arr[i] > arr[i+1]){
                //swap
                temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                sorted = false;
            }
        }
    }
    return arr;
}

console.log(bubbleSort([6,5,4,3,2,1]))


function mergeSort(arr){
    return
}



function heapSort(arr){
    return
}

function quickSort(arr){
    return
}

function selectionSort(arr){
    return
}