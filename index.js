import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import cors from 'cors';
const app = express();

// const corsOptions = {
//   origin: '*',
// }

app.get('/', cors(), async (req, res) => {
  console.log('entró aqui cors');
  try {
    const { data } = await axios.get('https://www.bcentral.cl/inicio');

    const $ = cheerio.load(data);
    const selectorDolar =
      '#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(3) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2';

    const selectorUF =
      '#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(1) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2';

    const objetoValores = {
      // fecha1: new Date().toLocaleString('es-ES'),
      fecha: new Date().toLocaleDateString(),
      UF: $(selectorUF).text() ?? 'sin datos', // Nullish coalescing operator / Operador coalescente si el nulo operando izquierdo es un valor falso , no solo nullo undefined
      // dolar: $(selectorDolar).html().split(' ')[1].trim(),
      dolar: $(selectorDolar).html().split('/')[0].trim() ?? 'sin datos',
    };

    res.json(objetoValores);
  } catch (error) {
    res.json({ error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('server en ⭐ puerto: ' + PORT));
