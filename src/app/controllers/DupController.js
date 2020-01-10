import sqlConfig from "../../config/sqlStr";
import sql from "mssql";

class DupController {
  async store(req, res) {
    sql.connect(sqlConfig, function(err) {
      if (err) console.log(err);
      const request = new sql.Request();
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

export default new DupController();
