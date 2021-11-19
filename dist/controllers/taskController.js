"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.updateTasksStatus=exports.updateTasks=exports.getTasksByStatus=exports.getTasksById=exports.getTasks=exports.deleteTasks=exports.createTasks=void 0;var _Status=_interopRequireDefault(require("../models/Status"));var _Task=_interopRequireDefault(require("../models/Task"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}const createTasks=async(req,res)=>{try{const task=new _Task.default(req.body);// Menambahkan User Id berdasarkan Id user yang login
task.userId=req.userData.userId;await task.save(err=>{if(err){res.send(err)}else{res.status(201).json({info:"Task created successfully",data:task})}})}catch(err){res.send({message:"Something went wrong!",error:err})}};exports.createTasks=createTasks;const getTasksById=async(req,res)=>{_Task.default.findById(req.params.id).populate("userId","username email").populate("StatusId","_id Label").exec().then(tasks=>{if(tasks===null){res.send({info:"Task not found!"})}else{res.status(200).json({tasks:tasks})}}).catch(err=>{res.status(500).json({error:err,status:false})})};exports.getTasksById=getTasksById;const getTasks=async(req,res)=>{_Task.default.find().populate("userId","username email").populate("StatusId","_id Label").exec().then(tasks=>{res.status(200).json({count:tasks.length,status:true,tasks:tasks})}).catch(err=>{res.status(500).json({error:err,status:false})})};exports.getTasks=getTasks;const getTasksByStatus=async(req,res)=>{await _Status.default.findOne({Label:req.params.status}).then(async result=>{await _Task.default.find({StatusId:result.id}).populate("userId","username email").exec().then(tasks=>{res.status(200).json({status:true,tasks:tasks})}).catch(err=>{res.status(500).json({error:err,status:false})})})};exports.getTasksByStatus=getTasksByStatus;const updateTasks=async(req,res)=>{const checkId=await _Task.default.findById(req.params.id);if(!checkId)return res.status(404).json({message:"Data not found!"});try{_Task.default.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,result)=>{res.send({info:"Task Updated Successfully",newTasks:result})})}catch(error){res.status(400).json({message:err.message})}};exports.updateTasks=updateTasks;const updateTasksStatus=async(req,res)=>{const checkId=await _Task.default.findById(req.params.id);if(!checkId)return res.status(404).json({message:"Data not found!"});try{_Task.default.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,result)=>{res.send({info:"StatusId Updated Successfully",newTasks:result})})}catch(err){res.send({info:"Error",message:err.message})}};exports.updateTasksStatus=updateTasksStatus;const deleteTasks=async(req,res)=>{await _Task.default.deleteOne({_id:req.params.id}).then(result=>{if(result.deletedCount===1){res.send({info:"Task deleted successfully"})}else{res.send({info:"Task not found!"})}}).catch(e=>{res.send(e)})};exports.deleteTasks=deleteTasks;