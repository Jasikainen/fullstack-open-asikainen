import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import Error from "./components/Error";
import personService from "./services/persons";

/*
changeSuccessStatus in brief handles the status shown of add, remove or update
*/
const changeSuccessStatus = (personObject, operation, setSuccessMessage) => {
  if (operation === "add" || operation === "remove") {
    setSuccessMessage(operation === "add" 
      ? `Added ${personObject.name}` 
      : `Removed ${personObject.name}`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 2000)
  }
  else if (operation === "update"){
    setSuccessMessage(`Changed ${personObject.name}'s number to ${personObject.number}`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 2000)
  }
};

/*
changeErrorStatus in brief handles the status shown of error situation
*/
const changeErrorStatus = (personObject, setErrorMessage) => {
  setErrorMessage(`Information of ${personObject.name} has already been removed from the server`)
  setTimeout(() => {
    setErrorMessage(null)
  }, 2000)
}


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const personFound = persons.some((person) => 
      person.name.toLowerCase() === newName.toLowerCase()
    );
    const personObject = {
      name: newName,
      number: newNumber,
    };
 
    if (personFound) {
      // Replace the persons phonenumber if user accepts confirm.
      if (window.confirm(`${personFound.name} is already found, replace the old number
       with a new one?`)){
        const person = persons.find(n => n.name === newName)
        const id = person.id;
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== id
               ? person 
               : returnedPerson))
            changeSuccessStatus(personObject, "update", setSuccessMessage)
          })
          .catch(error => {
            alert(
              `the person '${person.name}' was already deleted from server`
            )
            setPersons(persons.filter(n => n.id !== id))     
          });
      }
    } 
    // Add new person to phonebook
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          changeSuccessStatus(personObject, "add", setSuccessMessage)
      })
    }
    setNewName("")
    setNewNumber("")
  };

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Do you really want to remove ${person.name} from the phonebook?`)) {
        personService
          .del(id)
          .then(returnedPerson => {
            setPersons(persons.filter((item) => item.id !== id));
            changeSuccessStatus(person, "remove", setSuccessMessage)
          })
          .catch((error) => {
            changeErrorStatus(person, setErrorMessage)
            setPersons(persons.filter((item) => item.id !== id));
        })
    }   
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };
  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  };

  return (
    <div>
      <h2>Phonebook application</h2>

      <Error message={errorMessage} />
      <Notification message={successMessage} />

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
  )
}

export default App
