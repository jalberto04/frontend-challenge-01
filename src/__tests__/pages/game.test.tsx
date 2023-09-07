// Import necessary dependencies and components
import { fireEvent, render, within } from '@testing-library/react';
import { fill, range, size } from 'lodash';
import { TicTacToe } from 'app-types';
import { TicTacToeGamesProvider } from 'components/tic-tac-toe-board';
import GamePage from 'pages/portal/game';

const MockGameHistory: TicTacToe[] = [
  {
    board: ['x', null, null, 'x', 'o', null, 'x', null, 'o'],
    duration: 60000,
    winner: 'x'
  },
  {
    board: ['x', null, null, 'x', 'o', null, 'x', null, 'o'],
    duration: 150000,
    winner: 'o'
  },
  {
    board: ['x', null, null, 'x', 'o', null, 'x', null, 'o'],
    duration: 168000,
    winner: 'o'
  }
];

const PageComponent = ({ games = [] }: { games?: TicTacToe[] }) => {
  return (
    <TicTacToeGamesProvider games={games}>
      <GamePage />
    </TicTacToeGamesProvider>
  );
};

// Describe block for Game page component
describe('Game Page Component', () => {
  // Test case for rendering the Game page
  it('renders the Game page component', () => {
    const { getByRole } = render(<PageComponent />);
    // Expecting the title is equal to what defined in the environment
    const title = getByRole('heading', { level: 4, name: process.env.REACT_APP_TITLE });
    expect(title).toBeInTheDocument();
  });

  // Test case for rendering the game board
  it('renders the page with the game board', () => {
    const { getByTestId } = render(<PageComponent />);
    const board = getByTestId('board');
    expect(board).toBeInTheDocument();
  });

  // Test case for rendering the total play time placeholder
  it('renders the page with default play time placeholder', () => {
    const { getByTestId } = render(<PageComponent />);
    const playTime = getByTestId('total-play-time');
    expect(playTime).toHaveTextContent('00:00:00');
  });

  // Test case for rendering the total play time placeholder
  it('renders the page with default play time placeholder', () => {
    const { getByTestId } = render(<PageComponent />);
    const playTime = getByTestId('total-play-time');
    expect(playTime).toHaveTextContent('00:00:00');
  });

  // Test case for rendering the default player scores
  it('renders the page with default player scores', () => {
    const { getByTestId } = render(<PageComponent />);
    const player1 = getByTestId('player-1-scores');
    const player2 = getByTestId('player-2-scores');
    expect(player1).toHaveTextContent('0');
    expect(player2).toHaveTextContent('0');
  });

  // Test case for rendering the played icon marking
  it('renders all played icon markings', () => {
    const { getAllByTestId } = render(<PageComponent />);
    const markings = getAllByTestId('played-marking');
    expect(markings[0]).toBeInTheDocument();
    expect(markings[8]).toBeInTheDocument();
  });

  // Test case for rendering the game pagination
  it('renders all game page buttons', () => {
    const { getAllByTestId } = render(<PageComponent />);
    const buttons = getAllByTestId('game-page');
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[8]).toBeInTheDocument();
  });

  // Test case for rendering the game pagination
  it('renders all game page buttons', () => {
    const { getAllByTestId } = render(<PageComponent />);
    const buttons = getAllByTestId('game-page');
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[0]).toBeDisabled();
    expect(buttons[8]).toBeInTheDocument();
    expect(buttons[8]).toBeDisabled();
  });

  // Test case for rendering 'next game' button
  it('renders all game page buttons', () => {
    const { queryByRole } = render(<PageComponent />);
    const button = queryByRole('button', { name: /next game/i });
    // The button must be hidden, if the game is not finish
    expect(button).not.toBeInTheDocument();
  });

  // Test case for rendering the total play time
  it('renders the total playtime', () => {
    const { getByTestId } = render(<PageComponent games={MockGameHistory} />);
    const playTime = getByTestId('total-play-time');
    expect(playTime).toHaveTextContent('00:06:18');
  });

  // Test case for navigating to each recorded game
  test.each(range(size(MockGameHistory)))('navigate to the each recorded game play: ${i}', (i) => {
    const { getAllByTestId, getByTestId } = render(<PageComponent games={MockGameHistory} />);

    const pageButtons = getAllByTestId('game-page');

    fireEvent.click(pageButtons[i]);
    // The button must be highlighted
    expect(pageButtons[i]).toHaveClass('MuiButton-contained');

    const cells = [
      getByTestId('cell-0'),
      getByTestId('cell-4'),
      getByTestId('cell-3'),
      getByTestId('cell-8'),
      getByTestId('cell-6')
    ];
    // Display the token in each specified cell number
    expect(cells[0]).toContainElement(getByTestId('x-token-0'));
    expect(cells[1]).toContainElement(getByTestId('o-token-4'));
    expect(cells[2]).toContainElement(getByTestId('x-token-3'));
    expect(cells[3]).toContainElement(getByTestId('o-token-8'));
    expect(cells[4]).toContainElement(getByTestId('x-token-6'));
  });

  // Test case for rendering the scores and page winner
  it('announce the scores and the winners per each buttons', () => {
    const { getAllByTestId, getByRole, getByTestId } = render(<PageComponent games={MockGameHistory} />);

    const player1 = getByTestId('player-1-scores');
    const player2 = getByTestId('player-2-scores');
    const pageButtons = getAllByTestId('game-page');
    const nextButton = getByRole('button', { name: /next game/i });

    // Must show the winner initial
    expect(pageButtons[0]).toHaveTextContent('P1');
    expect(pageButtons[0]).not.toBeDisabled();

    expect(pageButtons[1]).toHaveTextContent('P2');
    expect(pageButtons[1]).not.toBeDisabled();

    // Must display the correct score
    expect(player1).toHaveTextContent('1');
    expect(player2).toHaveTextContent('2');
    // Must display the 'next game' button to continue the game
    expect(nextButton).toBeInTheDocument();
  });

  // Test case for rendering the grand winner
  it('announce the grand winner', () => {
    // Simulate a winning scenario (O wins)
    const { getByRole, getByTestId } = render(
      <PageComponent
        games={
          [
            ...MockGameHistory,
            ...fill(range(3), {
              board: ['x', null, null, 'x', 'o', null, 'x', null, 'o'],
              duration: 150000,
              winner: 'o'
            })
          ] as TicTacToe[]
        }
      />
    );

    const dialog = getByTestId('prompt-congratulation');
    const button = getByRole('button', { name: /close/i });

    // Make sure to prompt the dialog box
    expect(dialog).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    // Make sure to show the correct winner name
    expect(within(dialog).getByText(/player 2/i)).toBeInTheDocument();

    fireEvent.click(button);
    // Expect that the modal is now hidden
    expect(dialog).not.toBeInTheDocument();
  });
});
