'use client';

import * as React from 'react';
import Button from '@mui/material/Button';

export function UploadOFXForm(): React.JSX.Element {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const text = await file.text();
      processOFX(text);
    }
  };

  const processOFX = (ofxContent: string) => {
    const transactions = extractTransactionsFromOFX(ofxContent);
    console.log('Transações extraídas:', transactions);
  };

  const convertDate = (ofxDate: string): string => {
    const cleanDate = ofxDate.split('[')[0];
    const year = cleanDate.substring(0, 4);
    const month = cleanDate.substring(4, 6);
    const day = cleanDate.substring(6, 8);

    return `${day}/${month}/${year}`;
  };

  const extractTransactionsFromOFX = (ofxContent: string) => {
    const transactionRegex = /<STMTTRN>([\s\S]*?)<\/STMTTRN>/g;

    const transactions = [];
    let match;

    while ((match = transactionRegex.exec(ofxContent)) !== null) {
      const transactionBlock = match[1];

      const idMatch = /<FITID>(.*?)<\/FITID>/.exec(transactionBlock);
      const dateMatch = /<DTPOSTED>(.*?)<\/DTPOSTED>/.exec(transactionBlock);
      const amountMatch = /<TRNAMT>(.*?)<\/TRNAMT>/.exec(transactionBlock);
      const descriptionMatch = /<MEMO>(.*?)<\/MEMO>/.exec(transactionBlock);

      transactions.push({
        id: idMatch?.[1],
        type: parseFloat(amountMatch?.[1] || '0') < 0 ? 'Despesa' : 'Receita',
        date: dateMatch ? convertDate(dateMatch[1]) : 'Unknown',
        amount: parseFloat(amountMatch?.[1] || '0'),
        description: descriptionMatch?.[1] || 'Unknown',
      });
    }

    return transactions;
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {/* <Card> */}
      <Button
        component="label"
        fullWidth
        variant="outlined"
        sx={{
          padding: '1rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          borderRadius: '8px',
          color: '#000',
          borderColor: '#ccc',
          '&:hover': { borderColor: '#aaa' },
        }}
      >
        Importar Arquivo OFX
        <input type="file" accept=".ofx" hidden onChange={handleFileUpload} />
      </Button>
      {/* </Card> */}
    </form>
  );
}
