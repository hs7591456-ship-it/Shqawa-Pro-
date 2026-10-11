const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json({limit: '20mb'}));
app.use(express.static(path.join(__dirname, 'public')));

// اتأكد ان الملف موجود
const dataPath = path.join(__dirname, 'projects.json');
if(!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, '[]');

app.get('/api/projects', (req,res)=>{
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.json(data);
});

app.post('/api/projects', (req,res)=>{
  const projects = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  projects.unshift(req.body);
  fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2));
  console.log('مشروع جديد اتضاف:', req.body.title);
  res.json({success:true});
});

// عشان Render
app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=> console.log('SHQAWA PRO شغال...'));
