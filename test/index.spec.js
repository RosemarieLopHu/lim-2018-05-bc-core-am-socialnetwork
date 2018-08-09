/* import { assert } from 'chai';
global.window = global;
global.firebase = require('firebase');
import "../muro.spec.js";
 */
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Red Social</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/4.1.0/mocha.min.css" />
  </head>
  <body>
    <div id="mocha"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/4.1.0/mocha.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chai/4.1.2/chai.min.js"></script>
    <script src="../src/main.js"></script>
    <script>
      const { assert } = chai;
      mocha.setup('bdd');
    </script>
    <script src="./data.spec.js"></script>
    <script>
      mocha.checkLeaks();
      mocha.run();
    </script>
  </body>
</html>
