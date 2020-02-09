import React, { useState } from 'react'
import Error from './Error'

const Buscador = ({setGuardarTerminoBusqueda}) => {
    const [terminoBusqueda, setTerminoBusqueda] = useState("")
    const [error, setError] = useState(false)

    const buscarImagen = (e) => {
        e.preventDefault();
        if (terminoBusqueda === "") {
            setError(true)
            return;
        }
        setError(false)

        setGuardarTerminoBusqueda(terminoBusqueda)

    }

    return (
        <form
            onSubmit={buscarImagen}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: Futbol o Cafe"
                        onChange={(e) => setTerminoBusqueda(e.target.value)}
                    />
                </div>

                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>

            </div>

            {(error) ? <Error mensaje="Agrega un termino de busqueda" /> : null}
        </form>
    )
}

export default Buscador 
