import React from 'react';
import { render } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import styled, { ThemeProvider } from 'styled-components';
import provideVariant from '../provideVariant';

describe('provideVariant', () => {
  test('should return corresponding value for provided variant prop', () => {
    const size = provideVariant('size', {
      small: '4px 8px',
      medium: '8px 16px',
      large: '16px 24px'
    });

    expect(
      size({
        size: 'small'
      })
    ).toBe('4px 8px');

    expect(
      size({
        size: 'medium'
      })
    ).toBe('8px 16px');

    expect(
      size({
        size: 'large'
      })
    ).toBe('16px 24px');
  });

  test('should return corresponding value for provided variant prop with theme', () => {
    const colorVariant = provideVariant(
      'type',
      {
        primary: ({ theme }) => theme.color.primary,
        danger: ({ theme }) => theme.color.danger,
        secondary: ({ theme }) => theme.color.secondary
      },
      ({ theme }) => theme.color.normal
    );

    const Text = styled.p`
      color: ${colorVariant};
    `;

    const renderTextAndGetColor = type => {
      const { getByText } = render(
        <ThemeProvider
          theme={{
            color: {
              primary: 'blue',
              danger: 'red',
              secondary: 'green',
              normal: 'yellow'
            }
          }}
        >
          <Text type={type}>Text</Text>
        </ThemeProvider>
      );

      return window.getComputedStyle(getByText('Text')).color;
    };

    expect(renderTextAndGetColor('primary')).toBe('blue');

    cleanup();

    expect(renderTextAndGetColor('danger')).toBe('red');

    cleanup();

    expect(renderTextAndGetColor('secondary')).toBe('green');

    cleanup();

    expect(renderTextAndGetColor()).toBe('yellow');
  });

  test('should return empty string if provided variant prop is not match', () => {
    const size = provideVariant('size', {
      small: '4px 8px',
      medium: '8px 16px',
      large: '16px 24px'
    });

    expect(
      size({
        size: 'tiny'
      })
    ).toBe('');
  });

  test('should return empty string if not provide variant prop', () => {
    const size = provideVariant('size', {
      small: '4px 8px',
      medium: '8px 16px',
      large: '16px 24px'
    });

    expect(
      size({
        color: 'primary'
      })
    ).toBe('');
  });
});
