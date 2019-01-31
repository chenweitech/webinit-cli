const gitName = require('./git-user');

const isVue = answer => {
  return answer.tempalte==='vue'? true:false;
}
const isReact = answer => {
  return answer.tempalte==='react'? true: false;
}
const question = {
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
    default: `${gitName()}`,
    message: 'Author name?',
  }
}

module.exports = question;