import {GitLocalConfig} from './git-user';

const gitName = new GitLocalConfig().getName();

const isVue = (answer: any) => {
  return answer.tempalte==='vue'? true:false;
}
const isReact = (answer: any) => {
  return answer.tempalte==='react'? true: false;
}

export const question = {
  askFrame: {
    type: 'list',
    name: 'tempalte',
    message: 'Which kind of project you want:',
    choices: ['vue', 'react', 'gulp']
  },
  // askVueRouter: {
  //   type: 'confirm',
  //   name: 'vueRouter',
  //   message: 'Install vue-router?',
  //   when: isVue
  // },
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
    default: `${gitName}`,
    message: 'Author name?',
  }
}

// module.exports = question;