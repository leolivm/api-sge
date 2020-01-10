import sqlConfig from "../../config/sqlStr";
import sql from "mssql";

class HardwareController {
  async store(req, res) {
    sql.connect(sqlConfig, function(err) {
      if (err) console.log(err);
      const request = new sql.Request();
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

export default new HardwareController();
