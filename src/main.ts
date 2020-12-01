import { exit } from "process";
const shell = require('shelljs');

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
}

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  exit(1);
}

const command = synonyms[process.argv[2]]
const arg = process.argv[3]
if(command == null){
  shell.echo("Error: You forgot an action or action not found")
  exit(1)
} 


switch (command) {
  case 'update':
    if(command == null){
      shell.echo("Error: You forgot an action")
      exit(1)
    } 
    shell.echo("update")
    shell.exec("git add .")
    shell.exec("git stage -a")
    shell.exec(`git commit -m ${arg}`)
    shell.exec("git push")

    shell.echo("First we added all the files in the current directory with: git add .")
    shell.echo("Then we stage all the changes with: git stage -a")
    shell.echo("Then we commit the changes with your message with: git commit -m")
    shell.echo("Finally, push all the changes up with: git push")

    break
  case 'undo':
    if(command == null) shell.exec("git reset HEAD~ --soft")
    else shell.exec(`git reset HEAD~${command} --soft`)

    shell.echo("We just need to reset from the current head softly with: git reset HEAD~(amount) --soft")

    break
  case 'refresh':
    shell.exec('git pull')
    break
  case 'fix':
    shell.exec('git fetch origin')
    shell.exec('git checkout master')
    shell.exec('git reset --hard origin/master')
    shell.exec('git clean -d --force')

    shell.echo("We just need to get the latest changes from the repo: git fetch origin")
    shell.echo("Then we grab the master branch: git checkout master")
    shell.echo("Then we reset our local repo: git reset --hard origin/master")
    shell.exec("Then we forcefully clean up and changes we made: git clean -d --force")

    break
  default:
    shell.echo("No command found")
    exit(1)
}



shell.exit(0)
