/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 450:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(450);
const fs = __nccwpck_require__(147);

function parseVersion(version) {
    const match = version.match(/^[0-9]+.[0-9]+.[0-9]+$/);
    if (match) {
        return match[0].split('.');
    }
    return null
}

async function run() {
    try {
        const bumpPatch = core.getInput("patch") === "true";
        const bumpMinor = core.getInput("minor") === "true";
        const bumpMajor = core.getInput("major") === "true";
        console.log(`Bumping ${JSON.stringify({bumpPatch, bumpMinor, bumpMajor})}`);
    
        const package = JSON.parse(fs.readFileSync("./package.json", "utf8"));
        console.log(Object.keys(package));
        if (package.version) {
            const [patch, minor, major] = parseVersion(package.version);
        }
        const newPatch = (bumpMajor || bumpMinor) ? 0 : bumpPatch ? patch + 1 : patch;
        const newMinor = bumpMajor ? 0 : bumpMinor ? minor + 1 : minor;
        const newMajor = bumpMajor ? major + 1 : major;
        const newVersion = `${newMajor}.${newMinor}.${newPatch}`;

        const newPackage = { ...package, version: newVersion };
        fs.writeFileSync("./package.json", JSON.stringify(newPackage, null, 2));

        core.setOutput("new_version", newVersion);

    } catch (error) {
    core.setFailed(error.message);
    }
}

run();
})();

module.exports = __webpack_exports__;
/******/ })()
;