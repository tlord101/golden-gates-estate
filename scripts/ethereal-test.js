const nodemailer = require('nodemailer');
const emailHandler = require('../api/send-email.js');

async function main() {
  console.log('Creating Ethereal test account...');
  const testAccount = await nodemailer.createTestAccount();
  console.log('Ethereal account created. User:', testAccount.user);

  // Set env vars for the duration of the test
  process.env.SMTP_HOST = 'smtp.ethereal.email';
  process.env.SMTP_USER = testAccount.user;
  process.env.SMTP_PASS = testAccount.pass;
  process.env.SMTP_PORT = '587';
  process.env.SMTP_SECURE = 'false';

  // Build mock request
  const req = {
    method: 'POST',
    body: {
      name: 'Ethereal Test',
      email: 'visitor@example.com',
      subject: 'Ethereal Test Message',
      message: 'This is a test message sent via Ethereal by automated test script.'
    }
  };

  // Response wrapper compatible with the handler
  const res = {
    _status: 200,
    headers: {},
    setHeader(k, v) { this.headers[k] = v; },
    writeHead(s, h) { this._status = s; if (h) Object.assign(this.headers, h); },
    status(code) { this._status = code; return this; },
    json(obj) {
      console.log('Handler response:', obj);
      this.body = obj;
    },
    end: (...args) => {}
  };

  try {
    await emailHandler(req, res);
    const resp = res.body || {};
    if (resp.ok && resp.previewUrl) {
      console.log('\n✅ Ethereal preview URL:', resp.previewUrl);
      console.log('Open the preview URL to view the sent message.');
    } else if (resp.ok) {
      console.log('\n✅ Email handler reported success but no preview URL returned.');
    } else {
      console.error('\n❌ Handler returned failure:', resp);
    }

    // For thoroughness, attempt to fetch any test message URL from nodemailer using the last info if available
    // Note: send-email.js already logs preview URL when using ethereal.
  } catch (err) {
    console.error('Test failed:', err);
  }
}

main();
