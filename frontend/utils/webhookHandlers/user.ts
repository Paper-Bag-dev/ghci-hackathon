import { UserJSON } from "@clerk/nextjs/server";
import axios from "axios";

async function handleUserCreated(user: UserJSON) {
  const {
    id,
    username,
    email_addresses,
    primary_email_address_id,
    first_name,
    last_name,
    image_url,
  } = user;

  const primaryEmail = email_addresses.find(
    (e) => e.id === primary_email_address_id
  )?.email_address;
  console.log("Test Fire!");
  await axios.post(`${process.env.BACKEND_URL}/api/v1/public/user`, {
    clerkId: id,
    username: username,
    email: primaryEmail,
    firstName: first_name,
    lastName: last_name,
    image: image_url,
  });
}

async function handleUserUpdated(user: UserJSON) {
  await axios.put(`${process.env.BACKEND_URL}/api/v1/public/user`, {
    email: user.email_addresses,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    image: user.image_url,
  });
}

async function handleUserDeleted(user: UserJSON) {
  await axios.delete(`${process.env.BACKEND_URL}/api/v1/public/user`);
}

export { handleUserCreated, handleUserUpdated, handleUserDeleted };
