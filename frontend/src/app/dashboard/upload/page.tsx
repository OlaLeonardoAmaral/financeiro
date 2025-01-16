'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import UploadOFXForm from '@/components/dashboard/upload/upload-ofx';

export default function Page(): React.JSX.Element {
  const [titlePage, setTitlePage] = React.useState<JSX.Element>(
    <div>
      <Typography variant="h4">Importar Extrato</Typography>
    </div>
  );

  const handleTitlePage = (component: JSX.Element) => setTitlePage(component);

  return (
    <Stack spacing={3}>
      {titlePage}
      <UploadOFXForm onSendComponent={handleTitlePage}/>
    </Stack>
  );
}
