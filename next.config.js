/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['megaplanit-prod.sfo3.cdn.digitaloceanspaces.com'],
	},
};

module.exports = nextConfig;
