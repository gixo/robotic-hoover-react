# robotic-hoover-js

[![Build Status](https://travis-ci.com/gixo/robotic-hoover-react.svg?token=or51g3qDthHp2zmFnvEs&branch=master)](https://travis-ci.com/gixo/robotic-hoover-react) [![codecov](https://codecov.io/gh/gixo/robotic-hoover-react/branch/master/graph/badge.svg?token=4WjMWRadXz)](https://codecov.io/gh/gixo/robotic-hoover-react) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciampo/macro-carousel/blob/master/LICENSE)

Live demo: [gixo.github.io/robotic-hoover-react](https://gixo.github.io/robotic-hoover-react)

## Introduction

A program that navigates an imaginary robotic hoover (much like a [Roomba](https://en.wikipedia.org/wiki/Roomba)) through an equally imaginary room based on:

- room dimensions as [X and Y coordinates](https://en.wikipedia.org/wiki/Cartesian_coordinate_system), identifying the top right corner of the room rectangle. This room is divided up in a grid based on these dimensions; a room that has dimensions X: 5 and Y: 5 has 5 columns and 5 rows, so 25 possible hoover positions. The bottom left corner is the point of origin for our coordinate system, so as the room contains all coordinates its bottom left corner is defined by X: 0 and Y: 0.
- locations of patches of dirt, also defined by X and Y coordinates identifying the bottom left corner of those grid positions.
- an initial hoover position (X and Y coordinates like patches of dirt)
- driving instructions (as [cardinal directions](https://en.wikipedia.org/wiki/Cardinal_direction) where e.g. N and E mean "go north" and "go east" respectively)

The room will be rectangular, has no obstacles (except the room walls), no doors and all locations in the room will be clean (hoovering has no effect) except for the locations of the patches of dirt presented in the program input.

Placing the hoover on a patch of dirt ("hoovering") removes the patch of dirt so that patch is then clean for the remainder of the program run. The hoover is always on - there is no need to enable it.

Driving into a wall has no effect (the robot skids in place).

## Goal

The goal of the program is to take the room dimensions, the locations of the dirt patches, the hoover location and the driving instructions as input and to then output the following:

- The final hoover position (X, Y)
- The number of patches of dirt the robot cleaned up

## Input

Program input will be received in a file with the format described here. It can be processed.

The file will be named `input.txt` and reside in the same directory as the executable program / web page.

Example:

```
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```

- the first line holds the room dimensions (X Y), separated by a single space (all coordinates will be presented in this format)
- the second line holds the hoover position
- subsequent lines contain the zero or more positions of patches of dirt (one per line)
- the next line then always contains the driving instructions (at least one)

## Output

Program output should be printed to the standard output (STDOUT) of the terminal (or equivalent in the browser, console.log())

- The first line of the program output should display the X and Y coordinates marking the position of the hoover after processing all commands.
- The second line of the program output should display the number of patches of dirt the robot cleaned up

Example (matching the input above):

```
1 3
1
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3002](http://localhost:3002) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
The app is ready to be deployed!
