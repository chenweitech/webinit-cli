import {execSync} from 'child_process';

export class GitLocalConfig {
  name: string;
  getName(): string {
    try {
      this.name = execSync('git config --get user.name').toString().replace('\n','');
    }catch (e) {}
    return this.name || 'admin';
  }
}