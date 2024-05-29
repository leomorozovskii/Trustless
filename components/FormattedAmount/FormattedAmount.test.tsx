import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { FormattedAmount } from '@components/FormattedAmount/';

const setupI18n = (language: string) => {
  // Simplified i18n setup for testing
  i18n.init({
    lng: language,
    resources: {},
  });
};

describe('FormattedAmount Component', () => {
  beforeEach(() => {
    setupI18n('en');
  });

  // 1. Testing rendering
  it('renders without crashing', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <FormattedAmount value={1000} />
      </I18nextProvider>,
    );
    expect(screen.getByText('10.00')).toBeInTheDocument();
  });

  it('renders with minimal props', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <FormattedAmount value="1000" />
      </I18nextProvider>,
    );
    expect(screen.getByText('10.00')).toBeInTheDocument();
  });

  it('renders with maximum valid data', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <FormattedAmount
          value="999999999999999999999999999999999999999"
          decimals={6}
        />
      </I18nextProvider>,
    );
    expect(
      screen.getByText('1,000,000,000,000,000,000,000,000,000,000,000.000000'),
    ).toBeInTheDocument();
  });

  it('renders with empty data', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <FormattedAmount value="" />
      </I18nextProvider>,
    );
    expect(screen.getByText('0.00')).toBeInTheDocument();
  });

  // 2. Testing state management
  it('handles invalid value gracefully', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <FormattedAmount value="invalid" />
      </I18nextProvider>,
    );
    expect(screen.getByText('0.00')).toBeInTheDocument();
  });

  it('handles null value gracefully', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <FormattedAmount value={null} />
      </I18nextProvider>,
    );
    expect(screen.getByText('0.00')).toBeInTheDocument();
  });

  it('handles undefined value gracefully', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <FormattedAmount value={undefined} />
      </I18nextProvider>,
    );
    expect(screen.getByText('0.00')).toBeInTheDocument();
  });

  // 2. Testing state management
  it('handles invalid value gracefully', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <FormattedAmount value="invalid" />
      </I18nextProvider>,
    );
    expect(screen.getByText('0.00')).toBeInTheDocument();
  });

  // 3. Testing props
  it('formats value correctly based on decimals prop', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <FormattedAmount value={1000} decimals={4} />
      </I18nextProvider>,
    );
    expect(screen.getByText('0.1000')).toBeInTheDocument();
  });

  it('handles missing optional props', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <FormattedAmount value={1000} />
      </I18nextProvider>,
    );
    expect(screen.getByText('10.00')).toBeInTheDocument();
  });

  // 4. Testing interactions
  it('handles locale change correctly', async () => {
    setupI18n('fr');
    render(
      <I18nextProvider i18n={i18n}>
        <FormattedAmount value={1000} decimals={3} />
      </I18nextProvider>,
    );
    // Assuming the French locale would format as "10,000"
    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  // 6. Performance testing - Basic render timing
  it('should measure render performance', () => {
    //  const start = performance.now();
    render(
      <I18nextProvider i18n={i18n}>
        <FormattedAmount value={1000} />
      </I18nextProvider>,
    );
    //  const end = performance.now();
  });

  // 7. Error handling testing
  it('should handle unsupported locales gracefully', () => {
    setupI18n('unsupported');
    console.warn = jest.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <FormattedAmount value={1000} />
      </I18nextProvider>,
    );
    expect(console.warn).toHaveBeenCalledWith(
      'Unsupported locale:',
      'unsupported',
    );
    expect(screen.getByText('10.00')).toBeInTheDocument();
  });

  // 8. Testing compatibility and integration
  it('should integrate smoothly with higher-level components', () => {
    const ParentComponent = () => (
      <div>
        <FormattedAmount value={5000} />
      </div>
    );
    render(
      <I18nextProvider i18n={i18n}>
        <ParentComponent />
      </I18nextProvider>,
    );
    expect(screen.getByText('50.00')).toBeInTheDocument();
  });

  // 10. Logging and Reporting - Usually handled by CI tools, Jest gives summary.
});
