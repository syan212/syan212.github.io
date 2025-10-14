export function toggle() {
	const html = document.documentElement;
	if (html.classList.contains('light-mode')) {
		html.classList.remove('light-mode');
		html.classList.add('dark-mode');
	} else {
		html.classList.remove('dark-mode');
		html.classList.add('light-mode');
	}
}

export function getTheme() {
	if (typeof window === 'undefined') {
		return;
	}
	const html = document.documentElement;
	return html.classList.contains('light-mode') ? 'light' : 'dark';
}
