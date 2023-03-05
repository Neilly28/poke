import React from "react";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

// const Login = () => {

//   return (
//     <section className="flex flex-col justify-center items-center h-screen">
//       <div className="w-1/2 p-5 text-center">
//         <h1 className="font-bold text-9xl">Pokéhack</h1>
//       </div>

//       <div className="w-1/2 px-16  max-w-3xl p-5 flex flex-col justify-center items-center">
//         {/* <h2 className="font-bold">Login</h2> */}
//         <p className="text-sm mt-4">
//           If you are already a trainer, please log in.
//         </p>
//         <form
//           className="flex flex-col justify-center items-center gap-4"
//           action=""
//           onSubmit={handleSubmit}
//         >
//           <input
//             type="email"
//             placeholder="Email"
//             className="p-2 mt-8 bg-transparent border-b-2 border-black focus:border-black outline-none placeholder-black"

//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="p-2 mt-8 bg-transparent border-b-2 border-black focus:border-black outline-none placeholder-black"
//
//           />
//           <div className="grid grid-cols-2 gap-5">
//             <button
//               className="bg-black text-yellow-400 py-2 border border-black transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-black mt-4 p-7"
//               disabled={isLoading}
//             >
//               Login
//             </button>
//             <button
//               className="text-black py-2 border border-black transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-black mt-4"
//               disabled={isLoading}
//             >
//               Sign Up
//             </button>
//           </div>

//           {error && <div>error</div>}
//         </form>
//         {/* <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
//           <hr className="border-gray-400"></hr>
//           <p className="text-center text-sm">OR</p>
//           <hr className="border-gray-400" />
//         </div>
//         <button className="bg-white border py-2 w-1/3 mt-5 flex justify-center">
//           Login with Google
//         </button> */}
//       </div>
//     </section>
//   );
// };

// export default Login;
// import * as React from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Pokéhack
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random?pokemon)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup " variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
