import React, { useEffect, useState } from "react";
import { quotesData } from "../staticData/QuotesData";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.quotable.io/",
});

const Quote = () => {
  const [quote, setQuote] = useState({ author: "", content: "" });

  const fetchMotivationalQuote = async () => {
    try {
      const response = await api.get("/random?tags=motivational");
      const { author, content } = response.data;
      setQuote({ author, content });
    } catch (error) {
      console.error(
        "Error fetching motivational quote from quotable api:",
        error
      );
      const randNum = Math.floor(Math.random() * 21);
      setQuote({
        author: quotesData[randNum].author,
        content: quotesData[randNum].content,
      });
    }
  };

  useEffect(() => {
    fetchMotivationalQuote();
  }, []);

  return (
    <div className="quote-container">
      <h1>Quote:</h1>
      <div>
        <p>{quote.content}</p>
        <p>{quote.author}</p>
      </div>
    </div>
  );
};

export default Quote;
