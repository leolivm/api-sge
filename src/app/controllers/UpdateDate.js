import sqlConfig from "../../config/sqlStr";
import sql from "mssql";

class UpdateDate {
  async store(req, res) {
    sql.connect(sqlConfig, function(err) {
      if (err) console.log(err);
      const request = new sql.Request();
      let code = "";
      let data = "";
      if (req.params.date) data = req.params.date;
      if (req.params.id) code = req.params.id;
      request.query(
        `UPDATE CH
        SET ATUALIZA_CHAVE_LIBERACAO = 1,
            DATA_EXPIRACAO = '${data}'
       FROM CLIENTES_CHAVES CH
      INNER JOIN CLIENTES C ON C.CNPJ_CPF = CH.CNPJ_CPF
      WHERE CH.CLIENTE = ${code}`,
        function(err, result) {
          if (err) console.log(err);
          res.send(result.recordset);
        }
      );
    });
  }
}

export default new UpdateDate();
