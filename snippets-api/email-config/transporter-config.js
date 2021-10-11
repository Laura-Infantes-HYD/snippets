module.exports = class Transport {
  constructor() {
    this.transportConfig;
    this.emailOptions;
  }

  config = {
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "laura.infantes.seg@outlook.com", // generated ethereal user
      pass: "Iwanttos3g123", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  };
  emailOptions = {
    from: "Snippets app <laura.infantes.seg@outlook.com>",
    to: "lauralopezinfantes@gmail.com",
    subject: "Confirm your snippets app account",
    text: "This is a test email",
  };
};
