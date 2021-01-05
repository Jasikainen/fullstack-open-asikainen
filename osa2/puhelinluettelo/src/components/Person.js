import React from "react";

const Person = ({ persons, filterName }) => {
  var filteredPerson = persons;
  // Filter names by finding the given filter from names.
  // It's index must be non-negative so it is included in word.
  // Filter assumes that it exists somewhere, not only in start
  if (filterName) {
    filteredPerson = persons.filter(
      (person) =>
        person.name.toLowerCase().indexOf(filterName.toLowerCase()) >= 0
    );
  }

  return filteredPerson.map((person) => (
    <p key={person.name}>
      {" "}
      {person.name} {person.number}
    </p>
  ));
};

export default Person;
