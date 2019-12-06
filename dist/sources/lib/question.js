"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var git_user_1 = __importDefault(require("./git-user"));
var gitName = new git_user_1.default().name;
var isVueProject = function (answer) {
    return answer.template === 'vue' ? true : false;
};
var question = {
    askFrame: {
        type: 'list',
        name: 'template',
        message: 'Which kind of project you want:',
        choices: ['vue']
    },
    askVuex: {
        type: 'confirm',
        name: 'vuex',
        message: 'Install vuex?',
        when: isVueProject
    },
    askAuthorName: {
        type: 'input',
        name: 'author',
        default: gitName,
        message: 'Author name?'
    }
};
module.exports = question;
