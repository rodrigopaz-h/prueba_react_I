import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MiApi } from './components/MiApi';
import { Buscador } from './components/Buscador';
import './index.css';
import { Titulo } from './components/Titulo';

function App() {
  const urlApi = 'https://api.boostr.cl/feriados/en.json';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feriados, setFeriados] = useState([]);
  const [filteredFeriados, setFilteredFeriados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlApi);
        if (response.data && Array.isArray(response.data.data)) {
          setFeriados(response.data.data);
          setFilteredFeriados(response.data.data);
        } else {
          setError('No hay datos para mostrar');
        }
      } catch (error) {
        setError('Error al obtener los datos');
        console.error('Error al obtener los datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urlApi]);

  const handleSearch = (searchTerm) => {
    // No es necesario actualizar aquí porque el efecto en el Buscador lo maneja
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <Titulo />
      <Buscador onSearch={handleSearch} feriados={feriados} setFilteredFeriados={setFilteredFeriados} />
      <MiApi feriados={filteredFeriados} />
    </div>
  );
}

export default App;