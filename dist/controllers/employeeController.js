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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployee = exports.deleteEmployee = exports.getEmployee = exports.getEmployees = exports.createEmployeeData = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var Employee_1 = __importDefault(require("../model/Employee"));
var createEmployeeData = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, position, office, salary, employee, newEmployee, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, position = _a.position, office = _a.office, salary = _a.salary;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Employee_1.default.findOne({ email: email })];
            case 2:
                employee = _b.sent();
                if (employee)
                    return [2 /*return*/, next((0, http_errors_1.default)(406, "employee already exists"))];
                newEmployee = new Employee_1.default({ name: name, email: email, position: position, office: office, salary: salary });
                return [4 /*yield*/, newEmployee.save()];
            case 3:
                _b.sent();
                res.status(201).json({ name: name, email: email, position: position, office: office, salary: salary });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                return [2 /*return*/, next(http_errors_1.default.InternalServerError)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createEmployeeData = createEmployeeData;
var getEmployees = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var employee, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Employee_1.default.find({})];
            case 1:
                employee = _a.sent();
                res.status(200).json({ employee: employee });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, next(http_errors_1.default.InternalServerError)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getEmployees = getEmployees;
var getEmployee = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, employee, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Employee_1.default.findOne({ _id: id })];
            case 2:
                employee = _a.sent();
                res.status(200).json({ employee: employee });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, next(http_errors_1.default.InternalServerError)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getEmployee = getEmployee;
var deleteEmployee = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, employee, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Employee_1.default.remove({ _id: id })];
            case 2:
                employee = _a.sent();
                if (!employee.deletedCount)
                    return [2 /*return*/, next((0, http_errors_1.default)(406, "employee not found"))];
                res.status(201).json({ message: 'Employee deleted successfully' });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, next(http_errors_1.default.InternalServerError)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteEmployee = deleteEmployee;
var updateEmployee = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, position, office, salary, id, employee, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, position = _a.position, office = _a.office, salary = _a.salary;
                id = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Employee_1.default.updateOne({ _id: id }, { $set: { name: name, email: email, position: position, office: office, salary: salary } })];
            case 2:
                employee = _b.sent();
                res.status(201).json({ name: name, email: email, position: position, office: office, salary: salary });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                return [2 /*return*/, next(http_errors_1.default.InternalServerError)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateEmployee = updateEmployee;
