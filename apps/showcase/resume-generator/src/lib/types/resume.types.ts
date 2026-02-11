export type EducationEntry = {
	degree: string
	school: string
	years: string
	details?: string
}

export type SkillGroup = {
	label: string
	items: string
}

export type ExperienceEntry = {
	role: string
	company: string
	location: string
	period: string
	bullets: string[]
}

export type ProjectEntry = {
	title: string
	description: string
}

export type ResumeDataType = {
	name: string
	phone: string
	location: string
	email: string
	linkedin: string
	website: string
	objective: string
	education: EducationEntry[]
	skills: SkillGroup[]
	experience: ExperienceEntry[]
	projects: ProjectEntry[]
	activities: string[]
	leadership: string[]
}
