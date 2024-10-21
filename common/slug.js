const slugify = require("npm:slugify")

const generateSlug = (str) => {

  return slugify(str, { lower: true, strict: true });
}

module.exports = generateSlug