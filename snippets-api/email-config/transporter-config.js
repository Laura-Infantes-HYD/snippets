require("dotenv").config({ path: __dirname + "/.env" });
const jwt = require("jsonwebtoken");

module.exports = class Transport {
  constructor({ email, id }) {
    this.transportConfig;
    this.emailOptions;
    this.emailAddress = email;
    this.id = id;
  }

  config = {
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "snippets.app@outlook.com", // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  };

  emailOptions = {
    from: "Snippets app <snippets.app@outlook.com>",
    subject: "Confirm your snippets app account",
  };

  getEmailOptions() {
    const confirmationToken = jwt.sign(
      { id: this.id },
      process.env.CONFIRMATION_TOKEN_SECRET
    );
    const link = `${process.env.SITE_URL}/confirm/${confirmationToken}`;

    return {
      ...this.emailOptions,
      to: this.emailAddress,
      text: `Follow this link to confirm your email adress ${link}`,
    };
  }
};
