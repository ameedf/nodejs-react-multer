const router = require('express').Router();
const path = require('path');

// POSt /vacations
// fileName = "uuid-generated-name.jpg"

// DB: vacation {description, price, imageFileName}

// GET /vacation/1
// Fetch from db (id) -- {id, description, price, imageFileName}
// return to client

// render () {
  // vacation --- via redux
// }
// <div> {vacatio.description} <img src={"/"+vacations.imageFileName} />  </div>


// npm i uuid
const uuid = require('uuid').v4;

// npm i multer
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: './images',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    let newFileName = uuid(); // abcd-lknsad-23msfsl-asd
    if (ext && ext.length > 0) {
      newFileName = newFileName + ext;
    }
    // file.mimetype == 'image/'
    cb(null, newFileName);
  }
})
const upload = multer(
  {
    storage: multerStorage,
    limits: {
      fileSize: 1024 * 1024 * 50, // 50 mb
    }
  });

//   POST /persons
router.post('/', upload.single("imageFile"), (req, res) => {
  const {userName} = req.body;
  console.log(userName);
  if (req.file) {
    // store to DB with req.file.filename

    // const v = {description: "bla", price:50, imageFileName=req.file.filename}
    // db.executeQuery('insert into vacations set ?', v)

    res.json({ imageFileName: req.file.filename });
  }
  else {
    res.json({ error: "Couldn't upload file" });
  }
});

router.get("/", (req, res)=> {
  
})

module.exports = router