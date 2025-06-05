import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Container,
} from "@mui/material";
import { useRouter } from "next/router";
import styles from "../styles/HomePage.module.css";
import axios from "axios";

const url = "https://boolean-formula-comprehension.onrender.com";
// const url = "http://localhost:8000";

export default function PersonalDetails() {

  const [isDisabled, setDisabled] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    const quizId = localStorage.getItem("quizId");
    console.log("quizId", data);
    const PERSONAL_INFO = "personalInfo";

    setDisabled(true);
    
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobile = regex.test(navigator.userAgent);
    
    try {
      // Send a POST request to your server with the form data
      const response = await axios.post(
        url + `/api/details/${quizId}`,
        {
          gender: data.gender,
          age: data.age,
          education: data.education,
          experience: data.experience,
          fm: data.fm,
          is_mobile: isMobile,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Process the response if needed
      console.log("Data submitted successfully:", response.data);

      // Redirect to the "thank you" page
      localStorage.removeItem("quizId");
      router.push("/thankyou");
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle errors if the POST request fails
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 500, mx: "auto", padding: 3 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Demographic Details
        </Typography>
        <Typography variant="body1" gutterBottom>
          Thank you very much for participating. We would greatly appreciate it if you could share this experiment with some of your friends and colleagues, to help us collect more data. Finally, we kindly ask you to fill in some demographic details. This section is completely optional.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <FormControl fullWidth sx={inputStyle}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              label="Gender"
              {...register("gender")}
            >
              <MenuItem value="N">
                <em>Prefer not to say</em>
              </MenuItem>
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
              <MenuItem value="O">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            id="age"
            label="Age"
            name="age"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            {...register("age", { valueAsNumber: true, min: { value: 0, message: "Age must be a non-negative number" } })}
            error={!!errors.age}
            helperText={errors.age ? errors.age.message : ""}
            sx={inputStyle}
          />
          <FormControl fullWidth sx={inputStyle}>
            <InputLabel id="education-label">Education</InputLabel>
            <Select
              labelId="education-label"
              id="education"
              label="Education"
              {...register("education")}
            >
              <MenuItem value="Other">
                <em>Other</em>
              </MenuItem>
              <MenuItem value="BSc">BSc or similar</MenuItem>
              <MenuItem value="MSc">MSc or similar</MenuItem>
              <MenuItem value="PhD">PhD</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            id="experience"
            label="Years of Experience"
            name="experience"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            {...register("experience", { valueAsNumber: true, min: { value: 0, message: "Experience must be a non-negative number"} })}
            error={!!errors.experience}
            helperText={errors.experience ? errors.experience.message : ""}
            sx={inputStyle}
          />
          <FormControl fullWidth sx={inputStyle}>
            <InputLabel id="fm-label">Prior experience with Formal Methods?</InputLabel>
            <Select
              labelId="fm-label"
              id="fm"
              label="Prior experience with Formal Methods?"
              {...register("fm")}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              <MenuItem value="some">Some</MenuItem>
              <MenuItem value="expert">Expert</MenuItem>
            </Select>
          </FormControl>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              type="submit"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              variant="contained"
              className={styles.buttondis}
              disabled={isDisabled}
            >
              Save and Finish
            </button>
          </div>
        </Box>
      </Container>
    </Box>
  );
}

export async function getStaticProps() {
  return {
    props: { title: "Personal Details" },
  };
}
const inputStyle = {
  marginBottom: "16px",
  marginTop: "16px",
  "& .MuiOutlinedInput-root": {
    color: "white", // Change input text color
    "& fieldset": {
      borderColor: "white", // Change border color
    },
    "&:hover fieldset": {
      borderColor: "white", // Change border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "white", // Change border color when focused
    },
    "&.MuiSelect-icon": {
      color: "white", // Change select arrow icon color
    },
  },
  "& .MuiInputLabel-root": {
    color: "white", // Change label color
  },
  "& .MuiSelect-select": {
    color: "white", // Change select input text color
  },
  "& .MuiInputBase-input": {
    color: "white", // Change text field input color
  },
};
