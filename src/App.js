import React, { useState, useEffect } from 'react';
import Buscador from './components/Buscador'
import ListadoImagenes from './components/ListadoImagenes'
import axios from 'axios'


const App = () => {

  const [guardarterminoBusqueda, setGuardarTerminoBusqueda] = useState("")
  const [imagenes, setImagenes] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  useEffect(() => {
    const consultarApi = async () => {
      if (guardarterminoBusqueda === "") return;

      const imagenesPorPagina = 30
      const key = '15116576-a1363419168eaac185678c7dd'
      const url = `https://pixabay.com/api/?key=${key}&q=${guardarterminoBusqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`

      const respuesta = await axios.get(url)

      setImagenes(respuesta.data.hits)

      setTotalPaginas(Math.ceil(respuesta.data.totalHits / imagenesPorPagina))

      //Llevar el usuario a la parte de arriba de la pagina
      const jumbotron = document.querySelector(".jumbotron")
      jumbotron.scrollIntoView({behavior :'smooth', block :'start'})
    }

    consultarApi()
  }, [guardarterminoBusqueda, paginaActual])


  const paginaAnterior = () => {
    let nuevaPaginaActual = paginaActual - 1
    setPaginaActual(nuevaPaginaActual)
  }
  const paginaSiguiente = () => {
    let nuevaPaginaActual = paginaActual + 1
    setPaginaActual(nuevaPaginaActual)
  }

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>

        <Buscador setGuardarTerminoBusqueda={setGuardarTerminoBusqueda} />
      </div>


      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />

        {(paginaActual === 1) ? null : (
          <button type="button" onClick={paginaAnterior} className="btn btn-info mr-1">Anterior &laquo;</button>
        )}
        {(totalPaginas === paginaActual) ? null : (
          <button type="button" onClick={paginaSiguiente} className="btn btn-info mr-1">Siguiente &raquo;</button>
        )}
      </div>
    </div>
  );

}

export default App;
