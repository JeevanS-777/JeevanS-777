const fs = require("fs");
const https = require("https");

const req = https.request(
  {
    hostname: "monkeytype.com",
    path: "/api/user",
    method: "GET",
    headers: {
      Authorization: `ApeKey ${process.env.MONKEYTYPE_API_KEY}`,
    },
  },
  (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      const json = JSON.parse(data).data;

      const svg = `
<svg width="920" height="250" xmlns="http://www.w3.org/2000/svg">
  <rect width="920" height="250" fill="#1a1d21" rx="12"/>
  <text x="20" y="40" font-size="28" fill="#fff">MonkeyType — ${json.name}</text>
  <text x="20" y="100" fill="#aaa" font-size="14">Tests Started</text>
  <text x="20" y="130" fill="#fff" font-size="28">${json.testsStarted}</text>
  <text x="250" y="100" fill="#aaa" font-size="14">Tests Completed</text>
  <text x="250" y="130" fill="#fff" font-size="28">${json.testsCompleted}</text>
  <text x="500" y="100" fill="#aaa" font-size="14">Time Typing</text>
  <text x="500" y="130" fill="#fff" font-size="28">${json.timeTyping}</text>
</svg>
`;

      fs.writeFileSync("monkeytype-stats.svg", svg);
      console.log("SVG updated!");
    });
  }
);

req.on("error", console.error);
req.end();
