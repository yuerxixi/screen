export function fontSize(res) {
	// let docEl = document.documentElement,
	// 	clientWidth =
	// 		window.innerWidth ||
	// 		document.documentElement.clientWidth ||
	// 		document.body.clientWidth;
	// if (!clientWidth) return;
	// let fontSize = 100 * (clientWidth / 1920);
	// return res * fontSize;
  return window.document.documentElement.style.fontSize.replace('px','');
}
export function fontSize12() {
  return window.document.documentElement.style.fontSize.replace('px','')*0.0384615384615385;
}
export function fontSize14() {
  return window.document.documentElement.style.fontSize.replace('px','')*0.0448717948717949;
}

