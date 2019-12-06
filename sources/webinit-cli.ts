#!/usr/bin/env node

/**
 * Module Dependencies.
 */
import program from 'commander';
import chalk from 'chalk';
import { Subject } from 'rxjs';
import inquirer, { QuestionCollection } from 'inquirer';
import download from 'download-git-repo';
import ora from 'ora';
import figlet from 'figlet';
import question from './lib/question';
import generate from './lib/generate';
import config from '../package.json';

program
    .version(config.version, '-v, --version')
    .usage('[project-name]')
    .option('-f, --offline', 'use local template');

/**
 * help
 */

program.on('--help', () => {
    console.log(' Examples:');
    console.log();
    console.log(chalk.gray('    # create a new project with an offical template'));
    console.log(chalk.yellow('    $ webinit-cli my-project'));
    console.log();
});

program.on('exit', () => {
    console.log('Bye~');
});

program.parse(process.argv);

const template = program.args[0];

const loadNormalTemplate = (answer: any) => {
    let spinner1 = ora({ text: 'DownLoading..', color: 'yellow' }).start();
    download(
        `github:chenweitech/${answer.template}-template-normal`,
        `./${template}`,
        (err: any) => {
            if (err) {
                spinner1.fail(`DownLoad Error:${err}`).stop();
            }
            spinner1.succeed(`DownLoad ${chalk.green('Success')}`).stop();
            let spinner2 = ora({ text: 'Complier..', color: 'yellow' }).start();
            generate(answer, template).then(() => {
                spinner2.succeed(`Complier ${chalk.green('Success')}`).stop();
                ora().stopAndPersist({ text: 'Thanks for Using WebInit CLI', symbol: '❤️❤️❤️' });
            });
        }
    );
};

console.log(
    chalk.yellow(
        figlet.textSync('Webinit-CLI', {
            font: 'Ghost',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        })
    )
);

let prompts = new Subject();
inquirer.prompt(prompts as QuestionCollection).then((answer: any) => {
    if (!answer.done) {
        return;
    }
    loadNormalTemplate(answer);
});

prompts.next(question.askFrame);
prompts.next(question.askVuex);
prompts.next(question.askAuthorName);
prompts.next({
    type: 'confirm',
    name: 'done',
    message: `Will create a project name: ${template}?`
});
prompts.complete();
