// Import necessary dependencies and components
import { fireEvent, render } from '@testing-library/react';
import { Congratulation } from 'components/shared';

// Describe block for the Congratulation component
describe('Congratulation Component', () => {
  // Test case for rendering the Congratulation
  it('renders the Congratulation view', () => {
    const { queryByRole, getByRole, getByText } = render(<Congratulation player="Player Test" />);
    const heading = getByRole('heading', { name: /congratulations!!/i });
    const playerName = getByText(/player test/i);
    const button = queryByRole('button', { name: /close/i });
    // We expect the correct title message "Congratulations!!"
    expect(heading).toBeInTheDocument();
    // Must show the correct player name
    expect(playerName).toBeInTheDocument();
    // We don't pass any close event so the button must be hidden
    expect(button).not.toBeInTheDocument();
  });

  // Test case for rendering the Congratulation with close button
  it('renders the Congratulation with close button', () => {
    const closeAction = jest.fn();
    const { getByRole } = render(<Congratulation player="Player Test" onClose={closeAction} />);
    const button = getByRole('button', { name: /close/i });
    // The 'close' button must show and expect something after click
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(closeAction).toHaveBeenCalledTimes(1);
  });
});
