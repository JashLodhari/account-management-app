import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const newUser = { name: data.name, email: data.email, password: data.password };
    localStorage.setItem(data.email, JSON.stringify(newUser));
    alert('Account created successfully!');
    navigate('/login');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input {...register('name')} />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input {...register('email')} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" {...register('password')} />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
