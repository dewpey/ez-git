#!/usr/bin/env node

import { exit } from "process";
const shell = require('shelljs');
const chalk = require('chalk');

const synonyms = {
  update: 'update',
  commit: 'update',
  finish: 'update',
  save: 'update',
  undo: 'undo',
  revert: 'undo',
  reset: 'undo',
  oops: 'undo',
  refresh: 'refresh',
  pull: 'refresh',
  fetch: 'refresh',
  what: 'what'
}

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  exit(1);
}

const command = synonyms[process.argv[2]]
const arg = process.argv[3]
if(command == null){
  shell.echo(chalk.red("Error: You forgot an action or action not found"))
  exit(1)
} 


switch (command) {
  case 'update':
    if(command == null){
      shell.echo(chalk.red("Error: You forgot an action"))
      exit(1)
    } 
    shell.echo("update")
    shell.exec("git stage -A")
    shell.exec(`git commit -m ${arg}`)
    shell.exec("git push")

    shell.echo("First we added all the files in the current directory with: " + chalk.blue.bgWhite("git add ."))
    shell.echo("Then we stage all the changes with: " + chalk.blue.bgWhite("git stage -a"))
    shell.echo("Then we commit the changes with your message with: " + chalk.blue.bgWhite("git commit -m"))
    shell.echo("Finally, push all the changes up with: " + chalk.blue.bgWhite("git push"))

    break
  case 'undo':
    if(command == null) shell.exec("git reset HEAD~ --soft")
    else shell.exec(`git reset HEAD~${command} --soft`)

    shell.echo("We just need to reset from the current head softly with: " + chalk.blue.bgWhite("git reset HEAD~ --soft"))

    break
  case 'refresh':
    shell.exec('git pull')

    shell.echo('We will just run: ' + chalk.blue.bgWhite("git pull"))
    break
  case 'fix':
    shell.exec('git fetch origin')
    shell.exec('git checkout master')
    shell.exec('git reset --hard origin/master')
    shell.exec('git clean -d --force')

    shell.echo("We just need to get the latest changes from the repo: " + chalk.blue.bgWhite("git fetch origin"))
    shell.echo("Then we grab the master branch: git checkout master" + chalk.blue.bgWhite("git checkout master"))
    shell.echo("Then we reset our local repo: git reset --hard origin/master" + chalk.blue.bgWhite("git reset --hard origin/master"))
    shell.echo("Then we forcefully clean up and changes we made: git clean -d --force" + chalk.blue.bgWhite("git clean -d --force"))

    break
  case 'what':
    shell.exec('git status')
    shell.echo("We just run: " + chalk.blue.bgWhite("git status"))
    break
  default:
    shell.echo("No command found")
    exit(1)
}



shell.exit(0)
