import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { mockedMinifig, partsResponseMock } from '../../lib/mocks';
import { OrderFormView } from './OrderFormView';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const mockedUseNavigate = jest.fn();
const mockedUseLocation = jest.fn();
jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as jest.Mock),
  useNavigate: () => mockedUseNavigate,
  useLocation: () => mockedUseLocation,
}));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
}));

const renderOrderView = () => {
  render(
    <MemoryRouter
      initialEntries={[{ pathname: '/', state: { minifig: mockedMinifig } }]}
    >
      <OrderFormView />
    </MemoryRouter>,
  );
};

describe('<OrderFormView />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: partsResponseMock }),
    );
  });

  it('should properly render component', () => {
    renderOrderView();

    expect(screen.getByText('Summary')).toBeInTheDocument();
  });

  it.skip('shows errors on unsuccessfull post request', async () => {
    const user = userEvent.setup();

    renderOrderView();

    const submitButton = screen.getByText('Submit');

    await user.click(submitButton);

    // We can test if errors were returned after real post request
  });

  it.skip('should allow to submit form', async () => {
    const user = userEvent.setup();

    renderOrderView();

    await user.type(screen.getByLabelText('name'), 'John');
    await user.type(screen.getByLabelText('surname'), 'Doe');
    await user.type(screen.getByLabelText('phoneNumber'), '123456789');
    await user.type(screen.getByLabelText('email'), 'john.doe@email.com');
    await user.type(screen.getByLabelText('dateOfBirth'), '11/01/1990');
    await user.type(screen.getByLabelText('address'), 'Test street 123');
    await user.type(screen.getByLabelText('city'), 'Testcity');
    await user.type(screen.getByLabelText('state'), 'Teststate');
    await user.type(screen.getByLabelText('zipcode'), '12345');

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    // If real post requests are made there should go tests for that
  });
});
