import React from "react";
import "./style/home.css";
import axios from "axios";
import { useEffect, useState } from "react";

const home = () => {
  const base_url = "http://localhost:8080";
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API = axios.create({
      baseURL: base_url,
      headers: {
        "Content-Type": "application/json",
      },
    });

    let create = await API.post(`${base_url}/create`, {
      name: name,
      email: email,
    }).then((res) => {
      return res
    });

    const newValue = JSON.parse(create.data)
    console.log(newValue);
    
    setContacts(newValue.contacts);
    setName("")
    setEmail("")
    
  };

  return (
    <div className="main-home">
      <form onSubmit={handleSubmit}>
        <div className="label-name">
          <label>Digite o Nome:</label>
          <input
            type="text"
            id="first-input"
            value={name}
            name="name"
            onInput={(e) => setName(e.target.value)}
            className="input-text"
            required
          />
        </div>
        <div className="label-email">
          <label>Digite o Email:</label>
          <input
            type="email"
            id="first-input"
            value={email}
            name="email"
            onInput={(e) => setEmail(e.target.value)}
            className="input-text"
            required
          />
        </div>
        <input type="submit" value="Criar" className="btn-criar" />
      </form>
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
            );
          })}
        </div>
    </div>
  );
};

export default home;
