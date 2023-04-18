const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const API_KEY = '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'

app.post('/completions', async (req,res) => {
    const options = {
        method: "POST",
        headers:{
            "Authorization":  `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages: [{ role: "user", content: "how are you?"}],
            max_tokens:10,
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = response.json()
        res.send(data)
    } catch(error){
        console.error(error)
    }
})

app.listen(PORT, () => console.log('Your server is runnin in PORT ' + PORT))