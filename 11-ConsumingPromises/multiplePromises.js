const fs = require("fs");
const superagent = require("superagent");

// create a file function that read file name only and dont return any call back function
const readFilePro = file => {
  // promise constructor takes a funtion which is executed immediately once the constructor is called
  // and take parameters resolve and reject
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find the file");
      resolve(data);
    });
  });
};

// writing file promise
const writeFilePro = (file, data) => {
  new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject("Could not write a file");
      resolve("success");
    });
  });
};

// creating an async function
const getDogPic = async () => {
  // implementing try and catch to catch the error instead of .catch method earlier
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // getting the image and RUNNING multiple promises
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map(el => {
      return el.body.message;
    });
    console.log(imgs);

    // console.log(res.body.message);

    // write the file
    writeFilePro("dog-image.txt", imgs.join("\n"));
    console.log("Random dog image saved");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: READY ";
};

(async () => {
  try {
    console.log("1: will get dog pics");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting dog pics");
  } catch (err) {
    console.log("ERROR");
  }
})();

/*
console.log("1: will get dog pics");
// const x = getDogPic();
// console.log(x);
getDogPic()
  .then(x => {
    console.log(x);
    console.log("3: Done getting dog pics");
  })
  .catch(err => {
    console.log("ERROR");
  });
*/

/*
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);

    // this is to write into file and return a promise
    return writeFilePro("dog-image.txt", res.body.message);
    // fs.writeFile("dog-image.txt", res.body.message, err => {
    //   console.log("Random dog image saved");
    // });
  })
  .then(() => {
    console.log("Random dog image saved");
  })
  .catch(err => {
    console.log(err.message);
  });
};
*/

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//       console.log(res.body.message);
//       fs.writeFile("dog-image.txt", res.body.message, err => {
//         console.log("Random dog image saved");
//       });
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// });
