// Import necessary dependencies and components
import { render, fireEvent } from '@testing-library/react';
import TicTacToe from 'components/tic-tac-toe-board';

// Describe block for the Tic Tac Toe component
describe('TicTacToe Component', () => {
  // Test case for rendering the Tic Tac Toe board
  it('renders the Tic Tac Toe board', () => {
    const { getByTestId } = render(<TicTacToe />);
    const board = getByTestId('board');
    expect(board).toBeInTheDocument();
  });

  // Test case to check the timer display
  it('renders the timer display', () => {
    const { getByRole } = render(<TicTacToe />);
    const timer = getByRole('heading', { name: '00:00:00' });
    expect(timer).toBeInTheDocument();
  });

  // Test case for manually starting the game
  it('run the game timer', () => {
    const { getByRole } = render(<TicTacToe />);
    const button = getByRole('button', { name: /start/i });

    // Assume the game require to start manually
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    // the start button must be hidden
    expect(button).not.toBeInTheDocument();
  });

  // Test user movement on the board
  it('start making a move on the board', () => {
    const { getByTestId } = render(<TicTacToe autoStart />);
    const player1 = getByTestId('cell-0');
    const player2 = getByTestId('cell-2');

    fireEvent.click(player1);
    expect(player1).toContainElement(getByTestId('x-token-0'));

    fireEvent.click(player2);
    expect(player2).toContainElement(getByTestId('o-token-2'));
  });

  // Test case for a draw game
  it('announce a draw when the game is a draw', () => {
    const { getByRole, getByTestId } = render(<TicTacToe autoStart />);
    const cells = [
      getByTestId('cell-0'),
      getByTestId('cell-2'),
      getByTestId('cell-1'),
      getByTestId('cell-4'),
      getByTestId('cell-5'),
      getByTestId('cell-3'),
      getByTestId('cell-6'),
      getByTestId('cell-8'),
      getByTestId('cell-7')
    ];

    // Simulate a draw scenario
    fireEvent.click(cells[0]);
    fireEvent.click(cells[1]);
    fireEvent.click(cells[2]);
    fireEvent.click(cells[3]);
    fireEvent.click(cells[4]);
    fireEvent.click(cells[5]);
    fireEvent.click(cells[6]);
    fireEvent.click(cells[7]);
    fireEvent.click(cells[8]);

    const button = getByRole('button', { name: /restart/i });
    expect(button).toBeInTheDocument();
  });

  // Test case to announce a winner
  it('announce a winner when the game is won', () => {
    const finishedCallback = jest.fn();
    const { getByTestId } = render(<TicTacToe autoStart onFinished={finishedCallback} />);
    const cells = [
      getByTestId('cell-0'),
      getByTestId('cell-4'),
      getByTestId('cell-3'),
      getByTestId('cell-8'),
      getByTestId('cell-6')
    ];

    // Simulate a winning scenario (X wins)
    fireEvent.click(cells[0]);
    fireEvent.click(cells[1]);
    fireEvent.click(cells[2]);
    fireEvent.click(cells[3]);
    fireEvent.click(cells[4]);

    expect(cells[0]).toBeInTheDocument();
    expect(finishedCallback).toHaveBeenCalledWith(
      expect.objectContaining({
        board: ['x', null, null, 'x', 'o', null, 'x', null, 'o'],
        winner: 'x'
      })
    );
  });

  // Test case for rendering the a read-only Tic Tac Toe board
  it('renders a read only Tic Tac Toe board', () => {
    const { getByRole, getByTestId } = render(
      <TicTacToe board={['x', null, 'o', 'x', 'o', null, 'x', null, null]} duration={180000} />
    );
    const cells = [
      getByTestId('cell-0'),
      getByTestId('cell-2'),
      getByTestId('cell-3'),
      getByTestId('cell-4'),
      getByTestId('cell-6')
    ];

    // Make sure to display all token in the board
    expect(cells[0]).toContainElement(getByTestId('x-token-0'));
    expect(cells[1]).toContainElement(getByTestId('o-token-2'));
    expect(cells[2]).toContainElement(getByTestId('x-token-3'));
    expect(cells[3]).toContainElement(getByTestId('o-token-4'));
    expect(cells[4]).toContainElement(getByTestId('x-token-6'));

    // Making sure that all the buttons are disabled
    for (let i = 0; i < 9; i++) {
      expect(getByTestId(`cell-${i}`)).toBeDisabled();
    }

    // Simulate click event even the cell is already filled
    fireEvent.click(cells[0]);
    expect(cells[0]).toContainElement(getByTestId('x-token-0'));

    // Making sure "Start" button must be hidden
    expect(() => getByRole('button', { name: /start/i })).toThrow();

    // Timer must not be filled properly
    const timer = getByRole('heading', { name: '00:03:00' });
    expect(timer).toBeInTheDocument();
  });
});
