import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyPage() {
  const [myObjects, setMyObjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [objectsPerPage] = useState(5); // Количество объектов на странице

  useEffect(() => {
    // Здесь должен быть ваш fetch запрос для получения данных
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7290/MyObjects');
        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }
        const data = await response.json();
        setMyObjects(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Вычисление индексов первого и последнего элементов на текущей странице
  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;
  const currentObjects = myObjects.slice(indexOfFirstObject, indexOfLastObject);

  // Пагинация
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Список объектов:</h2>
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
              <td>{indexOfFirstObject + index + 1}</td>
              <td>{object.code}</td>
              <td>{object.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Пагинация */}
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

export default MyPage;