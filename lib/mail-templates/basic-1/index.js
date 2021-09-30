import link from './link';

export default {
  id: 1,
  name: 'basicTemplate',
  html: params => link(params),
  htmlFilePath: `${__dirname}/link.template.html`,
  attachments: [
    {
      filename: 'logo.png',
      path: `${__dirname}/../assets/logo.png`,
      cid: 'logo',
    },
    {
      filename: '004-twitter-logo.png',
      path: `${__dirname}/../assets/004-twitter-logo.png`,
      cid: 'twitter-logo',
    },
    {
      filename: '005-facebook.png',
      path: `${__dirname}/../assets/005-facebook.png`,
      cid: 'facebook-logo',
    },
    {
      filename: '006-instagram-logo.png',
      path: `${__dirname}/../assets/006-instagram-logo.png`,
      cid: 'instagram-logo',
    },
    {
      filename: 'linkedin-logo.png',
      path: `${__dirname}/../assets/linkedin-logo.png`,
      cid: 'linkedin-logo',
    },
    {
      filename: 'chat-black.png',
      path: `${__dirname}/../assets/chat-black.png`,
      cid: 'chat-icon-black',
    },
  ],
};
