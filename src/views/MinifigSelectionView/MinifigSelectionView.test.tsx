import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { MinifigSelectionView } from './MinifigSelectionView';
import { API_BASE, API_KEY } from '../../lib/consts';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { mockedMinifig, mockedMinifigsListMock } from '../../lib/mocks';

const mockedUseNavigate = jest.fn();

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as jest.Mock),
  useNavigate: () => mockedUseNavigate,
}));

describe('<MinifigSelectionView />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (axios.get as jest.Mock).mockImplementation((url: string) => {
      if (url === `${API_BASE}?key=${API_KEY}&in_theme_id=246`) {
        return Promise.resolve({ data: mockedMinifigsListMock[0] });
      } else {
        mockedMinifigsListMock.pop();

        return Promise.resolve({
          data: mockedMinifigsListMock[mockedMinifigsListMock.length - 1],
        });
      }
    });
  });

  it('should properly render component', () => {
    render(<MinifigSelectionView />);

    expect(screen.getByText('Choose Your Minifig')).toBeInTheDocument();
  });

  it('should allow to choose minifig and proceed to order page', async () => {
    render(<MinifigSelectionView />);

    const user = userEvent.setup();

    expect(
      await screen.findByText(
        'Harry Potter, Tournament Uniform Red Diving Outfit with Hogwarts Crest, Light Nougat Legs',
      ),
    ).toBeInTheDocument();

    const minifigs = screen.getAllByRole('button');

    await user.click(minifigs[0]);

    const proceedButton = screen.getByText('Proceed to shipment');

    await user.click(proceedButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/order-form', {
      state: { minifig: mockedMinifig },
    });
  });
});
