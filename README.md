# Test Task from company Doka Development (Front-end)
This test task is a small Full Stack web application with authorization and display of a list of games after it. The entire Front-end part is developed using the following technologies: React.js, Redux, React Query (for HTTP requests), and react-router-dom. Back-end for this test task - [GitHub](https://github.com/333Nikita333/miraplay_test_server)

## Pages:
- **Authorization**: The user can register or login to the application. After successful authorization, the user is redirected to the games page. When entering an incorrect password or email, or if the user already exists, the user sees the corresponding error.<br>
- **Games**: A page that displays the current list of available games. The page can be filtered by genre ("ALL", "FREE", "MOBA", "SHOOTERS", "LAUNCHERS", "MMORPG", "STRATEGY", "FIGHTING", "RACING", "SURVIVAL", "ONLINE) and date (Newest and Oldest).By default, 9 items are shown, and clicking the "Load More" button loads 9 more games, and so on. The button disappears when the list reaches the end.

## Technologies Used
**Front-end**:
- React.js
- Redux
- Redux-persist
- React Query(TanStack Query v5)
- react-router-dom
