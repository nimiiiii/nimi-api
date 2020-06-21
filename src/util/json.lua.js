const { lua, lualib, lauxlib, to_luastring } = require("fengari");

const tableToJSON = function(table) {
    const L = lauxlib.luaL_newstate();
    lualib.luaL_openlibs(L);

    const code = `
        package.path = package.path .. ";${__dirname.replace(/\\/g, "/")}/?.lua"
        return require("json").encode(${table})
    `;

    if (lauxlib.luaL_dostring(L, to_luastring(code)) !== 0)
        throw new Error(lua.lua_tojsstring(L, -1));

    const jsonstring = lua.lua_tostring(L, -1);
    lua.lua_pop(L, 1);
    lua.lua_close(L);

    return new TextDecoder("utf-8").decode(jsonstring);
};


const tableToObject = function(table) {
    return JSON.parse(tableToJSON(table));
};

module.exports = {
    tableToJSON,
    tableToObject
};