import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddObjectPage() {
  const [objectsToAdd, setObjectsToAdd] = useState([{ code: '', value: '' }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...objectsToAdd];
    list[index][name] = value;
    setObjectsToAdd(list);
  };

  const handleAddObject = () => {
    setObjectsToAdd([...objectsToAdd, { code: '', value: '' }]);
  };

  const handleRemoveObject = index => {
    const list = [...objectsToAdd];
    list.splice(index, 1);
    setObjectsToAdd(list);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch('https://localhost:7290/MyObjects/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectsToAdd.map(obj => ({ [obj.code]: obj.value })))
      });
      if (!response.ok) {
        throw new Error('Ошибка при добавлении объектов');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Добавление объекта</h1>
      <Link to="/">Назад</Link>
      <form onSubmit={handleSubmit}>
        {objectsToAdd.map((object, index) => (
          <div key={index}>
            <input
              type="text"
              name="code"
              value={object.code}
              placeholder="код"
              onChange={e => handleInputChange(index, e)}
            />
            <input
              type="text"
              name="value"
              value={object.value}
              placeholder="значение"
              onChange={e => handleInputChange(index, e)}
            />
            {index !== 0 && (
              <button type="button" onClick={() => handleRemoveObject(index)}>
                Удалить
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddObject}>
          Добавить
        </button>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default AddObjectPage;
