import { db } from "./app";


export async function findUserById({id}) {
  const user = await db.User.findByPk(id);
  if(!user) { return null }
  return user;
};

export async function findUserByProvider({ 
  member_provider,
  member_provider_number
}) {
  const user = await db.User.find({where: {member_provider, member_provider_number}});
  if(!user) { return null }
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
  if(!newUser) { return null }
  return newUser;
}