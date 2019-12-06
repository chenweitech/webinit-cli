#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var chalk_1 = __importDefault(require("chalk"));
var rxjs_1 = require("rxjs");
var inquirer_1 = __importDefault(require("inquirer"));
var download_git_repo_1 = __importDefault(require("download-git-repo"));
var ora_1 = __importDefault(require("ora"));
var figlet_1 = __importDefault(require("figlet"));
var question_1 = __importDefault(require("./lib/question"));
var generate_1 = __importDefault(require("./lib/generate"));
var package_json_1 = __importDefault(require("../package.json"));
commander_1.default
    .version(package_json_1.default.version, '-v, --version')
    .usage('[project-name]')
    .option('-f, --offline', 'use local template');
commander_1.default.on('--help', function () {
    console.log(' Examples:');
    console.log();
    console.log(chalk_1.default.gray('    # create a new project with an offical template'));
    console.log(chalk_1.default.yellow('    $ webinit-cli my-project'));
    console.log();
});
commander_1.default.on('exit', function () {
    console.log('Bye~');
});
commander_1.default.parse(process.argv);
var template = commander_1.default.args[0];
var loadNormalTemplate = function (answer) {
    var spinner1 = ora_1.default({ text: 'DownLoading..', color: 'yellow' }).start();
    download_git_repo_1.default("github:chenweitech/" + answer.template + "-template-normal", "./" + template, function (err) {
        if (err) {
            spinner1.fail("DownLoad Error:" + err).stop();
        }
        spinner1.succeed("DownLoad " + chalk_1.default.green('Success')).stop();
        var spinner2 = ora_1.default({ text: 'Complier..', color: 'yellow' }).start();
        generate_1.default(answer, template).then(function () {
            spinner2.succeed("Complier " + chalk_1.default.green('Success')).stop();
            ora_1.default().stopAndPersist({ text: 'Thanks for Using WebInit CLI', symbol: '❤️❤️❤️' });
        });
    });
};
console.log(chalk_1.default.yellow(figlet_1.default.textSync('Webinit-CLI', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default'
})));
var prompts = new rxjs_1.Subject();
inquirer_1.default.prompt(prompts).then(function (answer) {
    if (!answer.done) {
        return;
    }
    loadNormalTemplate(answer);
});
prompts.next(question_1.default.askFrame);
prompts.next(question_1.default.askVuex);
prompts.next(question_1.default.askAuthorName);
prompts.next({
    type: 'confirm',
    name: 'done',
    message: "Will create a project name: " + template + "?"
});
prompts.complete();
