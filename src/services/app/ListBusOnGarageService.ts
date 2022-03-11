import axios from "axios";
import convert from "xml-js";

class ListBusOnGarageService {
  async execute(id_config: number, identification: string) {
    let url = "https://wsbus.systemsatx.com.br/WService.asmx?WSDL";

    let dados = `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
      <Body>
          <ListaVeiculoGaragem xmlns="http://tempuri.org/">
              <Id_Config>${id_config}</Id_Config>
              <Identificacao>${identification}</Identificacao>
          </ListaVeiculoGaragem>
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

    var result = convert.xml2json(data, { compact: false, spaces: 4, ignoreDeclaration: true });

    return result;
  }
}

export { ListBusOnGarageService }