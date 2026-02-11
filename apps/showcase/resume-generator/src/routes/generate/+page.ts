import type { PageLoad } from "./$types"
import type { ResumeDataType } from "$lib/types"

function parseJSON(str: string | null) {
	try {
		return str ? JSON.parse(decodeURIComponent(str)) : []
	} catch {
		return []
	}
}

export const load = (async ({ url }) => {
	const params = url.searchParams

	const resume: ResumeDataType = {
		name: params.get("name") ?? "",
		phone: params.get("phone") ?? "",
		location: params.get("location") ?? "",
		email: params.get("email") ?? "",
		linkedin: params.get("linkedin") ?? "",
		website: params.get("website") ?? "",
		objective: params.get("objective") ?? "",
		education: parseJSON(params.get("education")),
		skills: parseJSON(params.get("skills")),
		experience: parseJSON(params.get("experience")),
		projects: parseJSON(params.get("projects")),
		activities: parseJSON(params.get("activities")),
		leadership: parseJSON(params.get("leadership"))
	}

	return resume
}) satisfies PageLoad
