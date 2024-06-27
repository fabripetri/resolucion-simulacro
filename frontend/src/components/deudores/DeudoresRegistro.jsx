import React from "react";
import { useForm } from "react-hook-form";

export default function DeudoresRegistro({
    Item,
    Grabar,
    Volver,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ values: Item });

    const onSubmit = (data) => {
        Grabar(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">

                {/* campo apellido y nombre */}
                <div className="row">
                    <div className="col-sm-4 col-md-3 offset-md-1">
                        <label className="col-form-label" htmlFor="Nombre">
                            Apellido y Nombre<span className="text-danger">*</span>:
                        </label>
                    </div>
                    <div className="col-sm-8 col-md-6">
                        <input
                            type="text"
                            {...register("ApellidoYNombre", {
                                required: { value: true, message: "Apellido y Nombre es requerido" },
                                minLength: {
                                    value: 5,
                                    message: "Apellido y Nombre debe tener al menos 5 caracteres",
                                },
                                maxLength: {
                                    value: 60,
                                    message: "Apellido y Nombre debe tener como máximo 60 caracteres",
                                },
                            })}
                            autoFocus
                            className={
                                "form-control " + (errors?.ApellidoYNombre ? "is-invalid" : "")
                            }
                        />
                        {errors?.ApellidoYNombre && touchedFields.ApellidoYNombre && (
                            <div className="invalid-feedback">
                                {errors?.ApellidoYNombre?.message}
                            </div>
                        )}
                    </div>
                </div>

                {/* campo importe adeudado */}
                <div className="row">
                    <div className="col-sm-4 col-md-3 offset-md-1">
                        <label className="col-form-label" htmlFor="Precio">
                            Importe adeudado<span className="text-danger">*</span>:
                        </label>
                    </div>
                    <div className="col-sm-8 col-md-6">
                        <input
                            type="number" step=".01"
                            {...register("ImporteAdeudado", {
                                required: { value: true, message: "Importe adeudado es requerido" },
                                min: {
                                    value: 0.01,
                                    message: "Importe adeudado debe ser mayor a 0",
                                },
                                max: {
                                    value: 99999.99,
                                    message: "Importe adeudado debe ser menor o igual a 99999.99",
                                },
                            })}
                            className={
                                "form-control " + (errors?.ImporteAdeudado ? "is-invalid" : "")
                            }
                        />
                        <div className="invalid-feedback">{errors?.ImporteAdeudado?.message}</div>
                    </div>
                </div>

                {/* campo fecha deuda */}
                <div className="row">
                    <div className="col-sm-4 col-md-3 offset-md-1">
                        <label className="col-form-label" htmlFor="FechaAlta">
                            Fecha deuda<span className="text-danger">*</span>:
                        </label>
                    </div>
                    <div className="col-sm-8 col-md-6">
                        <input
                            type="date"
                            {...register("FechaDeuda", {
                                required: { value: true, message: "Fecha deuda es requerido" }
                            })}
                            className={
                                "form-control " + (errors?.FechaDeuda ? "is-invalid" : "")
                            }
                        />
                        <div className="invalid-feedback">
                            {errors?.FechaDeuda?.message}
                        </div>
                    </div>
                </div>

                {/* Botones Grabar y Volver' */}
                <hr />
                <div className="row justify-content-center">
                    <div className="col text-center botones">
                        <button
                            type="submit"
                            className="btn btn-primary">
                            <i className="fa fa-check"></i> Registrar
                        </button>
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => Volver()}
                        >
                            <i className="fa fa-undo"></i>Volver
                        </button>
                    </div>
                </div>

                {/* texto: Revisar los datos ingresados... */}
                {!isValid && isSubmitted && (
                    <div className="row alert alert-danger mensajesAlert">
                        <i className="fa fa-exclamation-sign"></i>
                        Revisar los datos ingresados...
                    </div>
                )}

            </div>
        </form>
    );
}

