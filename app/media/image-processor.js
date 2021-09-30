// import sharp from 'sharp';

// const imgSizes = {
//   n: 0,
//   m: 550,
//   s: 220,
//   xs: 100,
// };

// async function minify(imgPath, sizenum) {
//   const file = sharp(imgPath);
//   const metadata = await file.metadata();
//   const buffer = await file.resize(sizenum).toBuffer();
//   return {
//     mime: metadata.format,
//     buffer,
//   };
// }

// export default async function imageResponseHandler(imgPath, req, res) {
//   const sizestr = req.query.size || 'n';
//   const sizenum = imgSizes[sizestr];

//   if (sizenum) {
//     const readyObject = await minify(imgPath, sizenum);
//     res.setHeader('Content-Type', `image/${readyObject.mime}`);
//     res.setHeader('Content-Length', readyObject.buffer.length);
//     res.send(readyObject.buffer);
//   } else {
//     return res.sendFile(imgPath);
//   }
//   return true;
// }
