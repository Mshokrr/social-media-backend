// Make Sure You execute the script in the scripts directory
require('@babel/register');
const { exec } = require('../app/util');

if (process.argv.length < 3) {
  console.log('Missing argument: Module name');
} else {
  const dir = process.argv[2];
  const dirModule = dir.charAt(0).toUpperCase() + dir.substring(1, dir.length);

  const CMD = `mkdir ./app/${dir};
   cat ./bin/_module/controller.example.js >> ./app/${dir}/controller.js;
   sed -i.bak 's/Example/${dirModule}/g' ./app/${dir}/controller.js && rm ./app/${dir}/controller.js.bak;
   cat ./bin/_module/helper.example.js >> ./app/${dir}/helper.js;
   sed -i.bak 's/Example/${dirModule}/g' ./app/${dir}/helper.js && rm ./app/${dir}/helper.js.bak;
   cat ./bin/_module/helper.example.spec.js >> ./app/${dir}/helper.spec.js;
   sed -i.bak 's/Example/${dirModule}/g' ./app/${dir}/helper.spec.js && rm ./app/${dir}/helper.spec.js.bak;   
   cat ./bin/_module/index.example.js >> ./app/${dir}/index.js;
   sed -i.bak 's/Example/${dirModule}/g' ./app/${dir}/index.js && rm ./app/${dir}/model.js.bak;
   sed -i.bak 's/example/${dir}/g' ./app/${dir}/index.js && rm ./app/${dir}/index.js.bak;
   cat ./bin/_module/model.example.js >> ./app/${dir}/model.js;
   sed -i.bak 's/Example/${dirModule}/g' ./app/${dir}/model.js && rm ./app/${dir}/model.js.bak;
   cat ./bin/_module/model.example.spec.js >> ./app/${dir}/model.spec.js;
   sed -i.bak 's/Example/${dirModule}/g' ./app/${dir}/model.spec.js && rm ./app/${dir}/model.spec.js.bak;
   cat ./bin/_module/routes.example.js >> ./app/${dir}/routes.js;
   sed -i.bak 's/Example/${dirModule}/g' ./app/${dir}/routes.js && rm ./app/${dir}/routes.js.bak;
   cat ./bin/_module/routes.example.spec.js >> ./app/${dir}/routes.spec.js;
   sed -i.bak 's/Example/${dirModule}/g' ./app/${dir}/routes.spec.js && rm ./app/${dir}/routes.spec.js.bak;
   cat ./bin/_module/validation.example.js >> ./app/${dir}/validation.js;`;

  // Execute the command

  exec(CMD);
}
