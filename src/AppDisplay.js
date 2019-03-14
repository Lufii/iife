import React, { useState } from 'react';
const axios = require('axios');

function Row(props){
  return (
    <div className='row'>
    <div className='cell cell1'>{props.id}</div>
    <div className='cell cell2'>{props.name}</div>
    <div className='cell cell3'>{props.username}</div>
    <div className='cell cell4'>{props.email}</div>
    <div className='cell cell5'>{props.phone}</div>
    {props.id==='ID'?
    <div className='cell cell6'>Details</div>
    :
    <div className='cell cell6' onClick={props.handleDetails}>
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg></div>
  }
  {props.id==='ID'?
  <div className='cell cell6'>Edit</div>
  :
  <div className='cell cell7' onClick={props.handleEdit}>
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="white" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg></div>
}
{props.id==='ID'?
<div className='cell cell6'>Delete</div>
:
<div className='cell cell8' onClick={props.handleDelete}>
<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="red" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg></div>
}
</div>
);
}

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




  return (
    <div className="listWrapper">
    <Row id='ID' name='Name' username='Username' email='Email' phone='Phone'/>
    {ordered.map(x => (
      <Row
      key={x.id}
      id={x.id}
      name={x.name}
      username={x.username}
      email={x.email}
      phone={x.phone}
      handleEdit={()=>props.toggleEdit(x,'edit')}
      handleDetails={()=>props.toggleDetails(x,'details')}
      handleDelete={()=>props.toggleDelete(x,'delete')}/>
    ))}
    </div>
  );
}

function AppDisplay(props) {

  const [message, setMessage] = useState('');

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [companyname, setCompanyname] = useState('');
  const [catchphrase, setCatchphrase] = useState('');
  const [bs, setBs] = useState('');

  const [search, setSearch] = useState('')
  const [searchlist, setSearchlist] = useState([])

  function clearState(){
    setId('');
    setName('');
    setUsername('');
    setEmail('');
    setStreet('');
    setSuite('');
    setCity('');
    setZipcode('');
    setLat('');
    setLng('');
    setPhone('');
    setWebsite('');
    setCompanyname('');
    setCatchphrase('');
    setBs('');
  }


  function addPerson(){
    setMessage('Please wait');
    if(id)
    axios({
      method:'POST',
      url:'https://stormy-castle-25399.herokuapp.com/person/add',
      data:{
        id: parseInt(id),
        name: name,
        username: username,
        email: email,
        address: {street: street,
          suite: suite,
          city: city,
          zipcode: zipcode,
          geo: {lat: lat,
            lng: lng}
          },
          phone: phone,
          website: website,
          company: {name: companyname,
            catchPhrase: catchphrase,
            bs: bs}
          },
        }).then(function (response){
          if(response.status === 200){
            setMessage(name+' has been added');
            return response;
          }}).then(
            clearState()
          ).catch(function (error){
            setMessage('Oops, something went wrong. '+props.person.name+' has not been added. Please make sure your id field is not a duplicate.')
            return error;
          })
          else setMessage('ID is needed in order to create a person entry. Nothing was added to the DB.')
        }

        function searchPerson(){
          let res= [];
          for(let i in props.list)
          if(props.list[i].name === search)
          res.push(props.list[i])
          setSearchlist(res);
          if(res.length===0)
          setMessage('No person matching that name was found');
        }

        function editPerson(){
          /*function populateWithOldData(){
          let labels= [];
          let oldState = [];
          let newState = [];
          newState.push(id);
          newState.push(name);
          newState.push(username);
          newState.push(email);
          newState.push(street);
          newState.push(suite);
          newState.push(city);
          newState.push(zipcode);
          newState.push(lat);
          newState.push(lng);
          newState.push(phone);
          newState.push(website);
          newState.push(companyname);
          newState.push(catchphrase);
          newState.push(bs);
          // oldState Array + labels
          for(let i in props.person){
          if(i!='_id'){
          if(typeof(i)!='object'){
          oldState.push(props.person.i);
          labels.push(i);
        }
        else
        for(let j in props.person.i)
        if(typeof(j)!='object'){
        oldState.push(props.person.i.j);
        labels.push(j);
      }
      else
      for(let k in props.person.i.j)
      if(typeof(k)!='object'){
      oldState.push(props.person.i.j.k);
      labels.push(k);
    }
  }
}
//now start populating
for(let i in newState)
if(!newState[i]){
console.log('n-are new state '+labels[i]);
labels[i]='set'+labels[i];
{() => return {()=> {return labels[i]}+(oldState[i])}}
}
} */
setMessage('Please wait');
//populateWithOldData();
if(id)
axios({
  method:'POST',
  url:'https://stormy-castle-25399.herokuapp.com/person/edit',
  data:{
    id: parseInt(props.person.id),
    nid: parseInt(id),
    nname: name,
    nusername: username,
    nemail: email,
    nstreet: street,
    nsuite: suite,
    ncity: city,
    nzipcode: zipcode,
    nlat: lat,
    nlng: lng,
    nphone: phone,
    nwebsite: website,
    ncompanyname: companyname,
    ncatchphrase: catchphrase,
    nbs: bs
  },
}).then(function (response){
  if(response.status === 200){
    setMessage(props.person.name+' has been edited');
    return response;
  }}).then(
    clearState()
  ).catch(function (error){
    setMessage('Oops, something went wrong. '+props.person.name+' has not been edited. Please make sure your id field is not a duplicate.')
    return error;
  })
  else setMessage('ID is needed in order to edit a person entry. Nothing was edited within the DB.')
}

function deletePerson(person){
  axios({
    method:'POST',
    url:'https://stormy-castle-25399.herokuapp.com/person/delete',
    data:{
      id: parseInt(person.id),
    },
  }).then(function (response){
    if(response.status === 200){
      setMessage(person.name+' has been deleted');
      return response;
    }}).catch(function (error){
      setMessage('Oops, something went wrong. '+person.name+' has not been deleted.')
      return error;
    })
  }

  function noRefresh(e){
    e.preventDefault();
  }

  if(props.activePage==='search')
  return(
    <div>
    <form onSubmit={noRefresh}>
    <input type='text' placeholder='Person name' value={search} onChange={e=>setSearch(e.target.value)}></input>
    <br/>
    <button className='searchButton' type='submit' onClick={searchPerson}>Search</button>
    </form>
    <br/><br/>
    <ListDisplay list={searchlist} toggleEdit={props.toggleEdit} toggleDetails={props.toggleDetails} toggleDelete={props.toggleDelete}/>
    <br/>
    <div>{message}</div>
    <br/>
    <div className='fontAwesome'>SVG images credit goes to FontAwesome</div>
    </div>
  );

  if(props.activePage==='add'){
    return(
      <div className='addDiv'>
      <table className='ohGodIDidThisByHandWhy'>
      <tbody>
      <tr className='detailsRow'>
      <td>id</td>
      <td>
      <input type='number' value={id} onChange={e=>setId(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>name</td>
      <td>
      <input type='text' value={name} onChange={e=>setName(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>username</td>
      <td>
      <input type='text' value={username} onChange={e=>setUsername(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>email</td>
      <td>
      <input type='text' value={email} onChange={e=>setEmail(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>street</td>
      <td>
      <input type='text' value={street} onChange={e=>setStreet(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>suite</td>
      <td>
      <input type='text' value={suite} onChange={e=>setSuite(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>city</td>
      <td>
      <input type='text' value={city} onChange={e=>setCity(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>zipcode</td>
      <td>
      <input type='text' value={zipcode} onChange={e=>setZipcode(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>latitude</td>
      <td>
      <input type='text' value={lat} onChange={e=>setLat(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>longitude</td>
      <td>
      <input type='text' value={lng} onChange={e=>setLng(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>phone</td>
      <td>
      <input type='text' value={phone} onChange={e=>setPhone(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>website</td>
      <td>
      <input type='text' value={website} onChange={e=>setWebsite(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>company name</td>
      <td>
      <input type='text' value={companyname} onChange={e=>setCompanyname(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>catchphrase</td>
      <td>
      <input type='text' value={catchphrase} onChange={e=>setCatchphrase(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>company bs</td>
      <td>
      <input type='text' value={bs} onChange={e=>setBs(e.target.value)}></input>
      </td>
      </tr>
      </tbody>
      </table>
      <br/>
      <input className='addButton' type='button' value='Add' onClick={addPerson}></input>
      <br/><br/>
      <div>{message}</div>
      </div>
    );
  }
  
  if(props.activePage==='edit'){
    let person = props.person;

    return(
      <div className='editDiv'>
      <table className='ohGodIDidThisByHandWhy'>
      <tbody>
      <tr className='detailsRow'>
      <td>id</td>
      <td>
      {person.id}
      </td>
      <td>
      <input type='number' value={id} onChange={e=>setId(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>name</td>
      <td>
      {person.name}
      </td>
      <td>
      <input type='text' value={name} onChange={e=>setName(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>username</td>
      <td>
      {person.username}
      </td>
      <td>
      <input type='text' value={username} onChange={e=>setUsername(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>email</td>
      <td>
      {person.email}
      </td>
      <td>
      <input type='text' value={email} onChange={e=>setEmail(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>street</td>
      <td>
      {person.address.street}
      </td>
      <td>
      <input type='text' value={street} onChange={e=>setStreet(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>suite</td>
      <td>
      {person.address.suite}
      </td>
      <td>
      <input type='text' value={suite} onChange={e=>setSuite(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>city</td>
      <td>
      {person.address.city}
      </td>
      <td>
      <input type='text' value={city} onChange={e=>setCity(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>zipcode</td>
      <td>
      {person.address.zipcode}
      </td>
      <td>
      <input type='text' value={zipcode} onChange={e=>setZipcode(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>latitude</td>
      <td>
      {person.address.geo.lat}
      </td>
      <td>
      <input type='text' value={lat} onChange={e=>setLat(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>longitude</td>
      <td>
      {person.address.geo.lng}
      </td>
      <td>
      <input type='text' value={lng} onChange={e=>setLng(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>phone</td>
      <td>
      {person.phone}
      </td>
      <td>
      <input type='text' value={phone} onChange={e=>setPhone(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>website</td>
      <td>
      {person.website}
      </td>
      <td>
      <input type='text' value={website} onChange={e=>setWebsite(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>company name</td>
      <td>
      {person.company.name}
      </td>
      <td>
      <input type='text' value={companyname} onChange={e=>setCompanyname(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>catchphrase</td>
      <td>
      {person.company.catchPhrase}
      </td>
      <td>
      <input type='text' value={catchphrase} onChange={e=>setCatchphrase(e.target.value)}></input>
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>company bs</td>
      <td>
      {person.company.bs}
      </td>
      <td>
      <input type='text' value={bs} onChange={e=>setBs(e.target.value)}></input>
      </td>
      </tr>
      </tbody>
      </table>
      <br/>
      <input className='editButton' type='button' value='Edit' onClick={editPerson}></input>
      <br/><br/>
      <div>{message}</div>
      </div>
    );
  }

  if(props.activePage==='delete'){
    deletePerson(props.person);
  }

  if(props.activePage==='details'){
    let person = props.person;
    return(
      <table className='ohGodIDidThisByHandWhy'>
      <tbody>
      <tr className='detailsRow'>
      <td>id</td>
      <td>
      {person.id}
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>name</td>
      <td>
      {person.name}
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>username</td>
      <td>
      {person.username}
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>email</td>
      <td>
      {person.email}
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>street</td>
      <td>
      {person.address.street}
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>suite</td>
      <td>
      {person.address.suite}
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>city</td>
      <td>
      {person.address.city}
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>zipcode</td>
      <td>
      {person.address.zipcode}
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>latitude</td>
      <td>
      {person.address.geo.lat}
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>longitude</td>
      <td>
      {person.address.geo.lng}
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>phone</td>
      <td>
      {person.phone}
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>website</td>
      <td>
      {person.website}
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>company name</td>
      <td>
      {person.company.name}
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>company catchphrase</td>
      <td>
      {person.company.catchPhrase}
      </td>
      </tr>
      <tr className='detailsRow'>
      <td>company bs</td>
      <td>
      {person.company.bs}
      </td>
      </tr>
      </tbody>
      </table>
    );
  }

  if(props.list.length>0 && (props.activePage==='home' || props.activePage==='delete')){
    return (
      <div>
      <ListDisplay list={props.list} toggleEdit={props.toggleEdit} toggleDetails={props.toggleDetails} toggleDelete={props.toggleDelete}/>
      <div><br/>{message}</div>
      </div>
    );
  }
  else
  return (
    <div>nada from axios</div>
  );
}

export default AppDisplay;
