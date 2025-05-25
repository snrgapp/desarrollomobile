/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/user/route";
exports.ids = ["app/api/user/route"];
exports.modules = {

/***/ "(rsc)/../../node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.js&appDir=C%3A%5CUsers%5Ceric_%5CDesktop%5Csynergy-match-app%5Capps%5Cweb%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ceric_%5CDesktop%5Csynergy-match-app%5Capps%5Cweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.js&appDir=C%3A%5CUsers%5Ceric_%5CDesktop%5Csynergy-match-app%5Capps%5Cweb%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ceric_%5CDesktop%5Csynergy-match-app%5Capps%5Cweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/../../node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/../../node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/../../node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_eric_Desktop_synergy_match_app_apps_web_app_api_user_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/user/route.js */ \"(rsc)/./app/api/user/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user/route\",\n        pathname: \"/api/user\",\n        filename: \"route\",\n        bundlePath: \"app/api/user/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\eric_\\\\Desktop\\\\synergy-match-app\\\\apps\\\\web\\\\app\\\\api\\\\user\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_eric_Desktop_synergy_match_app_apps_web_app_api_user_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL25leHRAMTUuMy4yX3JlYWN0LWRvbUAxOS4xLjBfcmVhY3RAMTkuMS4wX19yZWFjdEAxOS4xLjAvbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1hcHAtbG9hZGVyL2luZGV4LmpzP25hbWU9YXBwJTJGYXBpJTJGdXNlciUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdXNlciUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVzZXIlMkZyb3V0ZS5qcyZhcHBEaXI9QyUzQSU1Q1VzZXJzJTVDZXJpY18lNUNEZXNrdG9wJTVDc3luZXJneS1tYXRjaC1hcHAlNUNhcHBzJTVDd2ViJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNlcmljXyU1Q0Rlc2t0b3AlNUNzeW5lcmd5LW1hdGNoLWFwcCU1Q2FwcHMlNUN3ZWImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2lDO0FBQzlHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxlcmljX1xcXFxEZXNrdG9wXFxcXHN5bmVyZ3ktbWF0Y2gtYXBwXFxcXGFwcHNcXFxcd2ViXFxcXGFwcFxcXFxhcGlcXFxcdXNlclxcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdXNlci9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3VzZXJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3VzZXIvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxlcmljX1xcXFxEZXNrdG9wXFxcXHN5bmVyZ3ktbWF0Y2gtYXBwXFxcXGFwcHNcXFxcd2ViXFxcXGFwcFxcXFxhcGlcXFxcdXNlclxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.js&appDir=C%3A%5CUsers%5Ceric_%5CDesktop%5Csynergy-match-app%5Capps%5Cweb%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ceric_%5CDesktop%5Csynergy-match-app%5Capps%5Cweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/../../node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*************************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/../../packages/db/lib/mongodb.js":
/*!****************************************!*\
  !*** ../../packages/db/lib/mongodb.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"(rsc)/../../node_modules/.pnpm/mongoose@8.15.0/node_modules/mongoose/index.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// packages/db/lib/mongodb.js\n// O app/libs/mongodb.js - Asegúrate de que esta sea la ruta correcta donde tienes tu dbConnect\n\n// Configuración global para Mongoose\nmongoose__WEBPACK_IMPORTED_MODULE_0___default().set(\"strictQuery\", false);\n// Asegúrate de que tu URL de conexión a MongoDB esté definida en tus variables de entorno (.env.local, .env)\nconst MONGODB_URI = process.env.DB_COMPASS; // Ajusta el nombre de la variable si es diferente\nif (!MONGODB_URI) {\n    throw new Error('Please define the DB_COMPASS environment variable inside .env.local');\n}\n// Verifica si estamos en un entorno de desarrollo (NODE_ENV no es 'production')\nconst isDevelopment = \"development\" !== 'production';\n// Usa una variable global para cachear la conexión solo en desarrollo,\n// pero con un enfoque más \"limpio\" para evitar problemas de HMR\n// Para producción, se comportará como el patrón global.\nlet cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    // En producción, siempre usa la conexión cacheada.\n    // En desarrollo, también intentará usar la cacheada primero para eficiencia,\n    // pero la diferencia principal es que si el HMR la rompe,\n    // la siguiente solicitud simplemente volverá a intentar conectar.\n    // Si ya tenemos una conexión cacheada, la reutilizamos\n    if (cached.conn) {\n        console.log(\"Mongoose ya está conectado (reutilizando conexión existente)\");\n        return cached.conn;\n    }\n    // Si no hay una promesa de conexión en curso, iniciamos una nueva\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: true,\n            serverSelectionTimeoutMS: 50000,\n            socketTimeoutMS: 55000\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongooseInstance)=>{\n            console.log('🎉🎉🎉 Mongoose CONECTADO a MongoDB Atlas 🎉🎉🎉');\n            console.log('######################');\n            console.log(`###### DB: ${mongooseInstance.connection.name || 'Synergy_DB'} ######`);\n            console.log('######################');\n            return mongooseInstance;\n        }).catch((error)=>{\n            console.error('❌❌❌ ERROR AL CONECTAR Mongoose a MongoDB Atlas:', error.message);\n            // Si hay un error, reseteamos el caché para que la próxima llamada intente una nueva conexión\n            cached.conn = null;\n            cached.promise = null;\n            throw error; // Propagamos el error\n        });\n    }\n    // Esperamos a que la conexión se resuelva\n    cached.conn = await cached.promise;\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect); // const dbConnect = async () => {\n //     try {\n //         await mongoose.connect(process.env.DB_COMPASS);\n //         console.log('Mongoose is connected');\n //         console.log(\"######################\");\n //         console.log(\"###### API REST ######\");\n //         console.log(\"######################\");\n //         // Llamar a la función de actualización del esquema después de la conexión\n //       //  await updateSchema();\n //     } catch (error) {\n //         console.error(\"Error connecting to MongoDB:\", error);\n //         throw error; // Relanzar el error para que pueda ser manejado en el contexto superior\n //     }\n // };\n // export default dbConnect;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vcGFja2FnZXMvZGIvbGliL21vbmdvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNkJBQTZCO0FBQzdCLCtGQUErRjtBQUUvRDtBQUVoQyxxQ0FBcUM7QUFDckNBLG1EQUFZLENBQUMsZUFBZTtBQUU1Qiw2R0FBNkc7QUFDN0csTUFBTUUsY0FBY0MsUUFBUUMsR0FBRyxDQUFDQyxVQUFVLEVBQUUsa0RBQWtEO0FBRTlGLElBQUksQ0FBQ0gsYUFBYTtJQUNoQixNQUFNLElBQUlJLE1BQ1I7QUFFSjtBQUVBLGdGQUFnRjtBQUNoRixNQUFNQyxnQkFBZ0JKLGtCQUF5QjtBQUUvQyx1RUFBdUU7QUFDdkUsZ0VBQWdFO0FBQ2hFLHdEQUF3RDtBQUN4RCxJQUFJSyxTQUFTQyxPQUFPVCxRQUFRO0FBRTVCLElBQUksQ0FBQ1EsUUFBUTtJQUNYQSxTQUFTQyxPQUFPVCxRQUFRLEdBQUc7UUFBRVUsTUFBTTtRQUFNQyxTQUFTO0lBQUs7QUFDekQ7QUFDQSxlQUFlQztJQUNiLG1EQUFtRDtJQUNuRCw2RUFBNkU7SUFDN0UsMERBQTBEO0lBQzFELGtFQUFrRTtJQUVsRSx1REFBdUQ7SUFDdkQsSUFBSUosT0FBT0UsSUFBSSxFQUFFO1FBQ2ZHLFFBQVFDLEdBQUcsQ0FBQztRQUNaLE9BQU9OLE9BQU9FLElBQUk7SUFDcEI7SUFFQSxrRUFBa0U7SUFDbEUsSUFBSSxDQUFDRixPQUFPRyxPQUFPLEVBQUU7UUFDbkIsTUFBTUksT0FBTztZQUNYQyxnQkFBZ0I7WUFDaEJDLDBCQUEwQjtZQUMxQkMsaUJBQWlCO1FBQ25CO1FBRUFWLE9BQU9HLE9BQU8sR0FBR1gsdURBQWdCLENBQUNFLGFBQWFhLE1BQzVDSyxJQUFJLENBQUMsQ0FBQ0M7WUFDTFIsUUFBUUMsR0FBRyxDQUFDO1lBQ1pELFFBQVFDLEdBQUcsQ0FBQztZQUNaRCxRQUFRQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUVPLGlCQUFpQkMsVUFBVSxDQUFDQyxJQUFJLElBQUksYUFBYSxPQUFPLENBQUM7WUFDbkZWLFFBQVFDLEdBQUcsQ0FBQztZQUNaLE9BQU9PO1FBQ1QsR0FDQ0csS0FBSyxDQUFDQyxDQUFBQTtZQUNMWixRQUFRWSxLQUFLLENBQUMsbURBQW1EQSxNQUFNQyxPQUFPO1lBQzlFLDhGQUE4RjtZQUM5RmxCLE9BQU9FLElBQUksR0FBRztZQUNkRixPQUFPRyxPQUFPLEdBQUc7WUFDakIsTUFBTWMsT0FBTyxzQkFBc0I7UUFDckM7SUFDSjtJQUVBLDBDQUEwQztJQUMxQ2pCLE9BQU9FLElBQUksR0FBRyxNQUFNRixPQUFPRyxPQUFPO0lBQ2xDLE9BQU9ILE9BQU9FLElBQUk7QUFDcEI7QUFFQSxpRUFBZUUsU0FBU0EsRUFBQyxDQUV6QixrQ0FBa0M7Q0FDbEMsWUFBWTtDQUNaLDBEQUEwRDtDQUMxRCxnREFBZ0Q7Q0FDaEQsaURBQWlEO0NBQ2pELGlEQUFpRDtDQUNqRCxpREFBaUQ7Q0FFakQscUZBQXFGO0NBQ3JGLGtDQUFrQztDQUNsQyx3QkFBd0I7Q0FDeEIsZ0VBQWdFO0NBQ2hFLGdHQUFnRztDQUNoRyxRQUFRO0NBQ1IsS0FBSztDQUVMLDRCQUE0QiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxlcmljX1xcRGVza3RvcFxcc3luZXJneS1tYXRjaC1hcHBcXHBhY2thZ2VzXFxkYlxcbGliXFxtb25nb2RiLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHBhY2thZ2VzL2RiL2xpYi9tb25nb2RiLmpzXHJcbi8vIE8gYXBwL2xpYnMvbW9uZ29kYi5qcyAtIEFzZWfDunJhdGUgZGUgcXVlIGVzdGEgc2VhIGxhIHJ1dGEgY29ycmVjdGEgZG9uZGUgdGllbmVzIHR1IGRiQ29ubmVjdFxyXG5cclxuaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxuLy8gQ29uZmlndXJhY2nDs24gZ2xvYmFsIHBhcmEgTW9uZ29vc2VcclxubW9uZ29vc2Uuc2V0KFwic3RyaWN0UXVlcnlcIiwgZmFsc2UpO1xyXG5cclxuLy8gQXNlZ8O6cmF0ZSBkZSBxdWUgdHUgVVJMIGRlIGNvbmV4acOzbiBhIE1vbmdvREIgZXN0w6kgZGVmaW5pZGEgZW4gdHVzIHZhcmlhYmxlcyBkZSBlbnRvcm5vICguZW52LmxvY2FsLCAuZW52KVxyXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52LkRCX0NPTVBBU1M7IC8vIEFqdXN0YSBlbCBub21icmUgZGUgbGEgdmFyaWFibGUgc2kgZXMgZGlmZXJlbnRlXHJcblxyXG5pZiAoIU1PTkdPREJfVVJJKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgJ1BsZWFzZSBkZWZpbmUgdGhlIERCX0NPTVBBU1MgZW52aXJvbm1lbnQgdmFyaWFibGUgaW5zaWRlIC5lbnYubG9jYWwnXHJcbiAgKTtcclxufVxyXG5cclxuLy8gVmVyaWZpY2Egc2kgZXN0YW1vcyBlbiB1biBlbnRvcm5vIGRlIGRlc2Fycm9sbG8gKE5PREVfRU5WIG5vIGVzICdwcm9kdWN0aW9uJylcclxuY29uc3QgaXNEZXZlbG9wbWVudCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XHJcblxyXG4vLyBVc2EgdW5hIHZhcmlhYmxlIGdsb2JhbCBwYXJhIGNhY2hlYXIgbGEgY29uZXhpw7NuIHNvbG8gZW4gZGVzYXJyb2xsbyxcclxuLy8gcGVybyBjb24gdW4gZW5mb3F1ZSBtw6FzIFwibGltcGlvXCIgcGFyYSBldml0YXIgcHJvYmxlbWFzIGRlIEhNUlxyXG4vLyBQYXJhIHByb2R1Y2Npw7NuLCBzZSBjb21wb3J0YXLDoSBjb21vIGVsIHBhdHLDs24gZ2xvYmFsLlxyXG5sZXQgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlO1xyXG5cclxuaWYgKCFjYWNoZWQpIHtcclxuICBjYWNoZWQgPSBnbG9iYWwubW9uZ29vc2UgPSB7IGNvbm46IG51bGwsIHByb21pc2U6IG51bGwgfTtcclxufVxyXG5hc3luYyBmdW5jdGlvbiBkYkNvbm5lY3QoKSB7XHJcbiAgLy8gRW4gcHJvZHVjY2nDs24sIHNpZW1wcmUgdXNhIGxhIGNvbmV4acOzbiBjYWNoZWFkYS5cclxuICAvLyBFbiBkZXNhcnJvbGxvLCB0YW1iacOpbiBpbnRlbnRhcsOhIHVzYXIgbGEgY2FjaGVhZGEgcHJpbWVybyBwYXJhIGVmaWNpZW5jaWEsXHJcbiAgLy8gcGVybyBsYSBkaWZlcmVuY2lhIHByaW5jaXBhbCBlcyBxdWUgc2kgZWwgSE1SIGxhIHJvbXBlLFxyXG4gIC8vIGxhIHNpZ3VpZW50ZSBzb2xpY2l0dWQgc2ltcGxlbWVudGUgdm9sdmVyw6EgYSBpbnRlbnRhciBjb25lY3Rhci5cclxuXHJcbiAgLy8gU2kgeWEgdGVuZW1vcyB1bmEgY29uZXhpw7NuIGNhY2hlYWRhLCBsYSByZXV0aWxpemFtb3NcclxuICBpZiAoY2FjaGVkLmNvbm4pIHtcclxuICAgIGNvbnNvbGUubG9nKFwiTW9uZ29vc2UgeWEgZXN0w6EgY29uZWN0YWRvIChyZXV0aWxpemFuZG8gY29uZXhpw7NuIGV4aXN0ZW50ZSlcIik7XHJcbiAgICByZXR1cm4gY2FjaGVkLmNvbm47XHJcbiAgfVxyXG5cclxuICAvLyBTaSBubyBoYXkgdW5hIHByb21lc2EgZGUgY29uZXhpw7NuIGVuIGN1cnNvLCBpbmljaWFtb3MgdW5hIG51ZXZhXHJcbiAgaWYgKCFjYWNoZWQucHJvbWlzZSkge1xyXG4gICAgY29uc3Qgb3B0cyA9IHtcclxuICAgICAgYnVmZmVyQ29tbWFuZHM6IHRydWUsIC8vIEVzdG8gZXMgY3J1Y2lhbDogTW9uZ29vc2UgZXNwZXJhcsOhIGEgcXVlIGxhIGNvbmV4acOzbiBlc3TDqSBsaXN0YVxyXG4gICAgICBzZXJ2ZXJTZWxlY3Rpb25UaW1lb3V0TVM6IDUwMDAwLCAvLyAzMCBzZWd1bmRvcyBwYXJhIGVuY29udHJhciBlbCBzZXJ2aWRvclxyXG4gICAgICBzb2NrZXRUaW1lb3V0TVM6IDU1MDAwLCAvLyA0NSBzZWd1bmRvcyBwYXJhIG9wZXJhY2lvbmVzIGRlIGxlY3R1cmEvZXNjcml0dXJhXHJcbiAgICB9O1xyXG5cclxuICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSwgb3B0cylcclxuICAgICAgLnRoZW4oKG1vbmdvb3NlSW5zdGFuY2UpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygn8J+OifCfjonwn46JIE1vbmdvb3NlIENPTkVDVEFETyBhIE1vbmdvREIgQXRsYXMg8J+OifCfjonwn46JJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgIyMjIyMjIERCOiAke21vbmdvb3NlSW5zdGFuY2UuY29ubmVjdGlvbi5uYW1lIHx8ICdTeW5lcmd5X0RCJ30gIyMjIyMjYCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMnKTtcclxuICAgICAgICByZXR1cm4gbW9uZ29vc2VJbnN0YW5jZTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCfinYzinYzinYwgRVJST1IgQUwgQ09ORUNUQVIgTW9uZ29vc2UgYSBNb25nb0RCIEF0bGFzOicsIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIC8vIFNpIGhheSB1biBlcnJvciwgcmVzZXRlYW1vcyBlbCBjYWNow6kgcGFyYSBxdWUgbGEgcHLDs3hpbWEgbGxhbWFkYSBpbnRlbnRlIHVuYSBudWV2YSBjb25leGnDs25cclxuICAgICAgICBjYWNoZWQuY29ubiA9IG51bGw7XHJcbiAgICAgICAgY2FjaGVkLnByb21pc2UgPSBudWxsO1xyXG4gICAgICAgIHRocm93IGVycm9yOyAvLyBQcm9wYWdhbW9zIGVsIGVycm9yXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gRXNwZXJhbW9zIGEgcXVlIGxhIGNvbmV4acOzbiBzZSByZXN1ZWx2YVxyXG4gIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XHJcbiAgcmV0dXJuIGNhY2hlZC5jb25uO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkYkNvbm5lY3Q7XHJcblxyXG4vLyBjb25zdCBkYkNvbm5lY3QgPSBhc3luYyAoKSA9PiB7XHJcbi8vICAgICB0cnkge1xyXG4vLyAgICAgICAgIGF3YWl0IG1vbmdvb3NlLmNvbm5lY3QocHJvY2Vzcy5lbnYuREJfQ09NUEFTUyk7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coJ01vbmdvb3NlIGlzIGNvbm5lY3RlZCcpO1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1wiKTtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyBBUEkgUkVTVCAjIyMjIyNcIik7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXCIpO1xyXG5cclxuLy8gICAgICAgICAvLyBMbGFtYXIgYSBsYSBmdW5jacOzbiBkZSBhY3R1YWxpemFjacOzbiBkZWwgZXNxdWVtYSBkZXNwdcOpcyBkZSBsYSBjb25leGnDs25cclxuLy8gICAgICAgLy8gIGF3YWl0IHVwZGF0ZVNjaGVtYSgpO1xyXG4vLyAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuLy8gICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY29ubmVjdGluZyB0byBNb25nb0RCOlwiLCBlcnJvcik7XHJcbi8vICAgICAgICAgdGhyb3cgZXJyb3I7IC8vIFJlbGFuemFyIGVsIGVycm9yIHBhcmEgcXVlIHB1ZWRhIHNlciBtYW5lamFkbyBlbiBlbCBjb250ZXh0byBzdXBlcmlvclxyXG4vLyAgICAgfVxyXG4vLyB9O1xyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgZGJDb25uZWN0O1xyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJzZXQiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJEQl9DT01QQVNTIiwiRXJyb3IiLCJpc0RldmVsb3BtZW50IiwiY2FjaGVkIiwiZ2xvYmFsIiwiY29ubiIsInByb21pc2UiLCJkYkNvbm5lY3QiLCJjb25zb2xlIiwibG9nIiwib3B0cyIsImJ1ZmZlckNvbW1hbmRzIiwic2VydmVyU2VsZWN0aW9uVGltZW91dE1TIiwic29ja2V0VGltZW91dE1TIiwiY29ubmVjdCIsInRoZW4iLCJtb25nb29zZUluc3RhbmNlIiwiY29ubmVjdGlvbiIsIm5hbWUiLCJjYXRjaCIsImVycm9yIiwibWVzc2FnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../../packages/db/lib/mongodb.js\n");

/***/ }),

/***/ "(rsc)/../../packages/db/models/user.js":
/*!****************************************!*\
  !*** ../../packages/db/models/user.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UserModel: () => (/* binding */ UserModel)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"(rsc)/../../node_modules/.pnpm/mongoose@8.15.0/node_modules/mongoose/index.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst userSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    userNumber: {\n        type: Number\n    },\n    name: {\n        type: String,\n        required: [\n            true,\n            \"Please enter a name\"\n        ]\n    },\n    lastname: {\n        type: String,\n        required: [\n            true,\n            \"Please enter a last name\"\n        ]\n    },\n    email: {\n        type: String,\n        required: [\n            true,\n            \"Please enter an email\"\n        ]\n    },\n    phone: {\n        type: String,\n        required: [\n            true,\n            \"Please enter a phone number\"\n        ]\n    },\n    password: {\n        type: String,\n        required: [\n            true,\n            \"Please enter a password\"\n        ]\n    }\n});\nconst UserModel = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('User', userSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vcGFja2FnZXMvZGIvbW9kZWxzL3VzZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGFBQWEsSUFBSUQsd0RBQWUsQ0FBQztJQUVyQ0csWUFBYztRQUFFQyxNQUFNQztJQUFNO0lBQzVCQyxNQUFjO1FBQUVGLE1BQU1HO1FBQVFDLFVBQVU7WUFBQztZQUFNO1NBQXNCO0lBQUM7SUFDdEVDLFVBQWM7UUFBRUwsTUFBTUc7UUFBUUMsVUFBVTtZQUFDO1lBQU07U0FBMkI7SUFBQztJQUMzRUUsT0FBYztRQUFFTixNQUFNRztRQUFRQyxVQUFVO1lBQUM7WUFBTTtTQUF3QjtJQUFDO0lBQ3hFRyxPQUFjO1FBQUVQLE1BQU1HO1FBQVFDLFVBQVU7WUFBQztZQUFNO1NBQThCO0lBQUM7SUFDOUVJLFVBQWM7UUFBRVIsTUFBTUc7UUFBUUMsVUFBVTtZQUFDO1lBQU07U0FBMEI7SUFBQztBQUU1RTtBQUVPLE1BQU1LLFlBQVliLHdEQUFlLENBQUNlLElBQUksSUFBSWYscURBQWMsQ0FBQyxRQUFRQyxZQUFZIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGVyaWNfXFxEZXNrdG9wXFxzeW5lcmd5LW1hdGNoLWFwcFxccGFja2FnZXNcXGRiXFxtb2RlbHNcXHVzZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuXHJcbmNvbnN0IHVzZXJTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuXHJcbiAgdXNlck51bWJlcjogICB7IHR5cGU6IE51bWJlcn0sXHJcbiAgbmFtZTogICAgICAgICB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IFt0cnVlLCBcIlBsZWFzZSBlbnRlciBhIG5hbWVcIl0gfSxcclxuICBsYXN0bmFtZTogICAgIHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogW3RydWUsIFwiUGxlYXNlIGVudGVyIGEgbGFzdCBuYW1lXCJdIH0sXHJcbiAgZW1haWw6ICAgICAgICB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IFt0cnVlLCBcIlBsZWFzZSBlbnRlciBhbiBlbWFpbFwiXSB9LFxyXG4gIHBob25lOiAgICAgICAgeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiBbdHJ1ZSwgXCJQbGVhc2UgZW50ZXIgYSBwaG9uZSBudW1iZXJcIl0gfSxcclxuICBwYXNzd29yZDogICAgIHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogW3RydWUsIFwiUGxlYXNlIGVudGVyIGEgcGFzc3dvcmRcIl0gfSxcclxuXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFVzZXJNb2RlbCA9IG1vbmdvb3NlLm1vZGVscy5Vc2VyIHx8IG1vbmdvb3NlLm1vZGVsKCdVc2VyJywgdXNlclNjaGVtYSk7Il0sIm5hbWVzIjpbIm1vbmdvb3NlIiwidXNlclNjaGVtYSIsIlNjaGVtYSIsInVzZXJOdW1iZXIiLCJ0eXBlIiwiTnVtYmVyIiwibmFtZSIsIlN0cmluZyIsInJlcXVpcmVkIiwibGFzdG5hbWUiLCJlbWFpbCIsInBob25lIiwicGFzc3dvcmQiLCJVc2VyTW9kZWwiLCJtb2RlbHMiLCJVc2VyIiwibW9kZWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../../packages/db/models/user.js\n");

/***/ }),

/***/ "(rsc)/./app/api/user/route.js":
/*!*******************************!*\
  !*** ./app/api/user/route.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _repo_db_lib_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @repo/db/lib/mongodb */ \"(rsc)/../../packages/db/lib/mongodb.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/../../node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/api/server.js\");\n/* harmony import */ var _repo_db_models_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @repo/db/models/user */ \"(rsc)/../../packages/db/models/user.js\");\n\n\n\n//METODO POST api/user Crear un nuevo usuario\nasync function POST(req) {\n    try {\n        // ✅ Conexión a la base de datos primero\n        await (0,_repo_db_lib_mongodb__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n        // ✅ Extrae y valida el body\n        const body = await req.json();\n        console.log(\"llega por Body\", body);\n        // ✅ Verifica que el body tenga los campos requeridos\n        const requiredFields = [\n            'name',\n            'lastname',\n            'email',\n            'phone',\n            'password'\n        ];\n        const missingField = requiredFields.find((field)=>!body[field]);\n        if (missingField) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: `Falta el campo: ${missingField}`\n            }, {\n                status: 400\n            });\n        }\n        // --- Lógica para generar el userNumber ---\n        let nextUserNumber;\n        // 1. Encontrar el usuario con el userNumber más alto\n        // Ordenamos por userNumber de forma descendente (-1) y limitamos a 1\n        const lastUser = await _repo_db_models_user__WEBPACK_IMPORTED_MODULE_2__.UserModel.findOne().sort({\n            userNumber: -1\n        }).limit(1);\n        if (lastUser) {\n            // Si hay un último usuario, incrementa su userNumber\n            nextUserNumber = lastUser.userNumber + 1;\n        } else {\n            // Si la colección está vacía, el primer userNumber es 100001\n            nextUserNumber = 100001;\n        }\n        // ✅ Verifica si ya existe un usuario con ese email\n        const existingUser = await _repo_db_models_user__WEBPACK_IMPORTED_MODULE_2__.UserModel.findOne({\n            email: body.email\n        });\n        if (existingUser) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"El email ya está registrado\"\n            }, {\n                status: 400\n            });\n        }\n        console.log(\"userNumber\", nextUserNumber);\n        // ✅ Crea el nuevo usuario\n        const newBody = {\n            ...body,\n            userNumber: nextUserNumber\n        };\n        const newUser = await _repo_db_models_user__WEBPACK_IMPORTED_MODULE_2__.UserModel.create(newBody);\n        // Aquí puedes agregar lógica adicional si es necesario, como enviar un correo de bienvenida\n        // ✅ Respuesta exitosa\n        // Elimina el campo password antes de enviar la respuesta\n        const { password, ...userWithoutPassword } = newUser._doc;\n        console.log(\"Usuario creado\", userWithoutPassword);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            message: \"Usuario creado\",\n            user: userWithoutPassword\n        }, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(\"Error al crear el usuario\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Error interno al crear el usuario\"\n        }, {\n            status: 500\n        });\n    }\n} //METODO GET api/user Buscar todo los usuarios\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VzZXIvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUM2QztBQUNGO0FBQ007QUFHakQsNkNBQTZDO0FBQ3RDLGVBQWVHLEtBQUtDLEdBQUc7SUFDNUIsSUFBSTtRQUNGLHdDQUF3QztRQUN4QyxNQUFNSixnRUFBU0E7UUFFZiw0QkFBNEI7UUFDNUIsTUFBTUssT0FBTyxNQUFNRCxJQUFJRSxJQUFJO1FBQzNCQyxRQUFRQyxHQUFHLENBQUMsa0JBQWtCSDtRQUU5QixxREFBcUQ7UUFFckQsTUFBTUksaUJBQWlCO1lBQUM7WUFBUTtZQUFZO1lBQVM7WUFBUztTQUFXO1FBQ3pFLE1BQU1DLGVBQWVELGVBQWVFLElBQUksQ0FBQ0MsQ0FBQUEsUUFBUyxDQUFDUCxJQUFJLENBQUNPLE1BQU07UUFFOUQsSUFBSUYsY0FBYztZQUNoQixPQUFPVCxxREFBWUEsQ0FBQ0ssSUFBSSxDQUFDO2dCQUFFTyxPQUFPLENBQUMsZ0JBQWdCLEVBQUVILGNBQWM7WUFBQyxHQUFHO2dCQUFFSSxRQUFRO1lBQUk7UUFDdkY7UUFFQyw0Q0FBNEM7UUFDekMsSUFBSUM7UUFFSixxREFBcUQ7UUFDckQscUVBQXFFO1FBQ3JFLE1BQU1DLFdBQVcsTUFBTWQsMkRBQVNBLENBQUNlLE9BQU8sR0FBR0MsSUFBSSxDQUFDO1lBQUVDLFlBQVksQ0FBQztRQUFFLEdBQUdDLEtBQUssQ0FBQztRQUUxRSxJQUFJSixVQUFVO1lBQ1YscURBQXFEO1lBQ3JERCxpQkFBaUJDLFNBQVNHLFVBQVUsR0FBRztRQUMzQyxPQUFPO1lBQ0gsNkRBQTZEO1lBQzdESixpQkFBaUI7UUFDckI7UUFFSixtREFBbUQ7UUFDbkQsTUFBTU0sZUFBZSxNQUFNbkIsMkRBQVNBLENBQUNlLE9BQU8sQ0FBQztZQUFFSyxPQUFPakIsS0FBS2lCLEtBQUs7UUFBQztRQUNqRSxJQUFJRCxjQUFjO1lBQ2hCLE9BQU9wQixxREFBWUEsQ0FBQ0ssSUFBSSxDQUFDO2dCQUFFTyxPQUFPO1lBQThCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNuRjtRQUVBUCxRQUFRQyxHQUFHLENBQUMsY0FBY087UUFDMUIsMEJBQTBCO1FBQzFCLE1BQU1RLFVBQVU7WUFDWixHQUFHbEIsSUFBSTtZQUNQYyxZQUFhSjtRQUNqQjtRQUNBLE1BQU1TLFVBQVUsTUFBTXRCLDJEQUFTQSxDQUFDdUIsTUFBTSxDQUFDRjtRQUN2Qyw0RkFBNEY7UUFFNUYsc0JBQXNCO1FBQ3RCLHlEQUF5RDtRQUN6RCxNQUFNLEVBQUVHLFFBQVEsRUFBRSxHQUFHQyxxQkFBcUIsR0FBR0gsUUFBUUksSUFBSTtRQUV6RHJCLFFBQVFDLEdBQUcsQ0FBQyxrQkFBa0JtQjtRQUU5QixPQUFPMUIscURBQVlBLENBQUNLLElBQUksQ0FBQztZQUFFdUIsU0FBUztZQUFrQkMsTUFBTUg7UUFBb0IsR0FBRztZQUFFYixRQUFRO1FBQUk7SUFFbkcsRUFBRSxPQUFPRCxPQUFPO1FBQ2ROLFFBQVFNLEtBQUssQ0FBQyw2QkFBNkJBO1FBQzNDLE9BQU9aLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7WUFBRU8sT0FBTztRQUFvQyxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUN6RjtBQUNGLEVBRUEsOENBQThDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGVyaWNfXFxEZXNrdG9wXFxzeW5lcmd5LW1hdGNoLWFwcFxcYXBwc1xcd2ViXFxhcHBcXGFwaVxcdXNlclxccm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBkYkNvbm5lY3QgZnJvbSBcIkByZXBvL2RiL2xpYi9tb25nb2RiXCI7XHJcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tIFwiQHJlcG8vZGIvbW9kZWxzL3VzZXJcIjtcclxuXHJcblxyXG4vL01FVE9ETyBQT1NUIGFwaS91c2VyIENyZWFyIHVuIG51ZXZvIHVzdWFyaW9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxKSB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIOKchSBDb25leGnDs24gYSBsYSBiYXNlIGRlIGRhdG9zIHByaW1lcm9cclxuICAgIGF3YWl0IGRiQ29ubmVjdCgpO1xyXG5cclxuICAgIC8vIOKchSBFeHRyYWUgeSB2YWxpZGEgZWwgYm9keVxyXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcImxsZWdhIHBvciBCb2R5XCIsIGJvZHkpO1xyXG5cclxuICAgIC8vIOKchSBWZXJpZmljYSBxdWUgZWwgYm9keSB0ZW5nYSBsb3MgY2FtcG9zIHJlcXVlcmlkb3NcclxuXHJcbiAgICBjb25zdCByZXF1aXJlZEZpZWxkcyA9IFsnbmFtZScsICdsYXN0bmFtZScsICdlbWFpbCcsICdwaG9uZScsICdwYXNzd29yZCddO1xyXG4gICAgY29uc3QgbWlzc2luZ0ZpZWxkID0gcmVxdWlyZWRGaWVsZHMuZmluZChmaWVsZCA9PiAhYm9keVtmaWVsZF0pO1xyXG5cclxuICAgIGlmIChtaXNzaW5nRmllbGQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGBGYWx0YSBlbCBjYW1wbzogJHttaXNzaW5nRmllbGR9YCB9LCB7IHN0YXR1czogNDAwIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICAvLyAtLS0gTMOzZ2ljYSBwYXJhIGdlbmVyYXIgZWwgdXNlck51bWJlciAtLS1cclxuICAgICAgICBsZXQgbmV4dFVzZXJOdW1iZXI7XHJcblxyXG4gICAgICAgIC8vIDEuIEVuY29udHJhciBlbCB1c3VhcmlvIGNvbiBlbCB1c2VyTnVtYmVyIG3DoXMgYWx0b1xyXG4gICAgICAgIC8vIE9yZGVuYW1vcyBwb3IgdXNlck51bWJlciBkZSBmb3JtYSBkZXNjZW5kZW50ZSAoLTEpIHkgbGltaXRhbW9zIGEgMVxyXG4gICAgICAgIGNvbnN0IGxhc3RVc2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoKS5zb3J0KHsgdXNlck51bWJlcjogLTEgfSkubGltaXQoMSk7XHJcblxyXG4gICAgICAgIGlmIChsYXN0VXNlcikge1xyXG4gICAgICAgICAgICAvLyBTaSBoYXkgdW4gw7psdGltbyB1c3VhcmlvLCBpbmNyZW1lbnRhIHN1IHVzZXJOdW1iZXJcclxuICAgICAgICAgICAgbmV4dFVzZXJOdW1iZXIgPSBsYXN0VXNlci51c2VyTnVtYmVyICsgMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBTaSBsYSBjb2xlY2Npw7NuIGVzdMOhIHZhY8OtYSwgZWwgcHJpbWVyIHVzZXJOdW1iZXIgZXMgMTAwMDAxXHJcbiAgICAgICAgICAgIG5leHRVc2VyTnVtYmVyID0gMTAwMDAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAvLyDinIUgVmVyaWZpY2Egc2kgeWEgZXhpc3RlIHVuIHVzdWFyaW8gY29uIGVzZSBlbWFpbFxyXG4gICAgY29uc3QgZXhpc3RpbmdVc2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoeyBlbWFpbDogYm9keS5lbWFpbCB9KTtcclxuICAgIGlmIChleGlzdGluZ1VzZXIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRWwgZW1haWwgeWEgZXN0w6EgcmVnaXN0cmFkb1wiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJ1c2VyTnVtYmVyXCIsIG5leHRVc2VyTnVtYmVyKTtcclxuICAgIC8vIOKchSBDcmVhIGVsIG51ZXZvIHVzdWFyaW9cclxuICAgIGNvbnN0IG5ld0JvZHkgPSB7XHJcbiAgICAgICAgLi4uYm9keSwgXHJcbiAgICAgICAgdXNlck51bWJlciA6IG5leHRVc2VyTnVtYmVyXHJcbiAgICB9XHJcbiAgICBjb25zdCBuZXdVc2VyID0gYXdhaXQgVXNlck1vZGVsLmNyZWF0ZShuZXdCb2R5KTtcclxuICAgIC8vIEFxdcOtIHB1ZWRlcyBhZ3JlZ2FyIGzDs2dpY2EgYWRpY2lvbmFsIHNpIGVzIG5lY2VzYXJpbywgY29tbyBlbnZpYXIgdW4gY29ycmVvIGRlIGJpZW52ZW5pZGFcclxuXHJcbiAgICAvLyDinIUgUmVzcHVlc3RhIGV4aXRvc2FcclxuICAgIC8vIEVsaW1pbmEgZWwgY2FtcG8gcGFzc3dvcmQgYW50ZXMgZGUgZW52aWFyIGxhIHJlc3B1ZXN0YVxyXG4gICAgY29uc3QgeyBwYXNzd29yZCwgLi4udXNlcldpdGhvdXRQYXNzd29yZCB9ID0gbmV3VXNlci5fZG9jO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiVXN1YXJpbyBjcmVhZG9cIiwgdXNlcldpdGhvdXRQYXNzd29yZCk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJVc3VhcmlvIGNyZWFkb1wiLCB1c2VyOiB1c2VyV2l0aG91dFBhc3N3b3JkIH0sIHsgc3RhdHVzOiAyMDEgfSk7XHJcblxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgY3JlYXIgZWwgdXN1YXJpb1wiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJFcnJvciBpbnRlcm5vIGFsIGNyZWFyIGVsIHVzdWFyaW9cIiB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufVxyXG5cclxuLy9NRVRPRE8gR0VUIGFwaS91c2VyIEJ1c2NhciB0b2RvIGxvcyB1c3Vhcmlvc1xyXG4iXSwibmFtZXMiOlsiZGJDb25uZWN0IiwiTmV4dFJlc3BvbnNlIiwiVXNlck1vZGVsIiwiUE9TVCIsInJlcSIsImJvZHkiLCJqc29uIiwiY29uc29sZSIsImxvZyIsInJlcXVpcmVkRmllbGRzIiwibWlzc2luZ0ZpZWxkIiwiZmluZCIsImZpZWxkIiwiZXJyb3IiLCJzdGF0dXMiLCJuZXh0VXNlck51bWJlciIsImxhc3RVc2VyIiwiZmluZE9uZSIsInNvcnQiLCJ1c2VyTnVtYmVyIiwibGltaXQiLCJleGlzdGluZ1VzZXIiLCJlbWFpbCIsIm5ld0JvZHkiLCJuZXdVc2VyIiwiY3JlYXRlIiwicGFzc3dvcmQiLCJ1c2VyV2l0aG91dFBhc3N3b3JkIiwiX2RvYyIsIm1lc3NhZ2UiLCJ1c2VyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/user/route.js\n");

/***/ }),

/***/ "(ssr)/../../node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*************************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?088c":
/*!*******************************************!*\
  !*** mongodb-client-encryption (ignored) ***!
  \*******************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?18c5":
/*!**************************!*\
  !*** kerberos (ignored) ***!
  \**************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?401c":
/*!******************************!*\
  !*** gcp-metadata (ignored) ***!
  \******************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?5cb5":
/*!***********************************************!*\
  !*** @aws-sdk/credential-providers (ignored) ***!
  \***********************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?7442":
/*!************************!*\
  !*** snappy (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?9645":
/*!**********************************!*\
  !*** @mongodb-js/zstd (ignored) ***!
  \**********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?a3f4":
/*!***********************!*\
  !*** socks (ignored) ***!
  \***********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ "timers/promises":
/*!**********************************!*\
  !*** external "timers/promises" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers/promises");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/mongoose@8.15.0","vendor-chunks/mongodb@6.16.0","vendor-chunks/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0","vendor-chunks/whatwg-url@14.2.0","vendor-chunks/mquery@5.0.0","vendor-chunks/tr46@5.1.1","vendor-chunks/debug@4.4.1","vendor-chunks/@mongodb-js+saslprep@1.2.2","vendor-chunks/mpath@0.9.0","vendor-chunks/sift@17.1.3","vendor-chunks/mongodb-connection-string-url@3.0.2","vendor-chunks/aws4@1.13.2","vendor-chunks/bson@6.10.3","vendor-chunks/webidl-conversions@7.0.0","vendor-chunks/supports-color@5.5.0","vendor-chunks/sparse-bitfield@3.0.3","vendor-chunks/punycode@2.3.1","vendor-chunks/ms@2.1.3","vendor-chunks/memory-pager@1.5.0","vendor-chunks/kareem@2.6.3","vendor-chunks/has-flag@3.0.0"], () => (__webpack_exec__("(rsc)/../../node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.js&appDir=C%3A%5CUsers%5Ceric_%5CDesktop%5Csynergy-match-app%5Capps%5Cweb%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ceric_%5CDesktop%5Csynergy-match-app%5Capps%5Cweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();