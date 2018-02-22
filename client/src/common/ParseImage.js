export default canvas => {
	let arr = canvas.toDataURL().split(',');
	let type = arr[0];
	let data = arr[1];
	let byteString = atob(data);
	let mimeString = type.split(',')[0].split(':')[1].split(';')[0]; 
	let ia = new Uint8Array(byteString.length);
	for (let i = 0; i < byteString.length; i++) {  
	    ia[i] = byteString.charCodeAt(i);  
	}
	return new Blob([ia], {type: mimeString});
};