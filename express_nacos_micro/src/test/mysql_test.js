import MySQLUtil from '../utils/MySQLUtil.js';

(async () => {
    let insertId = await MySQLUtil.getInstance().execute('insert into mytest(payRate,num) values (?,?)',[20,50]);
    console.log('insertId:' + insertId);
    console.log(insertId);
    for (let i = 1; i <= 10; i++) {
        // 使用默认的数据源
        let row = await MySQLUtil.getInstance().query('select * from mytest where id=?',[i]);
        console.log(row);
    }
    console.log("==============")
    // 使用mysql1的数据源
    let rows = await MySQLUtil.getInstance('mysql1').query('select * from user_pwd');
    console.log(rows);
})().then(()=>{
    console.log("--------------")
}).catch(e=>{
    console.log(e);
});

