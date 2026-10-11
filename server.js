const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// لازم 50mb عشان الصور
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const dataPath = path.join(__dirname, 'projects.json');
if(!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, '[]');

app.get('/api/projects', (req,res)=>{
  try{
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json(data);
  }catch(e){ res.json([]); }
});

app.post('/api/projects', (req,res)=>{
  const projects = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  projects.unshift(req.body);
  fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2));
  console.log('مشروع جديد اتضاف:', req.body.title);
  res.json({success:true});
});

// ده لازم يكون اخر حاجة خالص
app.get('/admin', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=> console.log('SHQAWA PRO شغال...'));
