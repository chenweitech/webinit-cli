"use strict";
var child_process_1 = require("child_process");
var GitLocalConfig = (function () {
    function GitLocalConfig() {
        try {
            this.name = child_process_1.execSync('git config --get user.name')
                .toString()
                .replace('\n', '');
        }
        catch (error) {
            this.name = '';
        }
    }
    return GitLocalConfig;
}());
module.exports = GitLocalConfig;
