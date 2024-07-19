import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { debounce } from '@mui/material';

interface CustomersFilters {

}

export function CustomersFilters({ onFilterChange }: { onFilterChange: (categoria: string) => void }): React.JSX.Element {

  const handleFilterChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(event.target.value);
  }, 300);

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        onChange={handleFilterChange}
        placeholder="Pesquisar"
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '500px' }}
      />
    </Card>
  );
}
