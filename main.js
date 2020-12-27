const express = require('express');
const app = express();
const CONFIG = {
    PORT: 3000
};

app.use(express.static('site'))

app.listen(CONFIG.PORT, () => {
    console.log(`Fiber Search LiveWeb Server listening at port ${CONFIG.PORT}`)
})
