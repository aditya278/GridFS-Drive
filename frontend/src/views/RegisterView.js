import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import { setAlert } from '../actions/alert';

import SimpleAlert from '../components/SimpleAlert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://iadityashukla.com/">
        Aditya Shukla
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  passwordTextGreen : {
    color : "#388e3c"
  },
  passwordTextRed : {
    color : '#FB9EBF'
  },
  passwordTextPink : {
    color : '#F50057'
  }
}));

function RegisterView({ register, alert, setAlert, auth : { isAuthenticated } }) {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [passwordStrength, setPasswordStrength] = useState({
    score : 0,
    msg: "",
    color : ''
  });

  function scorePassword(pass) {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = {};
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    var variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] === true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    if(score > 100)
      score = 100;
    return parseInt(score);
  }

  function checkPassStrength(pass) {
      const score = scorePassword(pass);
      let msg = 'Weak';
      let color = "secondary";
      if (score > 80) {
        msg = "Strong";
        color = "primary"
      }
      else if (score > 60) {
        msg = "Fine";
        color = "secondary"
      }
      else if (score >= 30) {
        msg = "Weak";
        color = "secondary"
      }
      else if(score === 0) {
        msg = '';
        color = '';
      }

      setPasswordStrength({score, msg, color});
  }

  const handleChange = (event) => {
    if(event.target.name === "password") {
      checkPassStrength(event.target.value);
    }
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = formData;

    //Compare Password with Confirm Password
    if (password !== confirmPassword) {
      return setAlert("Passwords Do not Match", "error");
    }

    if(passwordStrength['score'] < 80) {
      return setAlert("Please use a more secure password.", "error");
    }

    //Check if valid Email
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if(!emailRegex.test(email)) {
      return setAlert("Please enter a valid email address", "error");
    }

    register(formData);
  }

  if(isAuthenticated) {
    return (
      <Navigate to="/dashboard" />
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {
          alert && <SimpleAlert msg={alert.msg} severity={alert.severity} />
        }
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <LinearProgress variant="determinate" value={passwordStrength['score']} color={passwordStrength['color']} />
            </Box>
            <Box minWidth={40}>
              <Typography variant="body2" color="textPrimary" className={passwordStrength['score'] > 80 ? classes.passwordTextGreen : passwordStrength['score'] > 60 ? classes.passwordTextPink : classes.passwordTextRed}><b>{passwordStrength['msg']}</b></Typography>
            </Box>
          </Box>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = state => ({ alert: state.alert, auth: state.auth });

export default connect(mapStateToProps, { register, setAlert })(RegisterView);