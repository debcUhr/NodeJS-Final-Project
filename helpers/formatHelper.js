export const formatHttpLog = (req, route) => {
    return `\rRequest Route: ${route}
            \rRequest URL: ${req.protocol}://${req.get('host')}${req.originalUrl}
            \rRequest Method: ${req.method}
            \rRequest Query Parameters: ${JSON.stringify(req.query)}
            \rRequest Body: ${JSON.stringify(req.body)}
            \n`
}