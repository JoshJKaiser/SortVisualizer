# Algorithm Visualizer by Joshua Kaiser
## Introduction
I want create a website to visualize different algorithms
I will begin with list algorithms

## What I want to learn
How to organize Vanilla JS code
I will ask Pegor to look it over when it's done

## Project steps
1. Visualize one algorithm
2. Refactor
3. Add more algorithms


## Canvas
### \<canvas\>
Creates a [2](#2)
### Canvas context


# NEXT STEPS
- Make sort button change to pause button while animation is running
- Seperate sorts and other things
- Organize code better
- Show a label with the speed and array sizes
- make the array push new values and pop new values instead of randomizing a whole new array.
- Make a shuffle button
- Make the bars currently being worked on a different color
  - Change colors of the bars when redrawing the bars

## Notes
- I made the slide bar resize the array by pushing new random sizes on the end of the array
- I want to make the sort button stop the sorting
- Maybe I should make the insertionSort into insertionSortAnimation and each loop check if cancel has been clicked. If it has get out of there.
-
- I'm not sure how to abstract sorts into their own class/ object because I think every sort will treat animation differently. I'll refactor as I go.
-
- I want to make the speed slider the other way (further right is faster)
- I want to have the size slider change when the size changes with the randomize size button
-
- I want to add a shuffle button that wont change the array's size or values, but just shuffles them up randomly
- 
- I'm going to make a stop signal to stop the sort animation if a button is pressed midsort


## Bibliography
- <a name="1">[Organizing Vanilla JS (1)](https://read.humanjavascript.com/ch04-organizing-your-code.html)</a>
  - I will use this link to organize my code.
- <a name="2">[Canvas Tutorial MDN (2)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)</a>
  - For the animation
- <a name="3">[Insertion sort wikipedia](https://en.wikipedia.org/wiki/Insertion_sort)</a>
  - For my implementation of insertion sort