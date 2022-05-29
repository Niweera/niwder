import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Logo from "./logo.png";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";

const BrandName = ({ startIndex, endIndex }) => {
  const starts = ` <({[/`;
  const ends = ` >)}]\\`;

  const brandName = Array.from("niwder.io")
    .map((letter) => {
      const rando = Math.floor((Math.random() * 1000000) % 3);

      switch (rando) {
        case 0: {
          return letter.toLowerCase();
        }
        case 1: {
          return letter.toUpperCase();
        }
        default: {
          return letter;
        }
      }
    })
    .join("");

  return (
    <>
      {starts[startIndex]}
      {brandName}
      {ends[endIndex]}
    </>
  );
};

const Spinner = ({ half }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const classes = makeStyles(() => ({
    large: {
      paddingBottom: "6px",
      filter: "drop-shadow(0px 0px 15px #222)",
    },
  }))();

  useEffect(() => {
    const id = setInterval(() => {
      setStartIndex(Math.floor((Math.random() * 1000000) % 6));
      setEndIndex(Math.floor((Math.random() * 1000000) % 6));
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: half ? "50vh" : "100vh" }}
    >
      <Grid item xs={12}>
        <Avatar
          variant="square"
          src={Logo}
          className={classes.large}
          sx={{ width: 100, height: 100 }}
        />
      </Grid>
      <Grid item xs={12}>
        <BrandName startIndex={startIndex} endIndex={endIndex} />
      </Grid>
    </Grid>
  );
};

export default Spinner;
