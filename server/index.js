import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()
const port = 8080

app.use(cors())
app.use(express.json())

app.get(`/`, (req, res) => {
    fs.readFile(`./data/db.json`, "utf8", async(err, json) => {
        if (err) {
            console.log(err)
            return res.status(500)
        }
        const data = JSON.parse(json)
        const ReadContacts = await data.contacts.filter((e) => {
            return e
        })
        return res.status(200).json(JSON.stringify(ReadContacts, null, 2))
    })
})

app.get(`/pesquisar/:name`, (req, res) => {

    const { name } = req.params

    fs.readFile(`./data/db.json`, "utf8", async(err, json) => {
        if (err) {
            console.log(err)
            return res.status(500)
        }
        const data = JSON.parse(json)
        
        const ReadContacts = await data.contacts.filter((e) => {
            if(e.name == name){
                return e
            }
        })
        return res.status(200).json(JSON.stringify(ReadContacts, null, 2))
    })
})

app.post(`/create`, (req, res) => {

    const { name } = req.body
    const { email } = req.body

    fs.readFile(`./data/db.json`, "utf8", async (err, json) => {

        const data = JSON.parse(json)

        const newContact = [...data.contacts, {
            "id": data.nextId,
            "name": name,
            "email": email,
        }]

        const sobrescrever = {
            "nextId": data.nextId + 1,
            "contacts": newContact
        }

        fs.writeFile(`./data/db.json`, JSON.stringify(sobrescrever, null, 2), 'utf8', (err) => {
            if (err) {
                console.log(err)
            }
        })
    
        res.status(200).json(JSON.stringify(sobrescrever, null, 2))
    })

})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})