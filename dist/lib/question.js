"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const git_user_1 = require("./git-user");
const gitName = new git_user_1.GitLocalConfig().getName();
const isVue = (answer) => {
    return answer.tempalte === 'vue' ? true : false;
};
const isReact = (answer) => {
    return answer.tempalte === 'react' ? true : false;
};
exports.default = {
    askFrame: {
        type: 'list',
        name: 'tempalte',
        message: 'Which kind of project you want:',
        choices: ['vue', 'react', 'gulp']
    },
    askVuex: {
        type: 'confirm',
        name: 'vuex',
        message: 'Install vuex?',
        when: isVue
    },
    askReactRouter: {
        type: 'confirm',
        name: 'reactRouter',
        message: 'Install react-router?',
        when: isReact
    },
    askRedux: {
        type: 'confirm',
        name: 'redux',
        message: 'Install redux?',
        when: isReact
    },
    askAuthorName: {
        type: 'input',
        name: 'author',
        default: gitName,
        message: 'Author name?',
    }
};
