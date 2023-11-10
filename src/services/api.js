import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice/authSlice';

const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL;
const API_GAMES_URL = import.meta.env.VITE_API_GAMES_URL;

export const useRegister = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const registerMutation = useMutation(
    async ({ email, password }) => {
      const response = await fetch(`${API_AUTH_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      return response.json();
    },
    {
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
        console.error('Registration failed:', error.message);
      },
    }
  );

  const registerUser = async ({ email, password }) => {
    return registerMutation.mutateAsync({ email, password });
  };

  return {
    registerUser,
    isLoading: registerMutation.isLoading,
    isError: registerMutation.isError,
  };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation(
    async ({ email, password }) => {
      const response = await fetch(`${API_AUTH_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login user');
      }

      return response.json();
    },
    {
      onSuccess: data => {
        dispatch(
          setUser({
            user: data.user,
            token: data.token,
          })
        );
        queryClient.invalidateQueries('currentUser');
      },
      onError: error => {
        console.error('Login failed:', error.message);
      },
    }
  );
};

export const useCurrentUser = () => {
  return useQuery('currentUser', async () => {
    const response = await fetch(`${API_AUTH_URL}/current`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get current user');
    }

    const data = await response.json();
    return data.user;
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const logoutMutation = useMutation(
    async () => {
      const response = await fetch(`${API_AUTH_URL}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to logout user');
      }
    },
    {
      onSuccess: () => {
        dispatch(setUser({ user: null, token: null }));
        queryClient.setQueryData('currentUser', null);
      },
      onError: error => {
        console.error('Logout failed:', error.message);
      },
    }
  );

  const logoutUser = async () => {
    await logoutMutation.mutateAsync();
  };

  return {
    logoutUser,
    isLoading: logoutMutation.isLoading,
    isError: logoutMutation.isError,
  };
};

export const useGamesQuery = (page = 1, genre = 'ALL', gamesToShow = 9) => {
  return useQuery(['games', page, genre], async () => {
    const response = await fetch(`${API_GAMES_URL}/games/by_page`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page,
        isFreshGamesFirst: true,
        genre,
        gamesToShow,
      }),
    });

    const data = await response.json();
    return data;
  });
};
