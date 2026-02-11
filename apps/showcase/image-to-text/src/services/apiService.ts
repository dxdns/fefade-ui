export default function apiService() {
	return {
		imageToText(data: FormData) {
			return fetch("/api/image-to-text", {
				method: "POST",
				body: data
			})
		}
	}
}
