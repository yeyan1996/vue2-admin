const url = "http://localhost:3000";

export async function report({
  err = "",
  line = "",
  column = "",
  info = "",
  from = "",
  name = "",
  message = ""
}) {
  fetch(url, {
    method: "post",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify({
      name,
      stack: err.stack,
      line,
      column,
      info,
      from,
      message
    })
  });
}
