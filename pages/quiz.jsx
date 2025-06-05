import React, { useState, useEffect, useRef, use } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import styles from "../styles/HomePage.module.css";
import { useRouter } from "next/router";

import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios"; // Import Axios
import flatted from "flatted";
import CircularJSON from "circular-json";
import { Container } from "@mui/system";

const url = "https://boolean-formula-comprehension.onrender.com";
// const url = "http://localhost:8000";

const parseResult = (r) => {
    if (r === "True") {
      return true;
    } else if (r === "False") {
      return false;
    } else {
      return null;
    }
};

const getAssignmentText = (json) => {
    
    const assgn = JSON.stringify(json).replaceAll("{", "").replaceAll("}", "").replaceAll("\"", "").replaceAll(":", "=").split(",");
    
    if (assgn.length > 4 && screen.width <= 400) {
        const first = assgn.slice(0,3).join(" ");
        const second = assgn.slice(3,assgn.length).join(" ");
        return first + "\n" + second;
    } else {
        return assgn.join(" ");
    }
};

const getRenderedQuestionText = (q) => {
  return  (
      <div
        style={{
          whiteSpace: "pre-wrap",
          overflowX: "auto",
          width: "100%",
          // height: "240px",
        }}
      >
        <p
          style={{
            marginBottom: "10px",
          }}
        >
          Consider the following Boolean formula:
        </p>
        <pre className={styles.codeStyle}><code>{q.formula}</code></pre>
        <p style={{ marginTop: "15px", lineHeight: "30px" }}>And consider the following variable assignment:</p>
        <pre className={styles.codeStyle} style={{ marginTop: "15px" }}>
          <code>{getAssignmentText(q.assignment)}</code>
        </pre>
        <p style={{ marginTop: "15px" }}>What is the outcome of the formula given the assignment?</p>
      </div>
    );
};

export default function Quiz({ title }) {
  // Initialize Firebase
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [timer, setTimer] = useState(60);
  const [startTime, setStartTime] = useState(null);
  const [renderedQuestionText, setRenderedQuestionText] = useState(null);
  const [submitTime, setSubmitTime] = useState(null);
  const router = useRouter();
  const [timerActive, setTimerActive] = useState(false);
  const timerIdRef = useRef(null);
  const [progress, setProgress] = useState(100);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    if (timerActive && timer > 0) {
      timerIdRef.current = setInterval(() => {
        setTimer((t) => t - 1);
        
        setProgress((prevProgress) =>
          prevProgress > 0 ? prevProgress - 100 / 60 : 0
        );
      }, 1000);
    } else if (timer <= 0) {
      clearInterval(timerIdRef.current);
    }

    return () => clearInterval(timerIdRef.current);
  }, [timerActive, timer]);

  const handlePopState = (e) => {
    window.dispatchEvent(new Event('beforeunload'));
  };
      
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
    
  useEffect(() => { 
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(timerIdRef);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [timer]);

  const startQuiz = async () => {
    try {

      const clientUrl = localStorage.getItem("clientUrl");
        
      const response = await axios.post(url + "/api/followup/start-quiz",                             
          { "clientUrl": clientUrl }, 
          { headers: { "Content-Type": "application/json" } }
      );
      const quizId = response.data.quizId;

      localStorage.setItem("quizData", JSON.stringify([]));
      
      const questions = response.data.questions;
      
      localStorage.setItem("quizId", quizId);

      setQuestions(questions);
      setIsSubmitted(false);

      clearInterval(timerIdRef.current);
      setTimerActive(true);

      setRenderedQuestionText(getRenderedQuestionText(questions[currentQuestionNumber]));
      setStartTime(performance.now());
        
    } catch (error) {
      console.error("Error starting the quiz:", error);
    }
  };
  useEffect(() => {
    // If pressed "I agree" then load a new quiz
    // otherwise go back to first page
    if (localStorage.getItem("consentAgreement")) {
        startQuiz();
    } else {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.push("index");
    }
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmit = async () => {
    const endTime = performance.now();
    let timeTaken = endTime - startTime;
    console.log(timeTaken);
    const quizId = localStorage.getItem("quizId");
    setIsSubmitted(true); // Set to true after submitting

    // Stop the timer
    clearInterval(timerIdRef.current);
    setTimerActive(false);

    const answer = parseResult(selectedOption);
    const question = questions[currentQuestionNumber];
      
    const variables = {time: timeTaken, answer: answer, formula: question.formula, index: currentQuestionNumber};

    // Determine question number
    const field = "data." + currentQuestionNumber + "." + (question.isOriginal ? "original" : "rewritten");
    
    // Prepare the answer data to be submitted
    const answerData = {[field] : variables };

    console.log(answerData);

    setSubmitting(true);
    
    try {
      // Submit the answer data to the server
      const response = await axios.post(
        url + `/api/followup/answers/${quizId}`,
        { answerData }, // Send answerData as an object

        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSubmitting(false);

      // Check if the selected option matches the correct answer
      const isAnswerCorrect = (response.data.result === answer);
      setIsCorrect(isAnswerCorrect);

      // Handle the response after submitting the answer
      const existingQuizData = JSON.parse(localStorage.getItem("quizData")) || [];

      // Append the new question's response data
      existingQuizData.push({time: timeTaken, correct: isAnswerCorrect});
      
      // Save the updated quiz data back to localStorage
      localStorage.setItem("quizData", JSON.stringify(existingQuizData));

      setTimerActive(false); // Stops the timer
      setSubmitTime(timer);
      setTimer(timer);

    } catch (error) {
      // Handle any errors that occur during submission
      console.error("Error submitting answer:", error);
    }
  };

  const handleNextQuestion = () => {

    // Skipping the question
    if (timerActive) {
      const existingQuizData = JSON.parse(localStorage.getItem("quizData")) || [];
      existingQuizData.push({time: 0});
      localStorage.setItem("quizData", JSON.stringify(existingQuizData));
    }
      
    if (currentQuestionNumber < questions.length - 1) {
      // Clear the interval before moving to the next question
      clearInterval(timerIdRef.current);
      const next = currentQuestionNumber + 1;
      setCurrentQuestionNumber(next);
      setSelectedOption("");
      setProgress(100);

      setTimer(60); // Reset the timer to 60 seconds
      setTimerActive(true); // Reactivate the timer for the next question
      setIsCorrect(null);
      setIsSubmitted(false);

      setSubmitTime(null);
      
      setRenderedQuestionText(getRenderedQuestionText(questions[next]));
      setStartTime(performance.now());
      
    } else {
        
      // Redirect to the Personal Details screen
      router.push("results");
    }
  };
  return !questions ? ( 
    <CircularProgress 
          style={{
            margin: "auto",
            width: "50%",
          }} 
          color="primary" 
          size="md" 
          aria-label="Loading..." 
    /> ) :

(
    <Box
      sx={{
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        mt: 2,
        "@media (max-width: 780px)": {
          fontSize: "2rem",
          padding: "0rem 0rem 0rem 0rem",
        },
      }}
    >
      <Typography variant="h4" gutterBottom>
        Question {currentQuestionNumber + 1} /
        <span
          style={{
            marginLeft: "6px",
          }}
        >
          {questions.length}
        </span>
      </Typography>

      <Typography variant="body1" gutterBottom>
        {renderedQuestionText}
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          name="quiz-options"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {["True", "False", "Not Enough Information"]
            .map((option, index) => (
              <FormControlLabel
                value={option}
                control={<Radio disabled={isSubmitted} />}
                label={option}
                key={index}
              />
            ))}
        </RadioGroup>
      </FormControl>
      <Box sx={{ my: 2 }}>
        <button
          onClick={handleSubmit}
          disabled={!selectedOption || isSubmitted}
          className={styles.buttondis}
        >
          Submit
        </button>
      </Box>
      <Box
        sx={{
          my: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
            { `${timer} seconds` }
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            width: "100%",
            height: "10px",
            borderRadius: "5px",
            backgroundColor: "#e0e0e0", // Lighter grey for the bar background
            '& .MuiLinearProgress-bar': {
                backgroundColor: "#0c3b69"
            }
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: " flex-end",
        }}
      >
        <button
          className={styles.buttondis}
          onClick={handleNextQuestion}
          disabled={submitting}
          sx={{ mt: 2 }}
        >
          {timerActive ? "Skip" : (submitting ? "Submitting..." : (currentQuestionNumber < questions.length - 1 ? "Next Question" : "Finish"))}
        </button>
      </Box>
    </Box>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Quiz",
    },
  };
}
