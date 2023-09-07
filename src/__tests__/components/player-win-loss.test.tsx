// Import necessary dependencies and components
import { render } from '@testing-library/react';
import { PlayerWinLoss } from 'components/shared';

// Describe block for the Player Win or Loss component
describe('PlayerWinLoss Component', () => {
  // Test case for rendering the Player Win or Loss
  it('renders the Player win or loss rate', () => {
    const { getByTestId, getByText } = render(
      <PlayerWinLoss
        player={{
          username: 'Player 1',
          wins: 5,
          winRate: 75,
          lossRate: 25
        }}
      />
    );
    const titleText = getByText(/player 1/i);
    const winRate = getByTestId('win-rate');
    const lossRate = getByTestId('loss-rate');

    // Making sure that the following elements are showing the correct values
    expect(titleText).toBeInTheDocument();
    expect(winRate).toHaveTextContent('75%');
    expect(lossRate).toHaveTextContent('25%');
  });

  // Test case for Nan display
  it('should not diplay NaN percentage', () => {
    const { getByTestId, getByText } = render(
      <PlayerWinLoss
        player={{
          username: 'Player 1',
          wins: 5,
          winRate: NaN,
          lossRate: 25
        }}
      />
    );
    const winRate = getByTestId('win-rate');
    const lossRate = getByTestId('loss-rate');
    expect(winRate).not.toHaveTextContent('NaN%');
    expect(lossRate).not.toHaveTextContent('NaN%');
  });
});
