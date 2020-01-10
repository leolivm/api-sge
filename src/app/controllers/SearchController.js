import sqlConfig from "../../config/sqlStr";
import sql from "mssql";

class SearchController {
  async store(req, res) {
    sql.connect(sqlConfig, function(err) {
      if (err) console.log(err);
      const request = new sql.Request();
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

export default new SearchController();
