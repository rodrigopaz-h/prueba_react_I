import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';

export function Buscador({ onSearch, feriados, setFilteredFeriados }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('ascendente');

  useEffect(() => {
    const filteredAndSortedFeriados = feriados
      .filter((feriado) =>
        feriado.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((feriado1, feriado2) =>
        sortOrder === 'ascendente'
          ? feriado1.title.localeCompare(feriado2.title)
          : feriado2.title.localeCompare(feriado1.title)
      );
    setFilteredFeriados(filteredAndSortedFeriados);
  }, [searchTerm, sortOrder, feriados, setFilteredFeriados]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Ingresa el nombre del feriado que buscas"
              onChange={handleSearchChange}
              value={searchTerm}
            />
          </InputGroup>
        </div>
        <div className="col-4">
          <Form.Select
            aria-label="Default select example"
            onChange={handleSortChange}
            value={sortOrder}
          >
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </Form.Select>
        </div>
      </div>
    </>
  );
}

Buscador.propTypes = {
  onSearch: PropTypes.func.isRequired,
  feriados: PropTypes.array.isRequired,
  setFilteredFeriados: PropTypes.func.isRequired,
};