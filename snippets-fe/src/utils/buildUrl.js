export default ({ page, tags, query }) => {
  let builtUrl = `?${page ? "page=" + page : ""}${page && tags ? "&" : ""}${
    tags ? "tags=" + tags + "&" : ""
  }${(tags || page) && query ? "&" : ""}${query ? "q=" + query : ""}`;

  return builtUrl;
};
