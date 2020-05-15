import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { animateScroll as scroll } from "react-scroll";

import ethic_logo from "./assets/ethic_logo.svg";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import "./navbar.scss";



const useStyles = makeStyles({
  navbar: {
    backgroundColor: "white",
  },
  hidden: {
    display: "none",
  },
});

function scrollToTop() {
  scroll.scrollToTop();
}

export default function Navbar() {
  const [hideOnScroll, setHideOnScroll] = useState(true);

  useScrollPosition(
    ({ currPos }) => {
      const isShow = currPos.y > -428; //height of banner!
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll],
    false,
    false,
    300
  );

  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar
        className={
          hideOnScroll
            ? `${classes.navbar} + ${classes.hidden}`
            : `${classes.navbar}`
        }
      >
        <Toolbar>
          <img
            src={ethic_logo}
            onClick={scrollToTop}
            className='ethic-logo'
            alt='logo'
          />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
