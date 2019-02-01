"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class GitLocalConfig {
    getName() {
        try {
            this.name = child_process_1.execSync('git config --get user.name').toString();
        }
        catch (e) { }
        return this.name || 'admin';
    }
}
exports.GitLocalConfig = GitLocalConfig;
