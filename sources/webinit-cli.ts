#!/usr/bin/env node

/**
 * Module Dependencies.
 */

const program = require('commander');
const chalk = require('chalk');
const Rx = require('rxjs/Rx');
const inquirer = require('inquirer');
const download = require('download-git-repo');
const ora = require('ora');
const figlet = require('figlet');
const question = require('../lib/question');
const generate = require('../lib/generate');

program
    .version(require('../package').version, '-v, --version')
    .usage('[project-name]')
    .option('-f, --offline', 'use local template');

/**
 * help
 */

program.on('--help', () => {
    console.log(' Examples:');
    console.log();
    console.log(chalk.gray('    # create a new project with an offical tempalte'));
    console.log(chalk.yellow('    $ webinit-cli my-project'));
    console.log();
})

program.on('exit', () => {
    console.log('Bye~');
})

program.parse(process.argv);


const tempalte = program.args[0];

const loadNormalTemplate = (answer: any) => {
    let spinner1 = ora({text: 'DownLoading..',color: 'yellow'}).start();
    download(`chenweitech/${answer.tempalte}-template-normal`,`./${tempalte}`,(err: any) => {
        if(err) {
            spinner1.fail(`DownLoad Error:${err}`).stop();
        }
        spinner1.succeed(`DownLoad ${chalk.green('Success')}`).stop();
        let spinner2 = ora({text: 'Complier..',color:'yellow'}).start();
        generate(answer, tempalte).then(()=>{
            spinner2.succeed(`Complier ${chalk.green('Success')}`).stop();
            ora().stopAndPersist({text: 'Thanks for Using WebInit CLI', symbol: '❤️❤️❤️'});
            console.log("types")
        });
    })
}

console.log(chalk.yellow(figlet.textSync('Webinit-CLI', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default'
})));

let prompts = new Rx.Subject();

inquirer.prompt(prompts).then((answer: any)=>{
    if (!answer.done) {return}
    loadNormalTemplate(answer);
});

prompts.next(question.askFrame);
// prompts.next(question.askVueRouter);
prompts.next(question.askVuex);
prompts.next(question.askReactRouter)
prompts.next(question.askRedux);
prompts.next(question.askAuthorName);
prompts.next({
    type: 'confirm',
    name: 'done',
    message: `Will create a project name: ${tempalte}?`,
});
prompts.complete();