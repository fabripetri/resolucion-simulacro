import React, { useState, useEffect } from "react";
import moment from "moment";
import DeudoresListado from "./DeudoresListado";
import DeudoresRegistro from "./DeudoresRegistro";
import { deudoresService } from "../../services/deudores.service";
import modalDialogService from "../../services/modalDialog.service";

function Deudores() {
    const TituloAccionABMC = {
        A: "Agregar Deudor",
        L: "Deudores",
    };
    const [AccionABMC, setAccionABMC] = useState("L");

    const [Items, setItems] = useState(null);
    const [Item, setItem] = useState(null); 
    const [RegistrosTotal, setRegistrosTotal] = useState(0);

    useEffect(() => {
        Buscar();
    }, []);

    async function Buscar() {
        modalDialogService.BloquearPantalla(true);
        const data = await deudoresService.Buscar();
        modalDialogService.BloquearPantalla(false);
        setItems(data.Items);
        setRegistrosTotal(data.RegistrosTotal);
    }

    async function Agregar() {
        setAccionABMC("A");
        setItem({
            IdDeudor: 0,
            ApellidoYNombre: "",
            FechaDeuda: moment(new Date()).format("YYYY-MM-DD"),
            ImporteAdeudado: ""
        });
    }

    async function Grabar(item) {
        try {
            await deudoresService.Grabar(item);
        }
        catch (error) {
            modalDialogService.Alert(error?.response?.data?.message ?? error.toString())
            return;
        }
        await Buscar();
        Volver();

        modalDialogService.Alert("Registro agregado correctamente");
    }

    function Volver() {
        setAccionABMC("L");
    }

    return (
        <div>
            <div className="tituloPagina">
                <small>{TituloAccionABMC[AccionABMC]}</small>
            </div>

            {/* Tabla de registros */}
            {AccionABMC === "L" && Items?.length > 0 && (
                <DeudoresListado
                    {...{
                        Items,
                        Agregar,
                        RegistrosTotal,
                    }}
                />
            )}

            {AccionABMC === "L" && Items?.length === 0 && (
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            )}

            {/* Formulario de alta */}
            {AccionABMC !== "L" && (
                <DeudoresRegistro
                    {...{
                        Item,
                        Grabar,
                        Volver
                    }}
                />
            )}
        </div>
    );
}
export { Deudores };
