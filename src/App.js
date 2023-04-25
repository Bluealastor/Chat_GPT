import { MdNavigateNext } from "react-icons/md";

const App = () => {

  const getMessages = async () => {
    const options = {
      metod: "POST",
      body: JSON.stringify({
        message:"hello how are you?"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
     const response =  await fetch('http://localhost:8000/completions', options)
     const data = await response.json()
     console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="app">
      <section className='side-bar'>
        <button>+ New Chat</button>
        <ul className='history'>
          <li>BLUGH</li>
        </ul>
        <nav>
          <p>Made by Chris</p>
        </nav>
      </section>
      <section className='main'>
        <h1>ChrisGpt</h1>
        <ul className="feed">
          
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input/>
            <div id='submit' onClick={getMessages}><MdNavigateNext style={{color:"blue"}}/></div>
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
