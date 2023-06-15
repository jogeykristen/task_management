const Task = require('../models/task');

module.exports.createTask = async(req,res)=>{
    try{
        const {title,description,dueDate,progress,priority} =req.body

        const dueDateObj = new Date(dueDate);
        //console.log("due date =",dueDateObj)

        const currentDate = new Date();

        if (dueDateObj >= currentDate) {
            // Create a new task
            const task = await Task.create({
              title,
              description,
              dueDate,
              progress,
              priority,
            });
      
            res.status(201).json({ task });//The json method in Express is used to send a JSON response to the client. It automatically sets the Content-Type header to application/json and converts the provided JavaScript object to a JSON string.
          } else {
            // Return an error response if the due date is in the past
            res.status(400).json({ error: 'Due date must be greater than or equal to the current date' });
          }
    }catch(error){
        return res.status(500).json({message:"server error"})
    }
};

module.exports.updateTask =async(req,res)=>{
    try{
        const{id} = req.params;
        const{description,progress} = req.body;

        const task = await Task.findByPk(id);

        if(!task){
            return res.status(404).json({message:"No tasks found"})
        }
        task.description = description;
        task.progress = progress

        await task.save()
        res.status(200).json({ task });
    }catch(error){
        return res.status(500).json({message:"Server error"})
    }
}

module.exports.deleteTask = async(req,res)=>{
    try{
        const {id} = req.params;
        console.log("id =",id)
        //const task = await Task.query('Delete from public."Tasks" Where id = $1',[id]);
        const task = Task.destroy({
            where: {
              id: id
            }
          })
        console.log("task =",task)
        if(task){
            return res.status(201).json({message:"Deleted successfully"})
        }
        return res.status(400).json({message:"no tasks found with that id"})
    }catch(error){
        return res.status(500).json({message:"Server error"});
    }
}


