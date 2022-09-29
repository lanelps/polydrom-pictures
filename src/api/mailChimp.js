require(`dotenv`).config();

const Mailchimp = require(`mailchimp-api-v3`);

const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin": `*`,
  "Access-Control-Allow-Headers": `Content-Type`
};

const mailchimp = (req, res) => {
  if (req.method !== `POST`) {
    return res.status(405).json({
      statusCode: 405,
      headers,
      body: `Method unsupported: ${req.method}`
    });
  }

  const data = JSON.parse(req?.body);

  if (!process.env.MAILCHIMP_API_KEY) {
    const message = `Required Mailchimp verification parameters missing`;

    return res.status(500).json({
      statusCode: 500,
      headers,
      body: {
        status: `failed`,
        message
      }
    });
  }

  const mailchimpClient = new Mailchimp(process.env.MAILCHIMP_API_KEY);

  //   if (!process.env.MAILCHIMP_LIST_ID) {
  //     const message = `Required Mailchimp verification parameters missing`;

  //     return res.status(500).json({
  //       statusCode: 500,
  //       headers,
  //       body: {
  //         status: `failed`,
  //         message
  //       }
  //     });
  //   }

  if (!data?.email || !data?.listID) {
    const message = `Required information missing`;

    return res.status(400).json({
      statusCode: 400,
      headers,
      body: {
        status: `failed`,
        message
      }
    });
  }

  const sendMailchimp = async (payload) => {
    const { email } = payload;

    try {
      await mailchimpClient.post(`lists/${data.listID}`, {
        members: [
          {
            email_address: email,
            status: `subscribed`
          }
        ],
        update_existing: true
      });

      res.status(200).json({
        statusCode,
        headers,
        body: {
          status: `ok`,
          message: `Mailchimp subscription successful`
        }
      });
    } catch (err) {
      console.error(err);

      res.status(400).json({
        statusCode: 400,
        headers,
        body: {
          status: `failed`,
          message: `Mailchimp post failed`
        }
      });
    }
  };

  sendMailchimp(data);
};

export default mailchimp;
