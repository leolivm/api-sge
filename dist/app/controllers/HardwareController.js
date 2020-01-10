"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sqlStr = require('../../config/sqlStr'); var _sqlStr2 = _interopRequireDefault(_sqlStr);
var _mssql = require('mssql'); var _mssql2 = _interopRequireDefault(_mssql);

class HardwareController {
  async store(req, res) {
    _mssql2.default.connect(_sqlStr2.default, function(err) {
      if (err) console.log(err);
      const request = new _mssql2.default.Request();
      let code = "";
      if (req.params.id) code = req.params.id;
      request.query(
        `UPDATE CH
        SET HARDWARE_CLIENTE = NULL
       FROM CLIENTES_CHAVES CH
      INNER JOIN CLIENTES C ON C.CODIGO = CH.CLIENTE
      WHERE CH.CLIENTE = ${code}`,
        function(err, result) {
          if (err) console.log(err);
          res.send(result.recordset);
        }
      );
    });
  }
}

exports. default = new HardwareController();
