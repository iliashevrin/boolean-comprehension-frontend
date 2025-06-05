// Introduction component

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "../styles/HomePage.module.css";

export default function introduction() {
  const router = useRouter();
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    // Check for the consent query parameter
    if (router.query.consent) {
      setConsent(router.query.consent);
    }
  }, [router.query.consent]);

  const handleNext = () => {
    router.push("/quiz");
  };

  return (
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
            Instructions
          </Typography>
          <Typography
            variant="body1"
            sx={{
                // display: "flex",
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
    In this experiment, you will be presented with a series of 16 questions that test your comprehension of Boolean formulas. 

<br />
<br />            
    First, let's go through a brief recap of Boolean logic. A Boolean formula consists of Boolean variables and operators. 
    In our case, the variables are represented as Latin letters, and they can be assigned either a True or a False value. The operators that you're going to see are:
<br />
      <ol>
        <li>Logical NOT represented textually as `!`</li>
        <li>Logical AND represented textually as `&`</li>
        <li>Logical OR represented textually as `|`</li>
        <li>Logical IMPLIES represented textually as `-&gt;`</li>
        <li>Logical IFF represented textually as `&lt;-&gt;`</li>
      </ol>
<br />
    The semantics of these operators are presented in the following truth tables:
<br />
      <table>
        <tr>
          <th>A</th>
          <th class="border">B</th>
          <th>!B</th>
          <th>A & B</th>
          <th>A | B</th>
          <th>A -&gt; B</th>
          <th>A &lt;-&gt; B</th>
        </tr>
        <tr>
          <td><b>T</b></td>
          <td class="border"><b>T</b></td>
          <td>F</td>
          <td>T</td>
          <td>T</td>
          <td>T</td>
          <td>T</td>
        </tr>
        <tr>
          <td><b>T</b></td>
          <td class="border"><b>F</b></td>
          <td>T</td>
          <td>F</td>
          <td>T</td>
          <td>F</td>
          <td>F</td>
        </tr>
        <tr>
          <td><b>F</b></td>
          <td class="border"><b>T</b></td>
          <td></td>
          <td>F</td>
          <td>T</td>
          <td>T</td>
          <td>F</td>
        </tr>
        <tr>
          <td><b>F</b></td>
          <td class="border"><b>F</b></td>
          <td></td>
          <td>F</td>
          <td>F</td>
          <td>T</td>
          <td>T</td>
        </tr>
      </table>
<br />
    The formulas can also contain parentheses to eliminate any ambiguity that might arise in the operator's order of precedence. 
<br />
<br />
    All the questions you will be presented have the same format. 
    You will be given a Boolean formula and a partial or full assignment of Boolean values to the variables, and be asked to evaluate the formula based on the assignment. 
    The answer can be either True, False, or unknown if there is not enough information to decide. 

<br />
<br />
Here is a small example: 
<br />
    Given the formula <pre className={styles.codeStyle}>((A & B) -&gt; C)</pre> what is the outcome of the assignment <pre className={styles.codeStyle}>A = False, B = True</pre>?
      <ol>
        <li><b>True</b></li>
        <li><b>False</b></li>
        <li><b>Not Enough Information</b></li>
      </ol>
    You can try and assign the values and see that the left part of the implies operation evaluates to False, 
    hence the formula evaluates to True, and the correct answer to this question is <b>1. True</b>. 
    If the assignment was <pre className={styles.codeStyle}>A = True, B = True</pre> you would not be able to decide without knowing the value of C, 
    hence the correct answer would have been <b>3. Not Enough Information</b>. 
<br />
<br />
    We record the time it took you to answer each question and whether the answer is correct.      
    Clicking the <b>"Submit"</b> button records your chosen answer and elapsed time, and stops the clock, but does not proceed to the next question immediatelly.
    Then, by clicking <b>"Next Question"</b> you will be redirected to the next question and the time will start running again.
    You can also click <b>"Skip"</b> before submitting and you will be redirected to the next question without recording the result of the current one in case you are not sure or does not want to answer. 
<br />
<br />
    We expect the time to answer each question to be around 20-30 seconds, but you can take your time as there are no 
    penalties upon reaching the time limit of 60 seconds that we decided to present for your reference. 
    Still, we encourage you to answer the questions as fast as possible.
<br />
<br />
    The questions difficulty is mixed. Some questions may be easy while others may require more effort.  
    Please refrain from clicking the back button in your browser during the experiment, as it will redirect to the Instructions page. 
    A new set of questions will be presented if you re-enter the experiment. 
<br />
<br />
    Please note that if you choose to do the experiment on your mobile, some formulas might require you to scroll horizontally as they may not fit into the small screen.
    For this reason, we encourage you to do the experiment on a laptop or use a large screen.
<br />

          </Typography>
        </Box>
        <Box
          sx={{
              display: "flex",
              justifyContent: "center",
          }}
        >
          <button className={styles.buttondis} onClick={handleNext}>
            I am Ready to Start the Experiment
          </button>
        </Box>
        {/* Add an Illustration component or an img tag here if needed */}
      </Box>
    </Box>
  );
}

export async function getStaticProps() {
  return {
    props: { title: "introduction" },
  };
}
