// import dns module
import dns from 'dns';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
	| any
	| {
			message: string;
	  };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req?.method !== 'POST' || !req?.body?.domain) {
		return res.status(500).json({ message: 'Invalid body' });
	}

	const domain = req.body.domain;

	// lookup the hostname passed as argument
	dns.lookup(domain, (error, address, family) => {
		// if an error occurs, eg. the hostname is incorrect!
		if (error) {
			console.error(error?.message);
			res.status(400).json({
				isValid: false,
				message: error?.message || `${domain} is not valid domain.`,
			});
		} else {
			// if no error exists
			console.log(
				`The ip address is ${address} and the ip version is ${family}`
			);
			res.status(200).json({
				isValid: true,
				message: `The ip address is ${address} and the ip version is ${family}`,
			});
		}
	});
}
