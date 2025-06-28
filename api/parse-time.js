const chrono = require('chrono-node');

module.exports = (req, res) => {
  const { text } = req.query;
  
  if (!text) {
    return res.status(400).json({ error: 'Missing text parameter' });
  }
  
  const results = chrono.parse(text, new Date(), { forwardDate: true });
  
  if (results.length > 0) {
    const date = results[0].start.date();
    // Convert to Mountain Time
    const mtDate = new Date(date.getTime() - (6 * 60 * 60 * 1000));
    const isoString = mtDate.toISOString().slice(0, 19) + '-06:00';
    
    res.json({ convertedDate: isoString });
  } else {
    res.status(400).json({ error: 'Could not parse date' });
  }
};
