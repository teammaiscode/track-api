import axios from "axios";
import convert from "xml-js";

class ListNearBusesService {
  async execute(id_config: number, latitude: number, longitude: number) {

    let url = "https://wsbus.systemsatx.com.br/WService.asmx?WSDL";

    let dados = `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <ListaVeiculosProximos xmlns="http://tempuri.org/">
                <Id_Config>${id_config}</Id_Config>
                <Latitude>${latitude}</Latitude>
                <Longitude>${longitude}</Longitude>
            </ListaVeiculosProximos>
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

export { ListNearBusesService }