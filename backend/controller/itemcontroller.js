const Item = require("../model/item");
exports.createItem =async(req,res)=>{
    const item=await Item.create(req.body);
    res.json(item);
};
exports.FetchAll =async(req,res)=>{
    const items=await Item.find();
    res.json(items);
};
exports.getItemById =async(req,res)=>{
    const item=await Item.findById(req.params.id);
    res.json(item);
};
exports.Update =async(req,res)=>{
    const item=await Item.findByIdAndUpdate(req.params.id,
        req.body,{new:true}
    );
    res.json(item);
};
exports.Delete =async(req,res)=>{
    const item=await Item.findByIdAndDelete(req.params.id);
    res.json(item);
};