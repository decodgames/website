import React, { useState } from "react";
import "./Newuser.css";
import Image from "../../assets/profile.png";
import axios from "axios";

function User() {
  const [username, setUsername] = useState("");
  const [userIsValid, setUserIsValid] = useState(true);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [words, setWords] = useState("");
  const [message, setMessage] = useState("");
  const maxWords = 200;
  
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email);
  

  const validateUsername = (username) => /^[A-Z][a-zA-Z0-9_-]{2,19}$/.test(username);

  function handleEmailChange(e) {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsValidEmail(validateEmail(inputEmail));
  }

  function handleUsernameChange(e) {
    const userInput = e.target.value;
    setUsername(userInput);
    setUserIsValid(validateUsername(userInput));
  }

  const handleWordChange = (e) => {
    const wordInput = e.target.value;
    const wordsArray = wordInput.trim().split(/\s+/);
    if (wordsArray.length <= maxWords || wordInput === "") {
      setWords(wordInput);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !words) {
      setMessage("Please fill all fields before submitting!");
      return;
    }
    if (!isValidEmail || !userIsValid) {
      setMessage("Please enter a valid username and email!");
      return;
    }

    try {
      const userData = { username, email, message: words };
      const response = await axios.post("http://localhost:3001", userData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("User data submitted successfully!");
      console.log("Response:", response.data);

      // Clear form
      setUsername("");
      setEmail("");
      setWords("");
      setUserIsValid(true);
      setIsValidEmail(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      setMessage("Error: Unable to submit data!");
    }
  };

  return (
    <form id="formdata" onSubmit={handleSubmit}>
      <div className="inputcontainer">
        <div className="inputgroups">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img style={{ width: 100 }} src={Image} alt="Profile" />
          </div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className={`input-field ${userIsValid || username === "" ? "" : "error-border"}`}
           
          />
          {username && <p className={`message ${userIsValid ? "valid" : "invalid"}`}>{userIsValid ? "Username is valid" : "Invalid format Uppercase first letter,3-20 characters"}</p>}

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={`input-field ${isValidEmail || email === "" ? "" : "error-border"}`}
        
          />
          {email && <p className={`message ${isValidEmail ? "valid" : "invalid"}`}>{isValidEmail ? "Email is correct format" : "Invalid email format"}</p>}

          <label>Text Message</label>
          <textarea className="input-field" value={words} onChange={handleWordChange} maxLength={200} />
          <p className="word">{words.trim() === "" ? 0 : words.trim().split(/\s+/).length} / {maxWords} words</p>

          <button type="submit" className="button">Submit</button>
          {message && <p className="response-message">{message}</p>}
        </div>
      </div>
    </form>
  );
}
export default User;
