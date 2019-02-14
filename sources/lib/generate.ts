import Handlebars = require('handlebars');
import Metalsmith = require('metalsmith');
import path = require('path');
import rm = require('rimraf');

export function generate (answer: any, tempalte: any) {
  return new Promise((resolve, reject) => {
    const src = `./${tempalte}`;
    const metalsmith = Metalsmith(path.join(src, 'tmpl'));
    answer = Object.assign(answer,{projectName: tempalte})
    metalsmith
      .metadata(answer)
      .clean(false)
      .source('.')
      .destination('../')
      .use((files:any, metalsmith:any, done: any)=>{
        Object.keys(files).forEach(fileName => { //遍历替换模板
           const fileContentsString = files[fileName].contents.toString();
           files[fileName].contents = new Buffer(Handlebars.compile(fileContentsString)(metalsmith.metadata()));
         })
         done()
      })
      .build((err:any)=>{
        if (answer.vuex===false) {
          rm.sync(path.join(src, 'store'))
        }
        rm.sync(path.join(src, 'tmpl'));
        if(err) reject(err);
        return resolve();
      })
  })
}