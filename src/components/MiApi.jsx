import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

export const MiApi = () => {
  const urlApi = 'https://api.boostr.cl/feriados/en.json';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feriados, setFeriados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlApi);
        if (response.data && Array.isArray(response.data.data)) {
          setFeriados(response.data.data);
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

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <ListGroup horizontal>
        <ListGroup.Item className='bg-primary text-light w-25'><strong>Conmemoración:</strong></ListGroup.Item>
        <ListGroup.Item className='bg-secondary text-light w-25'><strong>Fecha:</strong></ListGroup.Item>
        <ListGroup.Item className='bg-success text-light w-25'><strong>Tipo:</strong></ListGroup.Item>
        <ListGroup.Item className='bg-danger text-light w-25'><strong>Irrenunciables:</strong></ListGroup.Item>
      </ListGroup>
      {feriados.map((feriado, index) => (
        <div key={index}>
          <ListGroup horizontal>
            <ListGroup.Item className='bg-info text-light p-3 w-25'>{feriado.title}</ListGroup.Item>
            <ListGroup.Item className='bg-warning text-dark p-3 w-25'>{feriado.date}</ListGroup.Item>
            <ListGroup.Item className='bg-info text-light p-3 w-25'>{feriado.type}</ListGroup.Item>
            <ListGroup.Item className='bg-warning text-dark p-3 w-25'>{feriado.inalienable ? 'Sí' : 'No'}</ListGroup.Item>
          </ListGroup>
        </div>
      ))}
    </>
  );
};