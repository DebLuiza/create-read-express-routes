import React from 'react'
import "./style/search.css"
import axios from "axios"
import { useEffect, useState } from "react"

const search = () => {
  const base_url = "http://localhost:8080";
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const API = axios.create({
        baseURL: base_url,
        headers: {
          "Content-Type": "application/json",
        },
      });

      let json = await API.get(base_url).then((res) => {
        return res;
      });

      let data = JSON.parse(json.data);

      setContacts(data);
    }
    fetchData();
  }, []);


  const handleSearch = async (name) => {
    const API = axios.create({
      baseURL: base_url,
      headers: {
        "Content-Type": "application/json",
      }
    })

    let data = await API.get(`${base_url}/pesquisar/${name}`).then((res) => {
      return res
    })

    const content = JSON.parse(data.data)

    setContacts(content)

  }

  return (
    <div className='main-search'>
      <div className="label-search">
        <label>Pesquise um contato:</label>
        <input type="text" className="input-text" value={name} onInput={(e) => {setName(e.target.value)}} required/>
        <button onClick={() => handleSearch(name)} className="btn-criar">Pesquisar</button>
      </div>
      <div className="contacts">
        {contacts.map((e) => {
          return (
            <>
              <div className="card-contact" key={e.id}>
                <span className="span"></span>
                <div className="name">
                  Nome: <p>{e.name}</p>
                </div>
                <div className="email">
                  E-mail: <p>{e.email}</p>
                </div>
              </div>
            </>
          )
        })}
      </div>

    </div>
  )
}

export default search