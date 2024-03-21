"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Button, TextField, Typography, Container } from '@mui/material';
import "./login.scss";
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        console.log("[user][login][page] Login successful");
        router.push("/");
        // Handle successful login (e.g., store token in localStorage)
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div data-page="Login">
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
