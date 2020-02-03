const cpy = require('cpy');
const { resolve } = require('path');

(async () => {
  await cpy(
    resolve('./', 'node_modules/dugite/git/**'),
    resolve('./', './public/git'),
    {
      parents: true,
    },
  );
  console.log('Git files copied!');
})();
