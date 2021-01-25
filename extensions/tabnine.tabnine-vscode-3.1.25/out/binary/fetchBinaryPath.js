"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const paths_1 = require("./paths");
const semverUtils_1 = require("../semverUtils");
function fetchBinaryPath() {
    const rootPath = paths_1.getRootPath();
    try {
        const activePath = path.join(rootPath, '.active');
        if (fs.existsSync(activePath)) {
            const activeVersion = fs.readFileSync(activePath, 'utf-8').trim();
            const activeVersionPath = paths_1.versionPath(activeVersion);
            if (fs.existsSync(activeVersionPath)) {
                return activeVersionPath;
            }
        }
    }
    catch (e) {
        console.error("Error handling .active file. Falling back to semver sorting", e);
    }
    const versions = semverUtils_1.default(fs.readdirSync(rootPath)).map(paths_1.versionPath);
    const selectedVersion = versions.find(fs.existsSync);
    if (!selectedVersion) {
        throw new Error(`Couldn't find a TabNine binary (tried the following paths: ${versions.join(", ")})`);
    }
    return selectedVersion;
}
exports.default = fetchBinaryPath;
//# sourceMappingURL=fetchBinaryPath.js.map