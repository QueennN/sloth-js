#!/usr/bin/env node

const { program } = require('commander');
const pckg = require('../package.json')
program.version(pckg.version, '-v', '--version');
var figlet = require('figlet');
const fs = require("fs")
const chalk = require("chalk")

console.log(process.cwd());
console.log(chalk.red(figlet.textSync('Fookie JS', {
    width: 100,
    whitespaceBreak: true
})));

program
    .command('init')
    .description('clone a repository into a newly created directory')
    .action((source, destination) => {

    });

program.createCommand("init")
program.parse(process.argv);

const options = program.opts();



