function parseError(err) {
    if (err instanceof Error) {
      // Generic error
      return { errors: [err.message] };
    } else if (Array.isArray(err)) {
      // Express-validator error array
      return {
        errors: Object.fromEntries(err.map(e => [e.path, e.msg])) // Corrected e.message to e.msg
      };
    } else {
      // Mongoose validation error
      return {
        errors: Object.fromEntries(Object.values(err.errors).map(e => [e.path, e.message]))
      };
    }
  }
  
  module.exports = { parseError };
  