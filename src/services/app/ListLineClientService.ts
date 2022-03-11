import axios from "axios";
import convert from "xml-js";

class ListLineClientService {
  async execute(id_config: number, client: number) {
    let url = "https://wsbus.systemsatx.com.br/WService.asmx?WSDL";

    let dados = `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
      <Body>
        <ListaLinhasCliente xmlns="http://tempuri.org/">
          <Id_Config>${id_config}</Id_Config>
          <Cliente>${client}</Cliente>
        </ListaLinhasCliente>
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

export { ListLineClientService }