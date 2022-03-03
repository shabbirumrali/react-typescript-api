import React, {FC, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { FiInfo, FiRefreshCcw } from "react-icons/fi";

// import {ayushK} from './ayushK.jpg';
//import {userdata} from './interface/dataFile'

//const defaultPosts:userdata[] = [];
const App:FC = () => {  

  const [data, setData]: [any, (data: any) => void] = useState<any>()
  const [refButton, setRefButton]: [boolean, (refButton: boolean) => void] = useState<boolean>(false)
  localStorage.setItem("LOCAL__DATA__TITLE", data[0].name.title)
  localStorage.setItem("LOCAL__DATA__FIRST", data[0].name.first)
  localStorage.setItem("LOCAL__DATA__LAST", data[0].name.last)
    
  // console.log("data value out side of useeffect", data)
  // setName(data.data.results)
  // console.log("results value: ", name)
  // setName(data.result[0].name)

  const getData = async () => {
    await axios
      .get('https://randomuser.me/api')
      .then((res) => {        
        console.log(res)
        setData(res.data.results)
      }).catch((error) => {
        console.log("error is: ", error)
      })
  }
  
  useEffect(() => {    
      const valueData = getData()
      console.log(valueData)
  }, [refButton])   
  // setName(data.data.results)
  // console.log("results value: ", name)

  return (
    <div className="App">
      { data ? (
          <div className="container">
          <header>
            <p>Welcome Back!</p>
            <h1>{localStorage.getItem("LOCAL__DATA__TITLE")} {localStorage.getItem("LOCAL__DATA__FIRST")} {localStorage.getItem("LOCAL__DATA__LAST")} </h1>            
          </header>
          <section>
            <div className='req_info'>
              <p>Requested Information</p>
              <h4>{data[0].email}</h4>
            </div>
            <div className='information_tab'>
              <div className='user_block'>
                <img src={data[0].picture.large} alt="" />
                <h5>{data[0].name.first} <br /> {data[0].name.last}</h5>
              </div>
              <div className='additional_info'>
                <span className="tooltip"><FiInfo />                  
                  <span className='tooltiptext'>
                    <p>Age: {data[0].dob.age}</p>
                    <p>Gender: {data[0].gender}</p>
                  </span>
                </span>
              </div>
            </div>
            <div className='refresh_button'>
              <button onClick={() => setRefButton(!refButton)}><FiRefreshCcw /></button>
            </div>
          </section>
          <ul>
            <li>used local storage you can check that in application at developer tool</li>
            <li>use of typescript</li>
            <li>axios as async request for api</li>
          </ul>
        </div>
      ) : null }      
    </div>

      // {/* { data ?
      // (
      //   <div className='container'>
      //     <div className="contaent">
      //       <h3>Name: <span> {data[0].name.title} {data[0].name.first} {data[0].name.last}</span> </h3>
      //       <h3>Email: <span>{data[0].email}</span> </h3>
      //     </div>
      //     <div className='image_section'>
      //       <img src={data[0].picture.large} alt="Person Image" />
      //     </div>
      //   </div>
      // )        
      // :null}  */}    
  );
}

export default App;
