import React, { useState } from 'react';

function ListDisplay(props){

  //BELOW -> bubble sort via person ID
  let ordered = props.list;
  let swap;
  for(let j=0;j<ordered.length;j++)
    for(let i=0;i<props.list.length-1;i++){
      if(ordered[i].id>ordered[i+1].id)
        {
          swap=ordered[i];
          ordered[i]=ordered[i+1];
          ordered[i+1]=swap;
        }
  }
  //ABOVE -> bubble sort via person ID


  function toggleDetails(x){
    console.log(x)
  }

  return (
    <div className="listWrapper">
          <Row id='ID' name='Name' username='Username' email='Email' phone='Phone'/>
        {ordered.map(x => (
          <Row id={x.id} name={x.name} username={x.username} email={x.email} phone={x.phone} handleDetails={()=>toggleDetails(x.id)}/>
        ))}
    </div>
  );
}

function Row(props){
  return (
      <div className='row'>
        <div className='cell cell1'>{props.id}</div>
        <div className='cell cell2'>{props.name}</div>
        <div className='cell cell3'>{props.username}</div>
        <div className='cell cell4'>{props.email}</div>
        <div className='cell cell5'>{props.phone}</div>
        {props.id=='ID'?
          <div className='cell cell6'>Details</div>
          :
          <div className='cell cell6' onClick={props.handleDetails}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg></div>
        }
        {props.id=='ID'?
          <div className='cell cell6'>Edit</div>
          :
        <div className='cell cell7'>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="white" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg></div>
        }
        {props.id=='ID'?
          <div className='cell cell6'>Delete</div>
          :
        <div className='cell cell8'>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="red" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg></div>
        }
      </div>
);
}

function AppDisplay(props) {
  if(props.list.length>0 && props.activePage=='home'){
  return (
    <div>
      <ListDisplay list={props.list} />
      <h6>Active page is: {props.activePage}</h6>
    </div>
  );
  }
  else
  return (
    <div>nada from axios</div>
  );
}

export default AppDisplay;
