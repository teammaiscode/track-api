import axios from "axios";
import convert from "xml-js";

interface IListTripBus {
  id_config: number;
  id_linha: number;
  id_rota: number;
}

class ListBusesOnTripService {
  async execute({ id_config, id_linha, id_rota }: IListTripBus) {
    let url = "https://wsbus.systemsatx.com.br/WService.asmx?WSDL";

    let dados = `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
      <Body>
          <ListaVeiculosEmViagem xmlns="http://tempuri.org/">
              <Id_Config>${id_config}</Id_Config>
              <Id_Linha>${id_linha}</Id_Linha>
              <Id_Rota>${id_rota}</Id_Rota>
          </ListaVeiculosEmViagem>
      </Body>
    </Envelope>
    `;

    var config = {
      headers: {
        "Content-Type": "text/xml",
        "Allow-Origin": "*"
      }
    }

    let { data } = await axios.post(url, dados, config);

    let result = convert.xml2json(data, { compact: false, spaces: 4, ignoreDeclaration: true });

    return result;
  }
}

export { ListBusesOnTripService }