const server = require('./server.js');

const PORT = process.env.PORT || 3030;

server.listen(PORT, () => console.log(`creeping on http://localhost:${PORT}`))