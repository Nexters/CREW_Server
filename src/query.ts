import { db } from "./app";
import { EvaluationInstance } from "./models/evaluation";
import AppResult from "./util/index";


export async function findUserById({ id }) {
  const user = await db.User.findByPk(id);
  if (!user) { 
    return new AppResult(null,200,null,null);
    }
  return new AppResult(user,200,null,null);
};

export async function findUserByProvider({
  member_provider,
  member_provider_number
}) {
  const user = await db.User.find({ where: { member_provider, member_provider_number } });
  if (!user) {
      return new AppResult(null,200,null,null);
   }
  return new AppResult(user,200,null,null);
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
  if (!newUser) { 
    return new AppResult(null,200,null,null);
   }
  return new AppResult(newUser,200,null,null);
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
  return new AppResult(updated_user,200,null,null);
}

export async function getEvaluationByUserId({user_id}){
  const evaluation : EvaluationInstance[] = await db.Evaluation.findAll({
      where : {
        user_id : user_id,
      }
  })
  if(!evaluation){
    return new AppResult(null,200,null,null) ;
  }
  return new AppResult(evaluation,200,null,null);
}

export async function findResumesByUserId({user_id}) {
  const resumes = await db.Resume.findAll({where: {user_id}});
  if(!resumes) { 
    return new AppResult(null,200,null,null);
  }
  return new AppResult(resumes,200,null,null);
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
      const newEvaluation = await db.Evaluation.create(
      {
        user_admin_id,
        user_id,
        score,
        comment
      }
    )

    if (!newEvaluation) {
      return new AppResult(null,504,"query.ts : upsertEvaluationByUserId  ","failed_to_create_new_evaluation"); // return 
    }
    return new AppResult(newEvaluation,200,null,null);// return 
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
  return new AppResult(updateEvaluation,200,null,null);
}

export async function findUserAdmin({id}) {
  const admin = await db.User.find({where: {id, status: 'admin'}});
  if(!admin) { 
    return new AppResult(null,200,null,null);
   }
  return new AppResult(admin,200,null,null);
}

