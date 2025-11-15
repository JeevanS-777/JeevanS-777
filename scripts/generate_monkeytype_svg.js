const fs = require("fs");
const https = require("https");

const username = "Jeevan_S"; // your MonkeyType username
const url = `https://api.monkeytype.com/profile/${username}`;

https.get(url, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    try {
      const json = JSON.parse(data).data;

      // Extract needed values
      const stats = {
        testsStarted: json.typingStats.testsStarted,
        testsCompleted: json.typingStats.testsCompleted,
        timeTyping: json.timeTyping,
        estWords: json.estimatedWords,
        highestWpm: json.personalBests.time[30].wpm,
        highestRaw: json.personalBests.time[30].raw,
        avgWpm: json.typingStats.averageWpm,
        avgAcc: json.typingStats.averageAccuracy,
        last10Wpm: json.typingStats.last10.averageWpm,
        last10Acc: json.typingStats.last10.averageAccuracy,
      };

      // Build SVG dynamically
      const svg = `
<svg width="920" height="320" viewBox="0 0 920 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="920" height="320" rx="14" fill="#1a1d21"/>
  <text x="30" y="40" font-size="26" font-weight="700" fill="#f1f1f1">MonkeyType — ${username}</text>

  <text x="30" y="90" fill="#9aa0a6" font-size="14">Tests Started</text>
  <text x="30" y="120" fill="#ffffff" font-size="32" font-weight="700">${stats.testsStarted}</text>

  <text x="200" y="90" fill="#9aa0a6" font-size="14">Tests Completed</text>
  <text x="200" y="120" fill="#ffffff" font-size="32" font-weight="700">${stats.testsCompleted}</text>

  <text x="420" y="90" fill="#9aa0a6" font-size="14">Time Typing</text>
  <text x="420" y="120" fill="#ffffff" font-size="32" font-weight="700">${stats.timeTyping}</text>

  <text x="650" y="90" fill="#9aa0a6" font-size="14">Estimated Words</text>
  <text x="650" y="120" fill="#ffffff" font-size="32" font-weight="700">${stats.estWords}</text>

  <line x1="30" y1="150" x2="890" y2="150" stroke="#333"/>

  <text x="30" y="190" fill="#9aa0a6" font-size="12">Highest WPM</text>
  <text x="30" y="220" fill="#ffffff" font-size="28" font-weight="700">${stats.highestWpm} (30s)</text>

  <text x="30" y="260" fill="#9aa0a6" font-size="12">Highest Raw WPM</text>
  <text x="30" y="290" fill="#ffffff" font-size="28" font-weight="700">${stats.highestRaw}</text>

  <text x="320" y="190" fill="#9aa0a6" font-size="12">Average WPM</text>
  <text x="320" y="220" fill="#ffffff" font-size="28" font-weight="700">${stats.avgWpm}</text>

  <text x="320" y="260" fill="#9aa0a6" font-size="12">Average Accuracy</text>
  <text x="320" y="290" fill="#ffffff" font-size="28" font-weight="700">${stats.avgAcc}%</text>

  <text x="580" y="190" fill="#9aa0a6" font-size="12">Last 10 WPM</text>
  <text x="580" y="220" fill="#ffffff" font-size="28" font-weight="700">${stats.last10Wpm}</text>

  <text x="580" y="260" fill="#9aa0a6" font-size="12">Last 10 Accuracy</text>
  <text x="580" y="290" fill="#ffffff" font-size="28" font-weight="700">${stats.last10Acc}%</text>
</svg>
`;

      fs.writeFileSync("monkeytype-stats.svg", svg);
      console.log("SVG updated successfully!");
    } catch (err) {
      console.error("Error parsing data:", err.message);
    }
  });
});
