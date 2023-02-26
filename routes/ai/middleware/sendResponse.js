
const sendResponse = async (req, res, next) => {

	// if both req.locals.output is null and req.locals.outputs is null, then
	// the middleware has not been executed
	if (!req.locals.output_id) {
		res.json({
			success: false,
			error: "No Content",
			message: "No Content was generated, please try again"
		})
		return
	}

	let response = { success: true, }
	if(req.locals.output_id){
		response.output_id = req.locals.output_id
	}

	res.json(response)
}

module.exports = sendResponse