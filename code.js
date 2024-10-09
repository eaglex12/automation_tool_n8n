// Get the HTML content from the previous HTTP Request node
const htmlContent = $node["HTTP Request"].json.data; // Adjust if the content is in a different field

// Convert the content to a string (in case it isn't already)
const htmlString = String(htmlContent);

// Regular expression to match LinkedIn profile URLs within the href attributes
const regex = /https:\/\/in\.linkedin\.com\/in\/[a-zA-Z0-9\-]+/g; // Adjusted to match URLs more accurately

// Initialize an array to store LinkedIn URLs
let matches;
const linkedinUrls = [];

// Extract all LinkedIn URLs found in the HTML
while ((matches = regex.exec(htmlString)) !== null) {
	// Add the LinkedIn URL to the array if it's not already present
	const url = matches[0];
	if (!linkedinUrls.includes(url)) {
		linkedinUrls.push(url);
	}
}

// Remove duplicates by converting the array to a Set and back to an array
const uniqueLinkedinUrls = [...new Set(linkedinUrls)];

// Return the list of extracted LinkedIn URLs
if (uniqueLinkedinUrls.length > 0) {
	return uniqueLinkedinUrls.map((url) => ({
		json: {
			linkedinUrl: url,
		},
	}));
} else {
	return [{ json: { message: "No LinkedIn profiles found" } }];
}
