import React, { useState } from 'react';

function ListDisplay(props){
  let names = [], usernames = [], phones = [], emails = [], ids = [];
  for(let i=0; i<props.list.length;i++){
  ids.push(props.list[i].id);
  names.push(props.list[i].name);
  usernames.push(props.list[i].username);
  phones.push(props.list[i].phone);
  emails.push(props.list[i].email);
  }
  return <Row id={ids} name={names} username={usernames} phone={phones} email={emails} />
}

function Row(props){
  return (
      <div>
        <div>{props.id}</div>
        <div>{props.name}</div>
        <div>{props.username}</div>
      </div>
);
}

function AppDisplay(props) {


  if(props.list.length>0){
  return (
    <div>
      <ListDisplay list={props.list}>
      {(index)=> <div key={index}>This is item index in the list</div>}
      </ListDisplay>
      <h6>Active page is: {props.activePage}</h6>
    </div>
  );}
  else
  return (
    <div>nada from axios</div>
  );
}

export default AppDisplay;
