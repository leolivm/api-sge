"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sqlStr = require('../../config/sqlStr'); var _sqlStr2 = _interopRequireDefault(_sqlStr);
var _mssql = require('mssql'); var _mssql2 = _interopRequireDefault(_mssql);

class InfoController {
  async store(req, res) {
    _mssql2.default.connect(_sqlStr2.default, function(err) {
      if (err) console.log(err);
      const request = new _mssql2.default.Request();
      let code = "";
      if (req.params.id) code = req.params.id;
      request.query(
        `SELECT VW.CODIGO, VW.NOME, VW.ENDERECO, VW.CIDADE, VW.APELIDO,
        VW.CNPJ_CPF, VW.IE_RG, VW.FONERES, VW.FONECOM, VW.EMAIL,
        CH.VALOR_MENSAL AS VALORMENSAL,
        CH.DIA_VENCIMENTO AS DIAVENCIMENTO,
        CH.LICENCAS, CH.LICENCAS_BONUS, CH.DATA_EXPIRACAO
   FROM VW_CLIENTES VW
  INNER JOIN CLIENTES_CHAVES CH ON VW.CNPJ_CPF = CH.CNPJ_CPF
  WHERE (CODIGO = ${code})
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

exports. default = new InfoController();
