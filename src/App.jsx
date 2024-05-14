import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MiApi } from './components/MiApi';
import { Buscador } from './components/Buscador';
import './index.css';
import { Titulo } from './components/Titulo';

function App() {
  const [feriados, setFeriados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.boostr.cl/feriados/en.json');
        if (response.data && Array.isArray(response.data.data)) {
          setFeriados(response.data.data);
          setLoading(false);
        } else {
          setError('No hay datos para mostrar');
        }
      } catch (error) {
        setError('Error al obtener los datos');
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (busqueda) => {
  };

  return (
    <div className="container">
      <Titulo />
      <Buscador onSearch={handleSearch} feriados={feriados} />
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MiApi />
      )}
    </div>
  );
}

export default App;