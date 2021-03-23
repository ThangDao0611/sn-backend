import User, { sequelize } from "../../models/notes";
import bcrypt from 'bcrypt';
import {encode} from './encode';

let user = User.init(sequelize);

export let create = async (name,password) => {
  let id;
  let pass;
  let date = new Date();

    const result1 = await read_user(name).then((res)=>{
            return res;
    })
    if(result1[0]!=null){
        return -1;
    }

  await bcrypt.hash(password,10).then(hash=>{
    pass=hash;
  }) 
  id = encode(name);
  let data = {
    user_id: id,
    user_name: name,
    user_password: pass,
    createdAt: date,
    updatedAt: date,
  }
  let result = user.build(data);
  await result.save();
  return result.toJSON();
};


export let read_user = name =>{
  let result = user
  .findAll({
    where: {user_name: name}
  })
  .then(res => {
    return res;
  })
  .catch(err => {
    return err;
  });
return result;
}

export let keys = () => {
  let result = user
    .findAll()
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
  return result;
};


