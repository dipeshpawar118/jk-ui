let url = process.env.REACT_APP_API_URL

export const getTokens = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
  };
};

export const get = async (endpoint) => {
  let headers =  getTokens()
  const response = await fetch(`${url}/${endpoint}` , {headers});
  return response.json();
};

export const post = async (endpoint, data) => {

  let headers =  getTokens()
  const response = await fetch(`${url}/${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return response;
};

export const put = async (endpoint, data) => {
  const response = await fetch(`${url}/${endpoint}`, {
    method: "PUT",
    headers: getTokens(),
    body: JSON.stringify(data),
  });
  return response.json();
};

export const remove = async (endpoint) => {
  const response = await fetch(`${url}/${endpoint}`, {
    method: "DELETE",
    headers: getTokens(),
  });
  return response
};
