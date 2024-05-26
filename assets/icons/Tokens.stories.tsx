import { Meta } from '@storybook/react';
import * as Icons from './tokens';

const meta: Meta = {
  title: 'Tokens',
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
};

export default meta;

export const IconsWithLabels = () => (
  <div
    style={{
      display: 'grid',
      alignItems: 'baseline',
      gridGap: '20px 10px',
      gridTemplateColumns: 'repeat(auto-fill, 160px)',
    }}
  >
    {Object.entries(Icons).map(([name, IconComponent]) => (
      <div
        key={name}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 16px',
          rowGap: '8px',
          color: '#868686',
        }}
      >
        <IconComponent />
        <span
          style={{
            borderBottom: '1px solid #C9C9C9',
            paddingBottom: '4px',
          }}
        >
          {name}
        </span>
      </div>
    ))}
  </div>
);
