import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Logo from "./logo.png";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";

const BrandName = ({ index }) => {
  const names = [
    `Niwder.io /`,
    `<Niwder.io />`,
    `{Niwder.io}`,
    `[Niwder.io,]`,
    `Niwder.io`,
    `Niwder.io.`,
    `<Niwder.io>`,
  ];

  return <>{names[index]}</>;
};

const Spinner = ({ half }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const classes = makeStyles(() => ({
    large: {
      paddingBottom: "6px",
      filter: "drop-shadow(0px 0px 15px #222)",
    },
  }))();

  useEffect(() => {
    const id = setInterval(
      () => setCurrentIndex(Math.floor((Math.random() * 1000000) % 7)),
      500
    );
    return () => clearInterval(id);
  }, [currentIndex]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: half ? "50vh" : "100vh" }}
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
        <BrandName index={currentIndex} />
      </Grid>
    </Grid>
  );
};

export default Spinner;
