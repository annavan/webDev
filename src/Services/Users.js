import axios from "axios";

const url = "https://my-json-server.typicode.com/kellybuchanan/WebDev-Spring2021";

// Creates a user based on login info
export const createUser = async (id, firstName, lastName, birthday, email, password) => {
  try {
    const response = await axios.post("/Services/users.json", {
      id,
      firstName,
      lastName,
      birthday,
      email,
      password,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("User created:", response.data);
    return response.data;
  } catch (err) {
    console.error("POST error:", err);
    throw err;
  }
};

// Get user info from users.json
export const getUser = async () => {
  try {
    const response = await axios.get("/Services/users.json");
    return response.data;
  } catch (err) {
    console.error("GET Error:", err);
    return [];
  }
};
