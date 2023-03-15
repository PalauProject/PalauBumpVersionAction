const core = require('@actions/core');
const fs = require('fs');

function parseVersion() {
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
        console.log(`Bumping ${{bumpPatch, bumpMinor, bumpMajor}}`);
    
        const package = JSON.parse(fs.readFileSync("./package.json", "utf8"));
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