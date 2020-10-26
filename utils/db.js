const sql=require("mysql");
const config=require('../config/default.json');

const pool=sql.createPool(config.mysql);

module.exports={
    load:(sql)=>{
        return new Promise((resolve,reject)=>{
            pool.query(sql,(err,result,fields)=>{
                if(err)
                    return reject(err);
                resolve (result);
            })
        })
    },
    patch: function(table, entity, condition) {
        return new Promise(function(resolve, reject) {
            const sql = `update ${table} set ? where ?`;
            pool.query(sql, [entity, condition], function(error, results) {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },
    add:(table,entity)=>{
        return new Promise((resolve, reject) => {
            const _sql=`insert into ${table} set ?`;
            pool.query(_sql,entity,(error,result)=>{
                if(error) return reject(error);
                resolve(result);
            });
        });
    },
    delete:(table,condition)=>{
        return new Promise((resolve, reject) => {
            const _sql=`delete from ${table} where ?`;
            pool.query(_sql,condition,(error,result)=>{
                if(error) return reject(error);
                resolve(result);
            });
        });
    }
}