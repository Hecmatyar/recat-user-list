const fs = require("fs");
const path = require("path");
const replaceInFile = require("./replaceInFile");
const removeFoldersContent = require("./removeFoldersContent");

prevertBundleInDebugForiOS();
preventRunReactPackageriOS();
fix52React();
removeDotGitFilesFromArtLib();
clearBuildFolderContent();
fixiOSInitialOrientation();

function preventRunReactPackageriOS() {
    console.log("preventRunReactPackageriOS");
    const file = path.join(__dirname, "..", "node_modules", "react-native", "React", "React.xcodeproj", "project.pbxproj");

    replaceInFile(file, [
        ["if [ -z \\\"${RCT_NO_LAUNCH_PACKAGER+xxx}\\\" ] ;", "if [ -z \\\"${RCT_NO_LAUNCH_PACKAGER+xxx}\\\" AND 0] ;"],
        ["if [ -z \\\"${RCT_NO_LAUNCH_PACKAGER+xxx}\\\" ] ;", "if [ -z \\\"${RCT_NO_LAUNCH_PACKAGER+xxx}\\\" AND 0] ;"]
    ]);
}

function prevertBundleInDebugForiOS() {
    console.log("prevertBundleInDebugForiOS");
    const file = path.join(__dirname, "..", "node_modules", "react-native", "scripts", "react-native-xcode.sh");

    replaceInFile(file, /"\$PLATFORM_NAME" == \*simulator/g, "\"\$PLATFORM_NAME\"")
}

function fix52React() {
    console.log("fix52React");
    const basePath = path.join(__dirname, "..", "node_modules", "react-native", "ReactCommon", "yoga", "yoga");

    replaceInFile(path.join(basePath, "YGNodePrint.cpp"), "const uint32_t childCount = node->children.size();", "const uint32_t childCount = static_cast<uint32_t>(node->children.size());");
    replaceInFile(path.join(basePath, "Yoga.cpp"), "return node->children.size();", "return static_cast<uint32_t>(node->children.size());");
    replaceInFile(path.join(basePath, "Yoga.cpp"), "const uint32_t childCount = node->children.size();", "const uint32_t childCount = static_cast<uint32_t>(node->children.size());");
    replaceInFile(path.join(basePath, "Yoga.cpp"), "const uint32_t childCount = node->children.size();", "const uint32_t childCount = static_cast<uint32_t>(node->children.size());");
}

function removeDotGitFilesFromArtLib() {
    const files = [
        path.join(__dirname, "..", "node_modules", "art", "lib", "ast-js", ".git"),
        path.join(__dirname, "..", "node_modules", "art", "lib", "sheet.js", ".git"),
        path.join(__dirname, "..", "node_modules", "art", "lib", "slick", ".git")]

    files.forEach(f => {
        if (fs.existsSync(f)) {
            fs.unlinkSync(f);
        }
    });
}

function clearBuildFolderContent() {
    console.log("clearBuildFolderContent");
    const buildFolder = path.join(__dirname, "..", "build");

    removeFoldersContent(buildFolder);
}

function fixiOSInitialOrientation() {
    console.log("fixiOSInitialOrientation");
    const file = path.join(__dirname, "..", "node_modules", "react-native-orientation", "iOS", "RCTOrientation", "Orientation.m");

    replaceInFile(
        file,
        "static UIInterfaceOrientationMask _orientation = UIInterfaceOrientationMaskAllButUpsideDown;",
        "static UIInterfaceOrientationMask _orientation = UIInterfaceOrientationMaskPortrait;"
    );
}