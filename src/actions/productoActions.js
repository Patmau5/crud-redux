import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS, COMENZAR_EDICION_PRODUCTO,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    OBTENER_PRODUCTO_ELIMINAR, PRODUCTO_EDITAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    PRODUCTO_ELIMINAR_EXITO
} from "../types";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto() )

        try {
            await clienteAxios.post('/productos/', producto)
            dispatch(agregarProductoExito(producto))

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (e) {
            console.log(e)
            dispatch(agregarProductoError(true))

            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta nuevamente'
            })

        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() )
        
        try {
                const respuesta = await clienteAxios.get('/productos')
                dispatch( descargaProductosExitosa(respuesta.data))
        } catch (e) {
            dispatch( descargaProductosError(true))
        }
    }
}

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = estado => ({
    type:DESCARGA_PRODUCTOS_ERROR,
    payload: estado
})

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch( obtenerProductoEliminar(id) )

        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch( eliminarProductoExito())
            Swal.fire(
                'Eliminando',
                'El producto se eliminó correctamente',
                'success'
            )
        } catch (e) {
            dispatch( eliminarProductoError())
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: true,
})

export function obtenerProductoEditarAction(producto) {
    return (dispatch) => {
        dispatch( obtenerProductoEditar(producto))
    }
}

const obtenerProductoEditar = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch( editarProducto())

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch( editarProductoExito(producto))
        } catch (e) {

        }
    }
}

const editarProductoExito = (producto) => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})