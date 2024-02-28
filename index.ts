const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT;
const QRCode = require('qrcode-svg');

function generateQR(data: string) {

    const qrcode = new QRCode({
        content: data,
        padding: 4,
        width: 300,
        height: 300,
        color: '#000000',
        background: '#ffffff',
        ecl: 'M',
    });

    return qrcode.svg();
}

app.use(bodyParser.json());

app.get('/', (req: any, res: any) => {
    const htmlPath = path.join(__dirname, 'index.html');
    res.sendFile(htmlPath);
});

app.post('/generate-qr', async (req: any, res: any) => {
    const { qr_data } = req.body;
    try {
        const qr = await generateQR(qr_data);
        res.status(200).json({ qrCodeUrl: qr, message: 'QR code generated successfully' });
    }
    catch {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.listen(port, () => {
    // console.log(`Server is running at http://localhost:${port}`);
});
