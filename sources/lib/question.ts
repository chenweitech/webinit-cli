import GitLocalConfig from './git-user';
interface Answer {
    template: string;
}
const gitName = new GitLocalConfig().name;

const isVueProject = (answer: Answer) => {
    return answer.template === 'vue' ? true : false;
};

const question = {
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

export = question;
