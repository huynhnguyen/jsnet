var _ = require('underscore');
const Helper = () => {
	/**
	* print the log to console with option type
	* 
	*
	* @param {String} msg message to print
	* @param {String} msgType message type refer to ```const Type```
	* @see Helper#Logger
	*/
	const Logger = (msg, msgType)=>{
		msgType = msgType | 'info';
		const Display = {
			'info':console.log,
			'warn':console.warn,
			'error':console.error,
		};
		try { 
			Display[msgType](msg); 
		} catch(e) {  
			Display['info'](msg); 
		} 
	}
	return {
		sayhello: ()=>{return 'xin chao 2'},	
		logger: Logger,
	}
}
module.exports = Helper;
// module.exports = Immutable;
