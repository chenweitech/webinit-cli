"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var handlebars_1 = __importDefault(require("handlebars"));
var metalsmith_1 = __importDefault(require("metalsmith"));
var path_1 = __importDefault(require("path"));
var rimraf_1 = __importDefault(require("rimraf"));
function generate(answer, tempalte) {
    return new Promise(function (resolve, reject) {
        var src = "./" + tempalte;
        var metalsmith = metalsmith_1.default(path_1.default.join(src, 'tmpl'));
        Object.assign(answer, { projectName: tempalte });
        metalsmith
            .metadata(answer)
            .clean(false)
            .source('.')
            .destination('../')
            .use(function (files, metalsmith, done) {
            Object.keys(files).forEach(function (fileName) {
                var fileContentsString = files[fileName].contents.toString();
                files[fileName].contents = Buffer.from(handlebars_1.default.compile(fileContentsString)(metalsmith.metadata()));
            });
            done();
        })
            .build(function (err) {
            if (answer.vuex === false) {
                rimraf_1.default.sync(path_1.default.join(src, 'store'));
            }
            rimraf_1.default.sync(path_1.default.join(src, 'tmpl'));
            if (err)
                reject(err);
            return resolve();
        });
    });
}
module.exports = generate;
