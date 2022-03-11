import { LocalStorage } from "node-localstorage";

class SendCodeService {
  async execute(code: number) {
    var localStorage = new LocalStorage('./scratch');

    const codeSend = parseInt(localStorage.getItem("codeEmail"))

    if (code !== codeSend) {
      throw new Error("Código inválido!")
    }

    if (localStorage.getItem("codeEmail") !== 'undefined') {
      localStorage.removeItem("codeEmail");
    }

    return "Código Válido!"
  }
}

export { SendCodeService }