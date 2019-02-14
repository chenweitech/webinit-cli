#!/usr/bin/env node

/**
 * Module Dependencies.
 */

import program = require('commander');
import chalk = require('chalk');
import Rx = require('rxjs/Rx');
import inquirer = require('inquirer');
import download = require('download-git-repo');
import ora = require('ora');
import figlet = require('figlet');
import question = require('./lib/question');
import generate = require('./lib/generate');

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
    console.log(chalk.default.gray('    # create a new project with an offical tempalte'));
    console.log(chalk.default.yellow('    $ webinit-cli my-project'));
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
        spinner1.succeed(`DownLoad ${chalk.default.green('Success')}`).stop();
        let spinner2 = ora({text: 'Complier..',color:'yellow'}).start();
        generate.generate(answer, tempalte).then(()=>{
            spinner2.succeed(`Complier ${chalk.default.green('Success')}`).stop();
            ora().stopAndPersist({text: 'Thanks for Using WebInit CLI', symbol: '❤️❤️❤️'});
        });
    })
}

console.log(chalk.default.yellow(figlet.textSync('Webinit-CLI', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default'
})));

let prompts = new Rx.Subject();

inquirer.prompt(prompts).then((answer: any)=>{
    if (!answer.done) {return}
    loadNormalTemplate(answer);
});

prompts.next(question.default.askFrame);
// prompts.next(question.askVueRouter);
prompts.next(question.default.askVuex);
prompts.next(question.default.askReactRouter)
prompts.next(question.default.askRedux);
prompts.next(question.default.askAuthorName);
prompts.next({
    type: 'confirm',
    name: 'done',
    message: `Will create a project name: ${tempalte}?`,
});
prompts.complete();