
// const url = "http://localhost:3000/";

// export async function getData(params) {
//   try {
//     const response = await fetch(url + params, { method: "GET" });
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function putData(params, payload) {
//   try {
//     const response = await fetch(url + params, {
//       method: "PUT",
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error in PUT request:", error);
//   }
// }

// getData("columns");

// putData("columns/7cc0", {
//   name: "Example Name",
//   description: "This is an example description.",
// });
