const db=require('../../utils/db');
const account='account';

module.exports={
    all:()=> {
        return db.load(`select * from ${account}`);
    },
    single:(id)=> {
        return db.load(`select * from ${account} where ID=${id}`);
    },
    add:(entity)=>{
        return db.add(account,entity);
    },
    patch: (entity) => {
        const condition = {
            ID: entity.ID
        }
        delete entity.ID;
        return db.patch(account, entity, condition);
    },
    delete:(id)=>{
        const condition = {
            ID: id
        }
        return db.delete(account,condition);
    }
}