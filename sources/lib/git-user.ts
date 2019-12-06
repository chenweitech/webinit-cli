import { execSync } from 'child_process';
class GitLocalConfig {
    public name: string;
    public constructor() {
        try {
            this.name = execSync('git config --get user.name')
                .toString()
                .replace('\n', '');
        } catch (error) {
            this.name = '';
        }
    }
}

export = GitLocalConfig;
