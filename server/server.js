import express from 'express';
import serverRenderer from './middleware/renderer';

const PORT = 3000;
const path = require('path');
const app = express();
const router = express.Router();

router.use('^/$', serverRenderer);

console.log('static: ', path.resolve(__dirname, '../../'));

router.use(express.static(
    path.resolve(__dirname, '../../'),
    { maxAge: '30d' }
));

app.use(router);

// app.get('/client', (req, res) => {
//     const response = template('Client Side Rendered page');
//     res.setHeader('Cache-Control', 'assets, max-age=604800');
//     res.send(response);
// });

// app.get('/exit', (req, res) => {
//     if(process.env.PORT) {
//       res.send("Sorry, the server denies your request")
//     } else {
//       res.send("shutting down")
//       process.exit(0)
//     }
// });

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});