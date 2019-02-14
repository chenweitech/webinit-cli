"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Handlebars = require("handlebars");
const Metalsmith = require("metalsmith");
const path = require("path");
const rm = require("rimraf");
function generate(answer, tempalte) {
    return new Promise((resolve, reject) => {
        const src = `./${tempalte}`;
        const metalsmith = Metalsmith(path.join(src, 'tmpl'));
        answer = Object.assign(answer, { projectName: tempalte });
        metalsmith
            .metadata(answer)
            .clean(false)
            .source('.')
            .destination('../')
            .use((files, metalsmith, done) => {
            Object.keys(files).forEach(fileName => {
                const fileContentsString = files[fileName].contents.toString();
                files[fileName].contents = new Buffer(Handlebars.compile(fileContentsString)(metalsmith.metadata()));
            });
            done();
        })
            .build((err) => {
            if (answer.vuex === false) {
                rm.sync(path.join(src, 'store'));
            }
            rm.sync(path.join(src, 'tmpl'));
            if (err)
                reject(err);
            return resolve();
        });
    });
}
exports.generate = generate;
