import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';

export function Buscador({ onSearch, feriados }) {
  const [searchResults, setSearchResults] = useState([]);

  const handleSort = (typeSort) => {
    let feriadosOrdenados;
    if (typeSort === 'ascendente') {
      feriadosOrdenados = [...feriados].sort((feriado1, feriado2) =>
        feriado1.title.localeCompare(feriado2.title)
      );
    } else {
      feriadosOrdenados = [...feriados].sort((feriado1, feriado2) =>
        feriado2.title.localeCompare(feriado1.title)
      );
    }
    setSearchResults(feriadosOrdenados);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    onSearch(value);

    const dataFiltered = feriados.filter((feriado) =>
      feriado.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(dataFiltered);
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
            />
          </InputGroup>
        </div>
        <div className="col-4">
          <Form.Select
            aria-label="Default select example"
            onChange={(event) => handleSort(event.target.value)}
          >
            <option defaultChecked>Ordenar por título</option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </Form.Select>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <ListGroup>
            {searchResults.map((feriado) => (
              <ListGroup.Item key={feriado.title}>{feriado.title}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </>
  );
}

Buscador.propTypes = {
  onSearch: PropTypes.func.isRequired,
  feriados: PropTypes.array.isRequired,
};