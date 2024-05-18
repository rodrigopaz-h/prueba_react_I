import ListGroup from 'react-bootstrap/ListGroup';

export const MiApi = ({feriados}) => {

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