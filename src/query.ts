import { db } from "./app";


export async function findUserById({ id }) {
  const user = await db.User.findByPk(id);
  if (!user) { return null }
  return user;
};

export async function findUserByProvider({
  member_provider,
  member_provider_number
}) {
  const user = await db.User.find({ where: { member_provider, member_provider_number } });
  if (!user) { return null }
  return user;
}

export async function createUser({
  member_provider,
  member_provider_number,
  provide_image,
  token
}) {
  const newUser = await db.User.create({
    member_provider,
    member_provider_number,
    provide_image,
    token
  });
  if (!newUser) { return null }
  return newUser;
}

export async function findResumesByUserId({ user_id }) {
  const resumes = await db.Resume.findAll({ where: { user_id } });
  if (!resumes) { return null }
  return resumes;
}

export async function updateUserInfo({ id, age, name, phone_number, email, job, position }) {
  const updated_user = await db.User.update(
    {
      age: age,
      name: name,
      phone_number: phone_number,
      email: email,
      job: job,
      position: position
    },
    { where: { id } }
  );
  return updated_user;
}