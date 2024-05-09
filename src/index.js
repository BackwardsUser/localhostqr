#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_os_1 = require("node:os");
var node_child_process_1 = require("node:child_process");
var commander_1 = require("commander");
var node_path_1 = require("node:path");
var qrcode_1 = require("qrcode");
var node_fs_1 = require("node:fs");
var outputFile = (0, node_path_1.join)(__dirname, 'qr', 'localhost.png');
function httpify(host, port) {
    return "http://".concat(host, ":").concat(port);
}
function getNets() {
    return new Promise(function (res, rej) {
        var nets = (0, node_os_1.networkInterfaces)();
        var results = Object.create(null);
        for (var _i = 0, _a = Object.keys(nets); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            var netName = nets[name_1];
            if (!netName)
                continue;
            for (var _b = 0, netName_1 = netName; _b < netName_1.length; _b++) {
                var net = netName_1[_b];
                var familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
                if (net.family === familyV4Value && !net.internal) {
                    if (!results[name_1]) {
                        results[name_1] = [];
                    }
                    results[name_1].push(net.address);
                }
            }
        }
        res(results);
    });
}
function generateQR(port) {
    return __awaiter(this, void 0, void 0, function () {
        var results, ip, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getNets()];
                case 1:
                    results = _a.sent();
                    console.log(results);
                    ip = results["Wi-Fi"] || results["eth"] || results["wlan0"];
                    if (!ip) {
                        console.log("Cannot find an IP.");
                        return [2 /*return*/];
                    }
                    if (!(0, node_fs_1.existsSync)((0, node_path_1.join)(__dirname, "qr"))) {
                        (0, node_fs_1.mkdirSync)((0, node_path_1.join)(__dirname, "qr"));
                    }
                    url = httpify(ip, port);
                    console.log("Got IP ".concat(url, "."));
                    (0, qrcode_1.toFile)(outputFile, url, function (error) {
                        if (error)
                            console.error(error);
                        console.log('Successfully wrote file.');
                        // let platform = () => { return "none" } // For testing.
                        if ((0, node_os_1.platform)() == "win32") {
                            (0, node_child_process_1.exec)("start ".concat(outputFile), function (err, output) {
                                if (err) {
                                    console.error("Could not execute the command: ", err);
                                    return;
                                }
                            });
                        }
                        else if ((0, node_os_1.platform)() == "linux") {
                            (0, node_child_process_1.exec)("open ".concat(outputFile), function (err, output) {
                                if (err) {
                                    console.error("Could not execute the command: ", err);
                                    return;
                                }
                            });
                        }
                        else {
                            console.log("Successfully Created the file at: ".concat(outputFile));
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    commander_1.program
        .arguments('<port>')
        .description("Gets the QR Code for the local device IP with the given port.\nUsed for easy web testing on the go.")
        .action(function (port) {
        generateQR(parseInt(port) || 3000);
    });
    commander_1.program.parse(process.argv);
}
main();
