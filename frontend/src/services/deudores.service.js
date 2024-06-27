import httpService from "./http.service";
import { config } from "../config";
const urlResource = config.urlResourceDeudores;

async function Buscar() {
    const resp = await httpService.get(urlResource);
    return resp.data;
}

async function Grabar(item) {
    await httpService.post(urlResource, item);
}

export const deudoresService = {
    Buscar, Grabar
};
