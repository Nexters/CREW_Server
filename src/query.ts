import { db } from "./app";
import { EvaluationInstance } from "./models/evaluation";


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

export async function getEvaluationByUserId({user_id}){
  const evaluation : EvaluationInstance[] = await db.Evaluation.findAll({
      where : {
        user_id : user_id,
      }
  })
  if(!evaluation){
    return null; 
  }
  return evaluation;
}

export async function findResumesByUserId({user_id}) {
  const resumes = await db.Resume.findAll({where: {user_id}});
  if(!resumes) { return null }
  return resumes;
}
export async function upsertEvaluationByUserId({
  user_admin_id,
  user_id,
  score,
  comment
}) {


  const isExist = await db.Evaluation.findOne({
    where: {
      user_admin_id : user_admin_id,
      user_id: user_id,
    }
  });
  
  if (!isExist) {
    console.log("새로운 Evaluation 생성"); 
    const newEvaluation = await db.Evaluation.create(
      {
        user_admin_id,
        user_id,
        score,
        comment
      }
    )

    if (!newEvaluation) {
      return null; // return 
    }
    return newEvaluation;// return 
  }

  const updateEvaluation = await db.Evaluation.update(
    {
      score,
      comment
    },{
      where : {
        user_admin_id,
        user_id : user_id
      }
    }
  )

  // return  when update is fail 
  return updateEvaluation;
}
