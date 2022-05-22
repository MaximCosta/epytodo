const dotenv = require("dotenv");
var express = require("express");
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.db = pool;
    next();
});
app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

let pool = require("./config/db").pool();
let auth = require("./routes/auth").init(app);
let user = require("./routes/user").init(app);
let todos = require("./routes/todos").init(app);

app.use(function (req, res) {
    res.status(404).json({ msg: "page not found" });
});

app.listen(3000, function () {
    console.log("Server is running at PORT:", 3000);
    require("./utils/log_route")("", auth.stack);
    require("./utils/log_route")("/user", user.stack);
    require("./utils/log_route")("/todos", todos.stack);
    console.log("Press CTRL + C to stop server");
});
