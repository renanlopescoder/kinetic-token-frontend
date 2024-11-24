import { render, screen } from '@testing-library/react';
import { TokenCard } from './TokenCard';
import userEvent from '@testing-library/user-event';

const mockToken = {
  id: '1',
  name: 'Bitcoin',
  symbol: 'BTC',
  image: 'btc.png',
  current_price: 50000,
  market_cap: 1000000000,
  price_change_percentage_24h: 2.5,
};

describe('TokenCard', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <TokenCard
        token={mockToken}
        isInWatchlist={false}
        onAddToWatchlist={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  

  it('renders token details correctly', () => {
    render(
      <TokenCard
        token={mockToken}
        isInWatchlist={false}
        onAddToWatchlist={jest.fn()}
      />
    );

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('Symbol: BTC')).toBeInTheDocument();
  });

  it('calls onAddToWatchlist when clicked', async () => {
    const mockOnAddToWatchlist = jest.fn();
    render(
      <TokenCard
        token={mockToken}
        isInWatchlist={false}
        onAddToWatchlist={mockOnAddToWatchlist}
      />
    );

    const button = screen.getByRole('button', { name: /Add to Watchlist/i });
    await userEvent.click(button);
    expect(mockOnAddToWatchlist).toHaveBeenCalledTimes(1);
  });
});
