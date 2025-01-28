const url = "http://localhost:3000/";

export async function getData(params) {
  try {
    const response = await fetch(url + params, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
   return data
  } catch (error) {
    console.error(error);
    return null
  }
}

export async function putData(params, payload) {
  try {
    const response = await fetch(url + params, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
   return data;
  } catch (error) {
    console.error("Error in PUT request:", error);
  }
}

export async function postData(params, payload) {
  try {
    const response = await fetch(url + params, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error in POST request:", error);
  }
}

export async function deleteData(params) {
  try {
    const response = await fetch(url + params, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error in DELETE request:", error);
  }
}




