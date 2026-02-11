export default function apiService() {
	return {
		generate(data: FormData) {
			return fetch("/api/generate", {
				method: "POST",
				body: data
			})
		}
	}
}
