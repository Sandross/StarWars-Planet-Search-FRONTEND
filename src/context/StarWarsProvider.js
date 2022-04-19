import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ISSContext from './ISSContext';

export default function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilteredByName] = useState({ name: '' });
  const [filterInput, setFilteredByInput] = useState([]);
  const apiRequest = async () => {
    const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const json = await request.json();
    setData(json.results);
  };
  const filteredInformation = ({ target: { value, name } }) => {
    const handleInput = {
      nameInput: () => setFilteredByName({ name: value }),
    };
    return handleInput[name]();
  };

  useEffect(() => {
    apiRequest();
  }, []);

  useEffect(() => {
    const filterPlanets = data.filter(
      ({ name }) => name.toLowerCase().includes(filterByName.name.toLowerCase()),
    );
    setFilteredByInput(filterPlanets);
  }, [data, filterByName]);

  const state = {
    filterByName,
    filteredInformation,
    filterInput,
  };

  return (
    <ISSContext.Provider value={ state }>
      {children}
    </ISSContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
