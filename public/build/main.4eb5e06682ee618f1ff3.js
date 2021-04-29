/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/fieldWrapper.ts":
/*!*****************************!*\
  !*** ./src/fieldWrapper.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.diffuse = exports.FieldWrapper = void 0;\nvar FieldWrapper = /** @class */ (function () {\n    function FieldWrapper(w, h) {\n        this.w = w;\n        this.h = h;\n        this.field = this.getEmptyField(w, h);\n        this.max = 0;\n    }\n    FieldWrapper.prototype.getEmptyField = function (w, h) {\n        var newField = [];\n        for (var y = 0; y < h; y++) {\n            var row = [];\n            for (var x = 0; x < w; x++) {\n                row.push(0);\n            }\n            newField.push(row);\n        }\n        return newField;\n    };\n    FieldWrapper.prototype.get = function (x, y) {\n        if (x > this.w - 1) {\n            x -= this.w - 1;\n        }\n        if (x < 0) {\n            x = this.w + x;\n        }\n        if (y > this.h - 1) {\n            y -= this.h - 1;\n        }\n        if (y < 0) {\n            y = this.h + y;\n        }\n        return this.field[x][y];\n    };\n    FieldWrapper.prototype.increase = function (x, y) {\n        if (this.field[x] !== undefined && this.field[x][y] !== undefined) {\n            this.field[x][y] = 5;\n        }\n    };\n    FieldWrapper.prototype.weaken = function () {\n        var tmpMax = 0;\n        for (var x = 0; x < this.field.length; x++) {\n            for (var y = 0; y < this.field[x].length; y++) {\n                this.field[x][y] *= 0.95;\n                // update max in same iteration\n                tmpMax = this.field[x][y] > tmpMax ? this.field[x][y] : tmpMax;\n            }\n        }\n        this.max = tmpMax;\n    };\n    FieldWrapper.prototype.getField = function () {\n        return this.field;\n    };\n    return FieldWrapper;\n}());\nexports.FieldWrapper = FieldWrapper;\nfunction diffuse(field) {\n    var fieldCopy = JSON.parse(JSON.stringify(field));\n    for (var x = 0; x < field.length; x++) {\n        for (var y = 0; y < field[x].length; y++) {\n            var sum = 0;\n            for (var n = -1; n <= 1; n++) {\n                for (var m = -1; m <= 1; m++) {\n                    if (field[x + n] !== undefined && field[x + n][y + m] !== undefined) {\n                        sum += field[x + n][y + m];\n                    }\n                }\n            }\n            fieldCopy[x][y] = sum / 9;\n        }\n    }\n    return fieldCopy;\n}\nexports.diffuse = diffuse;\n\n\n//# sourceURL=webpack://slime/./src/fieldWrapper.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar state_1 = __webpack_require__(/*! ./state */ \"./src/state.ts\");\nvar WIDTH = 150;\nvar HEIGHT = 150;\nvar bs = 5;\nvar canvas = document.getElementById('canvas');\ncanvas.width = WIDTH * bs;\ncanvas.height = HEIGHT * bs;\nvar context = canvas.getContext(\"2d\");\nvar populationSize = Math.floor((WIDTH * HEIGHT) * 0.15); // 15%\nvar state = new state_1.State(WIDTH, HEIGHT, populationSize);\nstate.init();\nfunction loop(timestamp) {\n    var progress = timestamp - lastRender;\n    state.step();\n    draw();\n    lastRender = timestamp;\n    window.requestAnimationFrame(loop);\n}\nvar lastRender = 0;\nwindow.requestAnimationFrame(loop);\nfunction draw() {\n    background();\n    drawField(state.fieldWrapper.getField());\n    // drawWalkers(state.walkers)\n}\nfunction background() {\n    context.fillStyle = \"#000000\";\n    context.fillRect(0, 0, state.size.w * bs, state.size.h * bs);\n}\nfunction drawWalkers(walkers) {\n    walkers.forEach(function (walker) {\n        context.fillStyle = \"#FF0000\";\n        context.fillRect(walker.pos.x * bs, walker.pos.y * bs, bs, bs);\n    });\n}\nfunction drawField(field) {\n    var factor = (255 / state.fieldWrapper.max);\n    field.forEach(function (row, x) {\n        row.forEach(function (cell, y) {\n            context.fillStyle = \"rgb(0,\" + factor * cell + \",0)\";\n            context.fillRect(x * bs, y * bs, bs, bs);\n        });\n    });\n}\n\n\n//# sourceURL=webpack://slime/./src/main.ts?");

/***/ }),

/***/ "./src/state.ts":
/*!**********************!*\
  !*** ./src/state.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.relevantDirections = exports.directionToPosition = exports.initWalker = exports.State = void 0;\nvar walker_1 = __webpack_require__(/*! ./walker */ \"./src/walker.ts\");\nvar util_1 = __webpack_require__(/*! ./util */ \"./src/util.ts\");\nvar fieldWrapper_1 = __webpack_require__(/*! ./fieldWrapper */ \"./src/fieldWrapper.ts\");\nvar State = /** @class */ (function () {\n    function State(w, h, numWalkers) {\n        this.size = { w: w, h: h };\n        this.numWalkers = numWalkers;\n    }\n    State.prototype.init = function () {\n        this.fieldWrapper = new fieldWrapper_1.FieldWrapper(this.size.w, this.size.h);\n        this.walkers = initWalker(this.numWalkers, this.size.w, this.size.h);\n    };\n    State.prototype.step = function () {\n        var _this = this;\n        this.walkers.map(function (walker) { return walker.updateDirection(_this.fieldWrapper); });\n        this.walkers.forEach(function (walker) {\n            // inc feromone level\n            _this.fieldWrapper.increase(walker.pos.x, walker.pos.y);\n            if (walker.direction < 0 || walker.direction > 7) {\n                console.log(walker.direction);\n            }\n            var step = directionToPosition(walker.direction);\n            walker.pos.x += step.x;\n            walker.pos.y += step.y;\n            // set on opposite site if out off bounds\n            if (walker.pos.x < 0) {\n                walker.pos.x = _this.size.w - 1;\n            }\n            if (walker.pos.x > _this.size.w) {\n                walker.pos.x = 0;\n            }\n            if (walker.pos.y < 0) {\n                walker.pos.y = _this.size.h - 1;\n            }\n            if (walker.pos.y > _this.size.h) {\n                walker.pos.y = 0;\n            }\n        });\n        this.fieldWrapper.field = fieldWrapper_1.diffuse(this.fieldWrapper.field);\n        this.fieldWrapper.weaken();\n    };\n    return State;\n}());\nexports.State = State;\nfunction initWalker(n, w, h) {\n    var walker = [];\n    for (var i = 0; i < n; i++) {\n        walker.push(new walker_1.Walker(util_1.random(w - 1), util_1.random(h - 1), util_1.random(7)));\n        // walker.push(new Walker(Math.floor(w / 2), Math.floor(h / 2), random(7)))\n    }\n    return walker;\n}\nexports.initWalker = initWalker;\nfunction directionToPosition(direction) {\n    /*\n    direction\n    7 0 1\n    6   2\n    5 4 3\n    */\n    switch (direction) {\n        case 0:\n            return { x: 0, y: -1 };\n        case 1:\n            return { x: 1, y: -1 };\n        case 2:\n            return { x: 1, y: 0 };\n        case 3:\n            return { x: 1, y: 1 };\n        case 4:\n            return { x: 0, y: 1 };\n        case 5:\n            return { x: -1, y: 1 };\n        case 6:\n            return { x: -1, y: 0 };\n        case 7:\n            return { x: -1, y: -1 };\n    }\n}\nexports.directionToPosition = directionToPosition;\nfunction relevantDirections(direction) {\n    var left = direction - 1 < 0 ? 7 : direction - 1;\n    var right = direction + 1 > 7 ? 0 : direction + 1;\n    return [left, right];\n}\nexports.relevantDirections = relevantDirections;\n\n\n//# sourceURL=webpack://slime/./src/state.ts?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.random = void 0;\nfunction random(max) {\n    return Math.floor(Math.random() * Math.floor(max));\n}\nexports.random = random;\n\n\n//# sourceURL=webpack://slime/./src/util.ts?");

/***/ }),

/***/ "./src/walker.ts":
/*!***********************!*\
  !*** ./src/walker.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Walker = void 0;\nvar state_1 = __webpack_require__(/*! ./state */ \"./src/state.ts\");\nvar util_1 = __webpack_require__(/*! ./util */ \"./src/util.ts\");\nvar Walker = /** @class */ (function () {\n    function Walker(x, y, direction) {\n        this.pos = { x: x, y: y };\n        this.direction = direction;\n    }\n    Walker.prototype.updateDirection = function (field) {\n        var leftRight = state_1.relevantDirections(this.direction);\n        var sensorForward = state_1.directionToPosition(this.direction);\n        var sensors = getSensorOffsets(this.direction);\n        var sensorLength = 9;\n        var left = field.get(this.pos.x + (sensors.left.x * sensorLength), this.pos.y + (sensors.left.y * sensorLength));\n        var forward = field.get(this.pos.x + (sensorForward.x * sensorLength), this.pos.y + (sensorForward.y * sensorLength));\n        var right = field.get(this.pos.x + (sensors.right.x * sensorLength), this.pos.y + (sensors.right.y * sensorLength));\n        if (forward > left && forward > right) {\n            // keep direction\n        }\n        else if (forward < right && forward < left) {\n            this.direction = [leftRight[0], leftRight[1]][util_1.random(1)]; // indeed\n        }\n        else if (left > right) {\n            this.direction = leftRight[0];\n        }\n        else if (right > left) {\n            this.direction = leftRight[1];\n        }\n    };\n    return Walker;\n}());\nexports.Walker = Walker;\nfunction getSensorOffsets(direction) {\n    /*\n        . 7 . 0 .\n        6 7 0 1 1\n        . 6 i 2 .\n        5 5 4 3 2\n        . 4 . 3 .\n    */\n    var sensors = {\n        0: { left: getOffset(7), right: getOffset(0) },\n        1: { left: getOffset(0), right: getOffset(1) },\n        2: { left: getOffset(1), right: getOffset(2) },\n        3: { left: getOffset(2), right: getOffset(3) },\n        4: { left: getOffset(3), right: getOffset(4) },\n        5: { left: getOffset(4), right: getOffset(5) },\n        6: { left: getOffset(5), right: getOffset(6) },\n        7: { left: getOffset(6), right: getOffset(7) },\n    };\n    /*\n        7 . 0 . 1\n        . . . . .\n        6 . i . 2\n        . . . . .\n        5 . 4 . 3\n    */\n    return sensors[direction];\n}\nfunction getOffset(direction) {\n    switch (direction) {\n        case 0:\n            return { x: -1, y: -2 };\n        case 1:\n            return { x: 1, y: -2 };\n        case 2:\n            return { x: 2, y: -1 };\n        case 3:\n            return { x: 2, y: 1 };\n        case 4:\n            return { x: 1, y: 2 };\n        case 5:\n            return { x: -1, y: 2 };\n        case 6:\n            return { x: -2, y: 1 };\n        case 7:\n            return { x: -2, y: -1 };\n    }\n}\n\n\n//# sourceURL=webpack://slime/./src/walker.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;