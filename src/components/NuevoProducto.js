import React, { useState } from 'react';
import { useDispatch, useSelector } from  'react-redux'

// Actions de redux
import { crearNuevoProductoAction } from '../actions/productoActions'
import {mostrarAlertaAction, ocultarAlertaAction} from "../actions/alertaAction";

const NuevoProducto = ({history}) => {

    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState(0)

    // Devuelve una funcion
    const dispatch = useDispatch();

    // Accediendo al state del store
    const cargando = useSelector((state) => state.productos.loading)
    const error = useSelector(state => state.productos.error)
    const alerta = useSelector(state => state.alerta.alerta)

    // Manda a llamar el action de productoAction
    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto))

    const submitNuevoProducto = (e) => {
        e.preventDefault()

        if (nombre.trim() === '' || precio <= 0) {
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlertaAction(alerta))
            return;
        }

        dispatch( ocultarAlertaAction());

        agregarProducto({
            nombre,
            precio
        })

        history.push('/')
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        { alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null }
                        <form onSubmit={submitNuevoProducto}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    id="nombre"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="precio">Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    id="precio"
                                    value={precio}
                                    onChange={e => setPrecio(Number(e.target.value))}
                                />
                            </div>
                            <button type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                                Agregar
                            </button>
                        </form>

                        { cargando ? <p>Cargando...</p> : null}
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuevoProducto;
