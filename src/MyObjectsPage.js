import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyObjectsPage() {
  const [myObjects, setMyObjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [objectsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    id: '',
    code: '',
    value: ''
  });

  useEffect(() => {
    fetchData();
  }, [currentPage, filters]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:7290/MyObjects?id=${filters.id}&code=${filters.code}&value=${filters.value}`);
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
      const data = await response.json();
      setMyObjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;
  const currentObjects = myObjects.slice(indexOfFirstObject, indexOfLastObject);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <h3>Фильтры:</h3>
      <div>
        <label>
          ID:
          <input type="text" name="id" value={filters.id} onChange={handleFilterChange} />
        </label>
        </div>
        <div>
        <label>
          Code:
          <input type="text" name="code" value={filters.code} onChange={handleFilterChange} />
        </label>
        </div>
        <div>
        <label>
          Value:
          <input type="text" name="value" value={filters.value} onChange={handleFilterChange} />
        </label>
      </div>
      <h3>Объекты:</h3>
      <table>
        <thead>
          <tr>
            <th>Номер</th>
            <th>Код</th>
            <th>Значение</th>
          </tr>
        </thead>
        <tbody>
          {currentObjects.map((object, index) => (
            <tr key={index}>
              <td>{object.id}</td>
              <td>{object.code}</td>
              <td>{object.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: Math.ceil(myObjects.length / objectsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      <Link to="/add">Добавить объекты</Link>
    </div>
  );
}

export default MyObjectsPage;