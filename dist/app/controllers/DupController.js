"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sqlStr = require('../../config/sqlStr'); var _sqlStr2 = _interopRequireDefault(_sqlStr);
var _mssql = require('mssql'); var _mssql2 = _interopRequireDefault(_mssql);

class DupController {
  async store(req, res) {
    _mssql2.default.connect(_sqlStr2.default, function(err) {
      if (err) console.log(err);
      const request = new _mssql2.default.Request();
      let code = "";
      if (req.params.id) code = req.params.id;
      request.query(
        `SELECT R.CLIENTE, C.NOME, R.DATAVENCIMENTO, R.VALORSALDO, R.TIPOLANCTO, 
        ATRASO = CASE WHEN R.DATAVENCIMENTO > CURRENT_TIMESTAMP THEN 0 ELSE DATEDIFF(DAY,R.DATAVENCIMENTO,CURRENT_TIMESTAMP) END
     FROM RECEBER R
    INNER JOIN CLIENTES C ON C.CODIGO = R.CLIENTE
    WHERE R.SITUACAO = 'A'
      AND CLIENTE = ${code}
    ORDER BY R.DATAVENCIMENTO`,
        function(err, result) {
          res.send(result.recordset);
        }
      );
    });
  }
}

exports. default = new DupController();
