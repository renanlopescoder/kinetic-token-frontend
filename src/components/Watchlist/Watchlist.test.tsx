import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Watchlist } from "./Watchlist";
import { useAuth } from "../../hooks/useAuth";
import { useWatchlist } from "../../hooks/useWatchlist";

jest.mock("../../hooks/useAuth");
jest.mock("../../hooks/useWatchlist");

describe("Watchlist", () => {
  const mockUser = { id: "user123", token: "authToken" };
  const mockRemoveFromWatchlist = jest.fn();

  const mockTokens = [
    {
      id: "1",
      name: "Bitcoin",
      symbol: "BTC",
      image: "btc.png",
      current_price: 50000,
      market_cap: 1000000000,
      price_change_percentage_24h: 2.5,
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
      image: "eth.png",
      current_price: 50000,
      market_cap: 1000000000,
      price_change_percentage_24h: 2.5,
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();

    useAuth.mockReturnValue({ user: mockUser });

    useWatchlist.mockReturnValue({
      watchlistQuery: {
        data: mockTokens,
        isLoading: false,
        isError: false,
      },
      removeFromWatchlist: { mutate: mockRemoveFromWatchlist },
    });
  });

  it("renders the watchlist with tokens", () => {
    render(<Watchlist />);

    expect(screen.getByText("Watchlist")).toBeInTheDocument();

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
  });

  it("shows a loading state when watchlist is loading", () => {
    useWatchlist.mockReturnValue({
      watchlistQuery: { data: [], isLoading: true, isError: false },
      removeFromWatchlist: { mutate: jest.fn() },
    });

    render(<Watchlist />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows an error message when there is an error", () => {
    useWatchlist.mockReturnValue({
      watchlistQuery: { data: [], isLoading: false, isError: true },
      removeFromWatchlist: { mutate: jest.fn() },
    });

    render(<Watchlist />);

    expect(screen.getByText("Error loading watchlist.")).toBeInTheDocument();
  });

  it("shows an empty state message when watchlist is empty", () => {
    useWatchlist.mockReturnValue({
      watchlistQuery: { data: [], isLoading: false, isError: false },
      removeFromWatchlist: { mutate: jest.fn() },
    });

    render(<Watchlist />);

    expect(screen.getByText("Your watchlist is empty.")).toBeInTheDocument();
  });

  it('calls removeFromWatchlist when the remove button is clicked', async () => {
    render(<Watchlist />);
  
    const bitcoinCard = screen.getByText('Bitcoin').closest('div');
  
    const { getByRole } = within(bitcoinCard);
  
    const removeButton = getByRole('button', { name: /Remove/i });
  
    await userEvent.click(removeButton);
  
    expect(mockRemoveFromWatchlist).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromWatchlist).toHaveBeenCalledWith('1');
  });
});
