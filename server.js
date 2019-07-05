const express = require('express');
const app = express();
app.use(express.static('./dist/msdb-ts'));
app.listen(80);