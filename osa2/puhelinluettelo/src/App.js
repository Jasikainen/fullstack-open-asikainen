import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  }, []);

  // Add new person to persons list if they do not
  // exist there yet
  const addName = (event) => {
    event.preventDefault();
    var personFound = persons.some((person) => 
      person.name.toLowerCase() === newName.toLowerCase()
    );

    if (personFound) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      
      personService
        .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    if (window
      .confirm(`Do you really want to remove ${person.name} from the phonebook?`)) {
        personService
          .del(id)
          .then(returnedPerson => {
            setPersons(persons.filter((item) => item.id !== id));
          })
          .catch((error) => {
            alert(`status error: ${error.status}. Person not found.`);
        });
    }   
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Person
        persons={persons}
        filterName={filterName}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
