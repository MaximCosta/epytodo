module.exports = function (baseUrl, routes) {
    var Table = require("cli-table");
    var table = new Table({
        head: ["", "Path", "Middleware"],
        chars: { top: "═", "top-mid": "╤", "top-left": "╔", "top-right": "╗", bottom: "═", "bottom-mid": "╧", "bottom-left": "╚", "bottom-right": "╝", left: "║", "left-mid": "╟", mid: "─", "mid-mid": "┼", right: "║", "right-mid": "╢", middle: "│" },
    });
    console.log(`\nAPI for \x1b[31;3;1m${baseUrl || "/"}\x1b[0m`);

    for (var key in routes) {
        if (routes.hasOwnProperty(key)) {
            var val = routes[key];
            if (val.route) {
                val = val.route;
                var _o = {};
                _o[val.stack[0].method] = [baseUrl + val.path, val.stack[0].handle.name];
                table.push(_o);
            }
        }
    }

    console.log(table.toString());
    return table;
};
