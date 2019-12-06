import Handlebars from 'handlebars';
import Metalsmith from 'metalsmith';
import path from 'path';
import rm from 'rimraf';

function generate(answer: any, tempalte: any) {
    return new Promise((resolve, reject) => {
        const src = `./${tempalte}`;
        const metalsmith = Metalsmith(path.join(src, 'tmpl'));
        Object.assign(answer, { projectName: tempalte });
        metalsmith
            .metadata(answer)
            .clean(false)
            .source('.')
            .destination('../')
            .use((files: any, metalsmith: any, done: any) => {
                Object.keys(files).forEach((fileName) => {
                    // 遍历替换模板
                    const fileContentsString = files[fileName].contents.toString();
                    files[fileName].contents = Buffer.from(
                        Handlebars.compile(fileContentsString)(metalsmith.metadata())
                    );
                });
                done();
            })
            .build((err: any) => {
                if (answer.vuex === false) {
                    rm.sync(path.join(src, 'store'));
                }
                rm.sync(path.join(src, 'tmpl'));
                if (err) reject(err);
                return resolve();
            });
    });
}

export = generate;
