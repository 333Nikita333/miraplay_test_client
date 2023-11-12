import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from '../redux/authSlice/authSlice';
import { useState } from 'react';

const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL;
const API_GAMES_URL = import.meta.env.VITE_API_GAMES_URL;

export const useRegister = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [registerErrorMessage, setRegisterErrorMessage] = useState(null);

  const registerMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await fetch(`${API_AUTH_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return response.json();
    },
    onSuccess: data => {
      dispatch(
        setUser({
          user: data.user,
          token: data.token,
        })
      );
      queryClient.setQueryData('currentUser', data.user);
    },
    onError: error => {
      setRegisterErrorMessage(error.message);
      console.error('Registration failed:', error.message);
    },
  });

  const registerUser = async ({ email, password }) => {
    return registerMutation.mutateAsync({ email, password });
  };

  return {
    registerUser,
    isLoadingRegister: registerMutation.isLoading,
    isErrorRegister: registerMutation.isError,
    registerErrorMessage,
  };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await fetch(`${API_AUTH_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return response.json();
    },
    onSuccess: data => {
      dispatch(
        setUser({
          user: data.user,
          token: data.token,
        })
      );
      queryClient.setQueryData('currentUser', data.user);
    },
    onError: error => {
      setLoginErrorMessage(error.message);
      console.error('Login failed:', error.message);
    },
  });

  const loginUser = async ({ email, password }) => {
    return loginMutation.mutateAsync({ email, password });
  };

  return {
    loginUser,
    isLoadingLogin: loginMutation.isLoading,
    isErrorLogin: loginMutation.isError,
    loginErrorMessage,
  };
};

export const useCurrentUser = () => {
  const { token } = useSelector(state => state.auth);

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      if (!token) {
        return null;
      }

      const response = await fetch(`${API_AUTH_URL}/current`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get current user');
      }

      const data = await response.json();
      return data;
    },
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { token } = useSelector(state => state.auth);

  const logoutMutation = useMutation({
    mutationFn: () => {
      fetch(`${API_AUTH_URL}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => console.log(response));
    },
    onSuccess: () => {
      dispatch(logout());
      queryClient.clear();
    },
    onError: error => {
      console.error('Logout failed:', error.message);
    },
  });

  const logoutUser = () => {
    logoutMutation.mutateAsync();
  };

  return {
    logoutUser,
    isLoadingLogout: logoutMutation.isLoading,
    isErrorLogout: logoutMutation.isError,
  };
};

export const useGames = (page = 1, genre = 'ALL', isFreshGamesFirst = true, gamesToShow = 9) => {
  return useQuery({
    queryKey: ['games', page, genre, isFreshGamesFirst, gamesToShow],
    queryFn: async () => {
      const response = await fetch(`${API_GAMES_URL}/games/by_page`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          isFreshGamesFirst,
          genre: genre === 'ALL' ? false : genre,
          gamesToShow,
        }),
      });

      return response.json();
    },
  });
};
