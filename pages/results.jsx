import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useRouter } from "next/router";
import { List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from '@mui/material/CircularProgress';
import styles from "../styles/HomePage.module.css";
import axios from "axios";


function millisecondsToMinutesAndSeconds(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  // Ensures that seconds are two digits. If seconds are less than 10, pad with a leading zero.
  seconds = seconds.toString().padStart(2, "0");
  return `${minutes} minute${minutes !== 1 ? "s" : ""} ${seconds} seconds`;
}
function millisecondsToSeconds(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  // Ensures that minutes and seconds are two digits. If less than 10, pad with a leading zero.
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}


const getQuestionResult = (question, index) => {
  return (
      <ListItem
        key={`key-${index+1}`}
        sx={{ display: "flex", justifyContent: "space-between", padding: "8px 16px" }}
      >
        <ListItemText
          primary={`Question ${index+1}: ${
            question.time === 0 ? "Skipped" : (question.correct ? "Correct" : "Incorrect")
          }`}
          sx={{ mr: 2, fontWeight: "bold" }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontWeight: "bold",
            color: "white",
          }}
        >
          {question.time === 0 ? "" : `Time: ${millisecondsToSeconds(question.time)}`}
        </Typography>
      </ListItem>
    );
  
};

export default function Results({ title }) {
  const router = useRouter();
  const [quizId, setQuizId] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  useEffect(() => {
    const quizId = localStorage.getItem("quizId");
    const dataQuiz = localStorage.getItem("quizData");
    setAllQuestions(JSON.parse(dataQuiz));
    setQuizId(quizId);
  }, []);
  const calculateTotalTime = () => {
    return allQuestions.reduce((totalTime, current) => {return totalTime + current.time;}, 0);
  };
  const totalCorrect = () => {
    return allQuestions.reduce((total, current) => {return total + ((current.time !== 0 && current.correct) ? 1 : 0);}, 0);
  };
  const totalIncorrect = () => {
    return allQuestions.reduce((total, current) => {return total + ((current.time !== 0 && !current.correct) ? 1 : 0);}, 0);
  };
  const totalSkipped = () => {
    return allQuestions.reduce((total, current) => {return total + (current.time === 0 ? 1 : 0);}, 0);
  };

  // Function to format the total time
  const formatTotalTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ${seconds} seconds`;
  };
  
  const handleNext = () => {
    router.push("personaldetails");
    localStorage.removeItem("quizData");
  };
  return !allQuestions ? ( 
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
        maxWidth: 650,
        mx: "auto",
        mt: 5,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Your Results
      </Typography>
      <List sx={{display: "inline-flex", padding:"8px 8px"}}>
        <List>
          {
            allQuestions.slice(0, allQuestions.length / 2).map((q,i) => getQuestionResult(q,i))
          }
        </List>
      </List>
      <List sx={{display: "inline-flex", padding:"8px"}}>
        <List>
          {
            allQuestions.slice(allQuestions.length / 2, allQuestions.length).map((q,i) => getQuestionResult(q,i + allQuestions.length / 2))
          }
        </List>
      </List>
      <Typography variant="body1" gutterBottom>
        Total Time:{" "}
        <b>{millisecondsToMinutesAndSeconds(calculateTotalTime())}</b>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total Correct Answers:{" "}
        <b>{totalCorrect()}</b>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total Incorrect Answers:{" "}
        <b>{totalIncorrect()}</b>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total Skipped Questions:{" "}
        <b>{totalSkipped()}</b>
      </Typography>
      <button
        variant="contained"
        onClick={handleNext}
        className={styles.buttondis}
      >
        Next
      </button>
    </Box>
  );
}
export async function getStaticProps() {
  // Perform your data fetching here
  return {
    props: {
      title: "Results Page", // You can pass the fetched data as props
    },
  };
}
