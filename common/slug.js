const slugify = require("slugify")

const generateSlug = (str) => {

  return slugify(str, { lower: true, strict: true });
}

module.exports = generateSlug