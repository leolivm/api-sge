"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
//import UserController from "./app/controllers/UserController";
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _SearchController = require('./app/controllers/SearchController'); var _SearchController2 = _interopRequireDefault(_SearchController);
var _UpdateDate = require('./app/controllers/UpdateDate'); var _UpdateDate2 = _interopRequireDefault(_UpdateDate);
var _HardwareController = require('./app/controllers/HardwareController'); var _HardwareController2 = _interopRequireDefault(_HardwareController);
var _InfoController = require('./app/controllers/InfoController'); var _InfoController2 = _interopRequireDefault(_InfoController);
var _DupController = require('./app/controllers/DupController'); var _DupController2 = _interopRequireDefault(_DupController);

const routes = new (0, _express.Router)();

//routes.post("/users", UserController.store);
routes.post("/sessions", _SessionController2.default.store);
routes.use(_auth2.default);
routes.get("/search/:name?", _SearchController2.default.store);
routes.get("/updatedate/:id/:date", _UpdateDate2.default.store);
routes.get("/hardware/:id", _HardwareController2.default.store);
routes.get("/info/:id", _InfoController2.default.store);
routes.get("/dup/:id", _DupController2.default.store);

exports. default = routes;
