import * as React from 'react';

import { AuthContextType } from '@/contexts/AuthContext';
import { AuthContext } from '@/contexts/AuthContext';

export function useUser(): AuthContextType {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}
