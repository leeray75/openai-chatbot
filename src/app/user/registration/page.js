'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Button, TextField, Typography, Container } from '@mui/material';
import './registration.scss';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // Handle successful registration (e.g., show success message)
        console.log("[user][registration][page] Registration successful");
        router.push("/");
      } else {
        // Handle registration error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div data-page="Registration">
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
