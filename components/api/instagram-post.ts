import { IncomingForm } from 'formidable';
import fetch from 'node-fetch';

export const config = {
  api: {
    bodyParser: false,
  },
};

const instagramPostHandler = async (req: any, res: any) => {
    if (req.method === 'POST') {
        const form = new IncomingForm();
        form.parse(req, async (err, fields) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to parse form data.' });
            }

            const pageId = process.env.IG_PAGE_ID;
            const access_token = process.env.API_KEY;

            const message = fields.message;
            const link = fields.image;
            console.log(message, link);
            const apiUrl = `https://graph.facebook.com/v17.0/${pageId}/media?image_url=${link}&caption=${message}&access_token=${access_token}`;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json() as { id: string};
                    publishPost(data.id);
                } else {
                    const errorData = await response.json();
                    return res.status(response.status).json(errorData);
                }
            } catch (error) {
                return res.status(500).json({ error: 'Failed to make the request to Facebook.' });
            }
        });
    }

    async function publishPost(postId: string) {
        const pageId = process.env.IG_PAGE_ID;
        const access_token = process.env.API_KEY;
        const apiURL = `https://graph.facebook.com/v17.0/${pageId}/media_publish?creation_id=${postId}&access_token=${access_token}`;

        try {
            const response = await fetch(apiURL, {
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
    }
}

export default instagramPostHandler;
