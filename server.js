const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.get("/:path", (req, res) => {
    let fname = req.params.path;
    fname = (fname ?? "").replace(/\//g, "");
    const uri = path.resolve(__dirname, "dist/" + fname);
    if (fs.existsSync(uri)) {
        res.end(fs.readFileSync(uri));
    } else res.end(fs.readFileSync(path.resolve(__dirname, "dist/index.html")));
});
app.get("*", (req, res) => {
    res.end(fs.readFileSync(path.resolve(__dirname, "dist/index.html")));
});
app.listen(7000, () => console.log("listening on port 7000"));
