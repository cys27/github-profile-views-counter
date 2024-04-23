const fs = require("fs"), express = require("express"), app = express();
app.listen(3000);

const data = JSON.parse(fs.readFileSync(__dirname + "/users.json", {encoding: "utf8", flag: "r"}));

app.get("/counter", (req, res) => {
    const userName = req.query.username || "root";
    if(userName === "root") res.send("0");

    userName in data ? data[userName]++ : data[userName]=1;
    fs.writeFileSync(__dirname + '/users.json', JSON.stringify(data));

    res.send(`
        <svg xmlns="http://www.w3.org/2000/svg" width="110.2" height="20">
            <linearGradient id="b" x2="0" y2="100%">
                <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
                <stop offset="1" stop-opacity=".1"/>
            </linearGradient>
            <mask id="a">
                <rect width="110.2" height="20" rx="3" fill="#fff"/>
            </mask>
            <g mask="url(#a)">
                <rect width="79.2" height="20" fill="#555"/>
                <rect x="79.2" width="31" height="20" fill="#e05d44"/>
                <rect width="110.2" height="20" fill="url(#b)"/>
            </g>
            <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
                <text x="40.6" y="15" fill="#010101" fill-opacity=".3">Profile views</text>
                <text x="40.6" y="14">Profile views</text>
                <text x="93.7" y="15" fill="#010101" fill-opacity=".3">531</text>
                <text x="93.7" y="14">${data[userName]}</text>
            </g>
        </svg>
    `);
});
