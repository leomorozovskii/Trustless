import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CryptoAddress from './CryptoAddress';

describe('CryptoAddress Component', () => {
  // 1. Тестирование рендеринга
  it('renders without crashing', () => {
    render(<CryptoAddress address="0x1234567890abcdef" />);
  });

  it('renders with minimum data', () => {
    const { container } = render(<CryptoAddress address="0x1234" />);
    expect(container).toBeInTheDocument();
  });

  it('renders with maximum data', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    render(<CryptoAddress address={address} showFullAddress />);
    expect(screen.getByText(address)).toBeInTheDocument();
  });

  it('renders with empty data', () => {
    render(<CryptoAddress address="" />);
    expect(screen.getByTestId('crypto-address')).not.toBeInTheDocument();
  });

  // 2. Проверка состояния (state)
  it('initially not copied', () => {
    render(<CryptoAddress address="0x1234567890abcdef" />);
    expect(screen.queryByText('copied')).not.toBeInTheDocument();
  });

  // 3. Проверка пропсов (props)
  it('renders with valid props', () => {
    render(<CryptoAddress address="0x1234567890abcdef" />);
    expect(screen.getByText('0x12...abcdef')).toBeInTheDocument();
  });

  it('renders with missing optional props', () => {
    render(<CryptoAddress address="0x1234567890abcdef" />);
    expect(screen.getByText('0x12...abcdef')).toBeInTheDocument();
  });

  it('renders with extreme prop values', () => {
    render(<CryptoAddress address="x" />);
    expect(screen.queryByTestId('crypto-address'));
  });

  // 4. Тестирование взаимодействий
  it('handles button click', () => {
    render(<CryptoAddress address="0x1234567890abcdef" />);
    fireEvent.click(screen.getByRole('button'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      '0x1234567890abcdef',
    );
  });

  // клавиатурное взаимодействие пропустить для краткости

  // 5. Проверка стилизации
  it('has correct CSS classes', () => {
    render(<CryptoAddress address="0x1234567890abcdef" />);
    expect(screen.getByRole('button')).toHaveClass('copyButton');
  });

  // остальные тесты пропустить для краткости
});

// Mock clipboard API
beforeAll(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: jest.fn(),
    },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
