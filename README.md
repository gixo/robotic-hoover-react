# robotic-hoover-js
A robotic hoover navigation algorithm - JavaScript Implementation

## Introduction

You will write a program that navigates an imaginary robotic hoover (much like a [Roomba](https://en.wikipedia.org/wiki/Roomba)) through an equally imaginary room based on:

* room dimensions as [X and Y coordinates](https://en.wikipedia.org/wiki/Cartesian_coordinate_system), identifying the top right corner of the room rectangle. This room is divided up in a grid based on these dimensions; a room that has dimensions X: 5 and Y: 5 has 5 columns and 5 rows, so 25 possible hoover positions. The bottom left corner is the point of origin for our coordinate system, so as the room contains all coordinates its bottom left corner is defined by X: 0 and Y: 0.
* locations of patches of dirt, also defined by X and Y coordinates identifying the bottom left corner of those grid positions.
* an initial hoover position (X and Y coordinates like patches of dirt)
* driving instructions (as [cardinal directions](https://en.wikipedia.org/wiki/Cardinal_direction) where e.g. N and E mean "go north" and "go east" respectively) 

The room will be rectangular, has no obstacles (except the room walls), no doors and all locations in the room will be clean (hoovering has no effect) except for the locations of the patches of dirt presented in the program input.

Placing the hoover on a patch of dirt ("hoovering") removes the patch of dirt so that patch is then clean for the remainder of the program run. The hoover is always on - there is no need to enable it.

Driving into a wall has no effect (the robot skids in place).

## Goal

The goal of the program is to take the room dimensions, the locations of the dirt patches, the hoover location and the driving instructions as input and to then output the following:

* The final hoover position (X, Y)
* The number of patches of dirt the robot cleaned up

## Input

Program input will be received in a file with the format described here. You can process it however you like.

The file will be named `input.txt` and reside in the same directory as your executable program / web page.

Example:

```
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```

* the first line holds the room dimensions (X Y), separated by a single space (all coordinates will be presented in this format)
* the second line holds the hoover position
* subsequent lines contain the zero or more positions of patches of dirt (one per line)
* the next line then always contains the driving instructions (at least one)

## Output

Program output should be printed to the standard output (STDOUT) of the terminal (or equivalent in the browser, console.log())

* The first line of your program output should display the X and Y coordinates marking the position of the hoover after processing all commands.
* The second line of the program output should display the number of patches of dirt the robot cleaned up

Example (matching the input above):

```
1 3
1
```

## Deliverable

The program:

* is either a command-line / terminal application or web page
* must run on Mac OS X, Linux (x86-64) or in a modern browser
* must be written in javascript
* can make use of any existing open source libraries that don't directly address the problem statement (use your best judgement).

Send us:

* The full source code, including any code written which is not part of the normal program run (scripts, tests)
* Clear instructions on how to obtain and run the program
* Please provide any deliverables and instructions using a public Github (or similar) Repository as several people will need to inspect the solution

## Evaluation

The point of the exercise is for us to see some of the code you wrote (and should be proud of). We believe we can learn a lot from how you approach a small challenge like this and think it can be fun to write as well!

We will especially consider:

* Code organisation
* Quality
* Readability
* Actually solving the problem
