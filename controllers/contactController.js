const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");
// const { param } = require("../routes/contactRoutes");
// const { connect } = require("mongoose");
//@desc get all contacts
//@route GET /api/contacts
//@access public
const getContact= asyncHandler(async(req,res) =>{
    const contacts=await Contact.find();
    res.status(200).json(contacts);
});



//@desc get specific contacts
//@route GET /api/contacts/:id
//@access public
const getSpecificContact=asyncHandler(async(req,res) =>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});


//@desc create contact
//@route POST /api/contacts
//@access public
const createContact=asyncHandler(async(req,res) =>{
    console.log("the request body is", req.body);
    const{name,email,phone}=req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contact);
});


//@desc update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact=asyncHandler(async(req,res) =>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updateContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updateContact);
});

//@desc delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id); 
    const contactdelete = await Contact.deleteById(req.params.id);
    console.log(contact); // Log the contact object
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    // const contactDelete = await Contact.deleteById(req.params.id) 
    res.status(200).json({ message: "Contact removed" });
});


module.exports={
    getContact,
    getSpecificContact,
    createContact,
    updateContact,
    deleteContact,
};