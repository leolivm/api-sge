"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sqlStr = require('../../config/sqlStr'); var _sqlStr2 = _interopRequireDefault(_sqlStr);
var _mssql = require('mssql'); var _mssql2 = _interopRequireDefault(_mssql);

class SearchController {
  async store(req, res) {
    _mssql2.default.connect(_sqlStr2.default, function(err) {
      if (err) console.log(err);
      const request = new _mssql2.default.Request();
      let filter = "";
      if (req.params.name) filter = req.params.name;
      request.query(
        `SELECT VW.CODIGO, VW.NOME, VW.APELIDO, CH.DATA_EXPIRACAO, VW.CIDADE
        FROM VW_CLIENTES VW
       INNER JOIN CLIENTES_CHAVES CH ON VW.CNPJ_CPF = CH.CNPJ_CPF
       WHERE (NOME LIKE '%${filter}%'  OR APELIDO LIKE '%${filter}%')
       ORDER BY VW.NOME
      `,
        function(err, result) {
          if (err) console.log(err);
          res.send(result.recordset);
        }
      );
    });
  }
}

exports. default = new SearchController();
