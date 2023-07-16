import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	if (request.url.indexOf('/api/') !== -1) {
		return NextResponse.next();
	}

	try {
		// if (
		// 	userProfile &&
		// 	!userProfile?.email_verified &&
		// 	isOnboardingPage === -1
		// ) {
		// 	return NextResponse.redirect(new URL(onboardingUrl, request.url));
		// }
	} catch (err) {
		console.error(err);
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/admin/:path*'],
};
