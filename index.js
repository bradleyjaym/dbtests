// // Add packages
// require("dotenv").config();
// // Add database package and connection string
// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   },
//   max: 2
// });

// const sql = "SELECT * FROM product";
// pool.query(sql, [], (err, res) => {
//     console.log(err, res)
// });


// const getAll = () => {
//   const sql = "SELECT * FROM product";
//   pool.query(sql, [], (err, res) => {
//       if (err) {
//           return err.message;
//       }
//       return res.rows;
//   });
//   };

//   const result = getAll();
//   console.log(result);

// Promise Pending Example
// const getAll = () => {
//   const sql = "SELECT * FROM product";
//   // For illustration, not using try catch
//   return pool.query(sql, []);
// };

// const result = getAll();
// console.log(result);


// Example showing why this will run bad. Step 1, 2, 4, undefined, 3
// const getAll = () => {
//   console.log("--- STEP 2: Inside getAll() ---");
//   const sql = "SELECT * FROM product";
//   pool.query(sql, [], (err, res) => {
//       if (err) {
//           console.log("--- STEP 3: Error ---");
//           return err.message;
//       }
//       console.log("--- STEP 3: No Error ---");
//       return res.rows;
//   });
// };

// console.log("--- STEP 1: Before call to getAll() ---");
// const result = getAll();
// console.log("--- STEP 4: After call to getAll() ---");
// console.log(result);

// One Proper Way
// const getAll = () => {
//   const sql = "SELECT * FROM product";
//   pool.query(sql, [], (err, res) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       console.log(res.rows);
//     }
//   });
// };

// getAll();    

// Second Proper Way
// const getAll = () => {
//   const sql = "SELECT * FROM product";
//   pool.query(sql, [])
//       .then(res => {console.log(res.rows)})
//       .catch(err => {console.log(err.message)});
// };

// getAll();

// Another Bad Async
// const getAll =  () => {
//   console.log("--- STEP 2: Inside getAll() ---");
//   const sql = "SELECT * FROM product";
//   // For illustration, not using try catch
//   return pool.query(sql, []); 
// };


// console.log("--- STEP 1: Before call to getAll() ---");
// getAll()
//   .then(result => {
//       console.log("--- STEP 3: No Error ---");
//       console.log(result);
//   })
//   .catch(err => {
//       console.log("--- STEP 3: Error ---");
//       console.log(err.message);
//   });
// console.log("--- STEP 4: After call to getAll() ---");

// Async with await
// const getAll =  () => {
//   console.log("--- STEP 2: Inside getAll() ---");
//   const sql = "SELECT * FROM product";
//   // For illustration, not using try catch
//   return pool.query(sql, []); 
// };

// const dbTest = async () => {
//   console.log("--- STEP 1: Before call to getAll() ---");
//   const result = await getAll();
//   console.log("--- STEP 3: After call to getAll() ---");
//   console.log(result);
// };

// dbTest();


// Async Example 2 Different Syntax
// const getAll = () => {
//   console.log("--- STEP 2: Inside getAll() ---");
//   const sql = "SELECT * FROM product";
//   try {
//       console.log("--- STEP 3: Try Block ---");  
//       return pool.query(sql, []);
//   } catch (err) {
//       console.log("--- STEP 3: Error Block ---");
//       return err.message;
//   };
// };

// (async () => {
//   console.log("--- STEP 1: Before call to getAll() ---");
//   const result = await getAll();
//   console.log("--- STEP 4: After call to getAll() ---");
//   console.log(result);
// }
// )();


// const getTotalRecords = () => {
//   const sql = "SELECT COUNT(*) FROM product";
//   return pool.query(sql)
//       .then(result => {
//           return {
//               msg: "success",
//               totRecords: result.rows[0].count
//           }
//       })
//       .catch(err => {
//           return {
//               msg: `Error: ${err.message}`
//           }
//       });
// };

// getTotalRecords()
//   .then(result => {
//       if (result.msg.substring(0, 5) === "Error") {
//           console.log(`Error Encountered.  ${result.msg}`);
//       } else {
//           console.log(`Total number of database records: ${result.totRecords}`);
//       };
//   })
//   .catch(err => {
//       console.log(`Error: ${err.message}`);
//   });

// Add packages
const dblib = require("./dblibs.js");

dblib.getTotalRecords()
  .then(result => {
    if (result.msg.substring(0, 5) === "Error") {
      console.log(`Error Encountered.  ${result.msg}`);
    } else {
      console.log(`Total number of database records: ${result.totRecords}`);
    };
  })
  .catch(err => {
    console.log(`Error: ${err.message}`);
  });

// Already added
// const producta = [200, 'Book', 'The JS Way', 9.99];
// dblib.insertProduct(producta)
//   .then(result => {
//     if (result.trans === "fail") {
//       console.log("ERROR OCCURED");
//       console.log(result.msg);
//     } else {
//       console.log("Insert Successful");
//       console.log(result.msg);
//     }
//   });

// Product array
const products = [
  {
      prod_id: 110,
      prod_name: 'Charger',
      prod_desc: 'USB',
      prod_price: 22.50
  },
  {
      prod_id: 200,
      prod_name: 'Book',
      prod_desc: 'The JS Way',
      prod_price: 9.99
  },
  {
      prod_id: 201,
      prod_name: 'Large Clips',
      prod_desc: 'Large binder clips',
      prod_price: 4.25
  },
  {
      prod_id: 202,
      prod_name: 'Medium Clips',
      prod_desc: 'Medium binder clips',
      prod_price: 3.25
  },
  {
      prod_id: 203,
      prod_name: 'Small Clips',
      prod_desc: 'Small binder clips',
      prod_price: 2.25
  }
];

// Declare variables
let numFailed = 0;
let numInserted = 0;
let errorMessage = "";

// Loop to insert - Contains logic error for summary stats
// console.log("--- STEP 1: Pre-Loop");
// for (prod of products) {
//   console.log("--- STEP 2: In-Loop Before Insert");
//   const result = dblib.insertProduct(prod);
//   console.log("--- STEP 3: In-Loop After Insert");
//   console.log("result is: ", result);
//   if (result.trans === "success") {
//       numInserted++;
//   } else {
//       numFailed++;
//       errorMessage += `${result.msg} \r\n`;
//   };
// };    
// console.log("--- STEP 4: After-Loop");
// console.log(`Records processed: ${numInserted + numFailed}`);
// console.log(`Records successfully inserted: ${numInserted}`);
// console.log(`Records with insertion errors: ${numFailed}`);
// if(numFailed > 0) {
//   console.log("Error Details:");
//   console.log(errorMessage);
// };

// Loop to insert - using async () function and await
// Not using try catch block
(async () => {
  console.log("--- STEP 1: Pre-Loop");
  for (prod of products) {
      console.log("--- STEP 2: In-Loop Before Insert");
      const result = await dblib.insertProduct(prod);
      console.log("--- STEP 3: In-Loop After Insert");
      console.log("result is: ", result);
      if (result.trans === "success") {
          numInserted++;
      } else {
          numFailed++;
          errorMessage += `${result.msg} \r\n`;
      };
  };    
  console.log("--- STEP 4: After-Loop");
  console.log(`Records processed: ${numInserted + numFailed}`);
  console.log(`Records successfully inserted: ${numInserted}`);
  console.log(`Records with insertion errors: ${numFailed}`);
  if(numFailed > 0) {
      console.log("Error Details:");
      console.log(errorMessage);
  };
})();