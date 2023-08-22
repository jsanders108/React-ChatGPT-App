import { useState } from "react";

function App() {
  // State variables to manage input and response
  let [promptInput, setPromptInput] = useState("");
  let [response, setResponse] = useState("");

  // URL of your Azure Function
  const azureFunctionUrl = 'https://openai1212.azurewebsites.net/api/completionAPI?';

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the Azure Function
      const response = await fetch(azureFunctionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": promptInput} 
          ],
          temperature: 0,
          max_tokens: 500,
        }),
      });

      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      // Parse the response message as text
      const message = await response.text();

      // Update the state with the response message
      setResponse(message);

      //Reset the input prompt to be empty
      setPromptInput("")
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="App">
        <div className="header-container">
            <h1 className="header-title">ASK CHATGPT ANYTHING</h1> 
        </div>

        <div className="section-container">
            <form className="form-wrapper" onSubmit={handleSubmit}>
                {/* Input field for the user's prompt */}
                <input className="form-input" placeholder="Type question here . . . "
                    name="promptInput"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                />
                {/* Button to submit the question */}
                <button className="main-section-btn">SUBMIT QUESTION</button>
            </form>
            {/* Display the response from the Azure Function */}
            <div className="response">{response}</div>

        </div>

    </div>
  );
}

export default App;
