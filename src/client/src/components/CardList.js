import React from "react";
import Card from "./Card";

const CardList = ({robots}) => {
  const cardArray = robots.map((user, i) => {
    return <Card id={user.id} name={user.name} email={user.email} key={i} />;
  });
  return <div>{cardArray}</div>;
};

export default CardList;
