import React, { useState } from 'react';
import _ from 'lodash';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import VigenereSquareImage from '../assets/Vigenere-square.png';


function VigenereCipher() {
  const [plainText, setPlainText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [cipherText, setCipherText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const encrypt = () => {
    const sanitizedPlainText = plainText.toUpperCase().replace(/[^A-Z]/g, '');
    const sanitizedKeyword = keyword.toUpperCase().replace(/[^A-Z]/g, '');

    const encryptedText = _.map(sanitizedPlainText, (char, index) => {
      const charCode = char.charCodeAt(0);
      const keywordChar = sanitizedKeyword[index % sanitizedKeyword.length].charCodeAt(0);
      const encryptedCharCode = ((charCode + keywordChar) % 26) + 65;

      return String.fromCharCode(encryptedCharCode);
    }).join('');

    setCipherText(encryptedText);
  };

  const decrypt = () => {
    const sanitizedCipherText = cipherText.toUpperCase().replace(/[^A-Z]/g, '');
    const sanitizedKeyword = keyword.toUpperCase().replace(/[^A-Z]/g, '');

    const decryptedText = _.map(sanitizedCipherText, (char, index) => {
      const charCode = char.charCodeAt(0);
      const keywordChar = sanitizedKeyword[index % sanitizedKeyword.length].charCodeAt(0);
      const decryptedCharCode = ((charCode - keywordChar + 26) % 26) + 65;

      return String.fromCharCode(decryptedCharCode);
    }).join('');

    setDecryptedText(decryptedText);
  };

  return (
    <Container maxWidth="sm">
    <Typography variant="h4" align="center" gutterBottom>
      Vigenere Cipher
    </Typography>
    <Typography variant="h5" align="center" gutterBottom>
      Bisa sambil di cek Hasilnya yang ada pada gambar di bawah
    </Typography>
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <img src={VigenereSquareImage} alt="Vigenere Square" style={{ width: '75%', display: 'inline-block' }} />
    </div>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Plain Text"
          fullWidth
          value={plainText}
          onChange={(e) => setPlainText(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Keyword"
          fullWidth
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" onClick={encrypt} fullWidth>
          Encrypt
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" onClick={decrypt} fullWidth>
          Decrypt
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Cipher Text: {cipherText}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Decrypted Text: {decryptedText}</Typography>
      </Grid>
    </Grid>
  </Container>
  );
}

export default VigenereCipher;