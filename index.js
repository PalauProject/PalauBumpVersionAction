const core = require('@actions/core');
const fs = require('fs');

function parseVersion(version) {
    const match = version.match(/^[0-9]+\.[0-9]+\.[0-9]+$/);
    if (match) {
        version = match[0].split('.');
        return version.map(n => parseInt(n, 10));
    }
    return null
}

async function run() {
    try {
        let newVersion = core.getInput("new_version");
        const package = JSON.parse(fs.readFileSync("./package.json", "utf8"));
        
        console.log(`Current package version number: ${package.version}`)
        console.log(`Provided new version number: ${newVersion}`);

        if (!parseVersion(newVersion)) {
            let [major, minor, patch] = [0, 0, 0];
            const bumpPatch = core.getInput("patch") === "true";
            const bumpMinor = core.getInput("minor") === "true";
            const bumpMajor = core.getInput("major") === "true";
        
            if (package.version) {
                [major, minor, patch] = parseVersion(package.version);
            }
            
            const newPatch = (bumpMajor || bumpMinor) ? 0 : bumpPatch ? patch + 1 : patch;
            const newMinor = bumpMajor ? 0 : bumpMinor ? minor + 1 : minor;
            const newMajor = bumpMajor ? major + 1 : major;
            newVersion = `${newMajor}.${newMinor}.${newPatch}`;
        }

        const newPackage = { ...package, version: newVersion };
        fs.writeFileSync("./package.json", JSON.stringify(newPackage, null, 2));

        core.setOutput("new_version", newVersion);
        console.log(`Updated to version: ${newVersion}`);
    } catch (error) {
    core.setFailed(error.message);
    }
}

run();