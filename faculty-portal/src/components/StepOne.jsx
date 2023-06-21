import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { UserContext } from '../context/UserContext';

const StepOne = () => {
  const { user } = useContext(UserContext);
  console.log(user)

return (
  <div>

  </div>
  );
};

export default StepOne;