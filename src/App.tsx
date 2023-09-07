import { TicTacToeGamesProvider } from 'components/tic-tac-toe-board';
import GamePage from 'pages/portal/game';

const App = () => {
  return (
    <TicTacToeGamesProvider>
      <GamePage />
    </TicTacToeGamesProvider>
  );
};

export default App;
