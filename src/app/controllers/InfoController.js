import sqlConfig from "../../config/sqlStr";
import sql from "mssql";

class InfoController {
  async store(req, res) {
    sql.connect(sqlConfig, function(err) {
      if (err) console.log(err);
      const request = new sql.Request();
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

export default new InfoController();
