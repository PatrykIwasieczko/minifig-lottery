import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { HomeView } from './HomeView';

const mockedUseNavigate = jest.fn();
const mockedUseLocation = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as jest.Mock),
  useNavigate: () => mockedUseNavigate,
  useLocation: () => mockedUseLocation,
}));

describe('<HomeView />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should properly render component', () => {
    render(<HomeView />);

    expect(screen.getByText('Lego minifigs mystery box')).toBeInTheDocument();
  });

  it('should redirect on lottery button click', () => {
    render(<HomeView />);

    const lotteryButton = screen.getByRole('button');

    fireEvent.click(lotteryButton);

    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
  });
});
