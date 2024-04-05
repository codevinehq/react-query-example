import { render } from '../../test/test-utils';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { db as settingsDB, defaultItems } from '@react-query-example/api/settings/mock';

describe('App', () => {
  beforeEach(() => {
    settingsDB.reset();
  });

  it('should display the name', async () => {
    render(<App />);

    await waitForElementToBeRemoved(screen.queryByTestId('loader'));

    expect(screen.getByLabelText('Name')).toHaveValue(defaultItems[0].name);
    expect(screen.getByText(`Your name is:`)).toHaveTextContent(defaultItems[0].name);
  });

  it('should allow the user to update name', async () => {
    const user = userEvent.setup();

    render(<App />);

    await waitForElementToBeRemoved(screen.queryByTestId('loader'));

    const input = screen.getByLabelText('Name');
    const updatedName = 'New Name';

    await user.clear(input);
    await user.type(input, updatedName);
    await user.click(screen.getByText('Submit'));

    expect(screen.getByLabelText('Name')).toHaveValue(updatedName);
    expect(screen.getByText(`Your name is:`)).toHaveTextContent(updatedName);
  });
});
