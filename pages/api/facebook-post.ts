import { IncomingForm } from 'formidable';
import fetch from 'node-fetch';

export const config = {
  api: {
    bodyParser: false,
  },
};

const facebookPostHandler = async (req:any, res:any) => {


  if (req.method === 'POST') {
    const form = new IncomingForm();
    form.parse(req, async (err, fields) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to parse form data.' });
      }

      const pageId = process.env.FB_PAGE_ID;
      const access_token = process.env.API_KEY;

      const message = fields.message;
      const link = fields.image;
      console.log(message, link);
      const apiUrl = `https://graph.facebook.com/${pageId}/feed?message=${message}&link=${link}&access_token=${access_token}`;

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          return res.status(200).json(data);
        } else {
          const errorData = await response.json();
          return res.status(response.status).json(errorData);
        }
      } catch (error) {
        return res.status(500).json({ error: 'Failed to make the request to Facebook.' });
      }
    });
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
};

export default facebookPostHandler;
