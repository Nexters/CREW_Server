import { db } from "./app";
import { EvaluationInstance } from "./models/evaluation";
import AppResult, { FormJsonSkeleton, FormElementSkeleton, FormDecompositionHelper } from "./util/index";
import { UserInstance } from "./models/user";
import { PositionType, FormType } from './models/form';




export async function findUserById({ id }) {
  const user = await db.User.findByPk(id);
  if (!user) {
    return new AppResult(null, 200, null, null);
  }
  return new AppResult(user, 200, null, null);
};

export async function findUserByProvider({
  member_provider,
  member_provider_number
}) {
  const user = await db.User.find({ where: { member_provider, member_provider_number } });
  if (!user) {
    return new AppResult(null, 200, null, null);
  }
  return new AppResult(user, 200, null, null);
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
    return new AppResult(null, 200, null, null);
  }
  return new AppResult(newUser, 200, null, null);
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
  return new AppResult(updated_user, 200, null, null);
}

export async function getEvaluationByUserId({ user_id }) {
  const evaluation: EvaluationInstance[] = await db.Evaluation.findAll({
    where: {
      user_id: user_id,
    }
  })
  if (!evaluation) {
    return new AppResult(null, 200, null, null);
  }
  return new AppResult(evaluation, 200, null, null);
}

export async function findResumesByUserId({ user_id }) {
  const resumes = await db.Resume.findAll({ where: { user_id } });
  if (!resumes) {
    return new AppResult(null, 200, null, null);
  }
  return new AppResult(resumes, 200, null, null);
}


export async function upsertEvaluationByUserId({
  user_admin_id,
  user_id,
  score,
  comment
}) {


  const isExist = await db.Evaluation.findOne({
    where: {
      user_admin_id: user_admin_id,
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
      return new AppResult(null, 504, "query.ts : upsertEvaluationByUserId  ", "failed_to_create_new_evaluation"); // return 
    }
    return new AppResult(newEvaluation, 200, null, null);// return 
  }

  const updateEvaluation = await db.Evaluation.update(
    {
      score,
      comment
    }, {
      where: {
        user_admin_id,
        user_id: user_id
      }
    }
  )
  return new AppResult(updateEvaluation, 200, null, null);
}

export async function findUserAdmin({ id }) {
  const admin = await db.User.find({ where: { id, status: 'admin' } });
  if (!admin) {
    return new AppResult(null, 200, null, null);
  }
  return new AppResult(admin, 200, null, null);
}


export async function findAllUsers() {
  const users: UserInstance[] = await db.User.findAll();
  if (!users) { return null }
  return users;
}



export async function getForm(position: PositionType) {
  console.log("포지션 : " + position);
  console.log(position === PositionType.Developer);
  const dbResult = await db.Form.findAll({
    where: {
      position: position
    }
  })
  if (!dbResult) {
    return new AppResult(null, 504, "query.ts/getForm", "failed_to_get_form_data");
  }
  console.log("결과 : " + JSON.stringify(dbResult));
  return new AppResult(dbResult, 200, null, null);
}


export async function createForm(data: FormJsonSkeleton) {
  // TODO 관리자권환 확인하기
  // TODO UPDATE 
  // TOOD 
  let refinedData: FormElementSkeleton[] = FormDecompositionHelper(data);
  let sFlag = true; // 모든 create 가 성공했는지 저장한다
  let fIdx = 0; // 몇 번 째 시도에서 실패했는지 저장한다
  let dbResult, question_num, rawDescription;
  var position, type;

  for (let i = 0; i < refinedData.length; i++) {

    if (refinedData[i].position == PositionType.Designer) {
      position = PositionType.Designer;
    } else {
      position = PositionType.Developer;
    }

    switch (refinedData[i].type) {
      case FormType.Long_Answer:
        type = FormType.Long_Answer;
        break;
      case FormType.Short_Answer:
        type = FormType.Short_Answer;
        break;
      case FormType.Selector:
        type = FormType.Selector;
        break;
      case FormType.Upload:
        type = FormType.Upload;
        break;
    };
    question_num = refinedData[i].question_num,
      rawDescription = refinedData[i].description;

    let description = rawDescription[0];
    if (rawDescription.length > 1) {
      description += "[opt>]";
      for (let j = 1; j < rawDescription.length; j++) {
        description += ":" + rawDescription[j];
      }
    }
    dbResult = await Promise.all([db.Form.create({
      position,
      question_num,
      description,
      type
    })
    ])


    if (!dbResult) {
      sFlag = false;
      fIdx = i;
    }

  }
  if (!sFlag) {
    return new AppResult(null, 504, "query.ts/createForm", "create_form_error_while_" + fIdx + "(th/st) try");
  }

  return new AppResult(dbResult, 200, null, null);




}
