import { ReactElement, ReactNode } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClientTest from './queryClientTest';

type Options = {
  store?: any;
  appStore?: any;
  initialRoute?: string;
  renderOptions?: Omit<RenderOptions, 'wrapper'>;
  routes?: string[];
};

function render(ui: ReactElement, { renderOptions = {} }: Options = {}) {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return <QueryClientProvider client={queryClientTest}>{children}</QueryClientProvider>;
  };
  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export { render };
