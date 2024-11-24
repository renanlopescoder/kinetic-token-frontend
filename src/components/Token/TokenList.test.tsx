import { render, screen } from "@testing-library/react";
import { TokenList } from "./TokenList";
import { useAuth } from "../../hooks/useAuth";
import { useWatchlist } from "../../hooks/useWatchlist";
import { useTokens } from "../../hooks/useTokens";

// Mock the custom hooks
jest.mock("../../hooks/useAuth");
jest.mock("../../hooks/useWatchlist");
jest.mock("../../hooks/useTokens");

describe("TokenList", () => {
  const mockUser = { id: "user123", token: "authToken" };
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
  const mockWatchlist = [{ id: "1" }];

  beforeEach(() => {
    useAuth.mockReturnValue({ user: mockUser });

    useTokens.mockReturnValue({
      data: mockTokens,
      isLoading: false,
      error: null,
    });

    useWatchlist.mockReturnValue({
      watchlistQuery: {
        data: mockWatchlist,
        isLoading: false,
      },
      addToWatchlist: { mutate: jest.fn() },
    });
  });

  it("renders the token list correctly", () => {
    render(<TokenList />);

    expect(screen.getByText("Token List")).toBeInTheDocument();

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
  });

  it("shows an error message if tokens fail to load", () => {
    useTokens.mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error("Failed to load tokens"),
    });

    render(<TokenList />);
    expect(
      screen.getByText("Error: Failed to load tokens")
    ).toBeInTheDocument();
  });
});
