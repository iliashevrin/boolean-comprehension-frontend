import Link from "next/link";
import { useState } from "react";

import Illustration from "../components/Illustration";
import styles from "../styles/HomePage.module.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function HomePage() {
  const [displayComponent, setDisplayComponent] = useState("consentForm");

  const [consent, setConsent] = useState(null);
  // const [disabled, setDisabled] = useState(true);
  const router = useRouter();
  const handleConsent = (answer) => {
    setConsent(answer);
    // Optionally, handle the routing logic here
    // For example, if you need to redirect to another page based on the answer
    if (answer === "agree") {

      localStorage.setItem("consentAgreement", true);

      localStorage.setItem("clientUrl", window.location.href);
      
      // Redirect to the introduction page
      router.push("introduction");
    } else {
      // Redirect to a thank you page
      router.push("/thankyou");
    }
  };
  // const handleNext = () => {
  //   router.push("introduction"); // Replace '/next-section' with the actual path you wish to navigate to.

  //   // Handle what happens when the Next button is clicked
  //   // For example, go to the next step in the process
  // };
  return (
    <>
      <Box className={styles.container}>
        <Box className={styles.foreground}>
          <Box className={styles.content}>
            <Typography
              variant="h1"
              className={styles.name}
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "4rem",
                textAlign: "center",
                marginBottom: "1rem",
                "@media (max-width: 820px)": {
                  fontSize: "2rem",
                  padding: "0rem 0rem 0rem 0rem",
                },
              }}
            >
              Consent
            </Typography>
            <Typography
              variant="body1"
              className="consent-text"
              sx={{
                display: "flex",
                overflowY: "auto",
                maxHeight: "80vh",
                height: "80vh",
                textAlign: "left",
                marginBottom: "1rem",
                padding: "0 20rem 1rem 20rem",
                fontSize: "1.2rem",
                lineHeight: "2.5rem",
                "@media (max-width: 820px)": {
                  width: "100%",
                  padding: "2rem 0rem 0rem 0rem",
                  textAlign: "left",
                  fontSize: "1rem",
                  lineHeight: "2rem",
                  maxHeight: "60vh",
                  height: "60vh",
                },
              }}
            >
              The aim of this research is to study how software engineers
              understand Boolean formulas and more broadly, code and formal
              specifications.
              <br />
              <br />
              We appreciate your interest in participating in this online task.
              You have been invited to participate as you have a background in
              software engineering. Please read through this information before
              agreeing to participate (if you wish to) and clicking the ‘I
              Agree’ box below.
              <br />
              <br />
              You may ask any questions before deciding to take part by
              contacting the Principal Researcher Prof. Shahar Maoz, who is affiliated
              with the School of Computer Science at Tel Aviv University. Prof.
              Maoz can be contacted at maoz@cs.tau.ac.il.
              <br />
              <br />
              In this quiz, you will be asked 16 comprehension questions about
              Boolean formulas. This should take about 5-10 minutes. Only basic
              background knowledge in programming is required. We collect data
              about the correctness of the answers and the time invested in
              answering them. We will use this data in order to better
              understand what makes Boolean formulas more difficult or easier to
              understand.
              <br />
              <br />
              Please note that participation is voluntary. If you do decide to
              take part, you may withdraw at any point for any reason by closing the browser.
              We have also included a ‘Skip’ option should you
              prefer not to answer a particular question. However, we would
              appreciate it if you try to give your best answer even if you are
              not absolutely sure about it.
              <br />
              <br />
              We will not collect and store any data that could directly
              identify you. The responses you provide will be stored in a
              password-protected electronic file. We will only use the collected
              data for the purpose of the research. The results of the study are 
              expected to appear in scientific publications and academic theses.
              <br />
              <br />
              This research has been reviewed by, and received ethics clearance
              through, Tel Aviv University Research Ethics Committee 7748-1. The 
              research is funded by a grant from the Israel Science
              Foundation [1954/23].
              <br />
              <br />
              If you have read the information above and agree to participate
              with the understanding that the data you submit will be processed
              accordingly, please click the ‘I Agree’ box below to move to the
              instructions page.
              <br />
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                className={
                  consent === "agree" ? styles.button : styles.buttondis
                }
                onClick={() => handleConsent("agree")}
              >
                I Agree
              </button>
              <button
                className={styles.buttondis}
                onClick={() => handleConsent("disagree")}
              >
                I Disagree
              </button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: " flex-end",
              width: "100%",
              "@media (max-width: 780px)": {
                width: "100%",
                padding: "3rem 0rem 0rem 0rem",
                display: "flex",
                justifyContent: "center",
                textAlign: "flex-start",
              },
            }}
          >
{/*             <button
              className={styles.button}
              disabled={disabled}
              onClick={handleNext}
            >
              Next
            </button> */}
          </Box>
          {/* Add an Illustration component or an img tag here if needed */}
        </Box>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { title: "Home" },
  };
}
