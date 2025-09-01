const { ZodError } = require('zod');

function pickSource(req, source) {
  if (source === 'body') return req.body;
  if (source === 'params') return req.params;
  if (source === 'query') return req.query;
  return {};
}

module.exports = function validate(schema, source = 'body') {
  return (req, res, next) => {
    try {
      const data = pickSource(req, source);
      const parsed = schema.parse(data);
      req.validated = req.validated || {};
      req.validated[source] = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const details = (err.issues || []).map(i => ({
          path: Array.isArray(i.path) ? i.path.join('.') : String(i.path),
          message: i.message,
        }));
        return res.status(400).json({ error: 'Validation error', details });
      }
      return next(err);
    }
  };
};
