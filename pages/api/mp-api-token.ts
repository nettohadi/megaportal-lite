import type { NextApiRequest, NextApiResponse } from 'next';

import { SCOPE } from 'libs/constants';
import { VerifyResponse, verifyToken } from 'libs/functions';
import { axiosRequest } from 'libs/request-axios';

type Data =
	| {
			apiToken: string;
	  }
	| {
			message: string;
	  };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method !== 'GET') {
		return res.status(500).json({ message: 'Invalid params value' });
	}
	const data: VerifyResponse = verifyToken(
		[SCOPE.READ_USERS],
		req.headers.authorization
	);
	if (!data.status) {
		return res.status(403).json({
			message: data.message || 'Something went wrong',
		});
	}
	try {
		const tokenOrg = await axiosRequest('POST', 'oauth/token', {
			grant_type: 'client_credentials',
			client_id: process.env.AUTH0_API_ID,
			client_secret: process.env.AUTH0_API_SECRET,
			audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE_URL,
		});
		if (!tokenOrg.access_token) {
			return res.status(403).json({ message: 'Access Denied' });
		}

		res.status(200).json({
			apiToken: tokenOrg?.access_token,
		});
	} catch (error: any) {
		res.status(error?.data.statusCode || 500).json({
			message: error?.data?.message || 'Something went wrong',
		});
	}
}
