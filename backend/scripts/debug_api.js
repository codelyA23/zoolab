const http = require('http');

console.log('Fetching /api/animals...');
http.get('http://localhost:3000/api/animals', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    console.log('Status:', resp.statusCode);
    try {
        console.log('Body:', JSON.stringify(JSON.parse(data), null, 2));
    } catch (e) {
        console.log('Body (Raw):', data);
    }
  });
}).on("error", (err) => {
  console.log("Network Error: " + err.message);
});
