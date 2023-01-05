//ovaj file je odgovoran za routes i requests koji dolaze serveru
const express=require('express');
const router=express.Router();
const registerTemplate=require('../models/RegisterModels');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const auth=require('../middleware/auth');
const productController=require("../Controllers/products-controller");
// multer => file upload for express
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    // spremi mi sliku kao png, a ne kao file
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

// save upload images to tmpDir
const upload = multer({storage: storage});

//REGISTER USER
router.post('/register',async(req,res)=>{
    //PROVJERA POSTOJI LI VEC KORISNIK S UNESENIM MAILOM (tako da se nije moguce ponovno registrirati s istim)
    
    try{
        const {fullName, username, email, password}=req.body
        let registeredUser=await registerTemplate.findOne({email})
        if(registeredUser)
        {
            return res.status(400).json({error: 'An account with that email address already exists. Please use a unique email.'});
        }
        //AKO NE POSTOJI, DODAJEMO USER-a
        const saltPassword= await bcrypt.genSalt(10);
    
        const securePassword= await bcrypt.hash(password, saltPassword);
    
        registeredUser=new registerTemplate({
            fullName,
            username,
            email,
            password:securePassword,
        })
         await registeredUser.save()
         return res.status(201).json({message:"User created successfully"});
    }
    catch (err) {
        res.status(400).json({error: "Something went wrong."});
    }

})


//LOGIN USER
router.post('/login', async (req,res)=>{
/*trazimo user-a s email-om koji unesemo, ako ga ne nademo onda vracamo error
 (pokusavamo se logirati s mailom koji ne postoji, tj. nije registriran)*/
    try{
        const {email, password}=req.body;
        let registeredUser=await registerTemplate.findOne({email})
        //ako nismo pronasli korisnika s upisanim email-om
        if(!registeredUser)
        {
            return res.status(400).json({error: "Please provide a valid email address and password."});
        }
        //ako je user s unesenim mail-om pronaden, usporedujemo lozinke
        //usporedujemo lozinku koju korisnik unosi (password) i lozinku koja se nalazi u bazi podataka (registeredUser.password)
        const isMatch= await bcrypt.compare(password, registeredUser.password)
        //provjeravamo je li lozinka ista ili ne
        if(!isMatch)
        {
            return res.status(400).json({error: "Please provide a valid email address and password."});
        }
        //ako su email i lozinka tocni, user se logira uspjesno
        //token autorizira user-a
        const token=jwt.sign({id:registeredUser._id}, process.env.JWT_SECRET, {
            expiresIn:'1h',
        });
        //kada posaljemo email i lozinku, odgovor je token objekt
        return res.json({token: 'Bearer ' + token});
        //dodijelili smo token,a sada ga trebamo provjeriti

        
    }
    catch (err) {
        res.status(400).json({error: "Something went wrong."});
    }
});

router.get('/', auth.requireLogin, async (req,res)=>{
    try{
        const registeredUser= await registerTemplate.findById(req.registeredUser._id).select("-password");
        res.json(registeredUser);
    }
    catch (err){
        res.status(400).json({error: "You are not logged in."});
    }
})

// general routes
router.get("/verifyToken", auth.requireLogin, auth.verifyToken);


//ROUTES FOR PRODUCTS
//dohvacanje svih proizvoda
router.get("/products", auth.requireLogin, productController.getAllProducts);

//dodavanje porizvoda
router.post("/products", auth.requireLogin,  upload.single('file'), productController.addProduct);

//dohvacanje proizvoda s odrednim id
router.get("/products/:id", auth.requireLogin, productController.getByIdentifier);

//brisanje proizvoda
router.delete("/products/:id", auth.requireLogin, productController.deleteProduct);

// dohvacanje svih proizvoda za korisnike
router.get("/list", productController.listProducts)

module.exports=router;