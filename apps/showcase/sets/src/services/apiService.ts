import {
	_3dData,
	backgroundsData,
	blogsData,
	colorsData,
	componentsData,
	iconsData,
	illustrationsData,
	inspirationsData,
	librariesData,
	photosData,
	toolsData,
	typographyData,
	videosData
} from "$lib/data"

export default function apiService() {
	return {
		getComponents() {
			return componentsData
		},
		getIcons() {
			return iconsData
		},
		getTools() {
			return toolsData
		},
		getIllustrations() {
			return illustrationsData
		},
		getPhotos() {
			return photosData
		},
		getVideos() {
			return videosData
		},
		getColors() {
			return colorsData
		},
		getBackgrounds() {
			return backgroundsData
		},
		getBlogs() {
			return blogsData
		},
		getInspirations() {
			return inspirationsData
		},
		getLibraries() {
			return librariesData
		},
		get3d() {
			return _3dData
		},
		getTypography() {
			return typographyData
		}
	}
}
