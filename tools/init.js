const fs = require("fs");
const path = require("path");

const dir = __dirname;
const settingsPath = path.join(dir, "..", "resources", "settings", "localSettings.json");
const packagerIOSIpPath = path.join(dir, "..", "ios", "customPackagerIp.txt");
const packagerAndroidIpPath = path.join(dir, "..", "android", "app", "src", "main", "assets", "customPackagerIp.txt");

createFileIfNotExist(settingsPath, getContent());
createFileIfNotExist(packagerIOSIpPath, "");
createFileIfNotExist(packagerAndroidIpPath, "");

function createFileIfNotExist(filePath, content) {
    fs.exists(filePath, function (exists) {
        if (!exists) {
            fs.writeFileSync(filePath, content, {encoding: "utf-8"});
            console.log(`create ${filePath}`);
        }
    });
}

function getContent() {
    return
    "{\n" +
    "  \"serverUrl\": \"\",\n" +
    "  \"devOptions\": {\n" +
    "    \"showAllComponentsOnStart\": false,\n" +
    "    \"purgeStateOnStart\": false,\n" +
    "    \"androidHockeyOptions\": {\n" +
    "      \"appId\": \"insert some here\",\n" +
    "      \"apiToken\": \"insert some here\"\n" +
    "    },\n" +
    "    \"iOSHockeyOptions\": {\n" +
    "      \"appId\": \"insert some here\",\n" +
    "      \"apiToken\": \"insert some here\"\n" +
    "    }\n" +
    "  }\n" +
    "}"
}

