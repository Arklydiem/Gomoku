export class ResourceHelper {
	public static buildUrl(baseUrl: string, path: string, pathParams?: Record<string,string | number>): string {
		let finalPath = path;

		if (pathParams) {
			for (const [key, value] of Object.entries(pathParams)) {
				finalPath = finalPath.replace(`{${key}}`, encodeURIComponent(String(value)));
			}
		}

		return `${baseUrl}${finalPath}`;
	}
}
