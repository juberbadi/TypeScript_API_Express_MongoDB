"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_errors_1 = __importDefault(require("http-errors"));
var exampleRoutes_1 = __importDefault(require("./routes/exampleRoutes"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("./config");
var errorHanlder_1 = require("./middleware/errorHanlder");
var passport_1 = __importDefault(require("passport"));
var passport_2 = __importDefault(require("./middleware/passport"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swaggerDocument = __importStar(require("./swagger.json"));
var app = (0, express_1.default)();
app.use('/swagger', swagger_ui_express_1.default.serve);
app.get('/swagger', swagger_ui_express_1.default.setup(swaggerDocument));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
(0, passport_2.default)(passport_1.default);
app.use("/", exampleRoutes_1.default);
app.use("/user", userRoutes_1.default);
app.use("/employee", employeeRoutes_1.default);
app.use(function () {
    throw (0, http_errors_1.default)(404, "Route not found");
});
app.use(errorHanlder_1.errorHandler);
mongoose_1.default
    .connect(config_1.DB)
    .then(function () {
    console.log("Connected to db");
    app.listen(config_1.PORT, function () {
        console.log("Listening On PORT ".concat(config_1.PORT));
    });
})
    .catch(function () {
    throw (0, http_errors_1.default)(501, "Unable to connect database");
});
