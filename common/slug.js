import slugify from "npm:slugify"

const generateSlug = (str) => {

  return slugify(str, { lower: true, strict: true });
}

export default generateSlug