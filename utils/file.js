import DatauriParser from "datauri/parser.js";

const parser = new DatauriParser();

const bufferToDataURI = (fileFormat, buffer) =>
	parser.format(fileFormat, buffer);

export default bufferToDataURI;
