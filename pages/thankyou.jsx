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
import styles from "../styles/HomePage.module.css";

export default function Thankyou({ title }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",

        color: "white",
        padding: 4,
      }}
    >
      <Typography variant="h4">Thank you and Goodbye!</Typography>
    </Box>
  );
}
export async function getStaticProps() {
  // Perform your data fetching here
  return {
    props: {
      title: "Thankyou", // You can pass the fetched data as props
    },
  };
}
