/** @type {import("next").NextConfig} */
const nextConfig = {
	output: "standalone",
	// crossOrigin: "anonymous",
	serverExternalPackages: ["tesseract.js"],
	outputFileTracingIncludes: {
		"/api/**/*": ["./node_modules/**/*.wasm", "./node_modules/**/*.proto"]
	}
	// async rewrites() {
	//   return [
	//     {
	//       source: "/api/nfe/:path*",
	//       destination: "https://www.fsist.com.br/:path*",
	//     },
	//     {
	//       source: "/api/files/:path*",
	//       destination: "https://www.mediafire.com/api/1.5/:path*",
	//     },
	//     {
	//       source: "/api/github/:path*",
	//       destination: "https://api.github.com/:path*",
	//     },
	//   ]
	// },
	// async headers() {
	//   return [
	//     {
	//       source: "/api/:path*",
	//       headers: [
	//         { key: "Access-Control-Allow-Credentials", value: "true" },
	//         { key: "Access-Control-Allow-Origin", value: "*" },
	//         {
	//           key: "Access-Control-Allow-Methods",
	//           value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
	//         },
	//         {
	//           key: "Access-Control-Allow-Headers",
	//           value:
	//             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
	//         },
	//       ],
	//     },
	//   ]
	// },
}

export default nextConfig
