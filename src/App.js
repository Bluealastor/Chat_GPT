import { MdNavigateNext } from "react-icons/md";
import { useState, useEffect } from 'react'

const App = () => {
  const [value, setValue] = useState(null)
  const [message, setMessage] = useState(null)
  const [previousChats, setPriviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")
  }

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      //  console.log(data)
      setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error)
    }
  }

  // console.log(message)

  useEffect(() => {
    console.log(currentTitle, value, message)
    if (!currentTitle && value && message) {
      setCurrentTitle(value)
    }
    if (currentTitle && value && message) {
      setPriviousChats(prevChats => (
        [...prevChats, {
          title: currentTitle,
            role:'user',
            content:value
        },
        {
          title:currentTitle,
          role:message.role,
          content:message.content
        }
        ]
      ))
    }

  }, [message, currentTitle])

  // console.log(previousChats)

  const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChats => previousChats.title)))
  console.log(uniqueTitles)

  return (
    <div className="app">
      <section className='side-bar'>
        <button oncClick={createNewChat}>+ New Chat</button>
        <ul className='history'>
          {uniqueTitles?.map((uniqueTitle, index)  => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav>
          <p>Made by Chris</p>
        </nav>
      </section>
      <section className='main'>
        {!currentTitle && <h1>ChrisGpt</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index)  => { <li key={index}>
            <p className="role">{chatMessage.role}</p>
            <p>{chatMessage.content}</p>
          </li>})}

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div id='submit' onClick={getMessages}><MdNavigateNext style={{ color: "blue" }} /></div>
          </div>
          <p className="info">
            Chat GPT Version
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
