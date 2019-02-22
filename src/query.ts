import { db } from "./app";
import { EvaluationInstance } from "./models/evaluation";
import { UserInstance } from "./models/user";
import { PositionType, FormType } from './models/form';
import { FormJsonSkeleton, FormElementSkeleton, getPositionTypeAsEnum, getFormTypeAsEnum } from './util/index';



export async function findUserById({ id }) {
  const user = await db.User.findByPk(id);
  if (!user) { 
    return null;
    }
  return user;
};

export async function findUserByProvider({
  member_provider,
  member_provider_number
}) {
  const user = await db.User.find({ where: { member_provider, member_provider_number } });
  if (!user) {
      return null;
   }
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
  if (!newUser) { 
    return null;
   }
  return newUser;
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

  return updated_user

}

export async function getEvaluationByUserId({ user_id }) {
  const evaluation: EvaluationInstance[] = await db.Evaluation.findAll({
    where: {
      user_id: user_id,
    }
  })

  if(!evaluation){
    return null;
  }
  return evaluation;
}


export async function findResumesByUserId({user_id}) {
  const resumes = await db.Resume.findAll({where: {user_id}});
  if(!resumes) { 
    return null;
  }
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
      user_admin_id,
      user_id,
    }
  });
  if (!isExist) {
    let newEvaluation;
    try {

      newEvaluation = await db.Evaluation.create(
        {
          user_admin_id: user_admin_id,
          user_id: user_id,
          score: score,
          comment: comment
        }
      )

    } catch (err) {
      return false;
    }
    if (!newEvaluation) {
      return null;
    }

    return newEvaluation;
  }



  const updateEvaluation = await db.Evaluation.update(
    {
      score: score,
      comment: comment
    }, {
      where: {
        user_admin_id: user_admin_id,
        user_id: user_id
      }
    }
  )
  if (!updateEvaluation) {
    return null;
  }
  return updateEvaluation;
}

export async function findUserAdmin({id}) {
  const admin = await db.User.find({where: {id, status: 'admin'}});
  if(!admin) { 
    return null;
   }
  return admin;
}


export async function findFormById({ form_id }) {
  const form = await db.Form.findByPk(form_id);
  if (!form) { return null }
  return form;
}

export async function updateORcreateResume({
  answer,
  form_id,
  user_id
}) {
  const isExist = await db.Resume.findOne({
    where: {
      form_id: form_id,
      user_id: user_id
    }
  });

  if(isExist) {
    const updateResume = await db.Resume.update({
      answer
    }, {
        where: {
          form_id: form_id,
          user_id: user_id
        }
      }
    )
    return updateResume;
  }
  
  const createResume = await db.Resume.create({
    answer,
    form_id,
    user_id
  });
  return createResume;
}

export async function findAllUsers() {
  const users: UserInstance[] = await db.User.findAll();
  if (!users) { return null }
  return users;
}


export async function getForm({position}) {
  
  const dbResult = await db.Form.findAll({
    where: {
      position: position
    }
  });
  if (!dbResult) {
    return null;
  }
  
  return dbResult;
}


export async function upsertForm(data: FormJsonSkeleton) {

  let refinedData: FormElementSkeleton[] = data.form;

  let sFlag = true; // 모든 create/update 가 성공했는지 저장한다
  let fIdx = 0; // 몇 번 째 시도에서 실패했는지 저장한다
  let dbResult, question_num, description, rawOptions, options, position, type;

  for (let i = 0; i < refinedData.length; i++) {

    position = getPositionTypeAsEnum(refinedData[i])
    type = getFormTypeAsEnum(refinedData[i]);

    question_num = refinedData[i].question_num,
      description = refinedData[i].description;
    rawOptions = refinedData[i].options;

    options = JSON.stringify(rawOptions);


    let isFormExist = await db.Form.findOne({ where: { question_num: question_num, position: position } });

    if (!isFormExist) {

      dbResult = await Promise.all([db.Form.create({
        position,
        question_num,
        description,
        options,
        type
      })
      ])

    } else {

      dbResult = await Promise.all([db.Form.update({
        position,
        question_num,
        description,
        options,
        type
      }, {
          where: {
            question_num: question_num,
            position: position
          }
        })
      ])

    }

    if (!dbResult) {
      sFlag = false;
      fIdx = i;
    }

  }

  if (!sFlag) {
    return false;
  }

  return refinedData;
}

export async function deleteFormItem({ form_id }) {

  let result;

  result = await db.Form.destroy({where: {id: form_id}})
  if (!result) {
    return false;
  }
  return true;


}