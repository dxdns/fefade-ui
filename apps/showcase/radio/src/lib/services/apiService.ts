export default function apiService() {
	const servers = ["de1", "fi1", "de2"]

	return {
		async newFetch(fnFetch: (server: string) => Promise<Response>) {
			for (const server of servers) {
				const response = await fnFetch(server)
				if (!response.ok) continue
				return response
			}
			return new Response(null, {
				status: 503,
				statusText: "Service Unavailable"
			})
		},
		getCountries() {
			return this.newFetch((server) => {
				const URL = `https://${server}.api.radio-browser.info/json/countrycodes`
				return fetch(URL)
			})
		},
		getTags() {
			return this.newFetch((server) => {
				const URL = `https://${server}.api.radio-browser.info/json/tags`
				return fetch(URL)
			})
		},
		get(
			limit: number,
			countryCode: string,
			searchInputValue: string | null,
			tag: string | null
		) {
			return this.newFetch((server) => {
				const baseUrl = `https://${server}.api.radio-browser.info/json/stations/search`

				const params = new URLSearchParams({
					limit: String(limit),
					order: "clickcount",
					reverse: "true",
					hidebroken: "true",
					name: searchInputValue ?? ""
				})

				if (!searchInputValue && tag) {
					params.append("tagList", tag)
				}

				if (!tag) {
					params.append("countrycode", countryCode)
				}

				const URL = `${baseUrl}?${params.toString()}`

				return fetch(URL)
			})
		}
	}
}
